# Real-Time Connection with Database using Web Sockets

This project demonstrates a real-time connection with a MongoDB database using web sockets. The project uses two methods:

1. **Socket.IO, Express.js, and MongoDB**: This method uses Socket.IO to monitor user activity. When a user submits the form present in `/static/template/index.html`, the user data is collected with a socket, emitted, and saved to MongoDB. The relevant files for this method are `app.js` and `/static/template/index.html`.

2. **Pug Template Engine, Express, and MongoDB**: This method uses the POST method of the form from `/static/template/index.pug` to get the user data. The data is then saved to MongoDB. The relevant files for this method are `app.js` (commented part), `/static/template/index.pug`, and `/static/style/form.css`.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository: `git clone https://github.com/KailashDusad/project-irp.git`
2. Navigate into the project directory: `cd project-irp`
3. Install the dependencies: `npm install`
4. Start the server: `node app.js`

## Usage

Open your web browser and navigate to `http://localhost:3000` to view the application.

