# 💪 FitLog — Workout Library

FitLog is a dark-themed workout library built with Next.js. Users can browse workouts, view exercise details, add workouts to today's plan, save workouts for later, track workout totals, and manage their daily training plan.

## 🔗 Live Links

- Live Site: https://assignment-6-azmir1.vercel.app
- GitHub Repository: https://github.com/azmirx/assignment-6

## 🚀 Technologies Used

- Next.js
- React
- Next.js App Router
- Tailwind CSS
- JavaScript
- Lucide React
- React Hot Toast
- Local Storage

## ✨ Key Features

- Browse 12 workouts from the FitLog API
- Responsive workout library for mobile, tablet, and desktop
- Dynamic workout details page
- Add workouts to Today's Plan
- Save workouts for later
- Dynamic Plan and Saved counters in the navbar
- Workout data persistence using localStorage
- Today's Plan and Saved tabs
- Live Exercises, Minutes, and Calories summary
- Mark planned workouts as done
- Remove workouts from Today's Plan or Saved
- Sort workouts by Duration, Calories, and Rating
- Toast notifications for workout actions
- Loading state while workout data is being fetched
- Custom 404 page
- Responsive dark-themed UI

## 📄 Pages

### Home Page

The home page contains:

- Navbar
- Hero section
- Workout Library
- Sort dropdown
- Responsive workout cards
- Footer

### Workout Details Page

Each workout details page contains:

- Workout image
- Muscle group tags
- Workout name and description
- Equipment
- Difficulty
- Sets
- Reps
- Duration
- Calories
- Rating
- Instructions
- Add to Today's Plan button
- Save for Later button

### My Plan Page

The My Plan page contains:

- Exercises summary
- Total workout minutes
- Total calories
- Today's Plan tab
- Saved tab
- View Details action
- Mark as Done action
- Remove action
- Empty state
- Loading state

## 🔌 API

All workouts:

https://api.abcz.workers.dev/api/fitlog

Single workout:

https://api.abcz.workers.dev/api/fitlog/:id


---

## 📦 Dependencies

This project uses the following main dependencies:

- Next.js
- React
- React DOM
- Lucide React
- React Hot Toast
- Tailwind CSS

---

## ⚙️ Run Locally

Follow these steps to run the project on your local machine:

1. Clone the repository:

```bash
git clone https://github.com/azmirx/assignment-6.git
```

2. Go to the project directory:

```bash
cd assignment-6
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local development URL shown in your terminal.
