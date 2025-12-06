from fastapi import APIRouter, Depends
from schemas.user_schema import UserSchema, UserCreate
from services.user_service import UserService, get_user_service


router = APIRouter(prefix="/user", tags=["users 🚹"])


@router.get("/users/", response_model=list[UserSchema])
async def read_users(service: UserService = Depends(get_user_service)):
    users = await service.get_all_users()
    return users

@router.post("/users/create", response_model=UserSchema)
async def create_user(user: UserCreate, service: UserService = Depends(get_user_service)):
    new_user = await service.create_user(user)
    return UserSchema(
        id=new_user.id,
        username=new_user.username
    )

@router.get("/users/{user_id}", response_model=UserSchema)
async def read_user(user_id: int, service: UserService = Depends(get_user_service)):
    user = await service.get_user_by_id(user_id)
    return UserSchema(
        id=user.id,
        username=user.username
    )