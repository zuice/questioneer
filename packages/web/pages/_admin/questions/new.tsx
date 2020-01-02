import { useState } from 'react';
import Error from 'next/error';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form, Input, Button, Segment } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { draftjsToMd } from 'draftjs-md-converter';
import { EditorState, convertToRaw } from 'draft-js';
import Router from 'next/router';

import { DifficultyTopicMeOutput } from '../../../types/shared/DifficultyTopicMeOutput';
import { GET_DIFFICULTIES_TOPICS_ME } from '../../../graphql/shared-queries/difficulty-topic-queries';
import { QuestionOutput } from '../../../types/question/QuestionOutput';
import { QuestionInput } from '../../../types/question/QuestionInput';
import { CREATE_QUESTION } from '../../../graphql/mutations/question-mutation';
import { CreateQuestionSchema } from '../../../schemas/CreateQuestionSchema';
import { AdminLayout } from '../../../components/AdminLayout';
import { Editor } from '../../../components/Editor';
import { InputError } from '../../../components/InputError';
import { Select } from '../../../components/Select';
import { withApollo } from '../../../lib/withApollo';

const NewQuestion = () => {
  const [loading, setLoading] = useState(false);
  const { data, error } = useQuery<DifficultyTopicMeOutput>(
    GET_DIFFICULTIES_TOPICS_ME,
  );
  const [createQuestion] = useMutation<QuestionOutput, QuestionInput>(
    CREATE_QUESTION,
  );
  const formik = useFormik({
    initialValues: {
      body: EditorState.createEmpty(),
      tag: '',
      difficultyId: '',
      topicId: '',
    },
    validationSchema: CreateQuestionSchema,
    onSubmit: async input => {
      setLoading(true);

      try {
        const content = input.body.getCurrentContent();
        const body = draftjsToMd(convertToRaw(content)) as string;

        await createQuestion({ variables: { input: { ...input, body } } });

        Router.push('/questions');
      } catch (e) {
        setLoading(false);

        if (e && e.graphQLErrors.length > 0) {
          e.graphQLErrors[0].extensions.exception.validationErrors.forEach(
            ({
              property,
              constraints,
            }: {
              property: string;
              constraints: { [key: string]: string };
            }) => {
              formik.setFieldError(property, Object.values(constraints)[0]);
            },
          );
        }
      }
    },
  });

  if (data && !error) {
    return (
      <AdminLayout
        me={data && data.me}
        action="Create Question"
        back="/_admin/questions"
      >
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group grouped>
            <Form.Field error={formik.touched.body && !!formik.errors.body}>
              <Editor
                state={formik.values.body}
                onChange={body => formik.setFieldValue('body', body)}
              />
              <InputError
                show={formik.touched.body && (formik.errors.body as string)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group grouped>
            <Form.Field error={formik.touched.tag && !!formik.errors.tag}>
              <label htmlFor="tag">Tag</label>
              <Input
                fluid
                name="tag"
                placeholder="Formula"
                value={formik.values.tag}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputError show={formik.touched.tag && formik.errors.tag} />
            </Form.Field>
          </Form.Group>
          <Form.Group grouped>
            <Form.Field
              error={
                formik.touched.difficultyId && !!formik.errors.difficultyId
              }
            >
              <label htmlFor="difficultyId">Difficulty</label>
              <Select
                fluid
                id="difficultyId"
                name="difficultyId"
                value={formik.values.difficultyId}
                placeholder="Select one..."
                options={
                  data &&
                  data.questionDifficulties.map(difficulty => ({
                    key: difficulty.id,
                    text: difficulty.title,
                    value: difficulty.id,
                  }))
                }
                onBlur={formik.handleBlur}
                onChange={formik.setFieldValue}
              />
            </Form.Field>
            <InputError
              show={formik.touched.difficultyId && formik.errors.difficultyId}
            />
          </Form.Group>
          <Form.Group grouped>
            <Form.Field
              error={formik.touched.topicId && !!formik.errors.topicId}
            >
              <label htmlFor="topicId">Topic</label>
              <Select
                fluid
                id="topicId"
                name="topicId"
                value={formik.values.topicId}
                placeholder="Select one..."
                options={
                  data &&
                  data.questionTopics.map(topic => ({
                    key: topic.id,
                    text: topic.title,
                    value: topic.id,
                  }))
                }
                onBlur={formik.handleBlur}
                onChange={formik.setFieldValue}
              />
            </Form.Field>
            <InputError
              show={formik.touched.topicId && formik.errors.topicId}
            />
          </Form.Group>
          <Form.Group grouped>
            <Form.Field>
              <Button loading={loading} disabled={loading} type="submit">
                Submit
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </AdminLayout>
    );
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  return <Segment basic />;
};

export default withApollo(NewQuestion);
