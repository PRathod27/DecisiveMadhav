from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/auth")

fake_users = [
    {"email": "user1@example.com", "password": "password1"},
    {"email": "user2@example.com", "password": "password2"},
    {"email": "admin@example.com", "password": "admin123"}
]


@router.post("/signup")
def signup(user: dict):
    # Basic validation
    if not user.get("email") or not user.get("password"):
        raise HTTPException(status_code=400, detail="Email and password are required")
    
    # Check if user already exists
    for u in fake_users:
        if u["email"] == user["email"]:
            raise HTTPException(status_code=400, detail="User already exists")

    fake_users.append(user)
    return {"message": "User created successfully"}


@router.post("/login")
def login(user: dict):
    if not user.get("email") or not user.get("password"):
        raise HTTPException(status_code=400, detail="Email and password are required")
    
    for u in fake_users:
        if u["email"] == user["email"] and u["password"] == user["password"]:
            return {"message": "Login successful"}

    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.get("/user/{email}")
def get_user(email: str):
    for u in fake_users:
        if u["email"] == email:
            # Return user info without password
            return {"email": u["email"]}
    
    raise HTTPException(status_code=404, detail="User not found")