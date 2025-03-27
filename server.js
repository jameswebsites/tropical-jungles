const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const port = 80;

// Serve the 'index.html' file from the root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Get the device's IP address
const getIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let ifaceDetail of interfaces[iface]) {
      if (ifaceDetail.family === 'IPv4' && !ifaceDetail.internal) {
        return ifaceDetail.address;
      }
    }
  }
  return 'localhost'; // Fallback to localhost if no IP is found
};

// Start the server
app.listen(port, () => {
  const ipAddress = getIpAddress();
  console.log(`Server is running at http://${ipAddress}:${port}`);
});
