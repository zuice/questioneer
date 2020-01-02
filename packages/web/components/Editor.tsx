import { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';

const LibEditor = dynamic(
  async () => {
    const { Editor } = await import('react-draft-wysiwyg');

    return Editor;
  },
  {
    ssr: false,
  },
);

interface Props {
  state: EditorState;
  onChange: (body: EditorState) => void;
}

export const Editor: FunctionComponent<Props> = ({ state, onChange }) => (
  <LibEditor
    toolbar={{
      options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign'],
    }}
    editorState={state}
    editorStyle={{
      padding: 5,
      minHeight: 200,
      maxHeight: 200,
      border: '1px solid #eee',
      borderRadius: 2,
    }}
    onEditorStateChange={onChange}
  />
);
