const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true
        })
        console.log('Base de datos conecatada correctamente...');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;