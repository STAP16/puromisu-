#TODO Защищеный роут, ручки, для доступа берем токен из куки
from jose import jwt, ExpiredSignatureError
from core.config import settings #Тут настройки

from fastapi.security.api_key import APIKeyCookie
from fastapi import Security, Response


from fastapi import APIRouter, Depends, HTTPException

from schemas.token import AccessToken, TokenInfo
from schemas.user_schema import UserSchema

from schemas.promise_schema import PromiseRead

from security.auth import create_access_token, create_refresh_token

from services.user_auth_service import (get_user_auth_service, 
    UserAuthService #Тут сервисы / как раз таки тут и получаем данные юзера
) 
from services.user_service import UserService, get_user_service

from services.promise_service import (get_promise_service, 
PromiseService #Тут будем получать обещание пользователя
)

router = APIRouter(prefix="/protected", tags=["protected 🔐"])
acces_token_key_cookie = APIKeyCookie(name=settings.ACCESS_COOKIE)
refresh_token_key_cookie = APIKeyCookie(name=settings.REFRESH_COOKIE)

#Тут так же реализуется в protected мы реализуем:
#Рефреш токена, т.к чтобы сделать рефреш нужно его иметь в куках
#Если рефреш токен инвалид, то тогда мы выкидываем 401 и просим зарегатся
#Ручка на доступ к защищеному контенту по access_token
#Если access_token invalid / expire мы кидаем 401 и просим обновить токен
#Доступ к main page | promise page 
#Cookie(alias=Ключ куки которую хотим получить)

async def get_access_token(token: str = Security(acces_token_key_cookie)) -> UserSchema:
    if not token:
        raise HTTPException(status_code=401, detail="Please login")
    
    try:
        paylod = jwt.decode(token=token, key=settings.SECRET_KEY, algorithms=settings.ALGORITHM)

        return paylod
    
    except ExpiredSignatureError:
        raise HTTPException(status_code=403, detail="Expire access tkn")

@router.get("/content")
async def protected_content(payload: dict = Depends(get_access_token)) -> UserSchema:

    if not payload:
        raise HTTPException(status_code=401, detail="Please login")
    
    return UserSchema(
        id=payload.get("id"),
        username=payload.get("sub"),
    )

async def get_refresh_token(token: str = Security(refresh_token_key_cookie)) -> UserSchema:

    if not token:
        raise HTTPException(status_code=401, detail="Please login")
    
    try:
        paylod = jwt.decode(token=token, key=settings.SECRET_KEY, algorithms=settings.ALGORITHM)

        return paylod
    
    except ExpiredSignatureError:
        raise HTTPException(status_code=403, 
                            detail="Expire refresh tkn, please login again")
    
async def get_user(
    user: UserSchema = Depends(get_refresh_token), 
    service: UserService = Depends(get_user_service)
) -> UserSchema:
    
    user_data = await service.get_user_by_id(user["id"])
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

    
@router.get("/refresh", response_model=TokenInfo)
async def protected_refresh(response: Response, payload: UserSchema = Depends(get_user)):

    if not payload:
        raise HTTPException(status_code=401, detail="Please login")
    
    user_payload = {
        "id": payload["id"],
        "sub": payload["sub"],
    }

    access_token = create_access_token(payload=user_payload)
    refresh_token = create_refresh_token(payload=user_payload)

    response.set_cookie(settings.ACCESS_COOKIE,access_token,httponly=True)
    response.set_cookie(settings.REFRESH_COOKIE,refresh_token,httponly=True)

    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.get("/promises/all")
async def get_all_user_promises(
    user: UserSchema = Depends(get_access_token),
    service: PromiseService = Depends(get_promise_service),
) -> list[PromiseRead]:
    user_id = user.get("id")
    user_promises = await service.get_all_user_promises(user_id)
    return user_promises