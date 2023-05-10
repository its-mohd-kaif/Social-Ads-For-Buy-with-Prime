import { Card, FormElement, TextField, TextStyles, List, Button, FlexLayout } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
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
        conPassError: false,
        message: "",
        saveBtn: true
    })
    const { currentPassword, newPassword, loading, confirmPassword, eyeoff1, eyeoff2 } = state;
    const { currPassError, newPassError, conPassError, message, saveBtn } = errorMess;
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
                            setErrorMess({
                                ...errorMess,
                                currPassError: false
                            })
                        }}
                        onblur={() => {
                            if (currentPassword === "") {
                                setErrorMess({
                                    ...errorMess,
                                    currPassError: true
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
                        onChange={(e) => {
                            let strenght = PasswordStrenght(e);
                            /**
                             * store a value into state
                             */
                            setState({
                                ...state,
                                newPassword: e
                            })
                            /**
                             * password validation check
                             */
                            if (strenght === 100 && confirmPassword === e) {
                                setErrorMess({
                                    ...errorMess,
                                    newPassError: false,
                                    conPassError: false,
                                    saveBtn: false,
                                    message: ""
                                })
                            } else if (confirmPassword !== "") {
                                if (confirmPassword !== e) {
                                    setErrorMess({
                                        ...errorMess,
                                        newPassError: false,
                                        conPassError: true,
                                        saveBtn: true,
                                        message: "Passwords do not match!"
                                    })
                                }
                            } else {
                                setErrorMess({
                                    ...errorMess,
                                    newPassError: false
                                })
                            }
                        }}
                        onblur={() => {
                            if (newPassword === "") {
                                setErrorMess({
                                    ...errorMess,
                                    newPassError: true
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
                            /**
                             * match password validation
                             */
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
                    <FlexLayout halign='end'>
                        <Button
                            content="Save New Password"
                            thickness='large'
                            disable={saveBtn}
                            // onClick={saveBtnHandler}
                            loading={loading}
                        />
                    </FlexLayout>
                </FormElement>
            </Card>
        </div>
    )
}

export default DI(Password)