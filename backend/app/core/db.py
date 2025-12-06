from sqlalchemy.ext.asyncio import (
    create_async_engine, 
    AsyncSession, 
    async_sessionmaker
)
from sqlalchemy.orm import DeclarativeBase
from typing import AsyncGenerator
from .config import settings

DATABASE_NAME = settings.DATABASE_NAME
DATABASE_USRNAME = settings.DATABASE_USRNAME
DATABASE_PORT = settings.DATABASE_PORT
DATABASE_HOST = settings.DATABASE_HOST
DATABASE_PASSWORD = settings.DATABASE_PASSWORD

engine = create_async_engine(url=settings.DATABASE_URL)

async_session_maker = async_sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False)


class Base(DeclarativeBase):
    pass


#Правильная антоция AsyncSession
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    '''Получение асинхронной сессии для работы с БД'''
    '''Depend для FastAPI'''
    async with async_session_maker() as session:
        yield session