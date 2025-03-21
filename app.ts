require('dotenv').config();
import morgan from 'morgan';
import express from 'express';
import { llmRouter } from './service/llm';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(llmRouter);

app.listen(PORT, () => {
  console.log(`Listening for langflow-project on port: ${PORT}`);
});
