const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       `mongodb+srv://hovanhung:1234@mern-learnit.kuva3.mongodb.net/mern-learnit?retryWrites=true&w=majority`
//     );
//     console.log('MongoDB Connected...');
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// connectDB();

const authRouter = require('./routes/auth');
const postRoutes = require('./routes/post');

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${
        process.env.DB_USERNAME
      }:${(process.env.DB_PASSWORD = 1234)}@mern-learnit.kuva3.mongodb.net/mern-learnit?retryWrites=true&w=majority`
    );
    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/posts', postRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sever is running on port ${PORT}`));
