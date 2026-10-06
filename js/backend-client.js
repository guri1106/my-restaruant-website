/**
 * ==============================================================================
 * BITE BISTRO - BACKEND CLIENT & NOTIFICATION DISPATCHER
 * Academic Web Development Project
 * Project Submitted by: GURLEEN KAUR ( U.R.N - 2514567 )
 * Target Manager Phone: 9803354974
 * Target Manager Email: contact@bitebistro.com
 * ==============================================================================
 */

const BackendClient = {
  API_BASE_URL: 'http://localhost:5000',
  MANAGER_PHONE: '9803354974',
  MANAGER_EMAIL: 'contact@bitebistro.com',

  /**
   * Submit food order to backend API & dispatch alert
   */
  async submitOrder(orderData) {
    console.log('[Student Backend Client] Submitting food order...', orderData);
    
    // Save to customer's browser storage for instant order knowledge
    this.saveCustomerOrderLocally(orderData);

    let backendSuccess = false;
    let serverResponse = null;

    try {
      // Attempt sending to local Node.js Express Server
      const res = await fetch(`${this.API_BASE_URL}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        serverResponse = await res.json();
        backendSuccess = true;
        console.log('[Backend Connected] Server confirmed order:', serverResponse);
      }
    } catch (err) {
      console.warn('[Backend Offline Note] Local server not active; proceeding with client-side fallback storage and instant WhatsApp/SMS notification.', err.message);
    }

    return {
      success: true,
      backendActive: backendSuccess,
      order: orderData,
      whatsappUrl: this.createOrderWhatsAppLink(orderData),
      smsUrl: this.createOrderSmsLink(orderData),
      emailUrl: this.createOrderEmailLink(orderData)
    };
  },

  /**
   * Submit table reservation to backend API
   */
  async submitReservation(reservationData) {
    console.log('[Student Backend Client] Submitting table reservation...', reservationData);
    
    this.saveCustomerReservationLocally(reservationData);

    let backendSuccess = false;
    let serverResponse = null;

    try {
      const res = await fetch(`${this.API_BASE_URL}/api/reservation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });

      if (res.ok) {
        serverResponse = await res.json();
        backendSuccess = true;
        console.log('[Backend Connected] Server confirmed reservation:', serverResponse);
      }
    } catch (err) {
      console.warn('[Backend Offline Note] Local server not active; proceeding with client-side storage and WhatsApp/SMS notification.', err.message);
    }

    return {
      success: true,
      backendActive: backendSuccess,
      reservation: reservationData,
      whatsappUrl: this.createReservationWhatsAppLink(reservationData),
      smsUrl: this.createReservationSmsLink(reservationData),
      emailUrl: this.createReservationEmailLink(reservationData)
    };
  },

  /**
   * Generates a pre-filled WhatsApp link to +91 7009290367
   */
  createOrderWhatsAppLink(order) {
    const itemsText = order.items.map(i => `• ${i.quantity}x ${i.name} (Rs. ${(i.price * i.quantity)})`).join('%0A');
    const msg = `*NEW ORDER ALERT - BITE BISTRO*%0A%0A` +
      `*Order ID:* ${order.orderId}%0A` +
      `*Customer:* ${order.customerName}%0A` +
      `*Phone:* ${order.customerPhone}%0A` +
      `*Email:* ${order.customerEmail}%0A` +
      `*Fulfillment:* ${order.orderType}%0A` +
      `*Address:* ${order.address || 'Takeout Counter'}%0A` +
      `*Special Notes:* ${order.notes || 'None'}%0A%0A` +
      `*ITEMS ORDERED:*%0A${itemsText}%0A%0A` +
      `*Subtotal:* Rs. ${order.subtotal}%0A` +
      `*Taxes:* Rs. ${order.tax}%0A` +
      `*TOTAL BILL:* Rs. ${order.total}%0A%0A` +
      `_Notification sent to Manager GURLEEN KAUR (URN: 2514567) (+91 ${this.MANAGER_PHONE})_`;

    return `https://wa.me/91${this.MANAGER_PHONE}?text=${msg}`;
  },

  createOrderSmsLink(order) {
    const text = encodeURIComponent(`Bite Bistro Order #${order.orderId}: Customer ${order.customerName} (${order.customerPhone}) ordered ${order.items.length} items. Total: Rs. ${order.total}.`);
    return `sms:${this.MANAGER_PHONE}?body=${text}`;
  },

  createOrderEmailLink(order) {
    const subject = encodeURIComponent(`New Bite Bistro Order #${order.orderId} - ${order.customerName}`);
    const itemsText = order.items.map(i => `${i.quantity}x ${i.name} - Rs. ${(i.price * i.quantity)}`).join('\n');
    const body = encodeURIComponent(
      `NEW FOOD ORDER RECEIVED\n\n` +
      `Order Ref: ${order.orderId}\n` +
      `Customer Name: ${order.customerName}\n` +
      `Contact Phone: ${order.customerPhone}\n` +
      `Customer Email: ${order.customerEmail}\n` +
      `Type: ${order.orderType}\n` +
      `Address: ${order.address}\n` +
      `Special Instructions: ${order.notes}\n\n` +
      `Ordered Items:\n${itemsText}\n\n` +
      `Total Payable: Rs. ${order.total}\n`
    );
    return `mailto:${this.MANAGER_EMAIL}?subject=${subject}&body=${body}`;
  },

  createReservationWhatsAppLink(res) {
    const msg = `*NEW TABLE RESERVATION - BITE BISTRO*%0A%0A` +
      `*Booking Ref:* ${res.bookingId}%0A` +
      `*Guest:* ${res.name}%0A` +
      `*Phone:* ${res.phone}%0A` +
      `*Email:* ${res.email}%0A` +
      `*Party Size:* ${res.guests} Guest(s)%0A` +
      `*Date:* ${res.date}%0A` +
      `*Time:* ${res.time}%0A` +
      `*Atmosphere:* ${res.seatingArea}%0A` +
      `*Occasion:* ${res.occasion}%0A` +
      `*Special Notes:* ${res.specialRequests || 'None'}%0A%0A` +
      `_Alert sent to Manager GURLEEN KAUR (URN: 2514567) (+91 ${this.MANAGER_PHONE})_`;

    return `https://wa.me/91${this.MANAGER_PHONE}?text=${msg}`;
  },

  createReservationSmsLink(res) {
    const text = encodeURIComponent(`Bite Bistro Booking #${res.bookingId}: ${res.name}, ${res.guests} guests on ${res.date} at ${res.time}. Phone: ${res.phone}`);
    return `sms:${this.MANAGER_PHONE}?body=${text}`;
  },

  createReservationEmailLink(res) {
    const subject = encodeURIComponent(`Table Booking Alert #${res.bookingId} - ${res.name}`);
    const body = encodeURIComponent(
      `NEW TABLE RESERVATION\n\n` +
      `Reference: ${res.bookingId}\n` +
      `Guest Name: ${res.name}\n` +
      `Phone: ${res.phone}\n` +
      `Email: ${res.email}\n` +
      `Date & Time: ${res.date} at ${res.time}\n` +
      `Party Size: ${res.guests} Guests\n` +
      `Area: ${res.seatingArea}\n` +
      `Occasion: ${res.occasion}\n` +
      `Notes: ${res.specialRequests}\n`
    );
    return `mailto:${this.MANAGER_EMAIL}?subject=${subject}&body=${body}`;
  },

  /**
   * Save customer's personal order history in localStorage
   * so they have full knowledge and can view/track anytime
   */
  saveCustomerOrderLocally(order) {
    try {
      const history = JSON.parse(localStorage.getItem('my_bistro_orders') || '[]');
      history.unshift(order);
      localStorage.setItem('my_bistro_orders', JSON.stringify(history));
      localStorage.setItem('latest_bistro_order', JSON.stringify(order));
    } catch (e) {
      console.error(e);
    }
  },

  saveCustomerReservationLocally(res) {
    try {
      const history = JSON.parse(localStorage.getItem('my_bistro_reservations') || '[]');
      history.unshift(res);
      localStorage.setItem('my_bistro_reservations', JSON.stringify(history));
      localStorage.setItem('latest_bistro_reservation', JSON.stringify(res));
    } catch (e) {
      console.error(e);
    }
  }
};
