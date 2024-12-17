
# KYC System Backend API

This is the backend for the KYC (Know Your Customer) system. It allows managing KYC data, including users submitting their information, admins approving or rejecting submissions, and storing the status history of KYC requests.

---

## **Requirements**

- Docker (>= 20.x)
- Docker Compose (>= 1.29.x)

---

## **Installation**

### **Using Docker**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/danielneris/api-kyc-api.git
   cd api-kyc
   ```

2. **Configure environment variables:**
   Create a `.env` file based on the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL=
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
   docker-compose exec app npm run db:generate && npm run db:migrate
   ```

---

## **Running the Server Locally (Without Docker)**

If you prefer running the project locally, follow these steps:

1. Install dependencies:
   ```bash
   npm install
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

### **KYC Management:**
- `GET /kyc` - Get All KYC
- `GET /kyc/:userId` - Get KYC status of a user
- `POST /kyc/:userId/upload` - Submit user KYC details
- `PATCH /kyc/update-status` - Update KYC status (approved or rejected)

### **KYC Status History:**
- `GET /kyc/:kycId/history` - Get KYC status history

### **File Management:**
- `POST /files/upload` - Upload files (requires authentication)
- `GET /upload/:id` - View file via shareable link
