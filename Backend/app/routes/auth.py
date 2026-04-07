from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/auth")

fake_users = []


class User(BaseModel):
    email: str
    password: str


@router.post("/signup")
def signup(user: User):
    # check if user already exists
    for u in fake_users:
        if u["email"] == user.email:
            raise HTTPException(status_code=400, detail="User already exists")

    fake_users.append(user.dict())
    return {"message": "User created"}


@router.post("/login")
def login(user: User):
    for u in fake_users:
        if u["email"] == user.email and u["password"] == user.password:
            return {"message": "Login success"}

    raise HTTPException(status_code=401, detail="Invalid credentials")