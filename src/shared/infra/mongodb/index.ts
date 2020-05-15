import mongoose from 'mongoose';

function createConnection(): void {
  mongoose
    .connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Database connected!'))
    .catch(error => {
      console.log(`${error}`);
    });
}

createConnection();
