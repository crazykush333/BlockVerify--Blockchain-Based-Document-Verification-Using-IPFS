import joblib
import numpy as np
import shap
from lime.lime_tabular import LimeTabularExplainer
from sklearn.linear_model import LogisticRegression
from pathlib import Path

MODEL_PATH = "model/model.pkl"
EXPLAINER_GLOBAL = None
MODEL = None


def load_model():
    """Load model from disk or train a dummy model if not present."""
    global MODEL, EXPLAINER_GLOBAL
    if MODEL is not None:
        return

    if Path(MODEL_PATH).exists():
        MODEL = joblib.load(MODEL_PATH)
    else:
        # Train a dummy model with random data (placeholder)
        X_dummy = np.random.rand(1000, 10)
        y_dummy = (np.random.rand(1000) > 0.8).astype(int)
        MODEL = LogisticRegression(max_iter=1000)
        MODEL.fit(X_dummy, y_dummy)
        Path(MODEL_PATH).parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(MODEL, MODEL_PATH)

    background_data = np.random.rand(100, MODEL.n_features_in_)
    EXPLAINER_GLOBAL = shap.Explainer(MODEL, background_data)


def predict(features: np.ndarray):
    load_model()
    proba = MODEL.predict_proba(features)[0][1]
    prediction = proba >= 0.5
    return prediction, proba


def explain_shap(features: np.ndarray):
    load_model()
    shap_values = EXPLAINER_GLOBAL(features)
    # return mean shap values of features
    return shap_values.values[0].tolist()


def explain_lime(features: np.ndarray):
    load_model()
    explainer = LimeTabularExplainer(
        training_data=np.random.rand(100, MODEL.n_features_in_),
        feature_names=[f"f{i}" for i in range(MODEL.n_features_in_)],
        class_names=["legit", "fraud"],
        mode="classification",
    )
    exp = explainer.explain_instance(features[0], MODEL.predict_proba, num_features=10)
    return exp.as_list()