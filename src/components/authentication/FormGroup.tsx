import React from 'react';

interface Props {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormGroup = ({label, name, type, value, onChange, error}: Props) => {
  return (
    <div className="form-group row align-items-center">
      <label htmlFor={name} className="col-sm-2 col-form-label login-label">
        {label}
      </label>
      <div className="col-sm-10">
        <div className="row align-items-center">
          <div className="col-sm-5 d-flex align-items-center">
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              className={'form-control me-sm-2'}
            />
            <span className="required" />
            {error && (
              <div className="invalid-feedback error-message d-block ms-2">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGroup;
