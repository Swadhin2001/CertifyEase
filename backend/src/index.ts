import express from "express";
import multer from 'multer';
import {router} from './routes/index'
import connectDB from './db/index'
const app = express ();
import cors from 'cors';


const port = 3000 || process.env.PORT;

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use ('/', upload.single('file'), router);
  
app.listen(port, () => {
  connectDB;
  console.log(`Example app listening on port: http://localhost:${port}`)
})