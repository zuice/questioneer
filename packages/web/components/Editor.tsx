import { FunctionComponent } from 'react';
import { EditorState } from 'draft-js';
import { Editor as LibEditor } from 'react-draft-wysiwyg';

interface Props {
  state: EditorState;
  onChange: (body: EditorState) => void;
}

const Editor: FunctionComponent<Props> = ({ state, onChange }) => (
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

export default Editor;
