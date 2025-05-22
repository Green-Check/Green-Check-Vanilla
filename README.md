# 🥗 Green Check - Healthier Choices, Smarter Living

**Green Check** is a smart food scanner app that helps users make healthier and more sustainable food choices by simply scanning product barcodes. The app provides instant health insights, personalized suggestions, and long-term wellness tracking in a fun, engaging way.

---

## 🚀 Overview

Green Check aims to promote health-conscious and eco-friendly food habits through:
- A color-coded food grading system.
- Health visualizations and time-based impact feedback.
- Weekly tracking and personalized recommendations.

---

## 🌟 Core Features

### 📷 Barcode Scanning
- Users can **scan barcodes** using their camera or manually enter them.
- Fetches **real-time product data** from a database.

### 🎨 Color-Coded Food Grading (Custom Algorithm)
- **Green ✅** – Excellent quality (no harmful additives).
- **Yellow ⚠️** – Moderate quality (minimal additives).
- **Red ❌** – Poor quality (highly processed/unhealthy).

**Factors considered:**
- Nutritional value
- Processing level
- Artificial additives
- Sugar content
- Sustainability indicators

### 💡 Alternative Recommendations
When a red-graded product is detected, suggest:
- **Healthier taste-alike** alternatives.
- **Budget-friendly** swaps (based on income input).
- **Sustainable** options (eco-packaging, ethical sourcing).

### 🧠 Health Visualization
- Visual feedback on diet impact:
  - ✅ Good Diet → Healthy body
  - ⚠️ Moderate Diet → Slight health decline
  - ❌ Bad Diet → Negative health effects

### ⏳ Time Deduction Feature
- Example: “Each pizza slice removes 7 minutes from your lifespan.”
- **Cumulative health impact** over time is shown to raise awareness.

### 📊 Weekly Progress Tracker
- Graph showing weekly food scan history.
- Motivates users by showing trends in eating habits.

---

## 🔁 Additional Features for Engagement

### 🌱 Sustainability Insights
- Information on:
  - Eco-friendly packaging
  - Ethical sourcing
  - Low carbon footprint brands

### 💸 Personalized Recommendations (Income-Based)
- Adjusts product alternatives based on the user’s income range.
- **Ensures affordability + accessibility** for all.

---

## 💚 How It Helps People

- Promotes **health-conscious eating** with instant feedback.
- **Educates** users about long-term health & environmental effects.
- Drives **behavioral change** through:
  - Visual diet impact
  - Time-based food scoring
  - Weekly health progress tracking

---

## 🛠️ Tech Stack

### ✅ Version 1 (Prototype - Static App)
- **HTML**
- **CSS**
- **JavaScript**
- **MongoDB** (to store product data and scan history)

### ✅ Version 2 (Full-stack App)
- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Atlas)
- **API:** RESTful services for product info, user auth, recommendations

---

## 📌 Future Scope
- AI-powered chatbot for food queries.
- Community-based food rating.
- Integration with fitness trackers and wearables.
- Multi-language support for regional accessibility.

---

## 🧪 Installation Instructions (For V2)

```bash
# Clone the repo
git clone https://github.com/your-username/green-check.git

# Go to backend directory
cd green-check/server
npm install

# Go to frontend directory
cd ../client
npm install

# Run both client and server (use concurrently or separate terminals)
npm run dev
