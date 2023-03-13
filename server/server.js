const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./mongodb/connect.js');
const postRoutes = require('./routes/posts.js');
const dalleRoutes = require('./routes/dalle.js');

dotenv.config();

const app = express();

// database connect
connectDB();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// setting up routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on PORT: ' + PORT))