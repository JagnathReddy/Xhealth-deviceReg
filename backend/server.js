import express from 'express'
import dotenv from 'dotenv';
import router from './routes/userRoutes.js'
import docRouter from './routes/doctorRoutes.js' ;
import appointmentRouter from './routes/appointmentRoute.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import NotificationRouter from './routes/notificationRouter.js'
import cors from 'cors'
dotenv.config();

connectDB();
const port = process.env.PORT || 5000;
const app = express()
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(cors())
app.use(express.json()); // this makes req.body available.. else body won't be available
app.use(express.urlencoded({extended: true})); // Allows to send form data. If I don't add this, I won't be able to send data..
app.use(cookieParser());
app.use('/api/users',router) // This is for userRoutes only
app.use('/api/doctors',docRouter) // doctorRoutes
app.use('/api/notification',NotificationRouter)//for targeting devices
app.use('/api/users/appointments',appointmentRouter) // doctorRoutes


app.get('/', (req,res)=>{
    res.send(`server is ready and running on port ${port}`)
})

app.use(notFound);
app.use(errorHandler);
app.listen(port, () =>{
    console.log(`This is console log`)
    console.log(`server is ready and running on port ${port}`)
})