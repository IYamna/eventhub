<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">{{ msg }}</h1>
    
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h2 class="mb-3">My Registered Events</h2>
        <div v-if="userEvents.length === 0" class="alert alert-info">
          You haven't registered for any events yet.
        </div>
        <div v-else class="row row-cols-1 row-cols-md-2 g-4">
          <div v-for="event in userEvents" :key="event.id" class="col">
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title">{{ event.title }}</h3>
                <p class="card-text"><strong>Date:</strong> {{ event.date }} at {{ event.time }}</p>
                <p class="card-text"><strong>Type:</strong> {{ event.type }}</p>
                <p class="card-text"><strong>Place:</strong> {{ event.place }}</p>
                <p class="card-text">{{ event.description }}</p>
              </div>
              <div class="card-footer">
                <button @click="unregisterFromEvent(event.id)" class="btn btn-warning">Unregister</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { eventService } from '@/services/eventService';
import { useAuth } from '@/services/useAuth';

export default {
  name: 'DashboardPage',
  props: {
    msg: String
  },
  setup() {
    const { currentUser } = useAuth();
    const allEvents = ref([]);

    const userEvents = computed(() => {
      return allEvents.value.filter(event => 
        event.participants && event.participants.includes(currentUser.value.id)
      );
    });

    const unregisterFromEvent = (eventId) => {
      eventService.unregisterFromEvent(eventId, currentUser.value.id);
      loadEvents();
    };

    const loadEvents = () => {
      allEvents.value = eventService.getEvents();
    };

    onMounted(loadEvents);

    return { userEvents, unregisterFromEvent };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
