from pydantic import BaseModel

class ComplainCreate(BaseModel):
    complaint: str
    category: str
    department: str
    priority: str
    city: str
    escalation_required: bool