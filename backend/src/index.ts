import express from "express";
import {router} from './routes/index'
import connectDB from './db/index'
const app = express ();
import cors from 'cors';
import { User } from "./schema/user.model";
import 'dotenv/config'


const port = 3000 || process.env.PORT;

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users/:email', async (req, res) => {
  try {
    const email = req.params.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use ('/', router);
  
app.listen(port, () => {
  connectDB;
  console.log(`Example app listening on port: http://localhost:${port}`)
})