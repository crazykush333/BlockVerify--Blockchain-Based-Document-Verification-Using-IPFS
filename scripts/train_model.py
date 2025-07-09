"""Train fraud detection model on Indian transaction dataset CSV.

Usage:
python scripts/train_model.py --csv data/transactions.csv --output backend/model/model.pkl
"""

import argparse
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import joblib
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--csv', required=True, help='Path to CSV dataset')
    parser.add_argument('--output', default='backend/model/model.pkl', help='Where to save the trained model')
    args = parser.parse_args()

    df = pd.read_csv(args.csv)
    if 'label' not in df.columns:
        raise ValueError('CSV must contain a "label" column (1=fraud,0=legit)')

    X = df.drop(columns=['label']).values
    y = df['label'].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))

    param_grid = {
        'logisticregression__C': [0.01, 0.1, 1, 10],
        'logisticregression__penalty': ['l2'],
    }

    clf = GridSearchCV(pipe, param_grid, cv=5, scoring='f1', n_jobs=-1, verbose=1)
    clf.fit(X_train, y_train)

    print('Best params:', clf.best_params_)
    model = clf.best_estimator_

    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))

    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, args.output)

    # Save SHAP explainer for faster inference (optional)
    try:
        import shap  # type: ignore

        explainer = shap.Explainer(model.predict_proba, X_train[:100])  # background
        shap_output = Path(args.output).with_name('explainer.pkl')
        joblib.dump(explainer, shap_output)
        print(f"SHAP explainer saved to {shap_output}")
    except Exception as ex:
        print('Could not save SHAP explainer:', ex)

    print(f"Model saved to {args.output}")


if __name__ == '__main__':
    main()