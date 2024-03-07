import React, { useEffect, useState } from "react";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SurveyField from "./SurveyField";
import { savedSurvey, getSavedSurvey } from "../actions";

const re =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SURVEYFIELDS = [
  { label: "Title", name: "title", formError: "Please enter a valid title" },
  {
    label: "Subject",
    name: "subject",
    formError: "Please enter a valid subject",
  },
  { label: "Body", name: "body", formError: "Please enter a valid body" },
  { label: "Emails", name: "emails", formError: "Please enter a valid emails" },
];

function SurveyForm(props) {
  const [condition, setCondition] = useState(false);

  useEffect(
    function () {
      if (condition) {
        SURVEYFIELDS.forEach(function (item) {
          props.change(item["name"], props.surveySave[item.name]);
        });
      }
    },
    [condition]
  );

  useEffect(
    function () {
      if (props.surveySave) {
        setCondition(true);
      }
    },
    [props.surveySave]
  );

  useEffect(function () {
    getSavedUserSurvey();
  }, []);

  async function getSavedUserSurvey() {
    await props.getSavedSurvey();
  }

  async function onSave(values) {
    await props.savedSurvey(values);
  }
  return (
    <div className="container">
      <form onSubmit={props.handleSubmit(props.onHandleChange)}>
        {SURVEYFIELDS.map(function ({ label, name }) {
          return (
            <Field
              key={name}
              type="text"
              label={label}
              name={name}
              component={SurveyField}
            />
          );
        })}
        <div className="form-group d-flex justify-content-around">
          <button
            className="btn btn-danger"
            onClick={function () {
              props.history.push("/dashboard");
            }}
          >
            Cancel
          </button>
          <div>
            <button
              className="btn btn-secondary mr-2"
              onClick={props.handleSubmit(onSave)}
            >
              Save
            </button>
            <button className="btn btn-primary" type="submit">
              Next <i class="fas fa-check"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function validate(values) {
  const errors = {};

  if (values["emails"]) {
    const wrongEmails = values.emails
      .split(",")
      .map(function (email) {
        return email.trim();
      })
      .filter(function (item) {
        return re.test(item.toLowerCase()) === false;
      });
    if (wrongEmails.length > 0) {
      errors["emails"] = `The Wrong Email is : ${wrongEmails.join(", ")}`;
    }
  }

  SURVEYFIELDS.forEach(function ({ name, formError }) {
    if (!values[name]) {
      errors[name] = formError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return { surveySave: state.saved };
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(
  connect(mapStateToProps, { savedSurvey, getSavedSurvey })(
    withRouter(SurveyForm)
  )
);
