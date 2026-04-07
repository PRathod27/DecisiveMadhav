# from Agents.classification_agent.inference import classify_complaint

# print(classify_complaint("Garbage not collected for 5 days"))
# print(classify_complaint("Water leakage in road"))
# print(classify_complaint("Street light not working"))
# print(classify_complaint("Huge pothole causing accidents"))
# print(classify_complaint("Garbage everywhere and bad smell"))

from Agents.classification_agent.inference import classify_complaint
from Agents.decision_agent.inference import decide_action

data = classify_complaint("Garbage spreading everywhere and very bad smell")
result2 = decide_action(data)

print(data)
print(result2)