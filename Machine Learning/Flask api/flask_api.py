from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load five trained ML models
models = {
    "rent": joblib.load("D:/Flask api/my_model1.pkl"),
    "transport": joblib.load("D:/Flask api/my_model2.pkl"),
    "eating_out": joblib.load("D:/Flask api/my_model3.pkl"),
    "healthcare": joblib.load("D:/Flask api/my_model4.pkl"),
    "education": joblib.load("D:/Flask api/my_model5.pkl"),
}

@app.route("/predict", methods=["POST"])
def predict_expenses():
    try:
        data = request.get_json()
        income = float(data["income"])  # Get the income input
        
        predictions = {}
        for expense, model in models.items():
            predicted_value = model.predict(np.array([[income]]))[0]  # Predict expense
            predictions[expense] = round(predicted_value, 2)  # Round for readability
        
        return jsonify({"status": "success", "predictions": predictions})
    
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
