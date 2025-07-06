const mongoose = require('mongoose');
const UsedCar = require('./models/UsedCar'); // Adjust the path if necessary

const dbUrl = 'mongodb://localhost:27017/UIUX'; // Your MongoDB connection string

const updates = [
  { title: 'tata curvv', kilometersRun: 20000 },
  { title: 'i20', kilometersRun: 50000 },
  { title: 'hyundai creta', kilometersRun: 45000 }, // First Creta update
  { title: 'hyundai creta', kilometersRun: 40000 }, // Second Creta update - will overwrite the first for any matching documents
];

async function updateCars() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for update script.');

    for (const update of updates) {
      console.log(`Updating cars with title: ${update.title} to set kilometersRun: ${update.kilometersRun}`);
      const result = await UsedCar.updateMany(
        { title: update.title },
        { $set: { kilometersRun: update.kilometersRun } }
      );
      console.log(`Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`);
    }

    console.log('Database update script finished.');
  } catch (error) {
    console.error('Error during database update:', error);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

updateCars(); 