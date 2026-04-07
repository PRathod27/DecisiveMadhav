from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/auth")

fake_users = []


@router.post("/signup")
def signup(user: dict):
    # check if user already exists
    for u in fake_users:
        if u["email"] == user["email"]:
            raise HTTPException(status_code=400, detail="User already exists")

    fake_users.append(user)
    return {"message": "User created"}


@router.post("/login")
def login(user: dict):
    for u in fake_users:
        if u["email"] == user["email"] and u["password"] == user["password"]:
            return {"message": "Login success"}

    raise HTTPException(status_code=401, detail="Invalid credentials")