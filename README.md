# Logger(Entry Managment Software)

Web app to manage hosts and visitors information. A responsive web app build with the help of [React.js](https://reactjs.org/) and [Express.js](http://expressjs.com/)


## Requirements
* [MongoDB](https://www.mongodb.com/)
* [TeleSign](https://www.telesign.com/) for SMS integration

## Quick Start

Create .env file at root folder and provide environment variables
```bash
# Gmail integration
EMAIL
PASSWORD
# Telesign integration
customerId
apiKey
rest_endpoint
```


``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

* Registration for authenticated host.
* Keeps a record of visitors and their activities.
* Using [MongoDB](https://www.mongodb.com/) for data storage.
* Gives updates using [Gmail](https://www.gmail.com/) wiht the help of [NodeMailer](https://nodemailer.com/).
* Integration of [TeleSign](https://www.telesign.com/) for SMS service.

## Screenshots

![00.png](https://github.com/chauhanparth210/Logger/blob/master/Screenshots/01.png)
![01.png](https://github.com/chauhanparth210/Logger/blob/master/Screenshots/02.png)
![02.png](https://github.com/chauhanparth210/Logger/blob/master/Screenshots/03.png)
![03.png](https://github.com/chauhanparth210/Logger/blob/master/Screenshots/04.png)
![04.png](https://github.com/chauhanparth210/Logger/blob/master/Screenshots/05.png)
![05.png](https://github.com/chauhanparth210/Logger/blob/master/Screenshots/06.png)
![06.png](https://github.com/chauhanparth210/Logger/blob/master/Screenshots/07.png)
![07.png](https://github.com/chauhanparth210/Logger/blob/master/Screenshots/08.png)
![08.png](https://github.com/chauhanparth210/Logger/blob/master/Screenshots/09.png)
