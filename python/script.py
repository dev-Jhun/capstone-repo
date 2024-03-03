import serial
import requests
import time

# Serial port configuration
serial_port = 'COM3'  # Change to the appropriate port
baud_rate = 9600

# Strapi API endpoint
strapi_endpoint = 'http://localhost:1337/api/sensor-values'  # Change to your Strapi endpoint

# Open serial connection
ser = serial.Serial(serial_port, baud_rate)

try:
    while True:
        # Read data from serial port
        line = ser.readline().decode().strip()
        
        # Parse received data
        sensor_data = line.split(',')
        
        # Convert sensor data to strings
        plantTemp = str(sensor_data[0])
        plantHumid = str(sensor_data[1])
        tdsLevel = str(sensor_data[2])
        phLevel = str(sensor_data[3])
        waterTemp = str(sensor_data[4])
        date = sensor_data[5]

        # Prepare data payload for Strapi
        data = {
            "data": {
                "plantTemp": plantTemp,
                "plantHumid": plantHumid,
                "tdsLevel": tdsLevel,
                "phLevel": phLevel,
                "waterTemp": waterTemp,
                "date": date
            }
        }
        
        # Send data to Strapi server
        response = requests.post(strapi_endpoint, json=data)
        
        # Print response from server
        print(response.text)

        # Wait for 30 seconds
        time.sleep(1)

except KeyboardInterrupt:
    ser.close()
