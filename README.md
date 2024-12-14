
# File Manager API

This is the backend for the file management system. It enables file uploads, generates shareable links, tracks views, and more.

---

## **Requirements**

- Node.js (>= 18.x)
- PostgreSQL database
- Yarn or npm

---

## **Installation**

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
   DATABASE_URL=postgresql://user:password@localhost:5432/file_manager
   JWT_SECRET=your_secret_key
   BASE_URL=http://localhost:3333
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run database migrations:**
   ```bash
   npm run migrate
   ```

---

## **Running the Server**

- **Development mode:**
  ```bash
  npm run dev
  ```
- **Production mode:**
  ```bash
  npm run build
  npm start
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
