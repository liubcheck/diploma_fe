import React from 'react';

interface Props {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

const TextInput = ({label, type, name, value, onChange, autoFocus}: Props) => {
  return (
    <div className="form-group row">
      <label className="col-sm-4 col-form-label login-label">{label}:</label>
      <div className="col-sm-8">
        <input
          type={type}
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}
          required
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};

export default TextInput;
