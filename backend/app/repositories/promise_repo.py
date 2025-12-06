from models.user import Promise
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from schemas.promise_schema import PromiseCreate
from datetime import datetime


class PromiseRepo:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_promise(self, promise_data: PromiseCreate) -> Promise | None:

        new_promise = Promise(
            user_id=promise_data.user_id,
            description = promise_data.description,
            created_at = datetime.utcnow()
        )

        self.session.add(new_promise)
        await self.session.commit()
        await self.session.refresh(new_promise)
        return new_promise

    async def get_promise_by_id(self, promise_id: int) -> Promise | None:
        stmt = select(Promise).where(Promise.id == promise_id)
        result = await self.session.execute(statement=stmt)
        return  result.scalar_one_or_none()
    
    async def get_all_user_promises(self, user_id: int) -> list[Promise]:
        stmt = select(Promise).where(Promise.user_id == user_id)
        result = await self.session.execute(statement=stmt)
        return result.scalars().all()