from os import walk
import os
import sys
import string
import cv2
import numpy as np

from scipy.ndimage import measurements, morphology
from PIL import Image
from pylab import *

from sklearn.svm import LinearSVC, SVC, SVR
from sklearn.externals import joblib
from skimage.feature import hog, canny, corner_harris
from sklearn.svm import LinearSVC


class mLearnAlg(object):
	def __init__(self, dirPlates="./parameters/digitTrainedPlates.pkl"):
		super(mLearnAlg, self).__init__()
                self.clf = joblib.load(dirPlates)

	def identifyPlate(self, roiTestImageResized):
                roiTestImageResized = roiTestImageResized.astype('uint8')
                ImageResized = cv2.resize(roiTestImageResized, (70, 30), interpolation=cv2.INTER_CUBIC)
                cannyFeature = cv2.Canny(ImageResized, 100, 200)
                cannyStacked = np.hstack(cannyFeature)
		# cannyFeature = canny(ImageResized, sigma=3.0, low_threshold=None, high_threshold=None, mask=None, use_quantiles=False)
		cannyFeatureReshaped = cannyFeature.reshape(cannyFeature.shape[0]*cannyFeature.shape[1])
                harrisCornerFeature = corner_harris(ImageResized, method='k', k=0.05, eps=1e-06, sigma=1)
                harrisCornerFeature = harrisCornerFeature.reshape(harrisCornerFeature.shape[0]*harrisCornerFeature.shape[1])
                nbr = self.clf.predict(cannyStacked)
		return nbr[0], self.clf.decision_function(cannyStacked)[0]
