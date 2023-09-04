import mongoose from "mongoose";
import '@/models/prompt';
import '@/models/user';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  console.log('MONGODB: Trying connect to db...')

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;
    
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
