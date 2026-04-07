import json
from pathlib import Path
from typing import List, Dict

DATA_FILE = Path(__file__).parent.parent / "data" / "complaints.json"


def read_raw_complaints() -> List[Dict]:
    if not DATA_FILE.exists():
        return []

    with open(DATA_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def get_all_complaints() -> List[Dict]:
    data = read_raw_complaints()

    # generate id dynamically
    for index, item in enumerate(data, start=1):
        item["id"] = index

    return data


def add_complaint(new_data: Dict) -> Dict:
    data = read_raw_complaints()

    data.append(new_data)  # store without id

    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2)

    return new_data