<<<<<<< HEAD
# 🏥 SehatSure

> **AI-Powered Hospital & Insurance Policy Intelligence Platform**

SehatSure is an AI-powered healthcare decision-support platform that
helps patients and caregivers understand their health insurance policy
and find hospitals that better match their coverage, treatment
requirements, and financial constraints.

🔗 **Live Demo:** https://ge-pcc2026.onrender.com/

## 🎯 Problem Statement

Hospital admission can be confusing because patients have to deal with
complex insurance documents, room-rent limits, treatment-specific caps,
co-payment rules, exclusions, cashless/network requirements, and a large
number of hospitals with different information.

SehatSure simplifies this process by converting an insurance policy into
structured constraints and using those constraints to identify and rank
suitable hospitals.

## 💡 How It Works

``` text
Insurance Policy PDF
        ↓
PDF Text Extraction
        ↓
AI Policy Analysis
        ↓
Structured Policy Constraints
        ↓
Hospital Dataset Filtering
        ↓
Hospital Scoring & Ranking
        ↓
Ranked Hospital Recommendations
        ↓
AI-Generated Explanation
```

The rule-based engine performs the eligibility and ranking calculations,
while AI helps interpret the policy and explain the results in
human-readable language.

## ✨ Key Features

### 📄 Insurance Policy Upload

Users can upload an insurance policy PDF. The system extracts
information such as:

-   Sum insured
-   Room-rent limit
-   Co-payment
-   Treatment-specific limits
-   Department exclusions
-   Coverage conditions

### 🤖 AI Policy Analysis

The extracted policy text is converted into structured information.

Example:

``` json
{
  "sumInsured": 300000,
  "roomRentLimit": 2000,
  "coPay": 10,
  "excludedDepartments": ["Cardiology", "Neurology"],
  "treatmentLimits": {
    "Knee Replacement": 20000
  }
}
```

### 🏥 Hospital Discovery

Users provide their city, medical specialty, and treatment/procedure.
SehatSure filters the hospital dataset for relevant hospitals.

### 📊 Hospital Ranking

Hospitals can be ranked using:

  Factor                  Purpose
  ----------------------- ------------------------------------------
  Insurance Coverage      Measures policy compatibility
  Out-of-Pocket Cost      Estimates patient financial burden
  Room Eligibility        Checks room-rent compatibility
  Treatment Limits        Considers policy-specific caps
  Cashless Availability   Indicates potential cashless suitability
  Hospital Rating         Quality signal where available
  NABH Accreditation      Accreditation signal where available
  Beds / ICU Capacity     Infrastructure signal
  Specialty Match         Ensures treatment relevance

The final ranking produces a **Policy Fit Score**.

## 🧮 Policy Fit Logic

``` text
Policy Coverage
      +
Lower Out-of-Pocket Cost
      +
Room Eligibility
      +
Cashless Availability
      +
Hospital Quality Signals
      +
Infrastructure
      +
Specialty Match
      ↓
Policy Fit Score
```

The goal is to balance insurance compatibility, affordability, treatment
relevance, and hospital information rather than simply finding the
cheapest hospital.

## 🧠 AI Explanation Layer

SehatSure separates **calculation** from **explanation**.

### Mathematical / Rule-Based Engine

Calculates:

-   Eligibility
-   Coverage
-   Estimated patient payment
-   Individual metric scores
-   Overall hospital score
-   Hospital ranking

### AI Layer

Converts those calculations into understandable explanations, for
example:

> This hospital matches the selected orthopedic treatment, fits within
> the policy's room eligibility, and has a relatively lower estimated
> out-of-pocket expense compared with other available hospitals.

## 🗂️ Dataset

The project uses a large hospital dataset containing tens of thousands
of hospital records.

The dataset is processed to:

-   Remove hospitals without usable specialty information
-   Normalize hospital information
-   Categorize medical specialties
-   Prepare hospital attributes for ranking
-   Enable efficient filtering and scoring

Current specialties include:

-   Cardiology
-   Orthopedics
-   General Surgery
-   Neurology
-   Oncology
-   Gynecology
-   Urology

## 🏗️ System Architecture

``` text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React Frontend      │
                    │ Policy Upload       │
                    │ Hospital Search     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │ REST API            │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
       │ PDF Parser  │  │ AI Analysis │  │ MongoDB     │
       │             │  │ / RAG       │  │             │
       └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Hospital Ranking    │
                    │ Engine              │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Ranked Hospitals    │
                    │ + Explanations      │
                    └─────────────────────┘
```

## 🛠️ Tech Stack

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   React Router

### Backend

-   Node.js
-   Express.js
-   REST APIs
-   Multer
-   PDF parsing

### Database

-   MongoDB
-   Mongoose

### AI

-   LLM-based policy analysis
-   Structured policy extraction
-   AI-generated recommendation explanations

### Deployment

-   Render

## 📁 Project Structure

``` text
SehatSure/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.ts
│   └── package.json
│
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the Repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd SehatSure
```

### 2. Install Dependencies

