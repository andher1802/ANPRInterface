# Import the modules
import cv2
import numpy as np

from sklearn.externals import joblib
from sklearn import datasets
from skimage.feature import hog, canny, corner_harris
from sklearn.svm import LinearSVC, SVC, SVR
from PIL import Image
from collections import Counter
from matplotlib.mlab import PCA

from os import walk

dirpath = '../../Images/TrainningSet/'
filePDDI = []

for dirpath, dirname, filename in walk(dirpath):
	filePDDI.extend(filename)

listLabels = []
features = []
list_hog_fd = []

for element in filePDDI[:]:
	filename = dirpath+element
	# image = np.array(Image.open(filename).convert('L'), 'int16')
	image = np.array(Image.open(filename).convert('L'))
	mResized = cv2.resize(image, (image.shape[1], image.shape[0]), interpolation=cv2.INTER_CUBIC)

	# if mResized.shape[0]==11*3 and mResized.shape[1]==8*3:
	if mResized.shape[0]==30 and mResized.shape[1]==70:
		label = element.split('_')
		# labelNoExt = label[1].split('.')
		# listLabels.append(labelNoExt[0])
                print label
                tempResult = 0
                if label[0]=='Y':
                        tempResult=1
                listLabels.append(tempResult)
		#Extract Canny Feature
                cannyFeature = cv2.Canny(mResized, 100, 200)
                cannyStacked = np.hstack(cannyFeature)
		# cannyFeature = canny(mResized, sigma=3.0, low_threshold=None, high_threshold=None, mask=None, use_quantiles=False)
		cannyFeatureReshaped = cannyFeature.reshape(cannyFeature.shape[0]*cannyFeature.shape[1])
		# Extract the hog features
		imRestored = Image.fromarray(mResized)
		hogFeature = hog(imRestored, orientations=9, pixels_per_cell=(8*3, 11*3), cells_per_block=(1, 1), visualise=False)
		#Harris
		harrisCornerFeature = corner_harris(mResized, method='k', k=0.05, eps=1e-06, sigma=1)
		harrisCornerFeature = harrisCornerFeature.reshape(harrisCornerFeature.shape[0]*harrisCornerFeature.shape[1])
		feature = cannyStacked
		list_hog_fd.append(feature)
	else: 
		print filename

# print list_hog_fd
# hog_features = np.asarray(list_hog_fd, dtype='float64')
hog_features = list_hog_fd
labels = np.array(listLabels, 'int')

print "Count of digits in dataset", Counter(labels)

# Create an linear SVM object
# clf = LinearSVC()
clf = LinearSVC()

# Perform the training
clf.fit(hog_features, labels)

# Save the classifier
joblib.dump(clf, "../parameters/digitTrainedPlates.pkl", compress=1)
