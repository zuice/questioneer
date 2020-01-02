import { FunctionComponent, useRef } from 'react';
import { Button } from 'semantic-ui-react';

interface Props {
  id: string;
  name: string;
  onChange: (file: File) => void;
}

export const FileInput: FunctionComponent<Props> = ({ id, name, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {fileInputRef.current ? (
        <span style={{ display: 'block' }}>
          {fileInputRef.current.files[0].name}
        </span>
      ) : null}
      <Button
        primary
        type="button"
        icon="upload"
        label="Browse"
        labelPosition="right"
        onClick={() => fileInputRef.current.click()}
      />
      <input
        hidden
        id={id}
        name={name}
        type="file"
        ref={fileInputRef}
        onChange={() => {
          onChange(fileInputRef.current.files[0]);
        }}
      />
    </>
  );
};
