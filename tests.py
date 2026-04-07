from agents.classification_agent.inference import classify_complaint
from agents.decision_agent.inference import decide_action

data = classify_complaint("Flickering street lights and clogged trash in the drains.")
print(decide_action(data))