# Personalized Dashboard

A fully functional, authenticated dashboard built with **Next.js**, **MongoDB**, and **NextAuth**, allowing users to browse personalized content from three sources — **Movies**, **News**, and **Socials** — based on their preferences. It also supports global search, favorites, and user settings.

---

## 📦 Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Database:** MongoDB (via Mongoose)
- **Auth:** Google OAuth (NextAuth.js)
- **State Management:** Redux Toolkit
- **UI:** Tailwind CSS
- **Testing:** Jest, React Testing Library
- **Deployment:** Vercel or any Node-compatible host

---

## 🚀 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/personalized-dashboard.git
cd personalized-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env.local` file in the root:

```
.env

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_uri
TMDB_API_KEY=your_tmdb_api_key
NEWS_API_KEY=your_news_api_key
```

### 4. Run the development server

```bash
npm run dev
```

Go to: [http://localhost:3000](http://localhost:3000/)

---

## 👨‍💻 User Flow

1. **Authentication**
    - Users log in using Google OAuth.
    - On first login, user data is saved to MongoDB.
2. **Dashboard**
    - Three content tabs: Social (default), News, and Movies.
    - Data is fetched from real APIs and shown based on user genre preferences.
3. **Preferences**
    - Users can choose genres per tab in Settings.
    - Changing preferences updates the feed by fetching new data and mixing it into the feed.   

4. **Favorites**
    - Users can "favorite" posts.
    - Favorites are stored with userId, contentId, and post data in MongoDB.
5. **Search**
    - Global search bar with debounce.
    - Filters results by content type (movie/news/social).
6. **Load More**
    - Optimized "Load More" button per tab (no infinite scroll).
    - Prevents rapid API calls with built-in throttling.

7. **Infinite Scroll (Home Section)**

    - The main dashboard (HomeSection) uses infinite scroll to load more content as the user reaches the bottom.

    - Only the active tab's API is triggered when filters are changed.

---

## ✅ Features

- 🔐 Google Login via NextAuth
- 📌 Genre preference saving (Redux + MongoDB)
- 📰 Paginated API calls (Movies, News, Social)
- ⭐ Favorites system with full post metadata
- 🔍 Debounced search with tabbed results
- 🚀 Infinite scroll on Home Section
- 🧪 Jest test and cypress e2e test suite with mocking

---

## 🧪 Run Tests

```bash

npm run test
```

Includes:

- ✅ Unit tests (e.g. tab switching, components)
- ✅ Mocked NextAuth sessions
- ✅ Redirect logic on unauthenticated state

---

## 📁 Folder Structure

```

personalized-dashboard/
├── src/
│   ├── app/               # App router
│   ├── components/        # UI components
│   ├── pages/api/         # API routes
│   ├── store/             # Redux store + slices
│   └── tests/             # Jest test files
├── public/                # Static assets
├── .env.local             # Environment variables
├── jest.config.ts         # Jest config
├── README.md

```


## 🔗 Deployment Instructions

### 1. Push to a public GitHub repository

```bash

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/personalized-dashboard.git
git push -u origin main

```

### 2. Deploy on Vercel

- Import your repo
- Set all `.env` variables in Vercel dashboard
- Update `NEXTAUTH_URL` to the live domain

