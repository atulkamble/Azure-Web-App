const express = require('express');
const sql = require('mssql');
const app = express();
const port = process.env.PORT || 3000;

// Connect to Azure SQL Database
const config = {
  user: 'mywebapp-server-admin',
  password: 'N7lZDxc$wht9O$jk',
  server: 'mywebapp-server.database.windows.net',
  database: 'mywebapp-database',
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: false, // Use SSL certificate
  },
};

sql.connect(config)
  .then(() => console.log('Connected to Azure SQL Database'))
  .catch(err => console.error('SQL Connection Error:', err));

app.get('/', (req, res) => {
  res.send('Hello, Azure!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
