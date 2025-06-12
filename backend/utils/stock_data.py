import yfinance as yf
from datetime import datetime, timedelta
import pandas as pd
import pytz

def get_stock_data(symbol: str):
    try:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period="1y")
        hist = hist.reset_index()

        if hist.empty:
            return {
                "history": [],
                "points": {},
                "error": f"No data found for {symbol}. Possibly delisted or invalid."
            }

        # Ensure Date column is timezone-aware
        hist['Date'] = pd.to_datetime(hist['Date'])

        # Determine the timezone of the data
        df_tz = hist['Date'].dt.tz if hist['Date'].dt.tz is not None else pytz.UTC
        now = datetime.now(tz=df_tz)

        today = hist.iloc[-1]
        one_day = hist.iloc[-2] if len(hist) > 1 else today

        one_month_data = hist[hist['Date'] >= (now - timedelta(days=30))]
        one_year_data = hist[hist['Date'] >= (now - timedelta(days=365))]

        one_month = one_month_data.iloc[0] if not one_month_data.empty else today
        one_year = one_year_data.iloc[0] if not one_year_data.empty else today

        return {
            "history": hist.to_dict(orient="records"),
            "points": {
                "current": today['Close'],
                "1d": one_day['Close'],
                "1m": one_month['Close'],
                "1y": one_year['Close']
            },
            "error": None
        }
    except Exception as e:
        return {
            "history": [],
            "points": {},
            "error": str(e)
        }