from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    #Настройка Базы данных
    DATABASE_NAME: str
    DATABASE_USRNAME: str
    DATABASE_PASSWORD: str
    DATABASE_HOST: str
    DATABASE_PORT: str

    @property
    def DATABASE_URL(self):
        return f"postgresql+asyncpg://{self.DATABASE_USRNAME}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"

    #JWT
    SECRET_KEY: str
    PAPPER: str = "I&O2K0t"
    ALGORITHM: str = "HS256"
    TOKEN_TYPE_FIELD: str = "type"

    ACCESS_TOKEN_TYPE: str = "access"
    REFRESH_TOKEN_TYPE:str = "refresh"
    
    ACCESS_EXPIRES_MINUTES: int = 15
    REFRESH_EXPIRES_DAYS: int = 7

    PAYLOAD_ID: str = "id"
    PAYLOAD_SUB: str = "sub"

    ACCESS_COOKIE: str = "acc_tkn"
    REFRESH_COOKIE: str = "rfr_tkn"

    PROJECT_NAME: str = "🌠 Puromisu "
    DEBUG: bool = True

    #Другие сервисы

    class Config:
        #Подгружаем переменные из env файла
        env_file = "app/.env"
        env_file_encoding = "utf-8"

settings = Settings()