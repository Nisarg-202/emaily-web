import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {surveyData} from '../actions';
import SurveyCard from './SurveyCard';

function Dashboard({surveyData, surveys}) {
  const [userSurvey, setUsersurvey] = useState([]);
  const [option, setOption] = useState('dateSent');

  useEffect(function () {
    getUserSurveys();
  }, []);

  async function getUserSurveys() {
    await surveyData();
  }

  useEffect(
    function () {
      setUsersurvey(surveys);
    },
    [surveys]
  );

  function onOptionChange(e) {
    setOption(e.target.value);
  }

  function surveyExecute() {
    return userSurvey
      .sort(function (a, b) {
        if (option === 'dateSent') {
          return new Date(b[option]).getTime() - new Date(a[option]).getTime();
        } else {
          return b[option] - a[option];
        }
      })
      .map(function (survey) {
        return <SurveyCard surveys={survey} />;
      });
  }

  return (
    <div>
      <div className="container d-flex justify-content-end form-group form-inline my-2">
        <select
          defaultValue="dateSent"
          className="form-control"
          onChange={onOptionChange}
        >
          <option value="dateSent">Date</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      {userSurvey.length > 0 && surveyExecute()}
      <div className="d-flex fixed-bottom justify-content-end m-4">
        <Link className="btn btn-primary rounded-circle" to="/surveys/new">
          <i class="fas fa-plus"></i>
        </Link>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {surveys: state.survey};
}

export default connect(mapStateToProps, {surveyData})(Dashboard);
