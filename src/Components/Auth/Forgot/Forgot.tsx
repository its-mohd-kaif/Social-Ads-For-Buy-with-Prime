import { Button, FormElement, TextField, TextLink } from '@cedcommerce/ounce-ui'
import { ArrowLeft } from "react-feather"
import { DI, DIProps } from "../../../Core"
import "./Forgot.css"
import React, { useState } from 'react'
import { regexValidation, urlFetchCalls } from '../../../Constant'

interface forgotStateObj {
  email: string;
  generateBtn: boolean;
  error: boolean;
  message: string;
  loading: boolean;
}
function Forgot(_props: DIProps) {
  /**
   * make a state object for input fields and error handling
   */
  const [state, setState] = useState<forgotStateObj>({
    email: "",
    generateBtn: true,
    error: false,
    message: "",
    loading: false
  });
  /**
     * destructure all values 
     */
  const { email, generateBtn, loading, error, message } = state;
  let { emailFormat
  } = regexValidation;
  /**
   * onblur() this function will check email validation
   */
  const checkEmailValidation = () => {
    if (emailFormat.test(email) === false || email === "") {
      setState({
        ...state,
        error: true,
        message: "Please enter a valid email",
        generateBtn: true
      })
    }
  }
  /**
   * This function send post request with email payload
   * After successful resposne we navigate user to resetpassword page
   */
  const generateLinkHandler = () => {
    const { di: { POST } } = _props;
    setState({
      ...state,
      loading: true
    })
    const { post: {
      forgotPassword
    } } = urlFetchCalls
    let path = window.location.origin;
    POST(forgotPassword, {
      "email": email,
      "reset-link": `${path}/auth/reset`,
      "subject": "Reset your password for Social Ads on Buy with Prime Account"
    }).then((res) => {
      setState({
        ...state,
        loading: false
      })
      if (res.success === false) {
        _props.error(res.message)
      } else if (res.success === true) {
        _props.history("/auth/resetpassword")
      }
    }).catch((mess) => console.log(mess))
  }
  return (
    <>
      <FormElement>
        <TextField
          showHelp={message}
          onChange={(e) => {
            /**
             * in this we store input values into state
             * also check validation
             */
            setState({
              ...state,
              email: e,
              error: false,
              message: "",
              generateBtn: true
            })
            if (emailFormat.test(e) === true) {
              setState({
                ...state,
                email: e,
                error: false,
                message: "",
                generateBtn: false
              })
            }
          }}
          placeHolder="Enter Email"
          type="email"
          value={email}
          onblur={() => checkEmailValidation()}
          error={error}
        />
        <hr></hr>
        <Button
          content="Generate link"
          length="fullBtn"
          thickness='large'
          disable={generateBtn}
          onClick={generateLinkHandler}
          loading={loading}
        />
        <TextLink onClick={() => _props.history("/auth/login")} extraClass='getBackLink' iconAlign='left' icon={<ArrowLeft color='black' />} label={"Back to Login"} />
      </FormElement>
    </>

  )
}

export default DI(Forgot);