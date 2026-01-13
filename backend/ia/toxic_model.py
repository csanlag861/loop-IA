from detoxify import Detoxify

class ToxicityAnalyzer:
    def __init__(self):
        self.model = Detoxify("multilingual")

    def analyze(self, text: str) -> dict:
        raw_results = self.model.predict(text)

        clean_results = {
            key: round(float(value) * 100, 2)
            for key, value in raw_results.items()
        }

        return clean_results
