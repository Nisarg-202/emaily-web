import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {paymentAction} from '../actions';

function Payment(props) {
  async function getCurrentToken(token) {
    await props.paymentAction(token);
  }
  return (
    <StripeCheckout
      name="Emaily"
      description="5 Rs. for 5 email credits"
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      token={getCurrentToken}
      currency="INR"
      amount={500}
    >
      <Link className="nav-link">Add Credits</Link>
    </StripeCheckout>
  );
}

export default connect(null, {paymentAction})(Payment);
