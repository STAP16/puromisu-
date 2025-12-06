from models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from schemas.user_schema import UserSchema, UserCreate

from security.hash_password import _hash_password

class UserRepo:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def get_all_users(self) -> list[User]:
        stmt = select(User)
        result = await self.session.execute(statement=stmt)
        return result.scalars().all()

    async def get_user_by_id(self, user_id: int) -> User | None:
        stmt = select(User).where(User.id == user_id)
        result = await self.session.execute(statement=stmt)
        return result.scalar_one_or_none()
    
    async def create_user(self, user_data: UserCreate) -> User | None:

        password = _hash_password(user_data.hashed_password)
        new_user = User(
            username=user_data.username,
            hashed_password = password,
        )
        self.session.add(new_user)
        await self.session.commit()
        await self.session.refresh(new_user)
        return new_user
    
    async def delete_user(self, user_data: UserSchema) -> bool:
        stmt = delete(User).where(User.id == user_data.id)
        await self.session.execute(stmt)
        await self.session.commit()
        return True
    
    async def get_user_username(self, username: str) -> User | None:
        stmt = select(User).where(User.username == username)
        result = await self.session.execute(statement=stmt)
        return result.scalar_one_or_none()