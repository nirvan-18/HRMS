  const express = require('express');
  const passport = require('passport');
  const session = require('express-session');
  const jwt = require('jsonwebtoken'); 
  const cookieParser = require('cookie-parser');
  const mongoose = require('mongoose');
  require('dotenv').config();
  require('./config/passport'); 
  const config=require('./config/config')
  const model=require('./models/user')
  const axios=require('axios')
  const app = express();
  const MongoStore = require('connect-mongo');
  const Sample=require('./models/initial_db')
  const cors = require('cors')


  const authRoutes = require('./routes/authRoutes');
  const userRoutes=require('./routes/userRoutes')


  app.use(express.json())

  app.use(cors({ 
    origin: 'http://localhost:5174', 
    // Allow requests from this
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,
     }));

  app.use(cookieParser()); 
  app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.MONGO_URL,
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    cookie: { secure: false,
      httpOnly: true,  
        //  sameSite: 'strict',
    },
    signed:true
    
  }));
  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());



  app.get('/',(req,res)=>{
    res.send(`
      <html>
        <head>
          <title>Login</title>
        </head>
        <body>
          <h1>Click Login Button</h1>
          <a href="/login"><button>Login </button></a>
        </body>
      </html>
    `)

  })


  app.use(authRoutes);
  app.use(userRoutes);


const startServer = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log('Connected to MongoDB Local');

    app.listen(config.PORT, () => {
      console.log(`Server running on port http://localhost:${config.PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB Local', error);
    process.exit(1); 
  }

  mongoose.connection.on('error', err => {
    console.error('Mongoose connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
  });
};

startServer();










