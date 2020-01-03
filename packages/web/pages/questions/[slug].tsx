import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { Segment, Header, Icon, Comment } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import Error from 'next/error';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { User } from '../../types/user/User';
import { QuestionOutput } from '../../types/question/QuestionOutput';
import { GET_QUESTION } from '../../graphql/queries/question-queries';
import { Layout } from '../../components/Layout';
import { withApollo } from '../../lib/withApollo';
import { withMe } from '../../lib/withMe';
import { formatDate } from '../../lib/formatDate';

interface Props {
  me: User;
}

const QuestionPage: FunctionComponent<Props> = ({ me }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading, error } = useQuery<QuestionOutput>(GET_QUESTION, {
    variables: { input: { slug } },
  });
  const question = data ? data.question : null;

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout
      loading={loading}
      me={me}
      action={`Viewing ${question?.body.substring(0, 20)}...`}
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
        <ReactMarkdown source={question?.body} />
        <Comment.Group>
          {question?.answers.map(answer => (
            <Comment>
              <Comment.Avatar src="/images/avatar/small/matt.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Matt</Comment.Author>
                <Comment.Metadata>
                  {formatDate(answer.updatedAt)}
                </Comment.Metadata>
                <Comment.Text>{question.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </Layout>
  );
};

export default withApollo(withMe(QuestionPage));
