import os
import sys

# Path setup taaki folders mil sakein
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

from agents.classification_agent.inference import classify_complaint
from agents.decision_agent.inference import decide_action

# --- TEST 1: Urgent Case ---
input_text = "Urgent: Water pipe burst and flooding the road!"
print(f"\n1. INPUT: {input_text}")

# Agent 1 run karo
out1 = classify_complaint(input_text)
print(f"2. AGENT 1 (Category): {out1['category']} | Confidence: {out1['confidence']}")

# Agent 2 run karo (RL logic/Dept mapping)
out2 = decide_action(out1)
print(f"3. AGENT 2 (Decision): {out2}")


# --- TEST 2: Normal Case ---
input_text_2 = "Street light is not working since 2 days."
print(f"\n1. INPUT: {input_text_2}")

out1_2 = classify_complaint(input_text_2)
print(f"2. AGENT 1 (Category): {out1_2['category']} | Confidence: {out1_2['confidence']}")

out2_2 = decide_action(out1_2)
print(f"3. AGENT 2 (Decision): {out2_2}")