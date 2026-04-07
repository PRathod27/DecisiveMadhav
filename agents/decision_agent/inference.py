from agents.decision_agent.knowledge_base import DEPARTMENT_MAP

def decide_action(classification_output: dict):

    category = classification_output["category"]
    confidence = classification_output["confidence"]
    text = classification_output["raw_text"].lower()

    # 🔹 1. Department (RAG)
    department = DEPARTMENT_MAP.get(category, "General Department")

    # 🔹 2. Priority logic (FIXED)
    if any(word in text for word in ["urgent", "accident", "danger", "leak", "fire"]):
        priority = "High"
    elif confidence >= 0.7:
        priority = "High"
    elif 0.4 <= confidence < 0.7:
        priority = "Medium"
    else:
        priority = "Low"

    # 🔹 3. Escalation logic (CLEAN)
    escalation = "Yes" if priority in ["High", "Medium"] else "No"

    return {
        "department": department,
        "priority": priority,
        "escalation": escalation
    }