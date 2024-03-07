import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import authReducer from "./authReducer";
import SurveyReducer from "./SurveyReducer";
import SavedReducer from "./SavedReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  survey: SurveyReducer,
  saved: SavedReducer,
});
