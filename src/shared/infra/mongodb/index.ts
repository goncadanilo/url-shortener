import mongoose from 'mongoose';

const uri =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST
    : process.env.MONGO_URI;

function createConnection(): void {
  mongoose
    .connect(`${uri}`, {
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
