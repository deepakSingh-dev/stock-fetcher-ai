from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from utils.stock_data import get_stock_data
from utils.autocomplete import search_tickers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/autocomplete")
def autocomplete(query: str = Query(...)):
    return {"results": search_tickers(query)}

@app.get("/stock-data")
def stock_data(symbol: str = Query(...)):
    data = get_stock_data(symbol)
    return {
        "history": data["history"],
        "points": data["points"],
        "error": data["error"]
    }