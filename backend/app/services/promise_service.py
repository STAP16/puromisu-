from schemas.promise_schema import PromiseCreate
from repositories.promise_repo import PromiseRepo
from repositories.user_repo import UserRepo

from fastapi import Depends, HTTPException
from core.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession

class PromiseService:
    def __init__(self, promise_repo: PromiseRepo, user_repo: UserRepo):
        self.promise_repo = promise_repo
        self.user_repo = user_repo

    async def create_promise(self, promise_data: PromiseCreate):
        user_id = promise_data.user_id
        exiting_user = await self.user_repo.get_user_by_id(user_id)

        if not exiting_user:
            raise HTTPException(status_code=403, detail="User not found")

        new_promise = await self.promise_repo.create_promise(promise_data)
        return new_promise
    
    async def get_promise_by_id(self, promise_id: int):
        exiting_promise = await self.promise_repo.get_promise_by_id(promise_id)
        if not exiting_promise:
            raise HTTPException(status_code=403, detail="Promise not found")
        
        return exiting_promise
    
    async def get_all_user_promises(self, user_id):
        exiting_user = await self.user_repo.get_user_by_id(user_id)
        if not exiting_user:
            raise HTTPException(status_code=403, detail="User not found")
        
        return await self.promise_repo.get_all_user_promises(user_id)
    
def get_promise_service(session: AsyncSession = Depends(get_db)) -> PromiseService:
    promise_repo = PromiseRepo(session)
    user_repo = UserRepo(session)
    return PromiseService(promise_repo, user_repo)