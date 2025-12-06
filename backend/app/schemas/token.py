from pydantic import BaseModel

class TokenInfo(BaseModel):
    access_token: str
    refresh_token: str #Добавляем refresh токен
    token_type: str = "bearer"

class AccessToken(BaseModel):
    type: str
    id: int
    sub: str
    exp: int
    iat: int