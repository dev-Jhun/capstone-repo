const express = require('express');
const { SerialPort } = require('serialport');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request-promise-native');

const app = express();
const port = 3030;

// Serial port configuration
const serialPortPath = 'COM7'; // Change to the appropriate port
const baudRate = 9600;
const serialPort = new SerialPort({
  path: serialPortPath,
  baudRate: baudRate,
});

app.use(cors());
app.use(bodyParser.json());

// Strapi API endpoint
const strapiEndpoint = 'http://192.168.1.6:1337/api/sensor-values'; // Change to your Strapi endpoint

// Serial port data parsing and sending to Strapi
let receivedData = ''; // Buffer to store received data

serialPort.on('data', async (data) => {
  receivedData += data.toString(); // Append received data to buffer
  const packets = receivedData.split('\n'); // Split data into packets by newline

  // Process complete packets
  for (const packet of packets.slice(0, -1)) {
    try {
      const sensorData = JSON.parse(packet); // Parse JSON data
      const payload = { data: sensorData }; // Wrap sensor data in a payload object
      const response = await request.post({ url: strapiEndpoint, json: payload }); // Send data to Strapi
      console.log('Response from Strapi:', response);
    } catch (error) {
      console.error('Error sending data to Strapi:', error.message);
    }
  }

  receivedData = packets.slice(-1)[0]; // Store incomplete packet for next iteration
});

// Endpoint for receiving commands and sending them to the serial port
app.post('/command', async (req, res) => {
  try {
    const { command } = req.body;
    serialPort.write(command); // Write command to the serial port
    res.status(200).send('Command sent successfully');
  } catch (error) {
    console.error('Error sending command:', error);
    res.status(500).send('Internal server error: ' + error.message);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://192.168.1.6:${port}`);
});
