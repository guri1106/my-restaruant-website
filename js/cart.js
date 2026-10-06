/**
 * ==============================================================================
 * BITE BISTRO - SHOPPING CART & ORDER KNOWLEDGE SYSTEM
 * Academic Web Development Project
 * Project Submitted by: GURLEEN KAUR ( U.R.N - 2514567 )
 * Contact / Manager: +91 9803354974 | contact@bitebistro.com
 * ==============================================================================
 */

const Cart = {
  STORAGE_KEY: 'bite_bistro_cart',

  // Get items from browser localStorage
  getItems() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Cart read error:', e);
      return [];
    }
  },

  // Save updated cart to localStorage
  saveItems(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateUI();
  },

  // Add food item to cart
  addItem(id, name, price, image) {
    const items = this.getItems();
    const existing = items.find(i => i.id === id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: id,
        name: name,
        price: Number(price),
        image: image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
        quantity: 1
      });
    }

    this.saveItems(items);
    this.showToast(`Added "${name}" to your order!`);
  },

  // Remove item completely
  removeItem(id) {
    let items = this.getItems();
    items = items.filter(i => i.id !== id);
    this.saveItems(items);
    this.showToast('Item removed from order');
  },

  // Change quantity (+1 or -1)
  changeQty(id, delta) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(id);
    } else {
      this.saveItems(items);
    }
  },

  // Clear entire cart
  clearCart() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateUI();
    this.showToast('Order cart cleared');
  },

  // Calculate total item count
  getTotalCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Calculate subtotal in Rupees / Currency
  getSubtotal() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  // Update navbar badges and drawer view
  updateUI() {
    const count = this.getTotalCount();
    const subtotal = this.getSubtotal();

    // Update count badges
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });

    // Update floating total
    const floatingTotals = document.querySelectorAll('.cart-floating-amount');
    floatingTotals.forEach(el => {
      el.textContent = `₹${subtotal.toFixed(2)}`;
    });

    // Render Drawer item list
    const drawerList = document.getElementById('drawer-items-list');
    const emptyMsg = document.getElementById('drawer-empty-msg');
    const drawerFooter = document.getElementById('drawer-footer-sec');

    if (drawerList) {
      const items = this.getItems();
      if (items.length === 0) {
        drawerList.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        if (drawerFooter) drawerFooter.style.display = 'none';
      } else {
        if (emptyMsg) emptyMsg.style.display = 'none';
        if (drawerFooter) drawerFooter.style.display = 'block';

        drawerList.innerHTML = items.map(item => `
          <div class="cart-item-row">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
            <div class="cart-item-info">
              <h5>${item.name}</h5>
              <div class="item-price">₹${item.price} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="Cart.changeQty('${item.id}', -1)">-</button>
              <span style="font-weight: 600; font-size: 0.85rem; min-width: 16px; text-align: center;">${item.quantity}</span>
              <button class="qty-btn" onclick="Cart.changeQty('${item.id}', 1)">+</button>
            </div>
            <button onclick="Cart.removeItem('${item.id}')" style="background: none; border: none; color: #888; cursor: pointer; margin-left: 6px;" title="Remove">✕</button>
          </div>
        `).join('');

        // Update Subtotal and 5% GST
        const subtotalEl = document.getElementById('drawer-subtotal');
        const taxEl = document.getElementById('drawer-tax');
        const totalEl = document.getElementById('drawer-total');

        const tax = subtotal * 0.05; // 5% GST
        const grandTotal = subtotal + tax;

        if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
        if (taxEl) taxEl.textContent = `₹${tax.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `₹${grandTotal.toFixed(2)}`;
      }
    }
  },

  // Open & Close Cart Drawer
  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    this.updateUI();
  },

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  },

  // Open Checkout Modal
  openCheckout() {
    const items = this.getItems();
    if (items.length === 0) {
      alert('Your cart is empty! Please add some tasty dishes first.');
      return;
    }
    this.closeDrawer();

    const subtotal = this.getSubtotal();
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.add('show');
      const totalDisplay = document.getElementById('checkout-modal-total');
      if (totalDisplay) totalDisplay.textContent = `₹${total.toFixed(2)}`;
    }
  },

  closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('show');
  },

  // Submit Order -> Calls Backend + Dispatches Alerts to 9803354974 & contact@bitebistro.com
  async submitOrderForm(event) {
    event.preventDefault();

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const email = document.getElementById('cust-email').value.trim();
    const orderType = document.getElementById('cust-order-type').value;
    const address = document.getElementById('cust-address').value.trim();
    const notes = document.getElementById('cust-notes').value.trim();

    const items = [...this.getItems()];
    const subtotal = this.getSubtotal();
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));
    const orderId = 'BB-' + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const orderPayload = {
      orderId,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      orderType,
      address,
      notes,
      items,
      subtotal,
      tax,
      total,
      date,
      time
    };

    // Close checkout form
    this.closeCheckout();

    // Call Backend Client
    const result = await BackendClient.submitOrder(orderPayload);

    // Clear cart after placing order
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateUI();

    // Render Order Knowledge Receipt for the customer
    this.showOrderKnowledgeReceipt(orderPayload, result);
  },

  // Displays complete knowledge receipt to the customer
  showOrderKnowledgeReceipt(order, dispatchResult) {
    const receiptModal = document.getElementById('receipt-modal');
    const content = document.getElementById('receipt-content');
    if (!receiptModal || !content) return;

    const itemsListHtml = order.items.map(i => `
      <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 5px;">
        <span>${i.quantity}x ${i.name}</span>
        <span style="color: var(--primary-color); font-weight: 600;">₹${(i.price * i.quantity).toFixed(2)}</span>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="receipt-header">
        <div class="receipt-success-icon">✓</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff;">Order Successfully Placed!</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
          Order Reference Code: <span class="receipt-ref-code">${order.orderId}</span>
        </p>
      </div>

      <!-- Customer Knowledge Banner -->
      <div class="receipt-knowledge-box">
        <div class="knowledge-title">ℹ️ Customer Order Knowledge & Status:</div>
        <p><strong>Status:</strong> Sent to Kitchen (Est. Time: 25 - 35 mins)</p>
        <p><strong>Fulfillment:</strong> ${order.orderType}</p>
        <p><strong>Customer Name:</strong> ${order.customerName}</p>
        <p><strong>Phone:</strong> ${order.customerPhone}</p>
        <p><strong>Confirmation Sent To:</strong> ${order.customerEmail}</p>
      </div>

      <div style="margin: 15px 0; border-top: 1px solid var(--border-color); padding-top: 10px;">
        <h5 style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">Ordered Dishes:</h5>
        ${itemsListHtml}
      </div>

      <div style="border-top: 1px dashed var(--border-color); padding-top: 10px; font-size: 0.85rem;">
        <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
          <span>Subtotal:</span>
          <span>₹${order.subtotal.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
          <span>GST (5%):</span>
          <span>₹${order.tax.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: bold; color: #fff; margin-top: 6px;">
          <span>Total Amount:</span>
          <span style="color: var(--primary-color);">₹${order.total.toFixed(2)}</span>
        </div>
      </div>

      <!-- Manager Notification Badges -->
      <div style="background: rgba(212, 163, 89, 0.1); border: 1px solid rgba(212, 163, 89, 0.3); border-radius: 8px; padding: 10px; margin-top: 15px; font-size: 0.78rem;">
        <p style="color: var(--primary-color); font-weight: 600;">🔔 Dispatch Alerts Triggered:</p>
        <p>• Alert routed to Manager Phone: <strong>+91 9803354974</strong></p>
        <p>• Order copy sent to: <strong>contact@bitebistro.com</strong></p>
      </div>

      <!-- Action Buttons for Customer -->
      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 18px;">
        <a href="${dispatchResult.whatsappUrl}" target="_blank" class="btn btn-whatsapp" style="text-align: center;">
          📲 Send Details to Restaurant WhatsApp (9803354974)
        </a>
        <a href="${dispatchResult.emailUrl}" class="btn btn-outline" style="text-align: center;">
          ✉️ Send Email Copy to Restaurant Desk
        </a>
        <button onclick="window.print()" class="btn btn-outline" style="text-align: center;">
          🖨️ Print / Save Knowledge Receipt
        </button>
        <button onclick="Cart.closeReceiptModal()" class="btn btn-primary" style="margin-top: 5px;">
          Done
        </button>
      </div>
    `;

    receiptModal.classList.add('show');
  },

  closeReceiptModal() {
    const modal = document.getElementById('receipt-modal');
    if (modal) modal.classList.remove('show');
  },

  // Student Toast Message
  showToast(message) {
    let toast = document.getElementById('student-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'student-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2800);
  }
};

// Initialize Cart on Load
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateUI();

  // Close overlay on click
  const overlay = document.getElementById('cart-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => Cart.closeDrawer());
  }
});
