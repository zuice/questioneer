import { FunctionComponent, KeyboardEvent } from 'react';
import { Select as LibSelect, DropdownProps } from 'semantic-ui-react';

interface Props {
  fluid?: boolean;
  id: string;
  name: string;
  value: string;
  placeholder: string;
  error?: boolean;
  options: { key: string; text: string; value: string }[];
  loading?: boolean;
  disabled?: boolean;
  onBlur: (event: KeyboardEvent<HTMLElement>, data: DropdownProps) => void;
  onChange: (field: string, value: any, shouldValidate?: boolean) => any;
}

export const Select: FunctionComponent<Props> = ({
  fluid,
  id,
  name,
  value,
  placeholder,
  error,
  options,
  loading,
  disabled,
  onBlur,
  onChange,
}) => (
  <LibSelect
    fluid={fluid ? fluid : false}
    id={id}
    name={name}
    value={value}
    error={error}
    placeholder={placeholder}
    options={options}
    loading={loading}
    disabled={disabled}
    onChange={(_, input) => onChange(input.name, input.value)}
    onBlur={onBlur}
  />
);
