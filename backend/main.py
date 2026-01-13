from fastapi import FastAPI
from schemas import TextRequest
from ia.toxic_model import ToxicityAnalyzer

app = FastAPI()
analyzer = ToxicityAnalyzer()

@app.post("/detector")
def analyze_text(request: TextRequest):
    scores = analyzer.analyze(request.text)
    offensive = any(score > 70 for score in scores.values())

    return {
        "offensive": offensive,
        "scores": scores
    }
