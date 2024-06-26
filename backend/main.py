from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dtos.ImageDTO import ImageDTO
import base64
from io import BytesIO
from PIL import Image
import numpy as np
import cv2
from services.ImageService import ImageService

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/")
async def root(image_data: ImageDTO):
    print(image_data.filters)
    try:
        image_bytes = base64.b64decode(image_data.content)
        image = Image.open(BytesIO(image_bytes)).convert('RGB')

        open_cv_image = np.array(image)

        if len(open_cv_image.shape) == 3 and open_cv_image.shape[2] == 4:
            open_cv_image = open_cv_image[:, :, :3]

        if image_data.filters:
            if image_data.filters.cinza:
                open_cv_image = ImageService.convert_to_gray(open_cv_image)
            if image_data.filters.limiarizacao:
                open_cv_image = ImageService.limiar(open_cv_image)
            if image_data.filters.canny:
                open_cv_image = ImageService.canny(open_cv_image)
            if image_data.filters.sobel:
                open_cv_image = ImageService.sobel(open_cv_image)
            if image_data.filters.prewitt:
                open_cv_image = ImageService.prewitt(open_cv_image)
            if image_data.filters.laplacian:
                open_cv_image = ImageService.laplacian(open_cv_image)
            if image_data.filters.inversao:
                open_cv_image = ImageService.invert_colors(open_cv_image)
            if image_data.filters.mediana:
                open_cv_image = ImageService.median_blur(open_cv_image)
            if image_data.filters.gaussiano:
                open_cv_image = ImageService.gaussian_blur(open_cv_image)
            if image_data.filters.bilateral:
                open_cv_image = ImageService.bilateral_filter(open_cv_image)
            if image_data.filters.sepia:
                open_cv_image = ImageService.sepia_filter(open_cv_image)
            if image_data.filters.suavizacao:
                open_cv_image = ImageService.blur(image)
            if image_data.filters.redimensionamento:
                width, height = image_data.filters.redimensionamento
                open_cv_image = ImageService.resize(image, width[1], height[1])
            if image_data.filters.erosao:
                open_cv_image = ImageService.erode(open_cv_image)
            if image_data.filters.dilatacao:
                open_cv_image = ImageService.dilate(open_cv_image)
        processed_image = Image.fromarray(open_cv_image)

        buffered = BytesIO()
        processed_image.save(buffered, format="PNG")
        buffered.seek(0)
        img_str = base64.b64encode(buffered.getvalue()).decode()

        return JSONResponse(content={"filename": image_data.filename, "content": img_str, "status": "success"})
    except Exception as e:
        return JSONResponse(content={"error": str(e), "status": "failure"}, status_code=500)
