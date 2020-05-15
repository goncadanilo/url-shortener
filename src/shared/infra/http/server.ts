import app from './app';

app.listen(process.env.PORT, () =>
  console.log(`App is running in port: ${process.env.PORT}`),
);
