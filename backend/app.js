const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', taskRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
