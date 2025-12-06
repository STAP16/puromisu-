
from jose import jwt
from core.config import settings
from datetime import datetime, timedelta

def create_jwt(payload: dict, token_type: str, 
               expire_timedelta: timedelta) -> str:

    iat = datetime.now()
    expires = iat + expire_timedelta

    jwt_payload = {
        settings.TOKEN_TYPE_FIELD: token_type,
    }

    jwt_payload.update(payload)
    jwt_payload.update({
        "exp": int(expires.timestamp()), 
        "iat": int(iat.timestamp())
    })

    return jwt.encode(jwt_payload, key=settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def create_access_token(payload: dict) -> str:
    return create_jwt(
        payload=payload, 
        token_type=settings.ACCESS_TOKEN_TYPE,
        expire_timedelta=timedelta(minutes=settings.ACCESS_EXPIRES_MINUTES)
    )

def create_refresh_token(payload: dict) -> str:
    return create_jwt(
        payload=payload, 
        token_type=settings.REFRESH_TOKEN_TYPE,
        expire_timedelta=timedelta(days=settings.REFRESH_EXPIRES_DAYS)
    )
