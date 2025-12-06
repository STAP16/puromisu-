from pydantic import BaseModel
from datetime import datetime

class PromiseSchema(BaseModel):
    user_id: int
    description: str

class PromiseCreate(PromiseSchema):
    pass

class PromiseRead(BaseModel):
    id: int
    user_id: int
    description: str
    created_at: datetime