``` bash
cd frontend
npm install

cd ../server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file for the backend:

``` env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
LLM_API_KEY=your_llm_api_key
```

Add any additional variables required by the current implementation.

**Never commit real API keys or secrets to GitHub.**

### 4. Start the Backend

``` bash
cd server
npm run dev
```

### 5. Start the Frontend

In another terminal:

``` bash
cd frontend
npm run dev
```

The frontend will normally be available at:

``` text
http://localhost:5173
```

## 🌐 Live Demo

### 👉 https://ge-pcc2026.onrender.com/

The deployed application demonstrates the policy-analysis and
hospital-recommendation workflow.

## 🔐 Demo Policy Example

A sample policy can contain rules such as:

``` text
Sum Insured: ₹3,00,000
Room Rent Limit: ₹2,000/day
Co-pay: 10%

Excluded Departments:
- Cardiology
- Neurology

Knee Replacement Limit:
₹20,000
```

These rules are converted into structured constraints and used by the
recommendation engine.

> The sample policy is fictional and intended only for testing the
> SehatSure demo.

## 🎯 Use Cases

SehatSure can assist:

-   Patients
-   Caregivers
-   Insurance policy holders
-   Healthcare platforms
-   Insurance-tech applications

## 🔮 Future Improvements

-   Real-time insurer network verification
-   Real-time hospital availability
-   Verified NABH accreditation data
-   Live hospital ratings
-   Treatment cost estimation
-   Cashless claim workflow
-   Multi-policy comparison
-   OCR for scanned policy documents
-   Multilingual policy explanations
-   Personalized patient cost estimation
-   Hospital distance and travel-time optimization
-   More comprehensive procedure coverage

## ⚠️ Disclaimer

SehatSure is a **hackathon / demonstration project** intended to assist
users in understanding insurance information and comparing hospitals.

It does not replace a licensed insurance advisor, doctor, medical
professional, insurer's official policy interpretation, or official
hospital confirmation.

Coverage, claim eligibility, treatment limits, and hospital network
status should always be verified with the relevant insurer and hospital
before making healthcare or financial decisions.

## 👨‍💻 Project

**SehatSure --- Hospitality: Holistic Optimization System for
Policy-Integrated Admission & Treatment Intelligence**

Built around:

``` text
Insurance
    +
Healthcare
    +
Hospital Discovery
    +
AI
    +
Data-driven Decision Support
```

------------------------------------------------------------------------

⭐ If you find the project useful, consider starring the repository on
GitHub.
=======
# NextCare

NextCare helps patients and families understand their health insurance policy and find hospitals that fit it.

## The problem

When someone needs to be admitted to a hospital, they face a lot of confusion:

- Insurance policies are long and full of complicated terms.
- Room rent limits, co-pay, exclusions and cashless rules are hard to understand.
- Thousands of hospitals exist, and it is unclear which one suits your policy.
- Surprise bills at discharge are common because people do not know what their policy will actually cover.

## Our solution

NextCare reads your insurance policy, turns it into simple rules, and uses those rules to find and rank hospitals for you. It also shows how much you may have to pay yourself, so there are fewer surprises at the hospital.

## How it works

1. **Upload your policy.** Upload a policy PDF, or pick one of the demo policies to try the app.
2. **AI reads it.** The AI pulls out the key terms: sum insured, room rent limit, co-pay, exclusions, sub-limits and waiting periods. You can check and correct them before moving on.
3. **Choose your care.** Pick a city, a medical specialty and a treatment.
4. **See ranked hospitals.** Each hospital gets a Policy Fit Score and an estimated out-of-pocket cost.
5. **Understand why.** Every result comes with a plain-language explanation and a bill breakdown, so you can see where the money goes.

## How hospitals are ranked

The Policy Fit Score is calculated by a rule-based engine, not by AI. This keeps the numbers consistent and easy to check. It looks at:

- **Coverage:** does your policy cover this treatment, or is it excluded?
- **Out-of-pocket cost:** how much you may need to pay after your policy pays its share
- **Room eligibility:** whether the room type fits your room rent limit
- **Cashless network:** whether the hospital works with your insurer
- **Specialty match:** whether the hospital offers the treatment you need
- **Hospital rating:** used as a small extra signal where available

The AI is only used for two things: reading the policy at the start, and explaining the results in simple words at the end.

## Other features

- **Care Journey:** a step-by-step guide that walks you through admission, pre-authorisation, treatment, discharge and claim.
- **Accounts:** sign up to save your policies and favourite hospitals.
- **Languages:** English, Hindi and Kannada.

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB
- **AI:** Google Gemini
- **Hosting:** Render

## Project structure

```text
frontend/        React app (pages, components, translations)
server/          API, ranking engine, AI policy extraction
mock-policies/   Sample policy PDFs for testing
hospitals.csv    Hospital dataset
pvt_costs.csv    Private hospital cost estimates
govt_costs.csv   Government hospital cost estimates
```

## Run locally

```bash
# 1. Install
cd server && npm install
cd ../frontend && npm install

# 2. Create server/.env
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_key
PORT=5000

# 3. Start (two terminals)
cd server && npm run dev
cd frontend && npm run dev
```

Then open the local address shown in the frontend terminal.
>>>>>>> ee469b124d9d702468885771285b550aaa84990c
