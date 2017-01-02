import sys
import string
import cv2
import numpy as np
import collections
import matplotlib.pyplot as plt

from os import walk
from scipy.ndimage import measurements, morphology
from PIL import Image
from pylab import *
from math import factorial
from numpy import linalg as LA

def enchancementFunction(image):
	constantA = 2 / (0.15)**2
	constantB = 2 / (0.8 - 0.15)**2
	row = []
	for i in image:
		column = []
		for j in i:
			if j >= 0 and j < 0.15: 
				fg = 3 / ((constantA*(j-0.15)**2)+1)
			elif j >= 0.15 and j < 1: 
				fg = 3 / ((constantB*(j-0.15)**2)+1)
			else: 
				fg = 1
			column.append(fg)
		row.append(column)
	return row

def enchanceImage(image):
	### Filter image for getting rid of noise
	### http://opencv-python-tutroals.readthedocs.org/en/latest/py_tutorials/py_imgproc/py_filtering/py_filtering.html
	blur = cv2.GaussianBlur(image,(15,15),0)
	median = cv2.medianBlur(image,9)
	bilateral = cv2.bilateralFilter(image,9,75,75)
	#Select image to filter
	image2Filter = blur
	sobelyEnchanced = cv2.Sobel(image2Filter,cv2.CV_64F,0,1,ksize=3)
	###compute the new intensity function for image enchancement
	kernel = np.ones((5,5),np.uint8)
	erosion = cv2.erode(sobelyEnchanced,kernel,iterations = 1)
	### Add a convolution between the laplacian and a blurGaussian filter
	blurEdge = cv2.GaussianBlur(erosion,(31,31),0) 
	#Normalization for edge function after blurring 
	maxBlurEdge = np.max(blurEdge)
	normBlurEdge = blurEdge/(maxBlurEdge * 1.00) # normalization
	#Computing intensity function 
	ImageToComputeEnchancement = np.array(image, dtype="int32")	
	preEnchancementImage = np.array(enchancementFunction(normBlurEdge), dtype="float32")
	#Computing enchanced image
	kernel = np.ones((5,5),np.float32)/25
	blurredImage = cv2.filter2D(image,-1,kernel)
	row = []
	for i in xrange(ImageToComputeEnchancement.shape[0]): 
		column = []
		for j in xrange(ImageToComputeEnchancement.shape[1]):
			jPrima = 0
			jPrima = (preEnchancementImage[i][j]*(ImageToComputeEnchancement[i][j] - blurredImage[i][j])) + blurredImage[i][j]
			column.append(jPrima)
			# print ImageToComputeEnchancement[i][j],  blurredImage[i][j], preEnchancementImage[i][j], jPrima
		row.append(column)
	enchancedImage = np.array(row, dtype="uint8")
	return enchancedImage

def denoising(binaryImage):
	#Algorithm for removing background curves and noise
	imageToNoiseRemoving = binaryImage
	mMatrix = np.zeros((imageToNoiseRemoving.shape[0],imageToNoiseRemoving.shape[1]),np.uint32)
	nMatrix = np.zeros((imageToNoiseRemoving.shape[0],imageToNoiseRemoving.shape[1]),np.uint32)
	tLong = 80
	tShort = 25
	for iPrima in xrange(imageToNoiseRemoving.shape[0]-2-2-1):
		i = iPrima+2 
		for jPrima in xrange(imageToNoiseRemoving.shape[1]-2-2-1):
			j = jPrima+2
			if imageToNoiseRemoving[i][j] == 1:
				if (imageToNoiseRemoving[i-1][j-1]+imageToNoiseRemoving[i-1][j]+imageToNoiseRemoving[i-1][j+1]+imageToNoiseRemoving[i][j-1]) > 0:
					mMatrix[i][j] = max(mMatrix[i-1][j-1],mMatrix[i-1][j],mMatrix[i-1][j+1],mMatrix[i][j-1])+1
				else:
					mMatrix[i][j] = max(mMatrix[i-2][j-1],mMatrix[i-2][j],mMatrix[i-2][j+1],mMatrix[i-1][j-2], mMatrix[i-1][j+2], mMatrix[i][j-2])+1
	
	for iPrima in reversed(xrange(imageToNoiseRemoving.shape[0]-2-2-1)):
		i = iPrima+2 
		for jPrima in reversed(xrange(imageToNoiseRemoving.shape[1]-2-2-1)):
			j = jPrima+2
			if imageToNoiseRemoving[i][j] == 1:
				if (imageToNoiseRemoving[i+1][j-1]+imageToNoiseRemoving[i+1][j]+imageToNoiseRemoving[i+1][j+1]+imageToNoiseRemoving[i][j+1]) > 0:
					nMatrix[i][j] = max(nMatrix[i+1][j-1],nMatrix[i+1][j],nMatrix[i+1][j+1],nMatrix[i][j+1])+1
				else:
					nMatrix[i][j] = max(nMatrix[i+2][j-1],nMatrix[i+2][j],nMatrix[i+2][j+1],nMatrix[i+1][j-2],nMatrix[i+1][j+2],nMatrix[i][j+2])+1
	
	imageDeNoised = np.array(imageToNoiseRemoving)
	for i in xrange(imageDeNoised.shape[0]-1):  
		for j in xrange(imageDeNoised.shape[1]-1):
			if imageToNoiseRemoving[i][j] == 1:
				if (mMatrix[i][j]+nMatrix[i][j] > tLong) or (mMatrix[i][j]+nMatrix[i][j] < tShort):
					imageDeNoised[i][j] = 0
	ImageShaped = np.array(imageDeNoised)
	return ImageShaped

