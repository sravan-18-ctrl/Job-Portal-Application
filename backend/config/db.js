const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log('🔄 Attempting MongoDB Atlas connection...');
    
    const conn = await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes('Invalid credentials')) {
      console.error('❌ Check your MongoDB Atlas credentials in .env file');
    } else if (error.message.includes('not authorized')) {
      console.error('❌ User is not authorized for this database');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('❌ Cannot resolve MongoDB Atlas host. Check your internet connection');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
