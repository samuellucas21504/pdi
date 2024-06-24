from pydantic import BaseModel
from typing import Optional


class SizeDTO(BaseModel):
    width: Optional[int] = None
    height: Optional[int] = None
