import { FunctionComponent, ReactElement, useState } from 'react';
import { List, Button, Modal } from 'semantic-ui-react';
import Link from 'next/link';

import { Question } from '../../types/question/Question';
import { formatDate } from '../../lib/formatDate';

interface Props {
  question: Question;
  actions?: boolean;
}

export const QuestionListItem: FunctionComponent<Props> = ({
  question,
  actions,
}) => {
  let actionsComponent: ReactElement;
  const [showModal, setShowModal] = useState(false);

  if (actions) {
    actionsComponent = (
      <>
        <Modal closeOnDimmerClick size="tiny" open={showModal}>
          <Modal.Header>Delete Question</Modal.Header>
          <Modal.Content>
            Are you sure you would like to delete this question? All the answers
            attached will be lost.
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setShowModal(false)}>
              No
            </Button>
            <Button primary>Yes</Button>
          </Modal.Actions>
        </Modal>
        <List.Content floated="right">
          <Button negative icon="times" onClick={() => setShowModal(true)} />
        </List.Content>
      </>
    );
  }

  return (
    <List.Item>
      {actionsComponent}
      <List.Icon name="question circle" size="big" verticalAlign="middle" />
      <Link href="/questions/[slug]" as={`/questions/${question.slug}`}>
        <List.Content>
          <>
            <List.Header as="a">{question.preview}</List.Header>
            <List.Description as="a">
              Updated {formatDate(question.updatedAt)}
            </List.Description>
          </>
        </List.Content>
      </Link>
    </List.Item>
  );
};
