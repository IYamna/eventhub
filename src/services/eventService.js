import { notificationService } from './notificationService';

const STORAGE_KEY = 'events';

export const eventService = {
  getEvents() {
    const events = localStorage.getItem(STORAGE_KEY);
    return events ? JSON.parse(events) : [];
  },

  saveEvent(event) {
    const events = this.getEvents();
    event.id = Date.now();
    events.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  },

  updateEvent(updatedEvent) {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
      events[index] = updatedEvent;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  },

  deleteEvent(eventId) {
    const events = this.getEvents().filter(e => e.id !== eventId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  },

  registerForEvent(eventId, userId) {
    const events = this.getEvents();
    const event = events.find(e => e.id === eventId);
    if (event) {
      if (!event.participants) {
        event.participants = [];
      }
      if (!event.participants.includes(userId)) {
        event.participants.push(userId);
        this.updateEvent(event);
      }
    }
  },

  unregisterFromEvent(eventId, userId) {
    const events = this.getEvents();
    const event = events.find(e => e.id === eventId);
    if (event && event.participants) {
      event.participants = event.participants.filter(id => id !== userId);
      this.updateEvent(event);
    }
  },

  checkUpcomingEvents(userId) {
    const events = this.getEvents();
    const now = new Date();
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    
    events.forEach(event => {
      const eventDate = new Date(event.date + 'T' + event.time);
      if (eventDate > now && eventDate <= twoDaysFromNow && event.participants.includes(userId)) {
        notificationService.addNotification({
          id: Date.now(),
          message: `Reminder: "${event.title}" is coming up on ${event.date} at ${event.time}`,
          eventId: event.id
        });
      }
    });
  },

  generateRandomEvents() {
    const eventTitles = [
      'Team Building Workshop', 'Product Launch', 'Annual Conference',
  'Charity Fundraiser', 'Tech Meetup', 'Leadership Seminar',
  'Hackathon', 'Networking Mixer', 'Industry Panel Discussion',
  'Customer Appreciation Day', 'Art Exhibition', 'Music Festival',
  'Food & Wine Tasting', 'Book Club Meeting', 'Startup Pitch Competition',
  'Fitness Boot Camp', 'Photography Workshop', 'Film Screening',
  'Comedy Night', 'Science Fair', 'Job Fair', 'Gaming Tournament',
  'Fashion Show', 'Cooking Class', 'Yoga Retreat'
    ];

    const locations = [
      'Main Conference Room', 'Central Park', 'City Convention Center',
      'Downtown Hotel', 'Tech Incubator Space', 'University Auditorium',
      'Community Center', 'Local Art Gallery', 'Riverside Pavilion',
      'Corporate Headquarters', 'New York City, Times Square','London, Covent Garden','Paris, Champs-Élysées','Tokyo, Shibuya District','Sydney, Darling Harbour','San Francisco, Fisherman\'s Wharf',
      'Berlin, Alexanderplatz','Rome, Via del Corso','Barcelona, La Rambla','Amsterdam, Jordaan District','Dubai, Downtown Dubai','Singapore, Orchard Road','Los Angeles, Hollywood Boulevard',
      'Toronto, Distillery District','Hong Kong, Tsim Sha Tsui','Chicago, Magnificent Mile','Mumbai, Marine Drive','Rio de Janeiro, Copacabana','Seoul, Gangnam District',
      'Vancouver, Gastown','Melbourne, Federation Square','Boston, Newbury Street','Miami, South Beach','Prague, Old Town Square','Edinburgh, Royal Mile',
      'Montreal, Old Montreal','Cape Town, V&A Waterfront','Vienna, Stephansplatz','Seattle, Pike Place Market','Bangkok, Sukhumvit Road'
    ];

    const randomEvents = [];

    for (let i = 0; i < 20; i++) {
      const startDate = new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000);
      const endDate = new Date(startDate.getTime() + Math.random() * 4 * 60 * 60 * 1000);

      const event = {
        id: Date.now() + i,
        title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
        date: startDate.toISOString().split('T')[0],
        time: startDate.toTimeString().split(' ')[0].substr(0, 5),
        endTime: endDate.toTimeString().split(' ')[0].substr(0, 5),
        place: locations[Math.floor(Math.random() * locations.length)],
        description: 'Come and bring your friends!',
      };

      randomEvents.push(event);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(randomEvents));
  },

  initializeEvents() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      this.generateRandomEvents();
    }
  }
};

