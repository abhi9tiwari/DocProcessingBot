const express = require('express');
const config = require('./config');
const documentRoutes = require('./routes/documentRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(express.json());

// routes
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});
