import { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { User } from '../../types/user/User';
import { GET_QUESTIONS } from '../../graphql/queries/question-queries';
import { QuestionsOutput } from '../../types/question/QuestionsOutput';
import { Layout } from '../../components/Layout';
import { QuestionList } from '../../components/QuestionList';
import { withApollo } from '../../lib/withApollo';
import { withMe } from '../../lib/withMe';

interface Props {
  me: User;
}

const Questions: FunctionComponent<Props> = ({ me }) => {
  const { data, loading } = useQuery<QuestionsOutput>(GET_QUESTIONS, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Layout loading={loading} me={me} action="Questions">
      <QuestionList questions={data ? data.questions : []} />
    </Layout>
  );
};

export default withApollo(withMe(Questions));
