import { useRouter } from 'next/router';
import { Segment, Header, Icon } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import Error from 'next/error';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { QuestionMeOutput } from '../../types/question/QuestionMeOutput';
import { GET_QUESTION_ME } from '../../graphql/queries/question-queries';
import { Layout } from '../../components/Layout';
import { withApollo } from '../../lib/withApollo';

const QuestionPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useQuery<QuestionMeOutput>(GET_QUESTION_ME, {
    variables: { input: { slug } },
  });
  const question = data ? data.question : null;

  if (error) {
    return <Error statusCode={404} />;
  }

  if (loading) {
    return <Segment basic />;
  } else {
    return (
      <Layout
        loading={loading}
        me={data && data.me}
        action={`Viewing ${question.body.substring(0, 20)}...`}
      >
        <Segment basic>
          <Header>
            <Header.Content>
              <Link href="/questions">
                <a>
                  <Icon name="arrow left" />
                </a>
              </Link>
              Viewing Question
            </Header.Content>
          </Header>
          <p>
            <ReactMarkdown source={question!.body} />
          </p>
        </Segment>
      </Layout>
    );
  }
};

export default withApollo(QuestionPage);
