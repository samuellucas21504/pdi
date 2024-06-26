import cv2
import numpy as np


class ImageService:
    @staticmethod
    def gaussian_blur(image):
        return cv2.GaussianBlur(image, (5, 5), 0)

    @staticmethod
    def median_blur(image):
        return cv2.medianBlur(image, 5)

    @staticmethod
    def bilateral_filter(image):
        return cv2.bilateralFilter(image, 9, 75, 75)

    @staticmethod
    def sepia_filter(image):
        kernel = np.array([[0.272, 0.534, 0.131],
                           [0.349, 0.686, 0.168],
                           [0.393, 0.769, 0.189]])
        return cv2.transform(image, kernel)

    @staticmethod
    def blur(image):
        return cv2.blur(image, (3, 3))

    @staticmethod
    def resize(image, width, height):
        if width > 5000:
            width = 5000
        if height > 5000:
            height = 5000
        return cv2.resize(image, (int(width), int(height)))

    @staticmethod
    def invert_colors(image):
        return cv2.bitwise_not(image)

    @staticmethod
    def laplacian(image):
        image = ImageService.gaussian_blur(image)
        gray = ImageService.convert_to_gray(image)
        laplacian = cv2.Laplacian(gray, -1, ksize=3, scale=5, delta=1, borderType=cv2.BORDER_DEFAULT)
        return cv2.cvtColor(np.uint8(laplacian), cv2.COLOR_GRAY2BGR)

    @staticmethod
    def canny(image):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) if len(
            image.shape) == 3 else image
        edges = cv2.Canny(gray, 100, 200)
        return cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)

    @staticmethod
    def sobel(image):
        gray = ImageService.convert_to_gray(image)

        sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0)
        sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1)

        sobel_x = np.uint8(np.absolute(sobel_x))
        sobel_y = np.uint8(np.absolute(sobel_y))

        sobel = cv2.bitwise_or(sobel_x, sobel_y)
        return cv2.cvtColor(np.uint8(sobel), cv2.COLOR_GRAY2BGR)

    @staticmethod
    def prewitt(image):
        gray = ImageService.convert_to_gray(image)
        img_gaussian = ImageService.gaussian_blur(gray)

        kernel_x = np.array([[1, 1, 1], [0, 0, 0], [-1, -1, -1]])
        kernel_y = np.array([[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]])

        img_prewitt_x = cv2.filter2D(img_gaussian, -1, kernel_x)
        img_prewitt_y = cv2.filter2D(img_gaussian, -1, kernel_y)

        prewitt = img_prewitt_x + img_prewitt_y

        return cv2.cvtColor(np.uint8(prewitt), cv2.COLOR_GRAY2BGR)

    @staticmethod
    def convert_to_gray(image):
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    @staticmethod
    def limiar(image):
        if len(image.shape) == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, image = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)
        return image

    @staticmethod
    def erode(image):
        kernel = np.ones((3, 3))
        return cv2.erode(image, kernel, iterations=1)

    @staticmethod
    def dilate(image):
        kernel = np.ones((3, 3))
        return cv2.dilate(image, kernel, iterations=1)

