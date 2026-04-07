from fastapi import FastAPI
from .routes import complaints
from .routes import auth, dashboard
from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(complaints.router)
app.include_router(dashboard.router)

@app.get("/")
def home():
    return {"message": "Backend running"}