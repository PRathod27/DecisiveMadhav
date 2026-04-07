from fastapi import APIRouter, HTTPException
from app.services.complaints_service import add_complaint, get_all_complaints

router = APIRouter(prefix="/complaints")


@router.get("/")
def get_all():
    return get_all_complaints()


@router.post("/")
def create(data: dict):
    return add_complaint(data)


@router.get("/{id}")
def get_one(id: int):
    data = get_all_complaints()

    for c in data:
        if c["id"] == id:
            return c

    raise HTTPException(status_code=404, detail="Not found")