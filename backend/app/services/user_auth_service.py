from repositories.auth import Auth
from schemas.user_schema import AuthUserSchema, UserSchema

from security.hash_password import verify_password

from fastapi import Depends, HTTPException
from core.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession

class UserAuthService:
    def __init__(self, auth_repo: Auth):
        self.auth_repo = auth_repo


    async def login(self, data: AuthUserSchema) -> UserSchema:
        #Получаем Пользователя
        user = await self.auth_repo.get_user(data.username)
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        #Забираешь хеш пароля из БД
        user_pswrd_frm_db = user.hashed_password
        data_password = data.password 
        
        #Проверка пароля.
        if not verify_password(data_password, user_pswrd_frm_db):
            raise HTTPException(status_code=401, detail="Invalid password")
        
        return UserSchema(
            id=user.id,
            username=user.username
        )

def get_user_auth_service(session: AsyncSession = Depends(get_db)) -> UserAuthService:
    auth_repo = Auth(session)
    return UserAuthService(auth_repo)