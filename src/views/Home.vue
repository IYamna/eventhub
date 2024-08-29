<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">{{ msg }}</h1>
    
    <button @click="showCreateEventModal = true" class="btn btn-primary mb-4">Create New Event</button>
    <button @click="regenerateEvents" class="btn btn-secondary mb-4 ms-2">Load More Events</button>
    
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="event in events" :key="event.id" class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ event.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ event.date }} at {{ event.time }}</h6>
            <p class="card-text">{{ event.description }}</p>
            <p class="card-text"><small class="text-muted">{{ event.type }} at {{ event.place }}</small></p>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <div class="d-flex justify-content-between align-items-center">
              <button @click="editEvent(event)" class="btn btn-outline-secondary btn-sm flex-grow-1 mx-1">Edit</button>
              <button @click="deleteEvent(event.id)" class="btn btn-outline-danger btn-sm flex-grow-1 mx-1">Delete</button>
              <button @click="registerForEvent(event.id)" class="btn btn-outline-primary btn-sm flex-grow-1 mx-1">
                {{ isUserRegistered(event) ? 'Unregister' : 'Register' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-if="showCreateEventModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Edit Event' : 'Create New Event' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="eventTitle" class="form-label">Event Title</label>
            <input v-model="event.title" type="text" class="form-control" id="eventTitle" required>
          </div>
          <div class="mb-3">
            <label for="eventDate" class="form-label">Date</label>
            <input v-model="event.date" type="date" class="form-control" id="eventDate" required>
          </div>
          <div class="mb-3">
            <label for="eventTime" class="form-label">Time</label>
            <input v-model="event.time" type="time" class="form-control" id="eventTime" required>
          </div>
          <div class="mb-3">
            <label for="eventType" class="form-label">Event Type</label>
            <select v-model="event.type" class="form-select" id="eventType" required>
              <option value="">Select event type</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Concert">Concert</option>
              <option value="Pop-Up">Pop-Up</option>
              <option value="Charity">Charity</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="eventPlace" class="form-label">Place</label>
            <input v-model="event.place" type="text" class="form-control" id="eventPlace" required>
          </div>
          <div class="mb-3">
            <label for="eventDescription" class="form-label">Description</label>
            <textarea v-model="event.description" class="form-control" id="eventDescription" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update Event' : 'Create Event' }}</button>
          <button type="button" @click="closeModal" class="btn btn-secondary ms-2">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { eventService } from '@/services/eventService';
import { useAuth } from '@/services/useAuth';

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  setup() {
    const event = ref({ id: null, title: '', date: '', time: '', type: '', place: '', description: '' });
    const events = ref([]);
    const { currentUser } = useAuth();
    const isEditing = ref(false);
    const showCreateEventModal = ref(false);

    const loadEvents = () => {
      eventService.initializeEvents();
      events.value = eventService.getEvents();
    };

    const handleSubmit = () => {
      if (isEditing.value) {
        eventService.updateEvent(event.value);
      } else {
        eventService.saveEvent(event.value);
      }
      loadEvents();
      closeModal();
    };

    const editEvent = (eventToEdit) => {
      event.value = { ...eventToEdit };
      isEditing.value = true;
      showCreateEventModal.value = true;
    };

    const closeModal = () => {
      showCreateEventModal.value = false;
      resetForm();
    };

    const resetForm = () => {
      event.value = { id: null, title: '', date: '', time: '', type: '', place: '', description: '' };
      isEditing.value = false;
    };

    const deleteEvent = (eventId) => {
      eventService.deleteEvent(eventId);
      loadEvents();
    };

    const registerForEvent = (eventId) => {
      if (currentUser.value) {
        const registeredEvent = events.value.find(e => e.id === eventId);
        if (isUserRegistered(registeredEvent)) {
          eventService.unregisterFromEvent(eventId, currentUser.value.id);
        } else {
          eventService.registerForEvent(eventId, currentUser.value.id);
        }
        loadEvents();
      } else {
        alert('Please log in to register for events');
      }
    };

    const regenerateEvents = () => {
    eventService.generateRandomEvents();
    loadEvents();
  };

    const isUserRegistered = (event) => {
      return event.participants && event.participants.includes(currentUser.value?.id);
    };

    onMounted(loadEvents);

    return { 
      event, 
      events, 
      handleSubmit, 
      editEvent, 
      deleteEvent, 
      registerForEvent,
      isEditing,
      isUserRegistered,
      showCreateEventModal,
      closeModal,
      regenerateEvents
    };
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}
</style>