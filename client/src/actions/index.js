import axios from "axios";
import _ from "lodash";

export const userAction = function () {
  return function (dispatch) {
    fetchUser(dispatch);
  };
};

export const paymentAction = function (token) {
  return async function (dispatch) {
    const response = await axios.post("/payment", { tokenId: token.id });
    if (response.data.condition) {
      alert("Payment successfully done");
      dispatch({ type: "user_login", payload: response.data.user });
    } else {
      alert("Fail");
    }
  };
};

const fetchUser = _.memoize(async function (dispatch) {
  const response = await axios.get("/currentuser");
  dispatch({ type: "user_login", payload: response.data });
});

export const surveySubmit = function (surveyData) {
  return async function (dispatch) {
    const { emails, title, body, subject } = surveyData;
    const response = await axios.post("/api/surveys", {
      title,
      body,
      subject,
      recipients: emails,
    });
    dispatch({ type: "user_login", payload: response.data.user });
  };
};

export const surveyData = function () {
  return async function (dispatch) {
    const response = await axios.get("/api/surveys");
    dispatch({ type: "survey_data", payload: response.data.survey });
  };
};

export const deleteSurvey = function (id) {
  return async function (dispatch) {
    const response = await axios.post("/api/delete", {
      surveyId: id,
    });

    dispatch({ type: "survey_data", payload: response.data.survey });
  };
};

export const savedSurvey = function (survey) {
  return async function (dispatch) {
    const response = await axios.post("/save/surveys", survey);
    dispatch({ type: "saved_survey", payload: response.data.survey });
  };
};

export const getSavedSurvey = function () {
  return async function (dispatch) {
    const response = await axios.get("/save/surveys");
    dispatch({ type: "saved_survey", payload: response.data.survey });
  };
};
