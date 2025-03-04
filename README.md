# Frontend - Credit Card Validator

This is the frontend for a credit card validation system built with **Next.js**. It provides an intuitive user interface for validating credit card details, including card number, cardholder name, expiry date, and CVV.

---

## **Technologies Used**

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: Library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework.
- **Axios**: HTTP client for API communication.
- **Vitest**: Testing framework for unit and integration tests.
- **React Testing Library**: Library for testing React components.

---

## **Project Structure**
```
frontend/
├── public/           # Static assets (e.g., images, fonts)
├── src/
│   ├── app/components/ # Reusable UI components (e.g., CreditCardForm, CreditCardList)
│   ├── pages/        # Application pages
│   ├── services/     # API service calls
│   ├── store/        # Redux reducers
│   ├── styles/       # Global styles and Tailwind configuration
│   ├── types/        # Interfaces and types
├── .env.example      # Environment variables template
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

---

## **🛠️ Getting Started**

Follow these steps to set up and run the frontend project.

### **Step 1: 🚀 Initial Setup**

1. Clone the repository:
   ```bash
    git clone https://github.com/PedroLuizComZ/frontend-credit-card-validator.git
   cd frontend-credit-card-validator
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```

### **Step 2: ⚙️ Environment Configuration**

1. Rename `.env.example` to `.env`:
   ```bash
   cp .env.example .env.local
   ```
2. Update the `.env` file with your backend API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

### **Step 3: 🏃‍♂️ Running the Project**

Start the development server:
   ```bash
   yarn run dev
   ```

The application will be available at `http://localhost:3000`.
