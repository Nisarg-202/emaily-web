import React, {useState} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

function SurveyNew() {
  const [condition, setCondition] = useState(false);
  function onHandleChange() {
    if (condition) {
      setCondition(false);
    } else {
      setCondition(true);
    }
  }
  return (
    <div>
      {condition ? (
        <SurveyReview onHandleChange={onHandleChange} />
      ) : (
        <SurveyForm onHandleChange={onHandleChange} />
      )}
    </div>
  );
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
