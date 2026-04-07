from fastapi import APIRouter
from app.services.complaints_service import read_raw_complaints

router = APIRouter(prefix="/dashboard")

@router.get("/")
def dashboard():
    data = read_raw_complaints()
    print(data)
    return {
        "total": len(data),
        "high_priority": len([c for c in data if c.get("priority") == "High"]),
        "cities": list({c.get("city") for c in data if c.get("city")}),
        "complaint_types": list(set([c.get("complaint") for c in data]))
    }
