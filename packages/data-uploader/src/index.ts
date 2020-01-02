import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { verify } from 'jsonwebtoken';

import { typeorm } from './lib/typeorm';
import { User } from './entities/User';
import { CreateBulkSchema } from './schemas/CreateBulkSchema';
import { Question } from './entities/Question';
import { Answer } from './entities/Answer';

const port = process.env.PORT || 4002;
const app = express();

(async () => {
  await typeorm();

  app.use(bodyParser.json());
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://questioneer.jeffa.dev'
          : 'http://localhost:4000',
      credentials: true,
    }),
  );
  app.use((_, res, next) => {
    res.set('Content-Type', 'application/vnd.questioneer+json');

    next();
  });
  app.use(async (req, res, next) => {
    const authorization = req.get('authorization');

    if (authorization) {
      const token = authorization.split(' ')[1];

      try {
        const payload = verify(
          token,
          process.env.ACCESS_TOKEN_SECRET as string,
        ) as {
          userId: string;
        };
        const user = await User.findOne(payload.userId);

        if (!user) {
          res.status(401);
          return res.json({
            message: 'You are not authorized to perform this action.',
          });
        }

        if (user.role === 'ADMIN') {
          return next();
        }

        res.status(401);
        return res.json({
          message: 'You are not authorized to perform this action.',
        });
      } catch (e) {
        res.status(401);
        res.json({ message: 'You are not authorized to perform this action.' });
      }
    } else {
      res.status(401);
      res.json({ message: 'You are not authorized to perform this action.' });
    }
  });
  app.post('/', async (req, res) => {
    const authorized = req.get('authorization');
    const token = authorized?.split(' ')[1];
    const payload = verify(
      token!,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as {
      userId: string;
    };
    const input = req.body.input.file as { questions: Question[] };
    const valid = await CreateBulkSchema.isValid(input);

    if (valid) {
      const unsaved = input.questions.map(question =>
        Question.create({ ...question, userId: payload.userId }),
      );
      const saved = unsaved.map(async question => {
        const initialized = await question.save();
        const unsavedAnswers = await question.answers;
        const savedAnswers = unsavedAnswers!.map(async unsavedAnswer => {
          await Answer.create({
            ...unsavedAnswer,
            userId: payload.userId,
            questionId: initialized.id,
          }).save();
        });

        return savedAnswers;
      });

      Promise.all(saved);

      res.json({ message: 'Your questions were submitted.' });
    } else {
      res.status(422);
      res.json({ message: 'Could not validate your file.' });
    }
  });
  app.listen({ port }, () => console.log(`[listening] :${port}`));
})();
