# CampusConnect 🎓🤝  
*A mentorship and opportunity platform to bridge the gap between juniors and seniors*

---

## 📌 Problem Statement

In many colleges, **interaction between junior and senior students is minimal or non-existent**.  
This creates problems such as:
- Juniors struggling to decide **what to study (DSA, development, projects)**  
- Lack of guidance on **career paths, internships, and placements**
- Seniors losing a platform to **give back and share opportunities**
- Hiring information from alumni being **lost over time**

I personally faced this issue in my first year, which inspired this project.

---

## 💡 Solution

**CampusConnect** is a web platform that enables:
- Juniors to **discover, connect, and chat with seniors**
- Seniors to **share blogs, guidance, and hiring opportunities**
- A structured, college-specific ecosystem for mentorship and knowledge sharing

The platform focuses on **simplicity, usability, and real impact**, avoiding unnecessary complexity in the MVP.

---

## 🚀 Key Features

### 👤 User Roles
- **Junior**
  - Search and connect with seniors
  - Chat with seniors in real-time
  - Read blogs and hiring posts
- **Senior**
  - All junior features +
  - Create blog posts
  - Post hiring opportunities (internships / referrals)

Role-based access ensures **only seniors can post hiring content**.

---

### 🧭 Dashboard
A central dashboard acts as a **feature launcher**, not just navigation.

Widgets include:
- Quick actions (Chat, Find Seniors, Blogs, Hiring)
- Recommended seniors
- Recent chats (last message preview)
- Featured blog
- Latest hiring opportunities

Each feature opens in its **own optimized layout**.

---

### 💬 Real-Time Chat
- One-to-one chat between juniors and seniors
- WebSocket-based real-time messaging
- Clean chat UI with:
  - Contact list
  - Message window
  - Last message preview
- **No read/unread receipts** in MVP (intentional to reduce complexity)

---

### 🔍 Find Seniors
- Browse seniors using filters:
  - Company
  - Role
  - Expertise / skills
- Seniors displayed as cards
- One-click chat initiation

---

### ✍️ Blogs
- Seniors can write blog posts about:
  - DSA preparation
  - Projects
  - Interviews
  - Career advice
- Blogs are visible to all users
- Blog summaries generated using **LangChain (LLM)**

---

### 🧑‍💼 Hiring Posts
- Seniors can post:
  - Internship openings
  - Referral-based opportunities
- Juniors can view and apply
- Acts as a **community-driven hiring board**

---
## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- WebSockets (Socket.io)

### Authentication
- JWT-based authentication
- Role-based authorization (Junior / Senior)

---


---

## 🧠 Design Decisions

- ❌ No read/unread receipts in MVP  
  → reduces state-sync and WebSocket complexity  
- ❌ No global sidebar for all features  
  → each feature has its own optimized layout  
- ✅ Dashboard-first UX  
  → better discoverability and cleaner UI  
- ✅ Role-based permissions  
  → prevents misuse of hiring posts  

---

## ⏳ Development Timeline

- **Planned duration:** 60 days  
- **Daily effort:** 3–4 hours (5–7 hours on weekends)  
- **Focus:** functionality > polish > scale  

---

## 🌱 Future Enhancements

- Group chats / community channels
- Advanced search & recommendation system
- Read/unread indicators
- Notifications system
- Admin moderation panel
- Calendar-based mentorship sessions
- Full RAG-powered chatbot for guidance

---

## 🎯 Impact

CampusConnect aims to:
- Improve mentorship culture in colleges
- Reduce confusion for juniors
- Preserve alumni knowledge
- Create a sustainable student-driven ecosystem

---

## 👨‍💻 Author

Built with ❤️ by **Vishal**  
Inspired by real problems faced during college life.

---

> *This project focuses on solving a real problem with practical engineering decisions rather than overengineering features.*

