from fastapi import FastAPI

from core.config import settings
from init_db import init_db

from routes.user_route import router as user_router
from routes.promise_route import router as promise_router
from routes.auth import router as auth_router
from routes.protected import router as protected_router

from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title=settings.PROJECT_NAME)

origins = [
    "http://localhost:80",
    "http://localhost",
    "http://178.72.139.68",
    "http://localhost:3000",
    "http://backend:3000",
    "http://localhost:5172",
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router )
app.include_router(promise_router )
app.include_router(auth_router)
app.include_router(protected_router)

print("Все рабоатет")

@app.on_event("startup")
async def on_startup():
    await init_db()