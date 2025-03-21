import express, { Router } from 'express';
import { invokeAIModel } from '../agent/modelInteractions';
import { LLMReviewRequest, ReviewResponse } from '../interfaces/interface';
import { logger } from '../logger/winston';

export const llmRouter: Router = express.Router();

llmRouter.get(
  '/llm/reviews',
  async (req: LLMReviewRequest, res: express.Response) => {
    const { body: requestBody } = req;
    const { review } = requestBody;
    logger.info(`The review received is: ${review}`);
    try {
      const response: ReviewResponse = await invokeAIModel({ review });
      res.status(200).json(response);
    } catch (err) {
      logger.log('error', (<Error>err).message);
      res.status(400).json({...<Error>err});
    }
  }
);
