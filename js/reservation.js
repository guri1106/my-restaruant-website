/**
 * BITE BISTRO - TABLE RESERVATION MANAGEMENT SYSTEM
 * Dynamic date/time slot selection, seating area preference,
 * real-time summary preview, validation, and confirmation ticket generation.
 */

const ReservationApp = {
  state: {
    guests: 2,
    date: '',
    time: '19:00',
    area: 'Main Dining Hall',
    occasion: 'None',
    name: '',
    email: '',
    phone: '',
    notes: ''
  },

  init() {
    this.setupDateInput();
    this.setupGuestButtons();
    this.setupTimeSlots();
    this.setupAreaCards();
    this.setupFormSubmit();
    this.updateSummaryCard();
  },

  setupDateInput() {
    const dateInput = document.getElementById('res-date');
    if (!dateInput) return;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Default to tomorrow or today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDate = tomorrow.toISOString().split('T')[0];
    dateInput.value = defaultDate;
    this.state.date = defaultDate;

    dateInput.addEventListener('change', (e) => {
      this.state.date = e.target.value;
      this.updateSummaryCard();
    });
  },

  setupGuestButtons() {
    const buttons = document.querySelectorAll('.guest-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('bg-amber-500', 'text-black', 'border-amber-400'));
        buttons.forEach(b => b.classList.add('bg-white/5', 'text-gray-300', 'border-white/10'));

        btn.classList.add('bg-amber-500', 'text-black', 'border-amber-400');
        btn.classList.remove('bg-white/5', 'text-gray-300', 'border-white/10');

        this.state.guests = parseInt(btn.getAttribute('data-guests') || '2', 10);
        this.updateSummaryCard();
      });
    });
  },

  setupTimeSlots() {
    const slots = document.querySelectorAll('.time-slot-btn');
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        slots.forEach(s => s.classList.remove('border-amber-400', 'bg-amber-500/20', 'text-amber-300'));
        slots.forEach(s => s.classList.add('border-white/10', 'bg-white/5', 'text-gray-300'));

        slot.classList.add('border-amber-400', 'bg-amber-500/20', 'text-amber-300');
        slot.classList.remove('border-white/10', 'bg-white/5', 'text-gray-300');

        this.state.time = slot.getAttribute('data-time') || '19:00';
        this.updateSummaryCard();
      });
    });
  },

  setupAreaCards() {
    const areas = document.querySelectorAll('.seating-area-card');
    areas.forEach(card => {
      card.addEventListener('click', () => {
        areas.forEach(c => c.classList.remove('border-amber-500', 'ring-2', 'ring-amber-500/30'));
        areas.forEach(c => c.classList.add('border-white/10'));

        card.classList.add('border-amber-500', 'ring-2', 'ring-amber-500/30');
        card.classList.remove('border-white/10');

        this.state.area = card.getAttribute('data-area') || 'Main Dining Hall';
        this.updateSummaryCard();
      });
    });
  },

  updateSummaryCard() {
    const summaryGuests = document.getElementById('summary-guests');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const summaryArea = document.getElementById('summary-area');

    if (summaryGuests) summaryGuests.textContent = `${this.state.guests} Guest${this.state.guests > 1 ? 's' : ''}`;
    
    if (summaryDate) {
      if (this.state.date) {
        const d = new Date(this.state.date + 'T00:00:00');
        summaryDate.textContent = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      } else {
        summaryDate.textContent = 'Select Date';
      }
    }

    if (summaryTime) {
      const [h, m] = this.state.time.split(':');
      let hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      summaryTime.textContent = `${hour}:${m} ${ampm}`;
    }

    if (summaryArea) summaryArea.textContent = this.state.area;
  },

  setupFormSubmit() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('res-name')?.value.trim();
      const email = document.getElementById('res-email')?.value.trim();
      const phone = document.getElementById('res-phone')?.value.trim();
      const occasion = document.getElementById('res-occasion')?.value || 'Casual Fine Dining';
      const notes = document.getElementById('res-notes')?.value.trim() || 'No special requirements';

      if (!name || !email || !phone) {
        if (typeof Cart !== 'undefined') {
          Cart.showToast('Please complete your name, email, and contact number.', 'alert');
        } else {
          alert('Please enter your contact details.');
        }
        return;
      }

      this.state.name = name;
      this.state.email = email;
      this.state.phone = phone;
      this.state.occasion = occasion;
      this.state.notes = notes;

      const confirmationCode = 'RES-' + Math.floor(10000 + Math.random() * 90000);

      // Save reservation details
      const reservationRecord = {
        code: confirmationCode,
        ...this.state,
        createdAt: new Date().toISOString()
      };
      try {
        localStorage.setItem('bite_bistro_last_res', JSON.stringify(reservationRecord));
      } catch (err) {}

      // Show Confirmation Modal
      this.showTicketModal(reservationRecord);
    });
  },

  showTicketModal(data) {
    const modal = document.getElementById('res-ticket-modal');
    const content = document.getElementById('res-ticket-content');
    if (!modal || !content) return;

    const formattedDate = new Date(data.date + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const [h, m] = data.time.split(':');
    let hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    const formattedTime = `${hour}:${m} ${ampm}`;

    content.innerHTML = `
      <div class="border-b border-dashed border-amber-500/30 pb-5 text-center">
        <div class="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold">Table Guaranteed</span>
        <h3 class="text-2xl font-serif font-bold text-white mt-1">Reservation Confirmed</h3>
        <p class="text-xs text-gray-400 mt-0.5">Booking Reference: <span class="font-mono font-bold text-amber-300">${data.code}</span></p>
      </div>

      <div class="py-4 space-y-3 text-xs">
        <div class="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.03]">
          <span class="text-gray-400">Primary Guest:</span>
          <span class="text-white font-semibold">${data.name}</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="p-2.5 rounded-lg bg-white/[0.03]">
            <span class="text-gray-400 block mb-0.5">Date:</span>
            <span class="text-white font-semibold">${formattedDate}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-white/[0.03]">
            <span class="text-gray-400 block mb-0.5">Time:</span>
            <span class="text-amber-300 font-bold">${formattedTime}</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="p-2.5 rounded-lg bg-white/[0.03]">
            <span class="text-gray-400 block mb-0.5">Party Size:</span>
            <span class="text-white font-semibold">${data.guests} Guest${data.guests > 1 ? 's' : ''}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-white/[0.03]">
            <span class="text-gray-400 block mb-0.5">Dining Atmosphere:</span>
            <span class="text-white font-semibold">${data.area}</span>
          </div>
        </div>
        ${data.occasion !== 'None' ? `
          <div class="p-2.5 rounded-lg bg-white/[0.03] flex justify-between">
            <span class="text-gray-400">Celebration / Occasion:</span>
            <span class="text-amber-300 font-medium">${data.occasion}</span>
          </div>
        ` : ''}
        ${data.notes && data.notes !== 'No special requirements' ? `
          <div class="p-2.5 rounded-lg bg-white/[0.03]">
            <span class="text-gray-400 block mb-0.5">Special Dietary / Requests:</span>
            <span class="text-gray-300 italic">${data.notes}</span>
          </div>
        ` : ''}
      </div>

      <div class="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-[11px] text-amber-200/90 leading-relaxed mb-4">
        A formal confirmation concierge email and SMS reminder have been transmitted to <strong>${data.email}</strong>. Tables are reserved with a 15-minute courtesy grace window.
      </div>

      <div class="flex gap-2">
        <button onclick="window.print()" class="btn-outline-gold flex-1 text-xs py-2.5">
          Print Confirmation
        </button>
        <button onclick="ReservationApp.closeTicketModal()" class="btn-gold flex-1 text-xs py-2.5">
          Done
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  },

  closeTicketModal() {
    const modal = document.getElementById('res-ticket-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ReservationApp.init();
});
