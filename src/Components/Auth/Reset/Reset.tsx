import { Alert, Button, FormElement, List, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { PasswordStrenght } from '../function';
import "./Reset.css"
interface stateObj {
    newPassword: string;
    confirmPassword: string;
    eyeoff: boolean
}
interface errorMessObj {
    newPassError: boolean;
    conPassError: boolean;
    message: string;
    saveBtn: boolean;
}
function Reset() {
    const [state, setState] = useState<stateObj>({
        newPassword: '',
        confirmPassword: '',
        eyeoff: false,
    });
    const [errorMess, setErrorMess] = useState<errorMessObj>({
        newPassError: false,
        conPassError: false,
        message: "",
        saveBtn: true
    })
    const { newPassword, confirmPassword, eyeoff } = state;
    const { newPassError, conPassError, message, saveBtn } = errorMess;

    function passwordValidation() {
        // if (newPassword !== confirmPassword) {
        //     setErrorMess({
        //         ...errorMess,
        //         message: "Passwords do not match!",
        //         conPassError: true,
        //         saveBtn: true
        //     })
        //     return true
        // } else {
        //     return false
        // }

    }

    return (
        <FormElement>
            <Alert
                desciption="You are resetting password for emailid@gmail.com"
                destroy
                onClose={function noRefCheck() { }}
                type="info"
            >
                You're all set!
            </Alert>
            <TextField
                name={'New Password'}
                required={true}
                error={newPassError}
                placeHolder={'Enter New Password'}
                value={newPassword}
                onChange={(e) => {
                    let strenght = PasswordStrenght(e);

                    setState({
                        ...state,
                        newPassword: e
                    })
                    if (e === "") {
                        setErrorMess({
                            ...errorMess,
                            newPassError: true
                        })
                    } else if (strenght !== 100) {
                        if (confirmPassword === e) {
                            setErrorMess({
                                ...errorMess,
                                newPassError: false,
                                conPassError: false,
                                saveBtn: false
                            })
                        } else {
                            setErrorMess({
                                ...errorMess,
                                // newPassError: false,
                                // conPassError: true,
                                // message: "Passwords do not match!",
                                saveBtn: true
                            })
                        }

                    } else {
                        setErrorMess({
                            ...errorMess,
                            newPassError: false,
                        })
                    }
                }}
                strength={true}
                show={eyeoff}
                type="password"
                innerSufIcon={
                    eyeoff ? (
                        <Eye
                            color="#3B424F"
                            size={20}
                            onClick={() =>
                                setState({
                                    ...state,
                                    eyeoff: !eyeoff,
                                })
                            }
                        />
                    ) : (
                        <EyeOff
                            color="#3B424F"
                            size={20}
                            onClick={() =>
                                setState({
                                    ...state,
                                    eyeoff: !eyeoff,
                                })
                            }
                        />
                    )
                }
            />
            <div className='password'>
                <TextStyles textcolor="light">
                    To create a strong password make sure the password contains
                </TextStyles>
                <div className='password__rules'>
                    <List
                        type="disc"
                    >
                        <TextStyles textcolor="light">
                            A minimum of 8 characters
                        </TextStyles>
                        <TextStyles textcolor="light">
                            An uppercase and a lowercase letter
                        </TextStyles>
                        <TextStyles textcolor="light">
                            A number
                        </TextStyles>
                        <TextStyles textcolor="light">
                            One special character
                        </TextStyles>
                    </List>
                </div>

            </div>

            <TextField
                error={conPassError}
                showHelp={message}
                name={'Confirm Password'}
                required={true}
                placeHolder={'Confirm New Password'}
                value={confirmPassword}
                type="password"
                onChange={(e) => {
                    setState({
                        ...state,
                        confirmPassword: e
                    })
                    // passwordValidation()
                    if (newPassword !== e) {
                        setErrorMess({
                            ...errorMess,
                            conPassError: true,
                            saveBtn: true,
                            message: "Passwords do not match!"
                        })
                    } else {
                        setErrorMess({
                            ...errorMess,
                            conPassError: false,
                            saveBtn: false,
                            message: ""
                        })
                    }
                }}
            />
            <hr></hr>
            <Button
                content="Save"
                length="fullBtn"
                thickness='large'
                disable={saveBtn}
            // onClick={() => _props.history("/auth/reset")}
            />
        </FormElement>
    )
}

export default Reset