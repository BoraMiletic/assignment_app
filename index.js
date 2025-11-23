const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
