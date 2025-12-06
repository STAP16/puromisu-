from fastapi import APIRouter, Depends

from schemas.promise_schema import PromiseCreate, PromiseRead
from services.promise_service import PromiseService, get_promise_service

router = APIRouter(prefix="/promise", tags=["promises 🤞"])

@router.post("/create", response_model=PromiseRead)
async def create_promise(promise: PromiseCreate, service: PromiseService = Depends(get_promise_service)):
    new_promise = await service.create_promise(promise)

    return PromiseRead(
        id=new_promise.id,
        user_id=new_promise.user_id,
        description=new_promise.description,
        created_at=new_promise.created_at
    )

@router.get("/get_all/{user_id}", response_model = list[PromiseRead])
async def get_all_promises(user_id: int, service: PromiseService = Depends(get_promise_service)):
    user_promises = await service.get_all_user_promises(user_id=user_id)
    return user_promises
    
@router.get("/promise/{promise_id}", response_model=PromiseRead)
async def get_promise_by_id(promise_id: int, service: PromiseService = Depends(get_promise_service)):
    promise = await service.get_promise_by_id(promise_id=promise_id)

    return PromiseRead(
        id=promise.id,
        user_id=promise.user_id,
        description=promise.description,
        created_at=promise.created_at
    )