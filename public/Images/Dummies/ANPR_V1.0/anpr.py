from libraries.arithOperations import *
from libraries.mLearnAlgorithms import *

import sys
import string
import cv2
import numpy as np
import collections
import matplotlib.pyplot as plt
from matplotlib.pyplot import * 

from os import walk
from scipy.ndimage import measurements, morphology
from PIL import Image
from pylab import *
from pytesseract import *

from sklearn.externals import joblib
from skimage.feature import hog, canny, corner_harris
from sklearn.svm import LinearSVC

import logging

class plateIdentification(object):
    def __init__(self, step=1, score=0.4, binTresh=0.05):
    	super(plateIdentification, self).__init__()
        self.step = step
        self.binTresh = binTresh
        self.score = score
    #Getters
    def getStep(self):
        return self.step
    def getScore(self):
        return self.score
    def getBinTresh(self):
        return self.binTresh
    #Setters
    def setStep(self, step):
        self.step = step
    def setScore(self, step):
        self.score = score
    def setBinTresh(self, step):
        self.binTresh = binTresh
	#Methods
    def locatePlate(self, image, SVM):
		### PREPROCESSING ###
		### Filter image for getting rid of noise
		### http://opencv-python-tutroals.readthedocs.org/en/latest/py_tutorials/py_imgproc/py_filtering/py_filtering.html
		enchancedImage = enchanceImage(image)
		#Computing edges for enchanced image
		sobelyEnchanced = cv2.Sobel(enchancedImage,cv2.CV_64F,0,1,ksize=3)
		#Image for being computed by edge density function
		imageForEdging = sobelyEnchanced
		edges = imageForEdging
		maxEdges = np.max(edges)
		normEdges = abs(edges/(maxEdges * 1.00)) #normalization
		#AdHoc Closing
		#Dilation
		kernel = np.ones((10,2),np.uint8)
		dilation = cv2.dilate(normEdges,kernel,iterations = 2)
		#Erosion
		kernel = np.ones((5,10),np.uint8)
		erosion = cv2.erode(dilation,kernel,iterations = 4)
		kernel = np.ones((15,2),np.uint8)
		erosion2 = cv2.erode(erosion,kernel,iterations = 2)
        
        #binarization of NormEdges
		testingList = []
		kernel = np.ones((5,20),np.uint8)
		preBinaryImage = cv2.dilate(erosion2,kernel,iterations = 2)
		preBinaryImage = cv2.GaussianBlur(preBinaryImage,(31,31),0)
		binaryImage = 1*(preBinaryImage>self.binTresh)
		chunksNumber = 4
		modulusImage = binaryImage.shape[0] % chunksNumber
		bandCandidates = []
		bandHorizontalProjection = []
		for element in xrange(chunksNumber):
			currentBand = np.vsplit(binaryImage[modulusImage:], chunksNumber)[element]
			HSum = np.sum(currentBand, axis=0) # axis 1 for vertical axis 0 for horizontal
			bandHorizontalProjection.append(HSum)
			bandCandidates.append(currentBand)

		sumBands = 0
		index = 0
		for element in bandHorizontalProjection:
			if np.sum(element) > sumBands:
				indexMax = index
				sumBands = np.sum(element)
				maxVertical = np.max(element)
				if maxVertical != 0:
					normVerticalSum = element/(maxVertical * 1.00) # normalization
				else: 
					normVerticalSum = element
			index += 1

		validIndex = []
		for index in xrange(len(normVerticalSum)):
			if normVerticalSum[index] != 0: 
				validIndex.append(index)

		potentialPlate = np.zeros((binaryImage.shape[0],binaryImage.shape[1]),np.uint32)
		for i in xrange(binaryImage.shape[0]-1):  
			for j in xrange(binaryImage.shape[1]-1):
				if binaryImage[i][j] != 0:
					potentialPlate[i][j] = image[i][j]

		selectecBand = np.vsplit(potentialPlate[modulusImage:], chunksNumber)[indexMax]
		tempStartV = binaryImage.shape[0]-selectecBand.shape[0]
		VSum = np.sum(binaryImage[tempStartV:,:], axis=0) 
		HSum = np.sum(binaryImage[tempStartV:,:], axis=1)

		tempSizeLeft = 0
		tempSizeRight = 0
		tempSizeTop = 0
		tempSizeBottom = 0

		potentialPlateSizeH = 0
		for element in HSum:
			if element != 0: 
				tempSizeLeft = potentialPlateSizeH
				break
			potentialPlateSizeH += 1
		potentialPlateSizeH = 0
		for element in reversed(HSum):
			if element != 0: 
				tempSizeRight = potentialPlateSizeH
				break
			potentialPlateSizeH += 1
		potentialPlateSizeV = 0
		for element in VSum:
			if element != 0: 
				tempSizeTop = potentialPlateSizeV
				break
			potentialPlateSizeV += 1
		potentialPlateSizeV = 0
		for element in reversed(VSum):
			if element != 0: 
				tempSizeBottom = potentialPlateSizeV
				break
			potentialPlateSizeV += 1
            
		SizeRight = selectecBand.shape[0]-tempSizeRight
		SizeBottom = selectecBand.shape[1]-tempSizeBottom
		preSelectecBand = selectecBand[tempSizeLeft:SizeRight,tempSizeTop:SizeBottom]
		selectecBand = preSelectecBand
		platerForSVM = []
		potentialPlate = np.zeros((30,70),np.uint32)
		scoreSVM = []
		indexSVMValid = 0		

		for i in xrange(0,selectecBand.shape[0]-30,self.step):  
			for j in xrange(0,selectecBand.shape[1]-70,10):
				potentialPlate = selectecBand[i:i+30,j:j+70]
				p_label, p_val = SVM.identifyPlate(potentialPlate)
				if p_label==1 and p_val>self.score:
					platerForSVM.append(potentialPlate)
					scoreSVM.append(p_val)
		platerForSVMMaxScore = []
		if len(scoreSVM)!=0:
			platerForSVMMaxScore = platerForSVM[np.argmax(scoreSVM)]
                return platerForSVMMaxScore


    def segmentationPlate(self, image):
		charsPlate = []
		maxEdges = np.max(image)
		normEdges = abs(image/(maxEdges * 1.00)) # normalization
		sobelyEnchanced = abs(cv2.Sobel(normEdges,cv2.CV_64F,1,1,ksize=3))
		maxEdges = np.max(sobelyEnchanced)
		normEdges = abs(sobelyEnchanced/(maxEdges * 1.00)) # normalization
		binarizationTreshold = 0.3
		kernel = np.ones((1,8),np.uint8)
		binaryImageTwo = cv2.dilate(normEdges,kernel,iterations = 2)
		HSum = np.sum(binaryImageTwo, axis=1)
		entropy = savitzky_golay(HSum, 21, 3)
		countH = 0
		reversedCountH = 0 
		for element in entropy:
		    if element > 25:
		        break
		    countH += 1
		for element in reversed(entropy):
		    if element > 25:
		        break
		    reversedCountH += 1
		lowBound = countH
		upBound = image.shape[0]-reversedCountH
		kernel = np.ones((8,1),np.uint8)
		binaryImageThree = cv2.dilate(normEdges,kernel,iterations = 2)
		VSum = np.sum(binaryImageThree, axis=0)
		entropyV = savitzky_golay(VSum, 21, 3)
		count = 0
		reversedCount = 0 
		for element in entropyV:
		    if element > 11:
		        break
		    count += 1
		for element in reversed(entropyV):
		    if element > 11:
		        break
		    reversedCount += 1
		leftBound = count
		rightBound = image.shape[1]-reversedCount
		image=image[lowBound:upBound,leftBound:rightBound]
		Letters = image[:,:27]
		Numbers = image[:,30:]

		binTreshNL = 0.4

		#For intensityLevel Segmentation
		# maxEdgesL = np.max(Letters)
		# normEdgesL = abs(Letters/(maxEdgesL * 1.00)) #normalization
		# binaryImageL = 1*(normEdgesL>binTreshNL)
		# VSumL = np.sum(binaryImageL, axis=0)
		# letterIndex = int(Letters.shape[1]/2)
		# offsetL=4
		# firstIndexL = offsetL+np.argmax(VSumL[offsetL:letterIndex])
		# secondIndexL = letterIndex+np.argmax(VSumL[letterIndex:-offsetL])
		# maxEdgesN = np.max(Numbers)
		# normEdgesN = abs(Numbers/(maxEdgesN * 1.00)) #normalization
		# binaryImageN = 1*(normEdgesN>binTreshNL)
		# VSumN = np.sum(binaryImageN, axis=0)
		# numberIndexN = int(Numbers.shape[1]/2)
		# offsetN=4
		# firstIndexN = offsetN+np.argmax(VSumN[offsetN:numberIndexN])
		# secondIndexN = numberIndexN+np.argmax(VSumN[numberIndexN:-offsetN])

		#For fixedIndex Segmentation
		fixedIndexL = int(Letters.shape[1]/3)
		firstIndexL = fixedIndexL
		secondIndexL = fixedIndexL*2
		fixedIndexN = int(Numbers.shape[1]/3)		
		firstIndexN = fixedIndexN
		secondIndexN = fixedIndexN*2

		charsPlate.append(Letters[:,:firstIndexL])
		charsPlate.append(Letters[:,firstIndexL+1:secondIndexL])
		charsPlate.append(Letters[:,secondIndexL+1:])
		charsPlate.append(Numbers[:,:firstIndexN])
		charsPlate.append(Numbers[:,firstIndexN+1:secondIndexN])
		charsPlate.append(Numbers[:,secondIndexN+1:])
		return Letters, Numbers, charsPlate


