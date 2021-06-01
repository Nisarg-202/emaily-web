import React from 'react';

function SurveyField({label, input, type, meta: {touched, error}}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input {...input} type={type} className="form-control" />
      {touched && error}
    </div>
  );
}

export default SurveyField;
