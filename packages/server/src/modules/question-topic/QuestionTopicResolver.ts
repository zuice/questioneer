import { Resolver, Query } from 'type-graphql';

import { QuestionTopic } from '../../entities/QuestionTopic';

@Resolver()
export class QuestionTopicResolver {
  @Query(() => [QuestionTopic])
  async questionTopics() {
    const questionTopics = await QuestionTopic.find();

    return questionTopics;
  }
}
