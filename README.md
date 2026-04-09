# Neonatal Explainable Tree Models

This repository contains the code accompanying research on **transparent machine learning models for neonatal outcome prediction**. The project focuses on tree-based ensemble models and provides tools to **inspect and visualise individual decision paths**, enabling clinicians and researchers to understand how predictions are generated.

The repository consists of two major components:

1. **Model development pipeline (Python / Jupyter)**
   Used to preprocess data, train models, evaluate performance, and export tree structures.

2. **Interactive tree visualisation application (React)**
   A web application that allows users to explore decision trees and inspect prediction paths for individual cases.

---

# Project Overview

Tree-based ensemble models such as **Random Forest**, **Extra Trees**, and **Gradient Boosting** provide strong predictive performance while retaining a degree of structural transparency compared to black-box models.

This project aims to:

* Train predictive models for **neonatal outcomes**
* Provide **transparent inspection of ensemble tree structures**
* Allow clinicians to **trace decision paths for individual predictions**
* Support **interpretability and trust in clinical machine learning**

The visualisation interface enables users to:

* Explore individual trees within an ensemble
* View node splitting criteria
* Inspect the decision path taken for a specific patient
* Understand how model predictions are derived

---

# Installation

## Python Environment

Create a virtual environment and install dependencies.

```bash
python -m venv venv
source venv/bin/activate
```

Install required packages:

```bash
pip install -r requirements.txt
```

Common dependencies include:

* scikit-learn
* pandas
* numpy
* matplotlib
* shap
* jupyter

---

# Running the Model Pipeline

Start Jupyter:

```bash
jupyter notebook
```

It is recommended to run the notebooks sequentially

The final notebook exports tree structures used by the visualisation interface.

Exported files are stored in:

```
application/public/
```

---

# Running the Tree Visualisation App

Navigate to the frontend directory:

```bash
cd application
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

The frontend loads tree structures exported from the public folder.

---

# Data Availability

Due to **patient privacy and institutional restrictions**, the original neonatal dataset cannot be distributed with this repository.

The repository therefore includes:

* **Synthetic sample data** for demonstration
* Data schema and feature descriptions

Researchers interested in replicating the study should replace the dataset within:

```
notebooks/data/
```

---

# Model Outputs

The training pipeline generates several artifacts

Examples include:

* evaluation metrics
* visualisation figures
* exported decision tree structures

The tree visualisation app consumes:

```
application/public/data/models.json
application/public/dot/**.dot
```

These files contain serialized representations of decision trees and node conditions.

---

# Research Context

This repository accompanies research exploring **transparent machine learning for neonatal outcome prediction**, with emphasis on:

* tree-based model interpretability
* decision path inspection
* clinician-oriented explainability

The visualisation interface is designed to support **clinical interpretability studies** and **model transparency analysis**.

---

# Citation

If you use this repository in academic work, please cite the associated publication once available.

```
Citation information will be added after publication.
```

---

## License

This project is released under the MIT License. See the LICENSE file for details.

---

# Disclaimer

This repository is provided **for research and educational purposes only**.

The models and tools included here are **not intended for clinical decision-making** without appropriate validation and regulatory approval.