# 🚀 MVC

> Full-stack modular automation dashboard built on Nuxt and Express — structured with MVC, scalable by design.

**DB2UI** is a feature-rich, fully Dockerized platform combining **Nuxt 3**, **ExpressJS**, **Vue**, and **MySQL** in an MVC-based architecture. It ships with **PhpMyAdmin** for database GUI access and **Redis** for caching and queuing support.

---

## 🧰 Tech Stack

| Layer         | Technology                            |
|---------------|----------------------------------------|
| **Frontend**  | Nuxt 3 (Vue 3, Composition API, SSR)   |
| **Backend**   | ExpressJS (Node.js, TypeScript, MVC)   |
| **Database**  | MySQL + PhpMyAdmin GUI                 |
| **Cache**     | Redis                                  |
| **Container** | Docker + Docker Compose                |

---

## 📦 Features

- ✅ MVC structure for both Nuxt and Express
- 🧠 Service-layer logic separation (controllers, routes, validators)
- 📦 Modular API with TypeScript
- ⚙️ Redis for session/caching support
- 🔐 JWT-based authentication
- 🖥️ Nuxt frontend with Vue 3 + Pinia ready
- 🐘 MySQL + PhpMyAdmin GUI
- 🐳 Docker-based setup with single-command orchestration
- 💡 Easily extendable with jobs, services, middlewares

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Azshurith/Dockerized-Nuxt-ExpressJS.git
cd DB2UI
```

### 2. Create `.env` File

Copy and customize the `.env`:

```bash
cp .env.example .env
```

### 3. Start Everything via Docker

```bash
docker-compose up -d
```

Services:

- **Frontend**: `http://localhost:4000`
- **Backend API**: `http://localhost:4001/api`
- **PhpMyAdmin**: `http://localhost:4002`
- **Redis**: `localhost:6379`

---

## 🧠 Project Structure (MVC-Based)

```
backend/                       # Express API (TypeScript)
├── src/
│   ├── routes/                # Express routes
│   ├── controllers/           # Route logic / handlers
│   ├── validators/            # Input validation rules
│   ├── entities/              # TypeORM models
│   ├── middlewares/          # JWT, validators, etc.
│   └── config/                # DB, Redis, env loaders

frontend/                      # Nuxt 3 frontend
├── pages/                     # MVC views
├── components/                # Reusable Vue components
├── composables/              # Auth helpers, composables
├── middleware/               # Route guards (auth/guest)
└── utils/                    # Client-side helpers

.docker/                      # Dockerfiles for each service
.env                          # Environment variables
docker-compose.yml            # Multi-container orchestrator
Makefile                      # CLI for dev operations
```

---

## 🛠️ CLI Helper Commands (via Makefile)

Use `make help` to view commands:

| Command            | Description                                 |
|--------------------|---------------------------------------------|
| `project_start`    | 🚀 Start all containers                     |
| `project_stop`     | 🛑 Stop all containers                      |
| `project_destroy`  | 💣 Remove containers & volumes              |
| `express_shell`    | 🔧 Shell into Express container             |
| `express_dev`      | 🛠️ Run backend in dev mode                 |
| `nuxt_dev`         | 🛠️ Run frontend in dev mode                |
| `nuxt_build`       | 🔧 Build frontend for production            |
| `help`             | 📖 View command reference                   |

---

## 🔐 Authentication

JWT tokens are used for protecting backend routes.

**Header Format:**

```http
Authorization: Bearer <your_token_here>
```

---

## 🔁 Redis Usage

- Session & login token storage
- Caching for jobs / external API responses
- Rate-limiting (future-ready)

---

## 🛠️ Building Frontend Without Docker

```bash
cd frontend
npm install
npm run build
```

---

## 💡 Windows + WSL Symlink (Optional)

To access WSL project from Windows apps:

```powershell
New-Item -ItemType SymbolicLink `
  -Path "D:\Documents\Projects" `
  -Target "\\wsl.localhost\Ubuntu-24.04\home\user\Projects"
```

> ✅ Make sure the WSL target exists before running.

---

## 👤 Author

**Devitrax / Azshurith**  
GitHub: [@Azshurith](https://github.com/Azshurith)

---

## 📄 License

[MIT](./LICENSE)
