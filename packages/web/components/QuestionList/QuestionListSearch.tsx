import { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { Header, Button, Select, Icon, Input } from 'semantic-ui-react';

import { QuestionDifficulty } from '../../types/question-difficulty/QuestionDifficulty';
import { QuestionTopic } from '../../types/question-topic/QuestionTopic';

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  difficulty: string;
  setDifficulty: Dispatch<SetStateAction<string>>;
  topic: string;
  setTopic: Dispatch<SetStateAction<string>>;
  questionDifficulties: QuestionDifficulty[];
  questionTopics: QuestionTopic[];
}

export const QuestionListSearch: FunctionComponent<Props> = ({
  search,
  setSearch,
  difficulty,
  setDifficulty,
  topic,
  setTopic,
  questionDifficulties,
  questionTopics,
}) => (
  <>
    <label htmlFor="search" style={{ marginBottom: 5 }}>
      <Header>
        <Header.Content>Search</Header.Content>
        <Header.Subheader>Start typing to filter the list...</Header.Subheader>
      </Header>
    </label>
    <Select
      id="difficulty"
      value={difficulty}
      placeholder="Choose difficulty..."
      options={questionDifficulties.map(difficulty => ({
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
      options={questionTopics.map(topic => ({
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
  </>
);
