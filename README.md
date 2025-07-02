# 💬 VibeChat

![Next.js](https://img.shields.io/badge/Next.js-15-blue?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss)
![Upstash Redis](https://img.shields.io/badge/Upstash-Redis-red?logo=redis)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> A real-time chat application with Google OAuth, live friend requests, and responsive UI — built with cutting-edge web technologies.

---

## 🚀 Features

- ✅ **Real-Time Messaging** using WebSockets and Pusher
- 🔐 **Google OAuth Authentication** via NextAuth
- 👥 **Friend Request System** with Accept/Deny functionality
- 🔄 **Presence Indicators** and message delivery status
- 📱 **Fully Responsive UI** for mobile and desktop
- 📦 **Session Handling and Caching** using Upstash Redis
- ✅ **Form Validation** using Zod + React Hook Form

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/), Headless UI
- **Auth**: [NextAuth](https://next-auth.js.org/) with Google OAuth
- **Realtime**: [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [Pusher](https://pusher.com/)
- **Database/Cache**: [Upstash Redis](https://upstash.com/)
- **Validation**: [Zod](https://zod.dev/), [React Hook Form](https://react-hook-form.com/)

---

## 📸 Screenshots

| Login Page | Chat Interface | Mobile View |
|------------|----------------|-------------|
| ![Login](./screenshots/login.png) | ![Chat](./screenshots/chat.png) | ![Mobile](./screenshots/mobile.png) |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Harsh-tyagi94/vibechat.git
cd vibechat

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
NEXT_PUBLIC_PUSHER_CLUSTER=
NEXT_PUBLIC_PUSHER_KEY=
# Fill in your Google OAuth keys, Pusher keys, and Upstash Redis config in .env

# Run the development server
npm run dev
