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

// Product Service
const productService = {
  // Get all products with filters
  async getProducts(filters = {}) {
    try {
      // Get all products first, then filter in memory to avoid index requirements
      let query = db.collection('products');
      
      const snapshot = await query.get();
      let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter by isActive
      products = products.filter(product => product.isActive === true);
      
      // Filter by category
      if (filters.category && filters.category !== 'Tất cả') {
        products = products.filter(product => product.category === filters.category);
      }
      
      // Filter by search
      if (filters.search) {
        products = products.filter(product => 
          product.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      // Sort by createdAt (newest first)
      products.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate() - a.createdAt.toDate();
        }
        return 0;
      });
      
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Get product categories
  async getCategories() {
    try {
      const snapshot = await db.collection('products').get();
      
      const categories = [...new Set(
        snapshot.docs
          .map(doc => doc.data())
          .filter(product => product.isActive === true)
          .map(product => product.category)
      )];
      
      return ['Tất cả', ...categories];
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },

  // Get single product
  async getProduct(id) {
    try {
      const doc = await db.collection('products').doc(id).get();
      
      if (!doc.exists) {
        throw new Error('Product not found');
      }
      
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  },

  // Create product
  async createProduct(productData) {
    try {
      const product = {
        ...productData,
        isActive: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection('products').add(product);
      return { id: docRef.id, ...product };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  async updateProduct(id, productData) {
    try {
      const product = {
        ...productData,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await db.collection('products').doc(id).update(product);
      return { id, ...product };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product (soft delete)
  async deleteProduct(id) {
    try {
      await db.collection('products').doc(id).update({
        isActive: false,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

// Order Service
const orderService = {
  // Create order
  async createOrder(orderData) {
    try {
      const order = {
        ...orderData,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection('orders').add(order);
      return { id: docRef.id, ...order };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get order
  async getOrder(id) {
    try {
      const doc = await db.collection('orders').doc(id).get();
      
      if (!doc.exists) {
        throw new Error('Order not found');
      }
      
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error getting order:', error);
      throw error;
    }
  },

  // Get all orders
  async getOrders(filters = {}) {
    try {
      let query = db.collection('orders');
      
      if (filters.status) {
        query = query.where('status', '==', filters.status);
      }
      
      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  },

  // Update order status
  async updateOrderStatus(id, status) {
    try {
      await db.collection('orders').doc(id).update({
        status,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

module.exports = {
  db,
  productService,
  orderService
};
