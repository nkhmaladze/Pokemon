const mongoose = require('mongoose');
const { searchEbay } = require('./getPrice');
require('dotenv').config();

// Schema for the eBay prices
const priceSchema = new mongoose.Schema({
    searchTerm: { type: String, unique: true },  // The search term used
    averagePrice: Number,  // The average price of the first 5 items
    timestamp: { type: Date, default: Date.now }  // The timestamp when the data is cached
});

// Model based on the schema
const Price = mongoose.model('Price', priceSchema);

async function cacheData(keyword) {
    // MongoDB connection URI
    const uri = process.env.MONGODB_URI;

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        // Search eBay 
        const prices = await searchEbay(keyword);

        if (prices.length > 0) {
            // Calculate the average price of the first 5 items
            const firstFivePrices = prices.slice(0, 5).map(p => parseFloat(p.price));
            const averagePrice = firstFivePrices.reduce((sum, price) => sum + price, 0) / firstFivePrices.length;

            // Update if exists, insert if not
            const result = await Price.findOneAndUpdate(
                { searchTerm: keyword },
                { averagePrice: averagePrice, timestamp: Date.now() },
                { new: true, upsert: true }
            );

            console.log(`Data for "${keyword}" cached/updated with average price: $${averagePrice.toFixed(2)}`);
        } else {
            console.log('No prices found to cache');
        }
    } catch (error) {
        console.error('Error caching data:', error);
    } finally {
        // Close the MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

cacheData('Pokemon 003/034');
