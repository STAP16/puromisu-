#Функция для хеширования пароля
from core.config import settings
from passlib.context import CryptContext

pwd_context = CryptContext(

    schemes=["argon2"],
    default="argon2",
    deprecated="auto",
    argon2__memory_cost=102400, #объем памяти
    argon2__time_cost=3, #Кол-во итераций
    argon2__parallelism=4, #Параллельность
    argon2__type="ID",
 
)

def _apply_papper(password: str) -> str:
    return password + settings.PAPPER


def _hash_password(password: str) -> str:
    return pwd_context.hash(_apply_papper(password))

def verify_password(password: str, hashed_password) -> bool:
    return pwd_context.verify(_apply_papper(password), hashed_password)