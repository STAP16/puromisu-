from schemas.user_schema import UserCreate
from repositories.user_repo import UserRepo

from fastapi import Depends, HTTPException
from core.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession

class UserService:
    def __init__(self, user_repo: UserRepo):
        self.user_repo = user_repo
    
    async def create_user(self, user_data: UserCreate):
        #Проверяем, существует ли пользователь
        exiting_user = await self.user_repo.get_user_username(user_data.username)
        if exiting_user:
            raise HTTPException(status_code=403,detail="User already exists")
        
        new_user = await self.user_repo.create_user(user_data)
        return new_user

    async def get_user_by_id(self, user_id: int):
        exiting_user = await self.user_repo.get_user_by_id(user_id)
        if not exiting_user:
            raise HTTPException(status_code=403,detail="User not found")
        
        return exiting_user
    
    async def get_all_users(self):
        return await self.user_repo.get_all_users()
    
    
def get_user_service(session: AsyncSession = Depends(get_db)) -> UserService:
    user_repo = UserRepo(session)
    return UserService(user_repo)
    