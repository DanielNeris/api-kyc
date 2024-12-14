
# File Manager API

This is the backend for the file management system. It enables file uploads, generates shareable links, tracks views, and more.

---

## **Requirements**

- Docker (>= 20.x)
- Docker Compose (>= 1.29.x)

---

## **Installation**

### **Using Docker**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/file-manager-api.git
   cd file-manager-api
   ```

2. **Configure environment variables:**
   Create a `.env` file based on the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL=postgresql://user:password@db:5432/file_manager
   JWT_SECRET=your_secret_key
   BASE_URL=http://localhost:3333
   ```

3. **Build and run the services:**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Start the API server.
   - Set up a PostgreSQL database.

4. **Run database migrations:**
   ```bash
   docker-compose exec app npm run migrate
   ```

---

## **Running the Server Locally (Without Docker)**

If you prefer running the project locally, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run database migrations:
   ```bash
   npm run migrate
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## **API Endpoints**

### **Authentication:**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### **File Management:**
- `POST /files/upload` - Upload files (requires authentication)
- `GET /public/files/:id` - View file via shareable link
- `GET /files` - List user files (requires authentication)
