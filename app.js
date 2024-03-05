// Jai Shree Ram
const http = require('http');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const app = express();

main().catch(err => console.log(err));
async function main(){
    await mongoose.connect('mongodb://localhost:27017/irp');
    console.log('Connected to MongoDB');
}
const irpShema = new mongoose.Schema({
    email: String,
    message: String
})
const irp = mongoose.model('irpproject', irpShema);
const server = http.createServer(app);
const io = socketIo(server);

app.use('/static', express.static('static'));
app.set('view engine', 'ejs');


io.on('connection', (socket) => {
    socket.broadcast.emit('message', 'User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'html', 'index.html'));
});
app.post('/', (req,res) => {
    const userData = new irp(req.body);
    userData.save().then(() => {
        console.log('Data has been saved');
    }).catch(() => {
        console.log('Data has not been saved');
    });
    res.sendFile(path.join(__dirname, 'static', 'html', 'index.html'));
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});