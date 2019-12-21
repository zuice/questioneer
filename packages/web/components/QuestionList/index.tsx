import { FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Input, List, Header, Select, Button, Icon } from 'semantic-ui-react';
import Link from 'next/link';

import { Question } from '../../types/question/Question';
import { DifficultyTopicOutput } from '../../types/shared/DifficultyTopicOutput';
import { GET_DIFFICULTIES_TOPICS } from '../../graphql/shared-queries/difficulty-topic-queries';
import { QuestionListItem } from './QuestionListItem';

interface Props {
  questions: Question[];
}

export const QuestionList: FunctionComponent<Props> = ({ questions }) => {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [topic, setTopic] = useState(null);
  const {
    data = {
      questionDifficulties: [],
      questionTopics: [],
    },
  } = useQuery<DifficultyTopicOutput>(GET_DIFFICULTIES_TOPICS);

  return (
    <>
      <label htmlFor="search" style={{ marginBottom: 5 }}>
        <Header>
          <Header.Content>Search</Header.Content>
          <Header.Subheader>
            Start typing to filter the list...
          </Header.Subheader>
        </Header>
      </label>
      <Select
        id="difficulty"
        value={difficulty}
        placeholder="Choose difficulty..."
        options={data.questionDifficulties.map(difficulty => ({
          key: difficulty.id,
          value: difficulty.id,
          text: difficulty.title,
        }))}
        onChange={(_, { value }) => setDifficulty(value as string)}
      />{' '}
      <Select
        id="topic"
        value={topic}
        placeholder="Choose topic..."
        options={data.questionTopics.map(topic => ({
          key: topic.id,
          value: topic.id,
          text: topic.title,
        }))}
        onChange={(_, { value }) => setTopic(value as string)}
      />{' '}
      <Button
        style={{ marginBottom: 5 }}
        onClick={() => {
          setDifficulty(null);
          setTopic(null);
        }}
      >
        <Icon name="cancel" /> Clear
      </Button>
      <Input
        fluid
        id="search"
        placeholder="Enter a query..."
        value={search}
        autoComplete="off"
        onChange={(_, data) => setSearch(data.value)}
      />
      <List divided relaxed>
        {questions
          .filter(question => {
            const preview = question.preview.toLowerCase();
            const matches = preview.indexOf(search.toLowerCase()) > -1;

            return matches;
          })
          .filter(question =>
            !difficulty ? true : question.difficulty.id === difficulty,
          )
          .filter(question => (!topic ? true : question.topic.id === topic))
          .map(question => (
            <QuestionListItem key={question.id} question={question} />
          ))}
      </List>
    </>
  );
};
