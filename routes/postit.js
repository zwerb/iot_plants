const axios = require('axios').default;
const path = require('path');
const known_bots = require(path.join(__dirname, "../config")).known_bots;

let plant_keys = [
  "name",
  "moisture",
  "light",
  "temperature",
  "humidity",
  "lat",
  "lng",
  "location",
  "metadata",
];
let plant_object = {};


const postBody = {
    name: 'Plantbot-102',
    moisture: 463,
    light: 543,
    temperature: 22.5,
    humidity: 67,
    location: 'Rohan'
};

const postHeaders = {headers: {"Bot-Token": known_bots[0]} }

const sendPutRequest = async () => {
    try {
        const resp = await axios.post('http://localhost:3000/updates/create', postBody, postHeaders);
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

sendPutRequest();