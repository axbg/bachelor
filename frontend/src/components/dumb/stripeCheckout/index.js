import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './index.css';
import Button from '@material-ui/core/Button';

class StripeCheckout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stripeToken: "tok_visa",
            stripeTokenType: "card",
            price: 50
        }

        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.setState({
            stripeEmail: this.props.email,
            studentId: this.props.id
        })
    }

    submit() {
        this.props.buyCredits({
            stripeToken: this.state.stripeToken, stripeTokenType: this.state.stripeTokenType,
            stripeEmail: this.props.email, amount: this.props.amount, studentId: this.props.id
        });
    }

    render() {
        return (
            <div className="checkout">
                <p>Dorești să efectuezi tranzacția?</p>
                <div className="checkout-container">
                    <CardElement />
                </div>
                <Button variant="contained" color="primary" onClick={this.submit}>Cumpără</Button>
            </div>
        );
    }
}

export default injectStripe(StripeCheckout);