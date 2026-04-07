from .knowledge_base import DEPARTMENT_MAP


def decide_action(classification_output: dict):

    category = classification_output["category"]
    confidence = classification_output["confidence"]
    text = classification_output["raw_text"].lower()

    # 🔹 Step 3: Department (RAG)
    department = DEPARTMENT_MAP.get(category, "General Department")

    # 🔹 Step 4: Priority
    if any(word in text for word in ["urgent", "accident", "danger", "leakage", "not working"]) or confidence >= 0.5:
        priority = "High"
    elif confidence < 0.5 and confidence >= 0.3:
        priority = "Medium"
    else:
        priority = "Low"

    # 🔹 Step 5: Escalation (🔥 important)
    if priority == "High" or confidence > 0.5:
        escalation = "Yes"
    else:
        escalation = "No"

    return {
        "department": department,
        "priority": priority,
        "escalation": escalation
    }