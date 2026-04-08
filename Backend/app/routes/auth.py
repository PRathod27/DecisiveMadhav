from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/auth")

fake_users = [
    {"email": "user1@example.com", "password": "password1"},
    {"email": "user2@example.com", "password": "password2"},
    {"email": "admin@example.com", "password": "admin123"}
]


class User(BaseModel):
    email: str
    password: str


@router.post("/signup")
<<<<<<< HEAD
def signup(user: dict):
    # Basic validation
    if not user.get("email") or not user.get("password"):
        raise HTTPException(status_code=400, detail="Email and password are required")
    
    # Check if user already exists
=======
def signup(user: User):
    # check if user already exists
>>>>>>> 48411ed0b17abd5860e3a63f2975f8a6d52afa44
    for u in fake_users:
        if u["email"] == user.email:
            raise HTTPException(status_code=400, detail="User already exists")

<<<<<<< HEAD
    fake_users.append(user)
    return {"message": "User created successfully"}


@router.post("/login")
def login(user: dict):
    if not user.get("email") or not user.get("password"):
        raise HTTPException(status_code=400, detail="Email and password are required")
    
    for u in fake_users:
        if u["email"] == user["email"] and u["password"] == user["password"]:
            return {"message": "Login successful"}
=======
    fake_users.append(user.dict())
    return {"message": "User created"}


@router.post("/login")
def login(user: User):
    for u in fake_users:
        if u["email"] == user.email and u["password"] == user.password:
            return {"message": "Login success"}
>>>>>>> 48411ed0b17abd5860e3a63f2975f8a6d52afa44

    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.get("/user/{email}")
def get_user(email: str):
    for u in fake_users:
        if u["email"] == email:
            # Return user info without password
            return {"email": u["email"]}
    
    raise HTTPException(status_code=404, detail="User not found")