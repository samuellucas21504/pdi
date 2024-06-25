import cv2
import numpy as np


class ImageManipulator:
    @staticmethod
    def GaussianBlur(image):
        return cv2.GaussianBlur(image, (5, 5), 0)

    @staticmethod
    def MedianBlur(image):
        return cv2.medianBlur(image, 5)

    @staticmethod
    def BilateralFilter(image):
        return cv2.bilateralFilter(image, 9, 75, 75)

    @staticmethod
    def SepiaFilter(image):
        kernel = np.array([[0.272, 0.534, 0.131],
                           [0.349, 0.686, 0.168],
                           [0.393, 0.769, 0.189]])
        return cv2.transform(image, kernel)

    @staticmethod
    def Blur(image):
        return cv2.blur(image, (5, 5))

    @staticmethod
    def Resize(image, width, height):
        if width > 5000:
            width = 5000
        if height > 5000:
            height = 5000
        return cv2.resize(image, (int(width), int(height)))
    