def savitzky_golay(y, window_size, order, deriv=0, rate=1):
    try:
        window_size = np.abs(np.int(window_size))
        order = np.abs(np.int(order))
    except ValueError, msg:
        raise ValueError("window_size and order have to be of type int")
    if window_size % 2 != 1 or window_size < 1:
        raise TypeError("window_size size must be a positive odd number")
    if window_size < order + 2:
        raise TypeError("window_size is too small for the polynomials order")
    order_range = range(order+1)
    half_window = (window_size -1) // 2
    # precompute coefficients
    b = np.mat([[k**i for i in order_range] for k in range(-half_window, half_window+1)])
    m = np.linalg.pinv(b).A[deriv] * rate**deriv * factorial(deriv)
    # pad the signal at the extremes with
    # values taken from the signal itself
    firstvals = y[0] - np.abs( y[1:half_window+1][::-1] - y[0] )
    lastvals = y[-1] + np.abs(y[-half_window-1:-1][::-1] - y[-1])
    y = np.concatenate((firstvals, y, lastvals))
    return np.convolve( m[::-1], y, mode='valid')

def bsaScore(inputImage, originalImage, reshapeFactor):
	updatedImage = inputImage.copy()

	# Compute bScore
	miuBlack = 50
	miuWhite = 255
	bScore = np.zeros(len(updatedImage))
	bScoreFirstDev = np.zeros(len(updatedImage))
	bScoreSecDev = np.zeros((len(updatedImage),len(updatedImage)))
	for i in xrange(len(updatedImage)):
		bScoreSecDevTemp = np.zeros(len(updatedImage))
		bScore[i] = ((updatedImage[i]-miuWhite)**2)*((updatedImage[i]-miuBlack)**2)
		bScoreFirstDev[i] = 4*updatedImage[i]**3-6*(miuWhite+miuBlack)*updatedImage[i]**2+2*(miuWhite**2+4*miuWhite*miuBlack+miuBlack**2)*updatedImage[i]-2*miuWhite*miuBlack*(miuWhite+miuBlack)
		bScoreSecDevTemp[i] = 12*updatedImage[i]**2-12*(miuWhite+miuBlack)*updatedImage[i]+2*(miuWhite**2+4*miuWhite*miuBlack+miuBlack**2)
		bScoreSecDev[i,:] = bScoreSecDevTemp
		# print bScoreSecDev 
	# print bScoreFirstDev.shape, bScoreSecDev.shape
	# print bScore

	# Compute sScore
	sScore = np.zeros(len(updatedImage))
	sScoreFirstDev = np.zeros(len(updatedImage))
	sScoreSecDev = np.zeros((len(updatedImage),len(updatedImage)))
	rowStep = int(4*reshapeFactor)
	columnStep = int(4*reshapeFactor)
	indexS = columnStep
	for i in xrange(rowStep):
		i += 1
		if i == rowStep-1:
			break
		for j in xrange(columnStep):
			j += 1
			sScoreSecDevTemp = np.zeros(len(updatedImage))
			if j == columnStep-1:
				indexS+=2
				break
			indexS+=1
			sScore[indexS] = (updatedImage[indexS-1] - updatedImage[indexS])**2 + (updatedImage[indexS-columnStep] - updatedImage[indexS])**2 + (updatedImage[indexS+columnStep] - updatedImage[indexS])**2 + (updatedImage[indexS+1] - updatedImage[indexS])**2
			sScoreFirstDev[indexS] = 8 * updatedImage[indexS] - 2 * (updatedImage[indexS-1]+updatedImage[indexS-columnStep]+updatedImage[indexS+columnStep]+updatedImage[indexS+1])
			sScoreSecDevTemp[indexS] = 8
			sScoreSecDevTemp[indexS-1] = -2
			sScoreSecDevTemp[indexS+1] = -2
			sScoreSecDevTemp[indexS-columnStep] = -2
			sScoreSecDevTemp[indexS+columnStep] = -2
			sScoreSecDev[indexS,:] = sScoreSecDevTemp.copy()
	# print sScore

	# rasteredOriginalImage = np.zeros(originalImage.shape[0]*originalImage.shape[1])

	rasteredOriginalImageList = []	
	for i in xrange(originalImage.shape[0]):
		rasteredOriginalImage = []
		for j in xrange(originalImage.shape[1]):
			# rasteredOriginalImage[4*i+j] = originalImage[i][j]
			rasteredOriginalImage.append(originalImage[i][j])
		for replicate in xrange(reshapeFactor):
			rasteredOriginalImageList.extend(rasteredOriginalImage)

	rasteredOriginalImageReshaped =  np.repeat(np.asarray(rasteredOriginalImageList), reshapeFactor)

	# print originalImage
	# print rasteredOriginalImage
	# print rasteredOriginalImageReshap
	aScore = 0
	indexV = 0
	indexDev = 0
	indexSecDev = 0
	aScore = np.zeros(len(updatedImage))
	aScoreFirstDev = np.zeros(len(updatedImage))
	
	# listIndex = []
	# aScoreTempList = []
	# for element in xrange(len(rasteredOriginalImage)):
	# 	aScoreTemp = 0
	# 	for countH in xrange(reshapeFactor):
	# 		indexV = element*reshapeFactor + countH 
	# 		for countV in xrange(reshapeFactor):
	# 			# print element, indexV, len(updatedImage), originalImage.shape[0]
	# 			aScoreTemp += updatedImage[indexV]
	# 			indexV += len(updatedImage)/originalImage.shape[0]
	# 	aScoreTempList.append(aScoreTemp)
	# sumValues = np.tile(np.repeat(np.asarray(aScoreTempList),reshapeFactor),reshapeFactor)

	ascore = np.zeros(len(updatedImage))
	ascoreFirstDev = np.zeros(len(updatedImage))

	indexSD = 0
	indexSDList = []

	for element in xrange(originalImage.shape[0]):
		indexList = []
		for countH in xrange(reshapeFactor):
			indexSD = element*reshapeFactor + countH
			for countV in xrange(reshapeFactor):
				indexList.append(indexSD)				
				indexSD += len(updatedImage)/int(originalImage.shape[0]*originalImage.shape[1])
		indexSDList.append(indexList)

	factor=0
	listIndexSD = []

	for element in indexSDList:
		for element2 in xrange(reshapeFactor):
			factor = element2*(len(updatedImage)/originalImage.shape[0])
			listIndexSD.append((factor+np.asarray(element)).tolist())

	# print listIndexSD

	aScoreSecDev = np.zeros((len(updatedImage),len(updatedImage)))
	aScoreTempList = np.zeros(len(updatedImage))

	for element in listIndexSD:
		aScoreTemp = 0
		for element2 in element:
			for element3 in element:
				aScoreSecDev[element2,element3]=(2.00/reshapeFactor**4)
				aScoreTempList[element2] += updatedImage[element3]
	# print listIndexSD
	# print '-----------------'
	for element in xrange(len(updatedImage)):
		ascore[element]=(rasteredOriginalImageReshaped[element]-(1.00/reshapeFactor**2)*aScoreTempList[element])**2
		ascoreFirstDev[element]=(2.00/reshapeFactor**2)*((1.00/reshapeFactor**2)*aScoreTempList[element]-rasteredOriginalImageReshaped[element])

	# bsa = bScore + 10000 * sScore + 1000000 * ascore 
	# bsaFirstDev = bScoreFirstDev + 10000 * sScoreFirstDev + 1000000 * ascoreFirstDev
	# bsaSecondDev = bScoreSecDev + 10000 * sScoreSecDev + 1000000 * aScoreSecDev

	ascore*=4

	bsa = bScore + 10000 * sScore + 1000000 * ascore 
	bsaFirstDev = bScoreFirstDev + 10000 * sScoreFirstDev + 1000000 * ascoreFirstDev
	bsaSecondDev = bScoreSecDev + 10000 * sScoreSecDev + 1000000 * aScoreSecDev
	heissan = (np.transpose(bsaSecondDev)+bsaSecondDev)/2

	# np.savetxt('originalImage.csv', rasteredOriginalImageReshaped, delimiter=';',fmt='%f')
	# np.savetxt('updatedImage.csv', updatedImage, delimiter=';',fmt='%f')
	# np.savetxt('bScore.csv', bScore, delimiter=';',fmt='%f')
	# np.savetxt('bScoreFirstDev.csv', bScoreFirstDev, delimiter=';',fmt='%f')
	# np.savetxt('bScoreSecDev.csv', bScoreSecDev, delimiter=';',fmt='%f')
	# np.savetxt('sScore.csv', sScore, delimiter=';',fmt='%f')
	# np.savetxt('sScoreFirstDev.csv', sScoreFirstDev, delimiter=';',fmt='%f')
	# np.savetxt('sScoreSecDev.csv', sScoreSecDev, delimiter=';',fmt='%f')
	# np.savetxt('aScore.csv', ascore, delimiter=';',fmt='%f')
	# np.savetxt('aScoreFirstDev.csv', ascoreFirstDev, delimiter=';',fmt='%f')
	# np.savetxt('aScoreSecDev.csv', aScoreSecDev, delimiter=';',fmt='%f')
	return [bsa, bsaFirstDev, heissan]

