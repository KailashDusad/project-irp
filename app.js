// Jai Shree Ram
// PROJECT usign SOCKET.IO, express, http, mongoose
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/irp");
  console.log("we have been connected with Database");
}
const dataSchema = new mongoose.Schema({
  email: String,
  message: String,
});

const Data = mongoose.model('irpproject', dataSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static' + '/template' +'/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('submitForm', (formData) => {
    const newData = new Data(formData);
    newData.save()
      .then(() => {
        console.log('Data saved to database');
        io.emit('updateData', formData);
      })
      .catch((err) => {
        console.error('Error saving data to database:', err.message);
      });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



//********************************************************************************************************************//
// Jai Shree Ram
// PROJECT usign PUG tempmlate engine, express, mongoose

// const express = require('express');
// const http = require('http');
// const mongoose = require('mongoose');
// const path = require('path');
// const app = express();

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/irp");
//   console.log("we have been connected with Database");
// }

// const irpSchema = new mongoose.Schema({
//     email: String,
//     message: String
//   });
//   const irpkitten = mongoose.model("irpproject", irpSchema);

// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "static/template"));
// app.use("/static", express.static("static"));

// app.get("/", (req, res) => {
//     res.status(200).render("index.pug");
//   });
// app.post("/submit", (req, res) => {
//     var myData = new irpkitten(req.body);
//     myData.save().then(() => {
//       res.send("This item has been saved to the database");
//     }).catch(() => {
//      console.log("Item has not been saved to the database");
//     });
//     res.status(200).render("index.pug");
//   });
// app.listen(3000, () => {console.log(`Server is running on http://localhost:${3000}`)});