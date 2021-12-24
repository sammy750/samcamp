const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,

    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '617d147291810e26c478ccc6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [{
                url: 'https://res.cloudinary.com/djpxbg2eh/image/upload/v1635848693/YelpCamp/unwsw4vs4vgjpljlwuks.jpg',        
                filename: 'YelpCamp/unwsw4vs4vgjpljlwuks'
            },
            {
                url: 'https://res.cloudinary.com/djpxbg2eh/image/upload/v1635848693/YelpCamp/uqpr4wdmvbwo7aneoav0.jpg',        
                filename: 'YelpCamp/uqpr4wdmvbwo7aneoav0'
            }],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit explicabo repellendus delectus at est porro corporis molestias ducimus alias officia?',
            price
        })
    await camp.save();
}
}

seedDB().then(() => {
    mongoose.connection.close();
})