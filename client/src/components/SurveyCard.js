import React from 'react';
import {connect} from 'react-redux';
import {deleteSurvey} from '../actions';

function SurveyCard({surveys, deleteSurvey}) {
  const {title, body, subject, yes, no, dateSent, _id} = surveys;

  async function onDeleteSurvey() {
    await deleteSurvey(_id);
  }

  return (
    <div className="border mt-3 bg-secondary text-white container">
      <div className="text-center">
        <h3 className="display-4 my-2">{title}</h3>
        <h6 className="display-5 my-2">{subject}</h6>
        <p className="my-2">{body}</p>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <h5>Yes: {yes}</h5>
          <h5>No: {no}</h5>
        </div>
        <div>
          <h5>Last Sent: {new Date(dateSent).toLocaleDateString()}</h5>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-2">
        <button onClick={onDeleteSurvey} className="btn btn-warning text-white">
          Delete Survey
        </button>
      </div>
    </div>
  );
}

export default connect(null, {deleteSurvey})(SurveyCard);
