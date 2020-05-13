import app from './app';

const port = process.env.PORT;

app.listen(port, () => console.log(`App is running in port: ${port}`));
