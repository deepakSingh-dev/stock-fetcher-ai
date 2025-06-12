import os
import requests
from dotenv import load_dotenv

load_dotenv()
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

def search_tickers(query: str):
    url = f"https://finnhub.io/api/v1/search?q={query}&token={FINNHUB_API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return [
            {
                "symbol": item["symbol"],
                "description": item["description"]
            }
            for item in data.get("result", []) if item["symbol"].isalpha()
        ]
    except Exception as e:
        print(f"Error fetching autocomplete: {e}")
        return []