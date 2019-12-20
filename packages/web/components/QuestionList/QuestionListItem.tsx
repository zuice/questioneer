import { FunctionComponent } from 'react';
import { List } from 'semantic-ui-react';
import Link from 'next/link';

import { Question } from '../../types/question/Question';
import { formatDate } from '../../lib/formatDate';

interface Props {
  question: Question;
}

export const QuestionListItem: FunctionComponent<Props> = ({ question }) => (
  <List.Item key={question.id}>
    <List.Icon name="question circle" size="big" verticalAlign="middle" />
    <Link href="/questions/[slug]" as={`/questions/${question.slug}`}>
      <List.Content>
        <List.Header as="a">{question.preview}</List.Header>
        <List.Description as="a">
          Updated {formatDate(question.updatedAt)}
        </List.Description>
      </List.Content>
    </Link>
  </List.Item>
);
