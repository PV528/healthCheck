const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const { RentalServiceClient } = require('./generated/rental_grpc_pb');
const { HealthCheckRequest} = require('./generated/rental_pb');

const app = express();
const PORT = process.env.PORT;

const grpcClient = new RentalServiceClient(
    'localhost:9000', //tukaj mora biti url moje grpc mikrostoritve 
    grpc.credentials.createInsecure()
);

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/car/health', (req, res) => {
    try {
        // Make a GET request to the endpoint
        axios.get('http://localhost:8080/actuator/health')
            .then(function (response) {
                // Handle the response here
                const carHealth = response.data.status;
                res.status(200).json({ carHealth });
            })
            .catch(function (error) {
                // Handle error
                console.error('Error fetching car health status:', error);
                res.status(500).send('Error fetching car health status');
            });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('An error occurred');
    }
});

app.get('/api/health', (req, res) => {
    try {
        const request = new HealthCheckRequest();
        grpcClient.check(request, (error, response) => {
            if (error) {
                console.error('gRPC napaka:', error);
                res.status(500).send("Prišlo je do napake: " + error.message);
            } else {
                res.json(response.toObject());
            }
        });
    } catch (error) {
        console.error('Napaka pri obdelavi zahteve', error);
        res.send('Napaka pri obdelavi zahteve');
    }
});

app.get('/user/health', (req, res) => {
    try {
        // Make a GET request to the endpoint
        axios.get('http://localhost:8081/q/health')
            .then(function (response) {
                // Handle the response here
                const carHealth = response.data.status;
                res.status(200).json({ carHealth });
            })
            .catch(function (error) {
                // Handle error
                console.error('Error fetching car health status:', error);
                res.status(500).send('Error fetching car health status');
            });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(PORT, () => {
    console.log(`Gateway server teče na: ${PORT}`);
});
