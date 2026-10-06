# 🍽️ Bite Bistro - Restaurant Website & Backend System

**Project Type:** Academic Web Development Project  
**Project Submitted by:** GURLEEN KAUR ( U.R.N - 2514567 )  
**Manager Helpline & WhatsApp:** [+91 9803354974](tel:9803354974)  
**Manager Email Alert:** [contact@bitebistro.com](mailto:contact@bitebistro.com)  

---

## 📖 Project Overview

This project is a complete, human-crafted restaurant website and backend system designed for **Bite Bistro**. It features a warm, inviting dining theme, an interactive food ordering menu with a real-time cart, a table reservation system, and instant notification dispatches to the manager and customer.

---

## ✨ Key Features

### 1. 🛒 Online Food Ordering & Cart
- Real-time shopping cart with slide-out drawer.
- Add dishes, adjust quantities, calculate 5% GST, and place orders.
- Checkout form captures customer name, phone, email, and delivery/pickup preferences.
- Stores order history in `localStorage` so customers have continuous access to their order knowledge.

### 2. 📅 Table Reservation System
- Select dining date, lunch/dinner time slots, guest count (1–10+), and seating atmosphere (*Main Dining Hall*, *Garden Terrace*, *Family Lounge*, *Candlelight Corner*).
- Live real-time summary preview sidebar.
- Generates an instant **Table Reservation Confirmation Ticket** with booking reference code (`RES-XXXXX`).

### 3. 📲 Instant Notifications to Manager (+91 9803354974 & contact@bitebistro.com)
- **WhatsApp Dispatch:** One-click instant button that opens WhatsApp pre-filled with the complete order/booking slip addressed to **+91 9803354974**.
- **SMS Alert:** One-click SMS dispatch formatted for **9803354974**.
- **Email Alert:** Backend sends an email summary to **contact@bitebistro.com** using Nodemailer (or drafts via mailto fallback).

### 4. ℹ️ Complete Customer Order Knowledge
- After ordering or booking, the customer immediately sees a dedicated **Knowledge Receipt Modal**:
  - Unique Order/Booking ID
  - Kitchen preparation status and estimated delivery time (25–35 mins)
  - Detailed list of dishes, prices, and tax breakdown
  - Direct print and save button
  - Confirmation copy sent to the customer's email

### 5. 👨‍🍳 Kitchen Staff & Manager Portal (`admin.html`)
- A dashboard for the restaurant manager (Gurleen Kaur - URN: 2514567) to view all incoming food orders and table bookings.
- One-click buttons to WhatsApp or call the customer directly.

---

## 📁 File Structure

```
Bite-Bistro-Professional-Website/
├── package.json               # Node.js backend configuration & dependencies
├── server.js                  # Express backend with /api/order & /api/reservation
├── .env.example               # Template for email and phone environment variables
├── data/
│   ├── orders.json            # Persistent JSON database for food orders
│   └── reservations.json      # Persistent JSON database for table bookings
├── css/
│   └── style.css              # Clean, human-written student stylesheet
├── js/
│   ├── backend-client.js      # Frontend-backend bridge & WhatsApp/Email dispatcher
│   ├── cart.js                # Cart management & order knowledge receipt generator
│   └── main.js                # Navigation, table booking form & category filter
├── index.html                 # Homepage with chef specials & quick reservation
├── menu.html                  # Interactive food menu with live search & cart
├── reservations.html          # Table booking page with live summary preview
├── about.html                 # Restaurant story, chef brigade & photo gallery
├── contact.html               # Contact details, map, and inquiry form
├── admin.html                 # Kitchen staff dashboard to view all orders & bookings
└── README.md                  # Project documentation
```

---

## 🚀 How to Run the Website

### Option 1: Quick Browser Preview (No installation required)
You can test the entire frontend directly in your browser:
1. Double-click **`index.html`** or right-click -> **Open With** -> **Chrome / Edge / Firefox**.
2. Browse the menu, add items to cart, checkout, or book a table.
3. The system will save everything in browser storage, show the complete knowledge receipt, and provide one-click buttons to WhatsApp **+91 9803354974** and email **contact@bitebistro.com**!

### Option 2: Running with Node.js Backend Server
To run the full backend server with persistent JSON storage:
1. Open PowerShell or Command Prompt in this folder:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```
4. Access the staff dashboard at:
   ```
   http://localhost:5000/admin.html
   ```

---

## 👤 Project Credits
- **Project Submitted by:** GURLEEN KAUR ( U.R.N - 2514567 )
- **Course:** Web Development Training Project
- **Manager Helpline & Phone:** +91 9803354974
- **Email:** contact@bitebistro.com
