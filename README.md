NextCare

NextCare helps patients and families understand their health insurance policy and find hospitals that fit it.

The problem

When someone needs to be admitted to a hospital, they face a lot of confusion:

Insurance policies are long and full of complicated terms.
Room rent limits, co-pay, exclusions and cashless rules are hard to understand.
Thousands of hospitals exist, and it is unclear which one suits your policy.
Surprise bills at discharge are common because people do not know what their policy will actually cover.
Our solution

NextCare reads your insurance policy, turns it into simple rules, and uses those rules to find and rank hospitals for you. It also shows how much you may have to pay yourself, so there are fewer surprises at the hospital.

How it works
Upload your policy. Upload a policy PDF, or pick one of the demo policies to try the app.
AI reads it. The AI pulls out the key terms: sum insured, room rent limit, co-pay, exclusions, sub-limits and waiting periods. You can check and correct them before moving on.
Choose your care. Pick a city, a medical specialty and a treatment.
See ranked hospitals. Each hospital gets a Policy Fit Score and an estimated out-of-pocket cost.
Understand why. Every result comes with a plain-language explanation and a bill breakdown, so you can see where the money goes.
How hospitals are ranked

The Policy Fit Score is calculated by a rule-based engine, not by AI. This keeps the numbers consistent and easy to check. It looks at:

Coverage: does your policy cover this treatment, or is it excluded?
Out-of-pocket cost: how much you may need to pay after your policy pays its share
Room eligibility: whether the room type fits your room rent limit
Cashless network: whether the hospital works with your insurer
Specialty match: whether the hospital offers the treatment you need
Hospital rating: used as a small extra signal where available

The AI is only used for two things: reading the policy at the start, and explaining the results in simple words at the end.

Other features
Care Journey: a step-by-step guide that walks you through admission, pre-authorisation, treatment, discharge and claim.
Accounts: sign up to save your policies and favourite hospitals.
Languages: English, Hindi and Kannada.
Tech stack
Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express, TypeScript
Database: MongoDB
AI: Google Gemini
Hosting: Render
Project structure
text
frontend/        React app (pages, components, translations)
server/          API, ranking engine, AI policy extraction
mock-policies/   Sample policy PDFs for testing
hospitals.csv    Hospital dataset
pvt_costs.csv    Private hospital cost estimates
govt_costs.csv   Government hospital cost estimates
Run locally
bash
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

Then open the local address shown in the frontend terminal.
