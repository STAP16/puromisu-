from models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

class Auth:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def get_user(self, username: str):
        stmt = select(User).where(User.username == username)
        result = await self.session.execute(statement=stmt)
        user = result.scalar_one_or_none()
        return user