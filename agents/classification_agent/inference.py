import os
from huggingface_hub import InferenceClient
from .labels import CATEGORIES

# 1. Initialize the client (It automatically finds the right router)
client = InferenceClient(
    provider="hf-inference", 
    api_key=os.getenv("HF_TOKEN")
)

def classify_complaint(complaint: str):
    # 2. Use the specialized zero_shot_classification method
    # This replaces the manual requests.post logic
    try:
        result = client.zero_shot_classification(
            complaint,
            candidate_labels=CATEGORIES,
            model="facebook/bart-large-mnli"
        )
        
        # The result is already a clean list of dictionaries
        top_result = result[0]
        
        return {
            "analysis": f"{top_result['label']} related issue",
            "category": top_result['label'],
            "confidence": round(top_result['score'], 2),
            "raw_text": complaint
        }
    except Exception as e:
        print(f"Inference failed: {e}")
        raise