def anpr(fileName):
	dirPath = '../Images/TestSet/'
 	# fileName = str(sys.argv[1])
	dirFile = dirPath+fileName
	# print 'File', dirFile
	SVM = mLearnAlg()
	image = np.array(Image.open(dirFile).convert('L'))
	plateId = plateIdentification()
	plateLocated = plateId.locatePlate(image,SVM)
	clf = joblib.load("./parameters/digitTrainedHarrisResized.pkl")

	if len(plateLocated)!=0:
		# plt.imshow(plateLocated, cmap = cm.Greys_r)
		# plt.xticks([]), plt.yticks([])
		# plt.show()
		Letters, Numbers, charsPlate = plateId.segmentationPlate(plateLocated)
		LettersResult = []
		NumbersResult = []

		#Testing OCR for complete Letters
		# mResized = cv2.resize(Letters.astype('uint8'), (Letters.shape[1]*4, Letters.shape[0]*4), interpolation=cv2.INTER_CUBIC)
		# maxEdges = np.max(mResized)
		# normEdges = abs(mResized/(maxEdges * 1.00)) # normalization
		# binarizationTreshold = 0.5
		# binaryImage = 1*(normEdges>binarizationTreshold)
		# binaryImage = np.array(binaryImage, dtype=np.uint8)
		# imRestored = Image.fromarray(binaryImage)
		# print image_to_string(imRestored,config='-psm 7') #SingleBlock OCR

		for chars in charsPlate[:3]:
			roiTest = chars.astype('uint8')
			mResized = cv2.resize(roiTest, (roiTest.shape[1]*2, roiTest.shape[0]*2), interpolation=cv2.INTER_CUBIC)
			# mResized2 = bsaAlgorithm(roiTest, 4)
			# kernel = np.ones((1,1),np.uint8)
			# binaryImage = cv2.erode(normEdges,kernel,iterations = 1)
			# binaryImage = cv2.dilate(binaryImage,kernel,iterations = 1)
			# maxEdges = np.max(mResized)
			# normEdges = abs(mResized/(maxEdges * 1.00)) # normalization
			# binarizationTreshold = 0.5
			# binaryImage = 1*(normEdges>binarizationTreshold)
			# binaryImage = np.array(binaryImage, dtype=np.uint8)
			# imRestored = Image.fromarray(binaryImage)
			imRestored = Image.fromarray(mResized)
			# plt.imshow(imRestored, cmap = cm.Greys_r)
			# plt.xticks([]), plt.yticks([])
			# plt.show()
			# print image_to_string(imRestored,config='-psm 10') #SingleWord
			LettersResult.append(image_to_string(imRestored,config='-psm 10'))

		for chars in charsPlate[3:]:
			# plt.imshow(chars, cmap = cm.Greys_r)
			# plt.xticks([]), plt.yticks([])
			# plt.show()
			roiTest = chars.astype('uint8')
			roiTestImageResized = cv2.resize(roiTest, (8*3, 11*3), interpolation=cv2.INTER_CUBIC)
			#For HOG
			# imRestored = Image.fromarray(roiTestImageResized)
			# roi_hog_fd = hog(imRestored, orientations=9, pixels_per_cell=(8, 11), cells_per_block=(1, 1), visualise=False)
			#For Canny
			# cannyFeature = canny(roiTestImageResized, sigma=1.0, low_threshold=None, high_threshold=None, mask=None, use_quantiles=False)
			# cannyFeature = fd.reshape(cannyFeature.shape[0]*cannyFeature.shape[1])
			#For Harris
			harrisCornerFeature = corner_harris(roiTestImageResized, method='k', k=0.05, eps=1e-06, sigma=1)
			harrisCornerFeature = harrisCornerFeature.reshape(harrisCornerFeature.shape[0]*harrisCornerFeature.shape[1])
			nbr = clf.predict(np.array([harrisCornerFeature], 'float64'))
			NumbersResult.append(int(nbr[0]))
		
		return plateLocated, LettersResult, NumbersResult

	else:
		return 0
