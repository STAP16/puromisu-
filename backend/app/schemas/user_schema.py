from pydantic import BaseModel

class UserSchema(BaseModel):
    id: int
    username: str

class UserCreate(BaseModel):
    username: str
    hashed_password: str

class AuthUserSchema(BaseModel):
    username: str
    password: str