import { FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List } from 'semantic-ui-react';

import { Question } from '../../types/question/Question';
import { DifficultyTopicOutput } from '../../types/shared/DifficultyTopicOutput';
import { GET_DIFFICULTIES_TOPICS } from '../../graphql/shared-queries/difficulty-topic-queries';
import { QuestionListSearch } from './QuestionListSearch';
import { QuestionListItem } from './QuestionListItem';

interface Props {
  questions: Question[];
  searchable?: boolean;
  actions?: boolean;
}

export const QuestionList: FunctionComponent<Props> = ({
  questions,
  searchable,
  actions,
}) => {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [topic, setTopic] = useState(null);
  const {
    data = {
      questionDifficulties: [],
      questionTopics: [],
    },
  } = useQuery<DifficultyTopicOutput>(GET_DIFFICULTIES_TOPICS, {
    skip: !searchable,
  });
  const filteredQuestions = questions
    .filter(question => {
      const preview = question.preview.toLowerCase();
      const matches = preview.indexOf(search.toLowerCase()) > -1;

      return matches;
    })
    .filter(question =>
      !difficulty ? true : question.difficulty.id === difficulty,
    )
    .filter(question => (!topic ? true : question.topic.id === topic))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <>
      {searchable ? (
        <QuestionListSearch
          search={search}
          setSearch={setSearch}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          topic={topic}
          setTopic={setTopic}
          questionDifficulties={data ? data.questionDifficulties : []}
          questionTopics={data ? data.questionTopics : []}
        />
      ) : null}
      <List divided relaxed>
        {filteredQuestions.map(question => (
          <QuestionListItem
            key={question.id}
            question={question}
            actions={actions}
          />
        ))}
      </List>
    </>
  );
};
