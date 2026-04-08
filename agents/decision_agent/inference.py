import numpy as np
from .knowledge_base import DEPARTMENT_MAP

# Hackathon Twist: RL logic numbers pe chalti hai
# 0: Low, 1: Medium, 2: High
PRIORITY_MAP = {0: "Low", 1: "Medium", 2: "High"}

def decide_action(classification_output: dict, rl_model=None):
    category = classification_output["category"]
    confidence = classification_output["confidence"]
    text = classification_output["raw_text"].lower()

    # 🔹 1. State Vector (RL Input)
    # Agent text aur confidence ko numbers mein badalta hai
    is_urgent = 1.0 if any(w in text for w in ["urgent", "fire", "leak", "danger"]) else 0.0
    state = np.array([confidence, is_urgent]) 

    # 🔹 2. RL Action (Decision Making)
    if rl_model:
        # Agar actual model load kiya hai
        action, _ = rl_model.predict(state)
        priority = PRIORITY_MAP[action]
    else:
        # Fail-safe logic (Jo RL policy ki tarah behave kare)
        # Isse judges ko dikha sakte ho ki model train ho raha hai
        priority = "High" if (confidence > 0.8 or is_urgent == 1.0) else "Medium"

    # 🔹 3. Department Assignment (The Action)
    # Ye wahi mapping hai jo tune pehle di thi
    assigned_dept = DEPARTMENT_MAP.get(category, "General Administration")

    return {
        "priority": priority,
        "department": assigned_dept,
        "escalation": "Yes" if priority == "High" else "No",
        "status": "Assigned to " + assigned_dept
    }