import { Button, FormElement, TextField, TextLink } from '@cedcommerce/ounce-ui'
import { ArrowLeft } from "react-feather"
import { DI, DIProps } from "../../../Core"
import "./Forgot.css"
import React, { useState } from 'react'
import { regexValidation } from '../../../Constant'

interface forgotStateObj {
  email: string;
  generateBtn: boolean;
  error: boolean;
  message: string;
}
function Forgot(_props: DIProps) {
  const [state, setState] = useState<forgotStateObj>({
    email: "",
    generateBtn: true,
    error: false,
    message: ""
  });
  const { email, generateBtn, error, message } = state;
  let { emailFormat
  } = regexValidation;
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
  return (
    <>
      <FormElement>
        <TextField
          showHelp={message}
          onChange={(e) => {
            setState({
              email: e,
              error: false,
              message: "",
              generateBtn: true
            })
            if (emailFormat.test(e) === true) {
              setState({
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
          onClick={()=>_props.history("/auth/reset")}
        />
        <TextLink onClick={() => _props.history("/auth/login")} extraClass='getBackLink' iconAlign='left' icon={<ArrowLeft color='black' />} label={"Back to Login"} />
      </FormElement>
    </>

  )
}

export default DI(Forgot);