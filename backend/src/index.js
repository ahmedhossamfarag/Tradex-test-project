require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const discussionRoutes = require('./routes/discussion');
const strategyRoutes = require('./routes/strategy');
const cryptoPricesRoutes = require('./routes/crypto-prices');
const { errorHandler } = require('./middleware/errorHandler');
// const logger = require('./middleware/logger');
const { initWSServer, getWSS } = require('./config/websocket');
const { initCryptoPricesBroadcastService } = require('./services/crypto-prices-broadcast');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(logger.logRequest);

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/strategies', strategyRoutes);
app.use('/api/crypto-prices', cryptoPricesRoutes);

// Error handling
app.use(errorHandler);

const httpServer = createServer(app);
initWSServer(httpServer);
initCryptoPricesBroadcastService();

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});
