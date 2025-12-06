from fastapi import APIRouter, Depends, Response
from schemas.token import TokenInfo
from schemas.user_schema import AuthUserSchema

from security.auth import create_access_token, create_refresh_token

from services.user_auth_service import get_user_auth_service, UserAuthService

from core.config import settings

router = APIRouter(prefix="/auth", tags=["auth 🔑"])

#Когда аунтитефицирован, выдать пару токенов.
@router.post("/login", response_model=TokenInfo)
async def login(
    response: Response,
    data: AuthUserSchema, 
    service: UserAuthService = Depends(get_user_auth_service)
):
    user = await service.login(data)

    user_payload = {
        settings.PAYLOAD_ID: user.id,
        settings.PAYLOAD_SUB: user.username,
    }

    access_token = create_access_token(payload=user_payload)
    refresh_token = create_refresh_token(payload=user_payload)

    #TODO: Пофиксить после тестов на фронте
    response.set_cookie(settings.ACCESS_COOKIE,access_token,httponly=True)
    response.set_cookie(settings.REFRESH_COOKIE,refresh_token,httponly=True)

    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
    )
    

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(settings.ACCESS_COOKIE)
    response.delete_cookie(settings.REFRESH_COOKIE)
    return {"details": "Successfully logged out"}