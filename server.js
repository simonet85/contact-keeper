const express = require('express');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();

//Connect Database
connectDB();

app.get('/', (req, res) => res.json({ msg: 'Welcome to contact keeper...' }));

//Define Api Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Set up the server
app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
