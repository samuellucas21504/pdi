from pydantic import BaseModel
from typing import Optional
from dtos.FilterDTO import FilterDTO


class ImageDTO(BaseModel):
    filename: str
    content: str
    filters: Optional[FilterDTO] = None