def pixelUpdate(updatedImage, BSAScore):
	# print BSAScore[0], BSAScore[1].shape, BSAScore[2].shape
	# np.savetxt('pixelUpd.csv', BSAScore[2][16:-16,16:-16], delimiter=';',fmt='%f')
	# print heissan.shape, BSAScore[2].shape
	gradient = BSAScore[1]
	heissan = BSAScore[2]

	w, eMatrix = LA.eig(heissan)
	eMatrixT = np.transpose(eMatrix)

	gradientPrima = np.dot(gradient, eMatrix)

	hessianPrimaTemp = np.dot(eMatrixT, heissan)
	hessianPrima = np.dot(hessianPrimaTemp, eMatrix)
	hessianDiag = np.diag(hessianPrima.diagonal())
	hessianPrimaInv = LA.inv(hessianDiag)

	stepPrima = np.dot(hessianPrimaInv, gradientPrima)
	step = np.dot(eMatrix,stepPrima)
	# print gradientPrima.shape, hessianPrima.shape, eMatrix.shape, stepPrima.shape, step.shape
	# print step.astype(float32)
	return step

def bsaAlgorithm(image, reshapeFactor):
	#BSAlgorithm
	# 1. Pixel Replication
	horizontalRes = image.shape[0] % 4
	verticalRes = image.shape[1] % 4
	if horizontalRes != 0:
		if verticalRes != 0:
			imageRes = image[:-horizontalRes,:-verticalRes]
		else:
			imageRes = image[:-horizontalRes,:]
	else:
		if verticalRes != 0:
			imageRes = image[:,:-verticalRes]
		else:
			imageRes = image[:,:]

	blocksOriginalImage = []
	blocksInOriginalImage = imageRes.shape[0]*imageRes.shape[1]/((4)**2)
	startIndexH = 0
	endIndexH = 0
	for elementH in xrange(imageRes.shape[0]/(4)):
		endIndexH += (4)
		startIndexV = 0
		endIndexV = 0
		for elementV in xrange(imageRes.shape[1]/(4)):
			endIndexV += (4)
			# print startIndexH, endIndexH, startIndexV, endIndexV 
			blocksOriginalImage.append(imageRes[startIndexH:endIndexH,startIndexV:endIndexV])
			startIndexV += (4)
		startIndexH += (4)

	newImage = np.zeros((imageRes.shape[0]*reshapeFactor, imageRes.shape[1]*reshapeFactor))
	for i in xrange(imageRes.shape[0]):
		for j in xrange(imageRes.shape[1]):
			for indexColumn in xrange(reshapeFactor):
				for indexRow in xrange(reshapeFactor):
					newImage[i*reshapeFactor+indexColumn][j*reshapeFactor+indexRow]=imageRes[i][j]
	# print imageRes.shape, image.shape, newImage.shape

	blocksImage = []
	blocksInRestauredImage = newImage.shape[0]*newImage.shape[1]/((4*reshapeFactor)**2)
	startIndexH = 0
	endIndexH = 0
	for elementH in xrange(newImage.shape[0]/(4*reshapeFactor)):
		endIndexH += (4*reshapeFactor)
		startIndexV = 0
		endIndexV = 0
		for elementV in xrange(newImage.shape[1]/(4*reshapeFactor)):
			endIndexV += (4*reshapeFactor)
			# print startIndexH, endIndexH, startIndexV, endIndexV 
			blocksImage.append(newImage[startIndexH:endIndexH,startIndexV:endIndexV])
			startIndexV += (4*reshapeFactor)
		startIndexH += (4*reshapeFactor)

	#RastedImage
	rastedList = []
	for element in blocksImage:
		rastedImage = np.zeros(element.shape[0]*element.shape[1])
		for i in xrange(element.shape[0]):
			for j in xrange(element.shape[1]):
				rastedImage[4*reshapeFactor*(i)+j]=element[i][j]
				# print 4*reshapeFactor*(i)+j
		rastedList.append(rastedImage)

	#BSA Score
	rastedUpdatedList = []
	indexO = 0
	count = 0
	for element in rastedList:
		bsaVector = []
		elementUpdated = np.array(element).copy()
		BSAScore = bsaScore(elementUpdated, blocksOriginalImage[indexO], reshapeFactor)
		bsaVector.append(np.sum(BSAScore[0]))
		# print BSAScore[0]
		for temp in xrange(20):
			referenceVector = elementUpdated.copy()
			step = pixelUpdate(elementUpdated, BSAScore)
			maxEdges = np.max(step)
			normEdges = abs(step/(maxEdges * 1.00)) # normalization
			elementUpdated += normEdges
			BSAScore = bsaScore(elementUpdated, blocksOriginalImage[indexO], reshapeFactor)
			bsaVector.append(np.sum(BSAScore[0]))
		indexO += 1
		# print elementUpdated
		rastedUpdatedList.append(elementUpdated)
	# print bsaVector

	listUpdatedImages = []
	for images in rastedUpdatedList:
		updatedImage = np.zeros((blocksImage[0].shape[0],blocksImage[0].shape[1]))
		for i in xrange(blocksImage[0].shape[0]):
			for j in xrange(blocksImage[0].shape[1]):
				updatedImage[i][j]=images[4*reshapeFactor*i+j]
		listUpdatedImages.append(updatedImage)

	horizontalBlocks = newImage.shape[0] / (4*reshapeFactor)
	verticalBlocks = newImage.shape[1] / (4*reshapeFactor)
	assembledImage = np.zeros((newImage.shape[0], newImage.shape[1]))
	indexImage = 0
	for hBlock in xrange(horizontalBlocks):
		for vBlock in xrange(verticalBlocks):
			startpH = hBlock * listUpdatedImages[indexImage].shape[0]
			endpH = (hBlock+1) * listUpdatedImages[indexImage].shape[0]
			startPV = vBlock * listUpdatedImages[indexImage].shape[1]
			endPV = (vBlock+1) * listUpdatedImages[indexImage].shape[1]
			assembledImage[startpH:endpH,startPV:endPV]=listUpdatedImages[indexImage]
			indexImage += 1

	# print assembledImage
	# bsaNumpyVector = np.asarray(bsaVector)
	# np.savetxt('bsaVector.csv', bsaNumpyVector, delimiter=',')

	# maxEdges = np.max(assembledImage)
	# normEdges = abs(assembledImage/(maxEdges * 1.00)) # normalization
	# binarizationTreshold = 0.5
	# binaryImage = 1*(normEdges>binarizationTreshold)
	# binaryImage = np.array(binaryImage, dtype=np.uint8)
	# plt.imshow(assembledImage, cmap = cm.Greys_r)
	plt.imshow(assembledImage)
	plt.show()
	return np.array(assembledImage, dtype=np.uint8)
