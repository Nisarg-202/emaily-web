const express = require('express');
const passport = require('passport');
const {
  authGoogleCallback,
  checkCurrentUser,
  paymentAction,
  thankMessage,
  addSurveys,
  sendgridResponse,
  deleteSurvey,
  saveSurvey,
  getSaveSurveys,
  getSurveys,
  logout,
} = require('../actions/userActions');
const Auth = require('../middleware/Auth');
const Credits = require('../middleware/Credits');

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  authGoogleCallback
);

router.get('/currentuser', checkCurrentUser);

router.get('/api/surveys/:surveyId/:answer', thankMessage);

router.get('/save/surveys', Auth, getSaveSurveys);

router.get('/api/surveys', Auth, getSurveys);

router.get('/logout', logout);

router.post('/payment', Auth, paymentAction);

router.post('/api/surveys', Auth, Credits, addSurveys);

router.post('/api/webhook', sendgridResponse);

router.post('/api/delete', Auth, deleteSurvey);

router.post('/save/surveys', Auth, saveSurvey);

module.exports = router;
