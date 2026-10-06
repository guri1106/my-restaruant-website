/**
 * ==============================================================================
 * BITE BISTRO - MAIN JAVASCRIPT
 * Academic Web Development Project
 * Project Submitted by: GURLEEN KAUR ( U.R.N - 2514567 )
 * Handles Navigation, Table Reservation Form, Menu Filtering, and Alerts
 * Alert Phone: 9803354974 | Alert Email: contact@bitebistro.com
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initReservationForm();
  initMenuFilters();
  initSearch();
});

// 1. Mobile Hamburger Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }
}

// 2. Table Reservation Booking System
function initReservationForm() {
  const resForm = document.getElementById('table-booking-form');
  if (!resForm) return;

  // Set minimum date to today
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    if (!dateInput.value) {
      dateInput.value = today;
    }
  }

  // Update live preview in sidebar
  const guestsInput = document.getElementById('res-guests');
  const timeInput = document.getElementById('res-time');
  const areaInput = document.getElementById('res-area');

  const updatePreview = () => {
    const pDate = document.getElementById('preview-date');
    const pTime = document.getElementById('preview-time');
    const pGuests = document.getElementById('preview-guests');
    const pArea = document.getElementById('preview-area');

    if (pDate && dateInput) pDate.textContent = dateInput.value || 'Today';
    if (pTime && timeInput) pTime.textContent = timeInput.value || '7:00 PM';
    if (pGuests && guestsInput) pGuests.textContent = `${guestsInput.value || 2} Guests`;
    if (pArea && areaInput) pArea.textContent = areaInput.value || 'Main Dining Hall';
  };

  if (dateInput) dateInput.addEventListener('change', updatePreview);
  if (timeInput) timeInput.addEventListener('change', updatePreview);
  if (guestsInput) guestsInput.addEventListener('change', updatePreview);
  if (areaInput) areaInput.addEventListener('change', updatePreview);
  updatePreview();

  // Form submit handler
  resForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('res-name').value.trim();
    const phone = document.getElementById('res-phone').value.trim();
    const email = document.getElementById('res-email').value.trim();
    const guests = document.getElementById('res-guests').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const area = document.getElementById('res-area').value;
    const occasion = document.getElementById('res-occasion')?.value || 'Dinner';
    const notes = document.getElementById('res-notes')?.value.trim() || 'None';

    const bookingId = 'RES-' + Math.floor(10000 + Math.random() * 90000);

    const bookingPayload = {
      bookingId,
      name,
      phone,
      email,
      guests,
      date,
      time,
      seatingArea: area,
      occasion,
      specialRequests: notes
    };

    // Send to Backend Client (dispatches alerts to 9803354974 & contact@bitebistro.com)
    const result = await BackendClient.submitReservation(bookingPayload);

    // Show Table Reservation Confirmation Ticket to the Customer
    showReservationConfirmation(bookingPayload, result);

    resForm.reset();
    updatePreview();
  });
}

// Show Table Booking Knowledge Ticket Modal
function showReservationConfirmation(booking, dispatchResult) {
  const modal = document.getElementById('reservation-ticket-modal');
  const content = document.getElementById('reservation-ticket-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="receipt-header">
      <div class="receipt-success-icon">✓</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff;">Table Reservation Guaranteed!</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
        Booking Reference: <span class="receipt-ref-code">${booking.bookingId}</span>
      </p>
    </div>

    <!-- Customer Knowledge Details -->
    <div class="receipt-knowledge-box">
      <div class="knowledge-title">ℹ️ Customer Table Knowledge:</div>
      <p><strong>Primary Guest:</strong> ${booking.name}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Date & Time:</strong> ${booking.date} at ${booking.time}</p>
      <p><strong>Party Size:</strong> ${booking.guests} Guests</p>
      <p><strong>Seating Area:</strong> ${booking.seatingArea}</p>
      <p><strong>Special Notes:</strong> ${booking.specialRequests}</p>
      <p><strong>Status:</strong> Table Confirmed (15 min grace window)</p>
    </div>

    <!-- Notification Targets -->
    <div style="background: rgba(212, 163, 89, 0.1); border: 1px solid rgba(212, 163, 89, 0.3); border-radius: 8px; padding: 10px; margin-top: 15px; font-size: 0.78rem;">
      <p style="color: var(--primary-color); font-weight: 600;">🔔 Restaurant Management Notified:</p>
      <p>• Alert routed to: <strong>+91 9803354974</strong></p>
      <p>• Booking slip dispatched to: <strong>contact@bitebistro.com</strong></p>
    </div>

    <!-- Action Buttons -->
    <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 18px;">
      <a href="${dispatchResult.whatsappUrl}" target="_blank" class="btn btn-whatsapp" style="text-align: center;">
        📲 Confirm Booking with Restaurant on WhatsApp (9803354974)
      </a>
      <a href="${dispatchResult.emailUrl}" class="btn btn-outline" style="text-align: center;">
        ✉️ Send Booking Copy to Restaurant Desk
      </a>
      <button onclick="window.print()" class="btn btn-outline" style="text-align: center;">
        🖨️ Print Reservation Slip
      </button>
      <button onclick="closeReservationModal()" class="btn btn-primary" style="margin-top: 5px;">
        Close & Done
      </button>
    </div>
  `;

  modal.classList.add('show');
}

function closeReservationModal() {
  const modal = document.getElementById('reservation-ticket-modal');
  if (modal) modal.classList.remove('show');
}

// 3. Menu Category Filtering
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (filterBtns.length === 0 || menuCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      menuCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 4. Quick Live Search for Menu Dishes
function initSearch() {
  const searchInput = document.getElementById('menu-search');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!searchInput || menuCards.length === 0) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    menuCards.forEach(card => {
      const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

      if (title.includes(query) || desc.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
