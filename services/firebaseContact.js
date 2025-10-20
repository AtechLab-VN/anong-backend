const admin = require('firebase-admin');

// Initialize Firebase Admin (only if not already initialized)
if (!admin.apps.length) {
  try {
    const serviceAccount = require('../config/firebase-service-account.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://anong-default-rtdb.firebaseio.com"
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

const db = admin.firestore();

// Contact Service
const contactService = {
  // Get contact information
  async getContactInfo() {
    try {
      const doc = await db.collection('contact').doc('main').get();
      
      if (!doc.exists) {
        // Return default contact info if not found
        return {
          id: 'main',
          companyName: 'Anong',
          email: 'contact@anong.com',
          phone: '1900-xxxx',
          address: {
            street: '123 Đường ABC',
            ward: 'Phường XYZ',
            district: 'Quận 1',
            city: 'TP. Hồ Chí Minh',
            country: 'Việt Nam',
            postalCode: '700000'
          },
          businessHours: {
            weekdays: '8:00 - 22:00',
            weekends: '9:00 - 21:00',
            timezone: 'GMT+7'
          },
          socialMedia: {
            facebook: 'https://facebook.com/anong',
            instagram: 'https://instagram.com/anong',
            youtube: 'https://youtube.com/@anong',
            tiktok: 'https://tiktok.com/@anong',
            zalo: 'https://zalo.me/anong'
          },
          description: 'Anong - Cung cấp linh kiện điện tử, Arduino, cảm biến và module chất lượng cao với giá tốt nhất.',
          isActive: true
        };
      }
      
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error getting contact info:', error);
      throw error;
    }
  },

  // Update contact information
  async updateContactInfo(contactData) {
    try {
      const contact = {
        ...contactData,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await db.collection('contact').doc('main').set(contact, { merge: true });
      return { id: 'main', ...contact };
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  },

  // Create initial contact info
  async createInitialContact() {
    try {
      const initialContact = {
        companyName: 'Anong',
        email: 'contact@anong.com',
        phone: '1900-xxxx',
        address: {
          street: '123 Đường ABC',
          ward: 'Phường XYZ',
          district: 'Quận 1',
          city: 'TP. Hồ Chí Minh',
          country: 'Việt Nam',
          postalCode: '700000'
        },
        businessHours: {
          weekdays: '8:00 - 22:00',
          weekends: '9:00 - 21:00',
          timezone: 'GMT+7'
        },
        socialMedia: {
          facebook: 'https://facebook.com/anong',
          instagram: 'https://instagram.com/anong',
          youtube: 'https://youtube.com/@anong',
          tiktok: 'https://tiktok.com/@anong',
          zalo: 'https://zalo.me/anong'
        },
        description: 'Anong - Cung cấp linh kiện điện tử, Arduino, cảm biến và module chất lượng cao với giá tốt nhất.',
        isActive: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await db.collection('contact').doc('main').set(initialContact);
      return { id: 'main', ...initialContact };
    } catch (error) {
      console.error('Error creating initial contact:', error);
      throw error;
    }
  }
};

module.exports = {
  contactService
};
