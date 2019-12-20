import { useQuery } from '@apollo/react-hooks';

import { GET_QUESTIONS_ME } from '../../graphql/queries/question-queries';
import { QuestionsMeOutput } from '../../types/question/QuestionsMeOutput';
import { Layout } from '../../components/Layout';
import { withApollo } from '../../lib/withApollo';
import { QuestionList } from '../../components/QuestionList';

const Questions = () => {
  const { data, loading } = useQuery<QuestionsMeOutput>(GET_QUESTIONS_ME);

  return (
    <Layout loading={loading} me={data && data.me} action="Questions">
      <QuestionList questions={data ? data.questions : []} />
    </Layout>
  );
};

export default withApollo(Questions);
