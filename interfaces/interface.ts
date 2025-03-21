import { MessageContent } from '@langchain/core/messages';

export interface ReviewResponse {
  id: string;
  response: MessageContent;
}

export interface LLMReviewRequest {
  body: {
    review: string;
  };
}
