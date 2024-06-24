from fastapi import FastAPI
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from dtos.ImageDTO import ImageDTO
import base64
from io import BytesIO
from PIL import Image
import numpy as np
import cv2

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
    try:
        image_bytes = base64.b64decode(image_data.content)
        image = Image.open(BytesIO(image_bytes))

        open_cv_image = np.array(image)
        if open_cv_image.shape[2] == 4:
            open_cv_image = open_cv_image[:, :, :3]
        if image_data.filters:
            if image_data.filters.cinza:
                open_cv_image = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
            if image_data.filters.limiarizacao:
                if len(open_cv_image.shape) == 3:
                    open_cv_image = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
                _, open_cv_image = cv2.threshold(open_cv_image, 127, 255, cv2.THRESH_BINARY)
            if image_data.filters.canny:
                gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY) if len(
                    open_cv_image.shape) == 3 else open_cv_image
                edges = cv2.Canny(gray, 100, 200)
                open_cv_image = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
            if image_data.filters.inversao:
                open_cv_image = cv2.bitwise_not(open_cv_image)
            if image_data.filters.mediana:
                open_cv_image = cv2.medianBlur(open_cv_image, 5)
            if image_data.filters.gaussiano:
                open_cv_image = cv2.GaussianBlur(open_cv_image, (5, 5), 0)
            if image_data.filters.bilateral:
                open_cv_image = cv2.bilateralFilter(open_cv_image, 9, 75, 75)
            if image_data.filters.sepia:
                kernel = np.array([[0.272, 0.534, 0.131],
                                   [0.349, 0.686, 0.168],
                                   [0.393, 0.769, 0.189]])
                open_cv_image = cv2.transform(open_cv_image, kernel)
            if image_data.filters.suavizacao:
                open_cv_image = cv2.blur(open_cv_image, (5, 5))
            if image_data.filters.redimensionamento:
                width, height = image_data.filters.redimensionamento
                if width[1] > 5000:
                    width[1] = 5000
                if height[1] > 5000:
                    height[1] = 5000
                open_cv_image = cv2.resize(open_cv_image, (int(width[1]), int(height[1])))
        processed_image = Image.fromarray(open_cv_image)

        buffered = BytesIO()
        processed_image.save(buffered, format="PNG")
        buffered.seek(0)
        img_str = base64.b64encode(buffered.getvalue()).decode()

        return JSONResponse(content={"filename": image_data.filename, "content": img_str, "status": "success"})
    except Exception as e:
        return JSONResponse(content={"error": str(e), "status": "failure"}, status_code=500)
