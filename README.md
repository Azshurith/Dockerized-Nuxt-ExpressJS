# 🚀 MVC

> Full-stack authentication and CRUD operation built on Nuxt and Express — structured with MVC, scalable by design.

Dockerized Nuxt ExpressJS is a robust automation platform powered by **Node.js**, **Express**, **NuxtJS**, and **MySQL**. It comes Docker-ready with **PhpMyAdmin** for database control and **Redis** support for caching, queuing, or session management.

---

## 🧰 Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| **Frontend**  | NuxtJS 3 (Vue 3, Vite, TailwindCSS, SSR optional)|
| **Backend**   | Node.js, ExpressJS, TypeScript, TypeORM          |
| **Database**  | MySQL + PhpMyAdmin GUI                           |
| **Cache**     | Redis                                            |
| **Container** | Docker + Docker Compose                          |

---

## 📦 Features

- ✅ Modular API structure using Express + TypeScript (MVC)
- 🖥️ NuxtJS frontend with Vue 3 + Pinia + TailwindCSS
- 🐘 MySQL with PhpMyAdmin for admin GUI
- 🔁 Redis-powered session/cache-ready setup
- 🐳 Fully Dockerized: 1-command startup
- 🔐 JWT Auth for secure endpoints
- 🔌 TypeORM-based models with clean entity relationships
- ⚙️ Easy to extend with service-based jobs

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Azshurith/DB2UI.git
cd DB2UI
```

### 2. Create `.env` File

Copy `.env.example` and configure ports, DB, JWT:

```bash
cp .env.example .env
```

### 3. Start with Docker

```bash
docker-compose up -d
```

Access:
- Frontend: `http://localhost:4000`
- Backend: `http://localhost:4001/api`
- PhpMyAdmin: `http://localhost:4002`
- Redis: `localhost:6379`

---

## 🗂️ Project Structure

```
backend/                 # Express + TypeScript backend
  ├── src/
  │   ├── routes/
  │   ├── controllers/
  │   ├── middlewares/
  │   ├── config/
  │   └── entities/      # TypeORM entities (User, Post, etc.)
frontend/                # NuxtJS frontend (src/pages, src/components, etc.)
.docker/                 # Dockerfiles for each service
.env                     # Environment variables
docker-compose.yml       # Multi-container orchestrator
Makefile                 # Project CLI with helper commands
```

---

## 🛠️ Makefile CLI Commands

Use `make help` to list all available commands:

| Command            | Description                                  |
|--------------------|----------------------------------------------|
| `project_start`    | 🚀 Start all containers in detached mode     |
| `project_stop`     | 🛑 Stop all running containers               |
| `project_restart`  | 🔄 Restart all containers                    |
| `project_destroy`  | 💣 Remove containers and volumes             |
| `express_shell`    | 🔧 Open a shell in Express container         |
| `express_install`  | 📦 Install backend dependencies              |
| `express_update`   | 🔄 Update backend packages                   |
| `express_dev`      | 🛠️ Run Express in dev mode                  |
| `express_start`    | ▶️ Run Express in production mode            |
| `nuxt_shell`       | 🔧 Open a shell in Nuxt container            |
| `nuxt_install`     | 📦 Install frontend dependencies             |
| `nuxt_update`      | 🔄 Update frontend packages                  |
| `nuxt_dev`         | 🛠️ Run Nuxt in dev mode                     |
| `nuxt_build`       | 🔧 Build frontend for production             |
| `help`             | 📖 Show this help menu                       |

---

## 🔐 Authentication

JWT-based auth is built-in. Use:

```http
Authorization: Bearer <token>
```

---

## 🧠 Redis Use Cases

- Session & login state
- API rate-limiting
- Cache for scraped or job data

---

## 🛠️ Build Frontend Manually

```bash
cd frontend
npm install
npm run build
```

---

## 👤 Author

**Devitrax / Azshurith**  
GitHub: [@Azshurith](https://github.com/Azshurith)

---

## 📄 License

[MIT](./LICENSE)
