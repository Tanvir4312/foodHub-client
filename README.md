# 🍔 FoodHub Client

A modern food delivery platform where customers can browse meals, place orders, and restaurants can showcase their offerings.

---

## 📖 About The Project

FoodHub is built with the vision of making food ordering effortless — customers can easily browse and order meals, while providers can create their profiles and manage their business with minimal effort, ensuring a smooth experience for both sides.

---

## 🛠️ Tech Stack

- TypeScript
- React.js
- Next.js

---

## ✨ Key Features

- 🍽️ Browse meals by categories
- 🛒 Add to cart or order directly
- 🏷️ Apply discount codes at checkout
- ⭐ Post reviews after delivery
- 📊 View reviews in personal dashboard
- 🏪 Restaurants can create free profiles & showcase meals

---

## 📁 Project Structure Highlights

- `/src/app/commonLayout` — Shared layout for all users
- `/src/app/customerLayout` — Customer-specific pages & routes
- `/src/app/providerLayout` — Provider/restaurant pages & routes
- `/src/app/dashboardLayout` — Dashboard layout for both roles
- `/src/components` — Reusable UI components
- `/src/services` — Decoupled API service layer
- `/src/actions` — Server actions for API interactions

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/Tanvir4312/foodHub-client
cd foodHub-client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```dotenv
NEXT_PUBLIC_BACKEND_API=http://localhost:5000
BACKEND_API=http://localhost:5000
FRONTEND_API=http://localhost:3000
API_URL=http://localhost:5000/api
AUTH_URL=http://localhost:5000/api/auth
```

---

## 🔗 Links

- **Live Demo:** [Click Here](https://foodhub-client-nine.vercel.app/)
- **Backend Repo:** [foodHub-backend](https://github.com/Tanvir4312/foodHub-backend)
