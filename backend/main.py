from fastapi import FastAPI
from schemas import TextRequest
from ia.toxic_model import ToxicityAnalyzer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
analyzer = ToxicityAnalyzer()

@app.post("/detector")
def analyze_text(request: TextRequest):
    scores = analyzer.analizar(request.text)
    offensive = any(score > 70 for score in scores.values())

    return {
        "offensive": offensive,
        "scores": scores
    }
