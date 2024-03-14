import React, { useEffect, useState } from 'react';
import './LoginPage.css'; // Make sure this path is correct
import { doSignInWithPhoneNumber } from '../../firebase/auth'
import OtpInputWithValidation from '../../components/otpInputBox/otpInput';
import firebaseApp from '../../components/Firebase/firebaseCofig';
import firebase from "firebase"

const LoginPage = () => {
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [checkOtp, setCheckOtp] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  //firebase integration for login authentication
  useEffect(()=>{
    window.recaptchaVerifier = new firebase.auth.RecapthaVerifier(
      "recaptcha-container",
      { "size": "invisible" }
    );
  },[]);

  const validatePhone = () =>{
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(userInput)
  }

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    // Simple validation for a 10-digit phone number
    if (validatePhone()) {
      const appVerifier = window.recaptchaVerfier;
      firebase
      .auth()
      .signInWithPhoneNumber(userInput, appVerifier)
      .then(value => {
        
      })

    } else {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return; // Prevent submission if validation fails
    }
    // Reset error state if validation passes
    setPhoneError('');



    console.log('Phone number submitted:', userInput);
    setIsOtpStep(true); // Move to OTP step
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setCheckOtp(true);
    console.log('OTP submitted:', userInput);
    // OTP submission logic here
  };

  return (
    <div className="login-page">
      <form onSubmit={isOtpStep ? handleOtpSubmit : handlePhoneNumberSubmit}>
        {isOtpStep ? (
          <div>
            <h1>Enter Your One Time Password</h1>
            <OtpInputWithValidation
              numberOfDigits={6}
              checkOtp={checkOtp}
            />
          </div>
        ) : (
          <div>
            <h1>Enter Your Phone Number</h1>
            <input
              type="tel"
              id="phone-number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your phone number"
            />
            {phoneError && <div className="phone-error">{phoneError}</div>} {/* Conditional rendering */}
          </div>
        )}
        <button type="submit" disabled={isOtpStep ? false : userInput.trim().length !== 10 || isNaN(userInput)}>{isOtpStep ? 'Submit OTP' : 'Continue'}</button>
      </form>
    </div>
  );
};

export default LoginPage;
