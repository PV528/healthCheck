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
    'rentalservice:9000', //tukaj mora biti url moje grpc mikrostoritve 
    grpc.credentials.createInsecure()
);

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/car/health', (req, res) => {
    try {
        axios.get('http://carservice:8080/actuator/health')
            .then(function (response) {
                const carHealth = response.data.status;
                res.status(200).json({ carHealth });
            })
            .catch(function (error) {
                console.error('Napaka', error);
                res.status(500).send('Prišlo je do napake');
            });
    } catch (error) {
        console.error('Napaka', error);
        res.status(500).send('Napaka');
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
        axios.get('http://userservice:8081/q/health')
            .then(function (response) {
                const carHealth = response.data.status;
                res.status(200).json({ carHealth });
            })
            .catch(function (error) {
                console.error('Napaka', error);
                res.status(500).send('Napaka');
            });
    } catch (error) {
        console.error('Napaka:', error);
        res.status(500).send('Napaka');
    }
});

app.listen(PORT, () => {
    console.log(`server teče na: ${PORT}`);
});
