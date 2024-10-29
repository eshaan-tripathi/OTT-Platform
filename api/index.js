const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const listRoute = require('./routes/lists');
dotenv.config();

app.use(express.json());

const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.error('Database Not Connected', err));

// Use the auth route
app.use('/api/auth', authRoute);
app.use('/api/users',userRoute);
app.use('/movies',movieRoute);
app.use('/api/lists',listRoute);
app.listen(8800, () => {
  console.log(`Backend Server Started`);
});
