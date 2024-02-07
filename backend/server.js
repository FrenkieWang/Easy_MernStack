const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const clientRouter = require('./routes/clientRoute');
const therapistRouter = require('./routes/therapistRoute');
const sessionRouter = require('./routes/sessionRoute');

app.use('/clients', clientRouter);
app.use('/therapists', therapistRouter);
app.use('/sessions', sessionRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});