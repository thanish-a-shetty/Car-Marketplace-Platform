const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Function to create a new connection to another database
const connectSecondDB = async () => {
    try {
        const secondConn = await mongoose.createConnection(process.env.SECOND_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Second MongoDB Connected: ${process.env.SECOND_MONGODB_URI}`);
        return secondConn;
    } catch (error) {
        console.error(`Second DB Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { connectDB, connectSecondDB }; 