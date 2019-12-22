import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { typeorm } from './lib/typeorm';
import { authChecker } from './middleware/authChecker';
import { refreshTokenRoute } from './lib/auth';
import { UserResolver } from './modules/user/UserResolver';
import { UpdateUserResolver } from './modules/user/update-user/UpdateUserResolver';
import { CreateUserResolver } from './modules/user/create-user/CreateUserResolver';
import { AuthenticateUserResolver } from './modules/user/authenticate-user/AuthenticateUserResolver';
import { MeResolver } from './modules/user/MeResolver';
import { LogoutUserResolver } from './modules/user/LogoutUserResolver';
import { QuestionResolver } from './modules/question/QuestionResolver';
import { CreateQuestionResolver } from './modules/question/create-question/CreateQuestionResolver';
import { QuestionDifficultyResolver } from './modules/question-difficulty/QuestionDifficultyResolver';
import { QuestionTopicResolver } from './modules/question-topic/QuestionTopicResolver';

(async () => {
  await typeorm();

  const app = express();
  const port = process.env.PORT || 4001;

  app.use(
    cors({
      origin: process.env.WEB_URL || 'https://questioneer.jeffa.dev',
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.post('/refresh_token', refreshTokenRoute);
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      authChecker,
      resolvers: [
        UserResolver,
        UpdateUserResolver,
        CreateUserResolver,
        AuthenticateUserResolver,
        MeResolver,
        LogoutUserResolver,
        QuestionResolver,
        CreateQuestionResolver,
        QuestionDifficultyResolver,
        QuestionTopicResolver,
      ],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`[listening] :${port}`);
  });
})();
