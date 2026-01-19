from detoxify import Detoxify

class ToxicityAnalyzer:
    def __init__(self):
        self.model = Detoxify("multilingual")

    def analizar(self, text: str) -> dict:
        resultados = self.model.predict(text)

        resultados_filtrados = {
            key: round(float(value) * 100, 2)
            for key, value in resultados.items()
        }

        return resultados_filtrados
