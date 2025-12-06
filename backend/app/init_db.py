from core.db import Base
from core.db import engine

from models.user import User

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print("Подключение установлено! Таблицы инициализированы!")
