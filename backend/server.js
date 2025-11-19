const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const requestLogger = require('./middleware/requestLogger');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL?.split(',') || '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookmarks', require('./routes/bookmarkRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

