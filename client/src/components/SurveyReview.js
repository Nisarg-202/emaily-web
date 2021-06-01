import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {surveySubmit} from '../actions';

function SurveyReview({surveyData, onHandleChange, surveySubmit, history}) {
  const {emails, subject, title, body} = surveyData;
  async function onFormSubmit(e) {
    e.preventDefault();
    await surveySubmit(surveyData);
    history.push('/dashboard');
  }
  return (
    <div className="border mt-3 bg-secondary text-white container">
      <div className="text-center">
        <h3 className="display-4 my-2">{title}</h3>
        <h6 className="display-5 my-2">{subject}</h6>
        <p className="my-2">{body}</p>
        <p className="my-2">{emails}</p>
      </div>
      <form onSubmit={onFormSubmit}>
        <div className="form-group d-flex justify-content-around">
          <button className="btn btn-danger" onClick={onHandleChange}>
            Back
          </button>
          <button className="btn btn-primary" type="submit">
            Send Survey <i class="far fa-envelope"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {surveyData: state.form.surveyForm.values};
}

export default connect(mapStateToProps, {surveySubmit})(
  withRouter(SurveyReview)
);
