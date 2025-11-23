const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const setupSwagger = require('./documentation/swagger');

app.use(express.json());

// routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Swagger UI
setupSwagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
