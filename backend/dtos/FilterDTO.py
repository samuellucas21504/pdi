from typing import Optional
from dtos.SizeDTO import SizeDTO
from pydantic import BaseModel


class FilterDTO(BaseModel):
    limiarizacao: Optional[bool] = None
    inversao: Optional[bool] = None
    cinza: Optional[bool] = None
    redimensionamento: Optional[SizeDTO] = None
    canny: Optional[bool] = None
    gaussiano: Optional[bool] = None
    mediana: Optional[bool] = None
    bilateral: Optional[bool] = None
    ruidos: Optional[bool] = None
    sepia: Optional[bool] = None
    suavizacao: Optional[bool] = None
