// server.js
const express = require('express');
const { SerialPort } = require('serialport');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3030;

const serialPort = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
})

app.use(cors());
app.use(bodyParser.json());

app.post('/command', async (req, res) => {
  try {
    const { command } = req.body;
    await serialPort.write(command);
    //await serialPort.close();
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
