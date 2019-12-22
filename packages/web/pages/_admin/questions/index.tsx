import { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { User } from '../../../types/user/User';
import { QuestionsOutput } from '../../../types/question/QuestionsOutput';
import { GET_QUESTIONS } from '../../../graphql/queries/question-queries';
import { AdminLayout } from '../../../components/AdminLayout';
import { QuestionList } from '../../../components/QuestionList';
import { withApollo } from '../../../lib/withApollo';
import { withMe } from '../../../lib/withMe';
import { withAdmin } from '../../../lib/withAdmin';

interface Props {
  me: User;
}

const Questions: FunctionComponent<Props> = ({ me }) => {
  const { data, loading } = useQuery<QuestionsOutput>(GET_QUESTIONS);

  return (
    <AdminLayout loading={loading} me={me} action="Questions" back="/_admin">
      <QuestionList actions questions={data ? data.questions : []} />
    </AdminLayout>
  );
};

export default withApollo(withMe(withAdmin(Questions)));
