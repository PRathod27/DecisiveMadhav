import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

# Initialize the client once
client = InferenceClient(
    provider="hf-inference", 
    api_key=HF_TOKEN
)

CLASSIFICATION_MODEL = "facebook/bart-large-mnli"

HF_TOKEN = os.getenv("HF_TOKEN")
HF_API_URL = os.getenv("HF_API_URL")
