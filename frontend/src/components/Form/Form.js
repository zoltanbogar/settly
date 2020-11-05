import React from 'react';

import ReCAPTCHA from "react-google-recaptcha";

import './Form.css';
import FormElements from './FormElements/FormElements';
import Button from '../UI/Button/Button';
import Label from '../UI/Label/Label';
import Footer from '../UI/Footer/Footer';

const form = (props) => {
    const footer = props.formPreset.footer ? <Footer elements={props.formPreset.footer} /> : '';
    /*function onChange(value) {
        console.log("Captcha value:", value);
    }*/
    const captcha = props.formPreset.captcha ? <ReCAPTCHA
        sitekey="6LftSc0UAAAAADgZGhVpF5k39y_87lLWFmAOTh36"
        onChange={props.formPreset.captchaChange}
    /> : '';
    return (
        <form className="Form">
            <Label>{props.formPreset.formLabel}</Label>
            <FormElements formElements={props.formPreset.formElements} inputChange={props.formPreset.inputChange} />
            {captcha}
            <Button clicked={props.formPreset.buttonClick} type={props.formPreset.buttonType}>{props.formPreset.buttonLabel}</Button>
            {footer}
        </form>
    );
};

export default form;