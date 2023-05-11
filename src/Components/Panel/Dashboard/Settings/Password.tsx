import { Card, FormElement, TextField, TextStyles, List, Button, FlexLayout } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { urlFetchCalls } from '../../../../../src/Constant';
import { PasswordStrenght } from '../../../../../src/Components/Auth/function';
import { DI, DIProps } from "../../../../../src/Core"
interface stateObj {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    eyeoff1: boolean;
    eyeoff2: boolean;
    loading: boolean;
}
interface errorMessObj {
    currPassError: boolean;
    newPassError: boolean;
    newPassMess: string;
    conPassError: boolean;
    message: string;
    saveBtn: boolean;
}
function Password(_props: DIProps) {
    /**
    * make a state object for input fields and loader
    */
    const [state, setState] = useState<stateObj>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        eyeoff1: false,
        eyeoff2: false,
        loading: false
    });
    /**
     * make a state object for error messages
     */
    const [errorMess, setErrorMess] = useState<errorMessObj>({
        currPassError: false,
        newPassError: false,
        newPassMess: "",
        conPassError: false,
        message: "",
        saveBtn: true
    })
    const { currentPassword, newPassword, loading, confirmPassword, eyeoff1, eyeoff2 } = state;
    const { currPassError, newPassError, newPassMess, conPassError, message, saveBtn } = errorMess;
    const { di: { POST }, redux } = _props;
    const { post: { resetPassword } } = urlFetchCalls

    const commonValidation = (currPass: string, newPass: string, confPass: string) => {
        if (newPass !== confPass && newPass !== "" && confPass !== "") {
            if (currPass !== newPass && currPass !== "") {
                setErrorMess({
                    ...errorMess,
                    newPassMess: "",
                    newPassError: false,
                    conPassError: true,
                    saveBtn: true,
                    message: "Passwords do not match!",
                })
            } else {
                setErrorMess({
                    ...errorMess,
                    conPassError: true,
                    saveBtn: true,
                    message: "Passwords do not match!",
                })
            }

        } else if (newPass === currPass && newPass !== "" && currPass !== "") {
            if (newPass === confPass && confPass !== "") {
                setErrorMess({
                    ...errorMess,
                    conPassError: false,
                    message: "",
                    saveBtn: true,
                    newPassError: true,
                    newPassMess: "Your new password cannot be the same as your current password.",
                })
            } else {
                setErrorMess({
                    ...errorMess,
                    saveBtn: true,
                    newPassError: true,
                    newPassMess: "Your new password cannot be the same as your current password.",
                })
            }

        } else {
            setErrorMess({
                saveBtn: true,
                currPassError: false,
                conPassError: false,
                newPassError: false,
                message: "",
                newPassMess: ""
            })
        }
    }

    const checkValidation = (currPass: string, newPass: string, confPass: string) => {
        let strenght = PasswordStrenght(newPass);
        if (strenght === 100) {
            if (newPass === confPass && confPass !== "" && currPass !== newPass) {
                setErrorMess({
                    saveBtn: false,
                    currPassError: false,
                    conPassError: false,
                    newPassError: false,
                    message: "",
                    newPassMess: ""
                })
            }
            else {
                commonValidation(currPass, newPass, confPass);
            }
        } else {
            commonValidation(currPass, newPass, confPass);
        }
    }
    const saveBtnHandler = () => {
        POST(resetPassword, {
            email: redux.current.source.email,
            old_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword
        }).then((res) => {
            if (res.success === true) {
                _props.success(res.message);
            } else if (res.success === false) {
                _props.error(res.message)
            }
        })
    }
    return (
        <div>
            <Card title={"Password Reset"}>
                <FormElement>
                    <TextField
                        name={'Current Password'}
                        placeHolder={'Enter current password'}
                        value={currentPassword}
                        error={currPassError}
                        show={eyeoff1}
                        onChange={(e) => {
                            setState({
                                ...state,
                                currentPassword: e
                            })
                            if (e === "") {
                                setErrorMess({
                                    ...errorMess,
                                    currPassError: true,
                                    saveBtn: true
                                })
                            } else {
                                checkValidation(e, newPassword, confirmPassword)
                            }
                        }}
                        onblur={() => {
                            if (currentPassword === "") {
                                setErrorMess({
                                    ...errorMess,
                                    currPassError: true,
                                    saveBtn: true
                                })
                            }
                        }}
                        type="password"
                        innerSufIcon={
                            eyeoff1 ? (
                                <Eye
                                    color="#3B424F"
                                    size={20}
                                    onClick={() =>
                                        setState({
                                            ...state,
                                            eyeoff1: !eyeoff1,
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
                                            eyeoff1: !eyeoff1,
                                        })
                                    }
                                />
                            )
                        }
                    />
                    <TextField
                        name={'New Password'}
                        error={newPassError}
                        placeHolder={'Enter New Password'}
                        value={newPassword}
                        showHelp={newPassMess}
                        onChange={(e) => {
                            /**
                             * store a value into state
                             */
                            setState({
                                ...state,
                                newPassword: e
                            })
                            if (e === "") {
                                setErrorMess({
                                    ...errorMess,
                                    newPassError: true,
                                    saveBtn: true
                                })
                            } else {
                                checkValidation(currentPassword, e, confirmPassword)
                            }
                        }}
                        onblur={() => {
                            if (newPassword === "") {
                                setErrorMess({
                                    ...errorMess,
                                    newPassError: true
                                })
                            } else if (newPassword === currentPassword) {
                                setErrorMess({
                                    ...errorMess,
                                    newPassError: true,
                                    newPassMess: "Your new password cannot be the same as your current password."
                                })
                            }
                        }}
                        strength={true}
                        show={eyeoff2}
                        type="password"
                        innerSufIcon={
                            eyeoff2 ? (
                                <Eye
                                    color="#3B424F"
                                    size={20}
                                    onClick={() =>
                                        setState({
                                            ...state,
                                            eyeoff2: !eyeoff2,
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
                                            eyeoff2: !eyeoff2,
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
                        placeHolder={'Confirm New Password'}
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => {
                            /**
                             * store a value into state
                             */
                            setState({
                                ...state,
                                confirmPassword: e
                            })
                            if (e === "") {
                                setErrorMess({
                                    ...errorMess,
                                    conPassError: true,
                                    saveBtn: true
                                })
                            } else {
                                checkValidation(currentPassword, newPassword, e)
                            }
                        }}
                    />
                    <hr></hr>
                    <FlexLayout halign='end'>
                        <Button
                            content="Save New Password"
                            thickness='large'
                            disable={saveBtn}
                            onClick={saveBtnHandler}
                            loading={loading}
                        />
                    </FlexLayout>
                </FormElement>
            </Card>
        </div>
    )
}

export default DI(Password)