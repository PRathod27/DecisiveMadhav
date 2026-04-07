from fastapi import APIRouter, HTTPException, status
from agents.classification_agent.inference import classify_complaint
from agents.decision_agent.inference import decide_action

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "Complaint AI System API is running"}

@router.post("/process", status_code=status.HTTP_200_OK)
def process(data: dict):
    complaint = data.get("complaint")

    if not complaint or not isinstance(complaint, str):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid input: 'complaint' field is required and must be a string."
        )

    try:
      
        classification = classify_complaint(complaint)
        
        if not classification:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Classification agent failed to produce a result."
            )

        decision = decide_action(classification)

        return {
            "input": complaint,
            "classification": classification,
            "decision": decision
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during processing: {str(e)}"
        )