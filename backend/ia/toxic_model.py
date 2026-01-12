from detoxify import Detoxify

class ToxicityAnalyzer:
    def __init__(self):
        # Carga el modelo toxic-bert desde HuggingFace
        self.model = Detoxify('original')

    def analyze(self, text: str) -> dict:
        return self.model.predict(text)
