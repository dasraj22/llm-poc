import {
  AIMessageChunk,
  HumanMessage,
  MessageContent,
  SystemMessage,
} from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { logger } from '../logger/winston';

const model = new ChatOpenAI({ model: 'gpt-4o-mini' });

const systemPrompt = `
Read the following review and attach a one word tag for the review. 
Do not provide more than 1 tag. A tag is a single word which can be used to define the complete review.
`;

export async function invokeAIModel(params: {
  review: string;
}): Promise<{ id: string; response: MessageContent }> {
  const { review } = params;

  const aiResponse: AIMessageChunk = await model.invoke([
    new SystemMessage(systemPrompt),
    new HumanMessage(review),
  ]);

  logger.info(`The AI response received is: ${JSON.stringify(aiResponse)}`);

  return {
    id: <string>aiResponse.id,
    response: aiResponse.content,
  };
}
