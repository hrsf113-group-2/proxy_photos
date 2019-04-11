const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

const port = 3000;

app.use('/location/:roomid/', express.static(path.join(__dirname, '../public')));

app.get('/photos/byroom/:roomid/all', (req, res) => {
  const roomid = req.params.roomid;
  axios.get(`http://localhost:3002/photos/byroom/${roomid}/all`)
  .then(response => res.send(response.data))
  .catch(error => res.status(500).end());
});

app.get('/rooms/:room_id/reservations', (req, res) => {
  const roomid = req.params.room_id;
  axios.get(`http://localhost:3001/rooms/${roomid}/reservations`)
  .then(response => res.send(response.data))
  .catch(error => res.status(500).end());
});

app.get('/relatedlisting', (req, res) => {
  axios.get(`http://localhost:3003/relatedlisting`)
  .then(response => {
    res.send(response.data);
  })
  .catch(error => res.status(500).end());
});

app.get('/api/locations/:locationID/reviews', (req, res) => {
  const locationID = req.params.locationID;
  axios.get(`http://localhost:3004/api/locations/${locationID}/reviews`)
  .then(response => res.send(response.data))
  .catch(error => res.status(500).end());
});

app.listen(port, () => console.log(`[Server] Listening on port ${port}`));
