/**
 * ==============================================================================
 * BITE BISTRO - RESTAURANT BACKEND SERVER
 * Academic Web Development Project
 * Project Submitted by: GURLEEN KAUR ( U.R.N - 2514567 )
 * Contact / Manager Email: contact@bitebistro.com
 * Manager Phone / Alert SMS: 9803354974
 * ==============================================================================
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Manager / Restaurant Owner Contact details
const RESTAURANT_OWNER_EMAIL = process.env.MANAGER_EMAIL || 'contact@bitebistro.com';
const RESTAURANT_OWNER_PHONE = '9803354974';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files from the project folder
app.use(express.static(path.join(__dirname)));

// File Paths for saving data
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
const RESERVATIONS_FILE = path.join(__dirname, 'data', 'reservations.json');

// Ensure data folder exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Nodemailer Transporter Configuration
// (Configure EMAIL_USER and EMAIL_PASS in your .env file or Gmail App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'contact@bitebistro.com',
    pass: process.env.EMAIL_PASS || '' // Enter Gmail App Password here
  }
});

// Helper: Read JSON file safely
function readData(filePath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    return content ? JSON.parse(content) : [];
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return [];
  }
}

// Helper: Write JSON file safely
function writeData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err.message);
  }
}

// ==============================================================================
// 1. POST /api/order -> Handle New Customer Food Orders
// ==============================================================================
app.post('/api/order', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Assign order ID and timestamp if not already provided
    const orderId = orderData.orderId || ('BB-' + Math.floor(100000 + Math.random() * 900000));
    const newOrder = {
      orderId,
      customerName: orderData.customerName || 'Guest',
      customerEmail: orderData.customerEmail || 'Not Provided',
      customerPhone: orderData.customerPhone || 'Not Provided',
      orderType: orderData.orderType || 'Pickup',
      address: orderData.address || 'Takeout Counter',
      notes: orderData.notes || 'None',
      items: orderData.items || [],
      subtotal: Number(orderData.subtotal) || 0,
      tax: Number(orderData.tax) || 0,
      total: Number(orderData.total) || 0,
      date: orderData.date || new Date().toISOString().split('T')[0],
      time: orderData.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Received',
      createdAt: new Date().toISOString()
    };

    // Save to orders.json file (Local backend database)
    const orders = readData(ORDERS_FILE);
    orders.unshift(newOrder);
    writeData(ORDERS_FILE, orders);

    console.log('\n========================================');
    console.log(`🛎️ NEW ORDER RECEIVED [Ref: ${newOrder.orderId}]`);
    console.log(`👤 Customer: ${newOrder.customerName} (${newOrder.customerPhone})`);
    console.log(`📧 Customer Email: ${newOrder.customerEmail}`);
    console.log(`💰 Total Bill: Rs. / $ ${newOrder.total}`);
    console.log(`📲 SMS / Alert destination: ${RESTAURANT_OWNER_PHONE}`);
    console.log(`📩 Notification Email target: ${RESTAURANT_OWNER_EMAIL}`);
    console.log('========================================\n');

    // Build Items List HTML for Email
    const itemsListHtml = newOrder.items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Rs. ${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    // Email 1: Sent to Restaurant Owner (sukhjitmun31@gmail.com)
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 8px;">🛎️ New Food Order Alert - Bite Bistro</h2>
        <p><strong>Order ID:</strong> ${newOrder.orderId}</p>
        <p><strong>Customer Name:</strong> ${newOrder.customerName}</p>
        <p><strong>Phone:</strong> ${newOrder.customerPhone}</p>
        <p><strong>Email:</strong> ${newOrder.customerEmail}</p>
        <p><strong>Fulfillment Type:</strong> ${newOrder.orderType}</p>
        <p><strong>Delivery/Pickup Address:</strong> ${newOrder.address}</p>
        <p><strong>Special Instructions:</strong> ${newOrder.notes}</p>
        
        <h3 style="margin-top: 20px;">Ordered Items:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f8f8f8;">
              <th style="padding: 8px; text-align: left;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsListHtml}
          </tbody>
        </table>

        <div style="text-align: right; margin-top: 15px;">
          <p><strong>Subtotal:</strong> Rs. ${newOrder.subtotal.toFixed(2)}</p>
          <p><strong>Taxes & Packaging:</strong> Rs. ${newOrder.tax.toFixed(2)}</p>
          <p style="font-size: 18px; color: #b8860b;"><strong>Total Amount: Rs. ${newOrder.total.toFixed(2)}</strong></p>
        </div>
        <p style="font-size: 12px; color: #777; margin-top: 20px;">Order placed on: ${newOrder.date} at ${newOrder.time}</p>
      </div>
    `;

    // Email 2: Sent to Customer for full knowledge of their order
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 8px;">Bite Bistro - Order Confirmation</h2>
        <p>Dear <strong>${newOrder.customerName}</strong>,</p>
        <p>Thank you for choosing Bite Bistro! Your order has been successfully sent to our kitchen brigade and is being prepared with fresh ingredients.</p>
        
        <div style="background: #fdfaf3; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <p><strong>Order Reference Number:</strong> ${newOrder.orderId}</p>
          <p><strong>Status:</strong> Kitchen Preparing (Est. 25-35 minutes)</p>
          <p><strong>Delivery / Pickup:</strong> ${newOrder.orderType}</p>
          <p><strong>Address:</strong> ${newOrder.address}</p>
        </div>

        <h3>Your Dishes:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f8f8f8;">
              <th style="padding: 8px; text-align: left;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsListHtml}
          </tbody>
        </table>

        <div style="text-align: right; margin-top: 15px;">
          <p style="font-size: 18px; color: #b8860b;"><strong>Total Paid / Payable: Rs. ${newOrder.total.toFixed(2)}</strong></p>
        </div>

        <p style="margin-top: 20px;">If you have any questions or changes, please call restaurant manager at <strong>+91 ${RESTAURANT_OWNER_PHONE}</strong>.</p>
        <p style="font-size: 13px; color: #555;">Warm regards,<br><strong>Bite Bistro Team</strong></p>
      </div>
    `;

    // Try sending email if credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Send to restaurant owner
      await transporter.sendMail({
        from: `"Bite Bistro Online" <${process.env.EMAIL_USER}>`,
        to: RESTAURANT_OWNER_EMAIL,
        subject: `🛎️ New Order #${newOrder.orderId} from ${newOrder.customerName}`,
        html: ownerEmailHtml
      }).catch(e => console.log('Owner email notification error:', e.message));

      // Send knowledge email to customer
      if (newOrder.customerEmail && newOrder.customerEmail.includes('@')) {
        await transporter.sendMail({
          from: `"Bite Bistro" <${process.env.EMAIL_USER}>`,
          to: newOrder.customerEmail,
          subject: `Your Bite Bistro Order Confirmation #${newOrder.orderId}`,
          html: customerEmailHtml
        }).catch(e => console.log('Customer knowledge email error:', e.message));
      }
    } else {
      console.log('💡 Note: EMAIL_PASS not set in .env. Order saved locally and ready for WhatsApp/SMS alert to 7009290367!');
    }

    res.status(200).json({
      success: true,
      message: 'Order placed successfully! Notifications sent to manager and customer.',
      order: newOrder,
      smsTarget: RESTAURANT_OWNER_PHONE,
      emailTarget: RESTAURANT_OWNER_EMAIL
    });

  } catch (error) {
    console.error('Server error processing order:', error);
    res.status(500).json({ success: false, message: 'Server error saving order', error: error.message });
  }
});

// ==============================================================================
// 2. POST /api/reservation -> Handle Table Bookings
// ==============================================================================
app.post('/api/reservation', async (req, res) => {
  try {
    const booking = req.body;
    const bookingId = booking.bookingId || ('RES-' + Math.floor(10000 + Math.random() * 90000));

    const newReservation = {
      bookingId,
      name: booking.name || 'Valued Guest',
      email: booking.email || 'Not Provided',
      phone: booking.phone || 'Not Provided',
      guests: Number(booking.guests) || 2,
      date: booking.date || new Date().toISOString().split('T')[0],
      time: booking.time || '7:00 PM',
      seatingArea: booking.seatingArea || 'Main Dining Hall',
      occasion: booking.occasion || 'Dining',
      specialRequests: booking.specialRequests || 'None',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    // Save to reservations.json file
    const reservations = readData(RESERVATIONS_FILE);
    reservations.unshift(newReservation);
    writeData(RESERVATIONS_FILE, reservations);

    console.log('\n========================================');
    console.log(`🍽️ NEW TABLE RESERVATION [Ref: ${newReservation.bookingId}]`);
    console.log(`👤 Guest: ${newReservation.name} (${newReservation.phone})`);
    console.log(`📅 Date: ${newReservation.date} at ${newReservation.time}`);
    console.log(`👥 Guests: ${newReservation.guests} | Area: ${newReservation.seatingArea}`);
    console.log(`📲 SMS / Alert destination: ${RESTAURANT_OWNER_PHONE}`);
    console.log(`📩 Notification Email target: ${RESTAURANT_OWNER_EMAIL}`);
    console.log('========================================\n');

    // Owner notification email content
    const ownerResEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #b8860b;">🍽️ New Table Booking Alert - Bite Bistro</h2>
        <p><strong>Booking Ref:</strong> ${newReservation.bookingId}</p>
        <p><strong>Guest Name:</strong> ${newReservation.name}</p>
        <p><strong>Guest Phone:</strong> ${newReservation.phone}</p>
        <p><strong>Guest Email:</strong> ${newReservation.email}</p>
        <p><strong>Party Size:</strong> ${newReservation.guests} Guest(s)</p>
        <p><strong>Date & Time:</strong> ${newReservation.date} at ${newReservation.time}</p>
        <p><strong>Seating Atmosphere:</strong> ${newReservation.seatingArea}</p>
        <p><strong>Occasion:</strong> ${newReservation.occasion}</p>
        <p><strong>Special Notes:</strong> ${newReservation.specialRequests}</p>
      </div>
    `;

    // Customer confirmation email content
    const customerResEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #b8860b;">Table Reservation Confirmed - Bite Bistro</h2>
        <p>Dear <strong>${newReservation.name}</strong>,</p>
        <p>Your table reservation at Bite Bistro has been confirmed. We look forward to hosting you!</p>
        
        <div style="background: #fdfaf3; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <p><strong>Reservation Code:</strong> ${newReservation.bookingId}</p>
          <p><strong>Date:</strong> ${newReservation.date}</p>
          <p><strong>Time Slot:</strong> ${newReservation.time}</p>
          <p><strong>Guests:</strong> ${newReservation.guests}</p>
          <p><strong>Dining Area:</strong> ${newReservation.seatingArea}</p>
        </div>

        <p>For any adjustments, contact concierge at <strong>+91 ${RESTAURANT_OWNER_PHONE}</strong> or email <strong>${RESTAURANT_OWNER_EMAIL}</strong>.</p>
        <p>Warm regards,<br><strong>Bite Bistro Hospitality Team</strong></p>
      </div>
    `;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Bite Bistro Reservations" <${process.env.EMAIL_USER}>`,
        to: RESTAURANT_OWNER_EMAIL,
        subject: `🍽️ New Table Booking: ${newReservation.name} (${newReservation.guests} guests)`,
        html: ownerResEmail
      }).catch(e => console.log('Owner email notification error:', e.message));

      if (newReservation.email && newReservation.email.includes('@')) {
        await transporter.sendMail({
          from: `"Bite Bistro" <${process.env.EMAIL_USER}>`,
          to: newReservation.email,
          subject: `Table Confirmed at Bite Bistro: ${newReservation.date} at ${newReservation.time}`,
          html: customerResEmail
        }).catch(e => console.log('Customer email error:', e.message));
      }
    }

    res.status(200).json({
      success: true,
      message: 'Table reservation saved and alerts dispatched!',
      reservation: newReservation,
      smsTarget: RESTAURANT_OWNER_PHONE,
      emailTarget: RESTAURANT_OWNER_EMAIL
    });

  } catch (error) {
    console.error('Server error processing reservation:', error);
    res.status(500).json({ success: false, message: 'Server error saving reservation', error: error.message });
  }
});

// ==============================================================================
// 3. GET /api/orders -> List all orders for Kitchen / Admin view
// ==============================================================================
app.get('/api/orders', (req, res) => {
  const orders = readData(ORDERS_FILE);
  res.json({ success: true, count: orders.length, orders });
});

// ==============================================================================
// 4. GET /api/reservations -> List all reservations for Host / Admin view
// ==============================================================================
app.get('/api/reservations', (req, res) => {
  const reservations = readData(RESERVATIONS_FILE);
  res.json({ success: true, count: reservations.length, reservations });
});

// Start the server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Bite Bistro Server running at http://localhost:${PORT}`);
  console.log(`📋 Orders API:        http://localhost:${PORT}/api/orders`);
  console.log(`📅 Reservations API:  http://localhost:${PORT}/api/reservations`);
  console.log(`📱 Alert Phone:       +91 ${RESTAURANT_OWNER_PHONE}`);
  console.log(`📧 Alert Email:       ${RESTAURANT_OWNER_EMAIL}`);
  console.log(`======================================================\n`);
});
