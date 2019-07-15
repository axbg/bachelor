const generateError = require('../utils/FlowError').generateError;
const Student = require('../models/index').Student;
const sequelize = require('sequelize');
const CREDIT_PRICE = require('../config/index').CREDIT_PRICE;
const STRIPE_SECRET_KEY = require('../config/index').STRIPE_SECRET_KEY;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const updateCreditsAsStudent = async (charge, studentId) => {
    charge.stripeToken || generateError("Stripe token is not present", 400);
    charge.stripeTokenType || generateError("Stripe token type is not present", 400);
    charge.stripeEmail || generateError("Stripe email is not present", 400);
    charge.amount || generateError("Amount is not present", 400);
    studentId || generateError("Student identifier is not present", 400);

    const credits = charge.amount / CREDIT_PRICE;

    const stripeCustomer = await stripe.customers.create({
        email: charge.stripeEmail,
        source: charge.stripeToken
    });

    const stripeCharge = await stripe.charges.create({
        amount: charge.amount,
        description: 'CSIE Admission Credits',
        currency: 'eur',
        customer: stripeCustomer.id
    });

    stripeCharge || generateError("Payment was unsuccessful");

    const student = await Student.findOne({ where: { id: studentId } });
    student.credits = student.credits + credits;
    await student.save();

    return student.credits;
}

const updateCreditsAsCashier = async (studentId, credits) => {
    studentId || generateError("Student identifier is not present", 400);
    credits.credits || generateError("Number of credits is not present", 400);
    const student = await Student.findOne({ where: { id: studentId } });
    student.credits = student.credits + credits.credits;
    await student.save();
    return student.credits;
}

const updateTax = async (student) => {
    student.studentId || generateError("Student identifier is not present", 400);
    return await Student.update({ tax: sequelize.literal('NOT tax') }, { where: { id: student.studentId } });
}

module.exports = {
    updateCreditsAsStudent,
    updateCreditsAsCashier,
    updateTax
}