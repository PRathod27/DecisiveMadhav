from transformers import pipeline
import os
# Load your trained model
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "model")

classifier = pipeline(
    "text-classification",
    model=MODEL_PATH
)
# label mapping (MUST match training)
id2label = {
    0: "Sanitation",
    1: "Infrastructure",
    2: "Water",
    3: "Electricity",
    4: "Traffic",
    5: "Environment",
    6: "Health"
}


def classify_complaint(complaint: str):

    result = classifier(complaint)[0]

    label_index = int(result["label"].split("_")[-1])
    category = id2label[label_index]

    return {
        "analysis": f"{category} related issue",
        "category": category,
        "confidence": round(result["score"], 2),
        "raw_text": complaint
    }
