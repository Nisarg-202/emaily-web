const passport = require('passport');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const helper = require('sendgrid').mail;
const sg = require('sendgrid')(keys.sendGridKey);
const Survey = require('../models/Survey');
const Saved = require('../models/Saved');
const {Path} = require('path-parser');

const authGoogleCallback = function (req, res) {
  res.redirect('/');
};

const checkCurrentUser = function (req, res) {
  res.json(req.user);
};

const paymentAction = async function (req, res) {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'inr',
    source: req.body.tokenId,
  });
  if (charge.status === 'succeeded') {
    req.user.amount += 5;
    const user = await req.user.save();
    res.json({condition: true, user});
  } else {
    res.json({condition: false});
  }
};

const thankMessage = function (req, res) {
  res.send('Thank you for voting!');
};

const addSurveys = async function (req, res) {
  const {title, body, subject, recipients} = req.body;
  const survey = new Survey({
    title,
    body,
    subject,
    recipients: recipients.split(',').map(function (item) {
      return {
        email: item.trim(),
      };
    }),
    _user: req.user._id,
    dateSent: Date.now(),
  });

  survey.recipients.forEach(function (item) {
    const fromEmail = new helper.Email('nisargprajapati202@gmail.com');
    const toEmail = new helper.Email(item.email);
    const subject = survey.subject;
    const content = new helper.Content(
      'text/html',
      `<div style="text-align: center;">
      <h1>I'd like to take your feedback!</h1>
      <p>${survey.body}</p>
      <a href="https://evening-shelf-64382.herokuapp.com/api/surveys/${survey._id}/yes">Yes</a>
      <a href="https://evening-shelf-64382.herokuapp.com/api/surveys/${survey._id}/no">No</a>
    </div>`
    );
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });
    sg.API(request).catch(function (error) {
      console.log(error);
    });
  });

  await survey.save();
  req.user.amount -= 1;
  const user = await req.user.save();
  res.json({user});
};

const sendgridResponse = function (req, res) {
  req.body.forEach(async function ({email, url}) {
    const {pathname} = new URL(url);
    const path = new Path('/api/surveys/:surveyId/:response');
    const {surveyId, response} = path.test(pathname);
    await Survey.findOne({_id: surveyId}, async function (err, found) {
      if (err) {
        console.log(err);
      } else {
        if (found) {
          found.recipients.forEach(function (item) {
            if (item.email === email && item.responded === false) {
              found[response] += 1;
              item.responded = true;
            }
          });
        }
      }
      await found.save();
    });
  });

  res.send({});
};

const deleteSurvey = async function (req, res) {
  const {surveyId} = req.body;
  await Survey.deleteOne({_id: surveyId}, async function (err) {
    if (err) {
      console.log(err);
    } else {
      const surveys = await Survey.find({_user: req.user._id}).select({
        recipients: false,
      });
      res.json({survey: surveys});
    }
  });
};

const saveSurvey = async function (req, res) {
  const {title, subject, body, emails} = req.body;
  await Saved.deleteOne({_user: req.user._id});
  const saved = new Saved({
    title,
    body,
    subject,
    emails,
    _user: req.user._id,
  });
  const survey = await saved.save();
  res.json({survey});
};

const getSaveSurveys = async function (req, res) {
  await Saved.findOne({_user: req.user._id}, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      if (found) {
        res.json({survey: found});
      } else {
        res.json({survey: null});
      }
    }
  });
};

const getSurveys = async function (req, res) {
  const surveys = await Survey.find({_user: req.user._id}).select({
    recipients: false,
  });
  res.json({survey: surveys});
};

const logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.authGoogleCallback = authGoogleCallback;
exports.checkCurrentUser = checkCurrentUser;
exports.paymentAction = paymentAction;
exports.thankMessage = thankMessage;
exports.addSurveys = addSurveys;
exports.sendgridResponse = sendgridResponse;
exports.deleteSurvey = deleteSurvey;
exports.saveSurvey = saveSurvey;
exports.getSaveSurveys = getSaveSurveys;
exports.getSurveys = getSurveys;
exports.logout = logout;
