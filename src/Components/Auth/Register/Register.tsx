import { FormElement, TextField, TextStyles, List, CheckBox, Button, FlexLayout } from '@cedcommerce/ounce-ui'
import React, { useContext, useEffect, useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { DI, DIProps, parseJwt } from "../../../Core";
import { PasswordStrenght } from '../function';
import { regexValidation, urlFetchCalls } from '../../../Constant'
import { StoreDispatcher } from '../../..';
import OtpModal from './OtpModal';
import { useNavigate } from 'react-router-dom';
interface registerStateObj {
    name: string;
    email: string;
    createPassword: string;
    confirmPassword: string;
    checkbox: boolean;
    loading: boolean;
    eyeoff: boolean;
}
interface errorMessObj {
    nameError: boolean;
    emailError: boolean;
    createPassError: boolean;
    confirmPassError: boolean;
    nameMess: string;
    emailMess: string;
    passMess: string;
    createBtn: boolean;
}

function Register(_props: DIProps) {
    /**
     * make a state object off input fields
     */
    const [state, setState] = useState<registerStateObj>({
        name: '',
        email: '',
        createPassword: '',
        confirmPassword: '',
        checkbox: true,
        loading: false,
        eyeoff: false,
    });
    /**
     * make a state object for handling error 
     */
    const [error, setError] = useState<errorMessObj>({
        nameError: false,
        emailError: false,
        createPassError: false,
        confirmPassError: false,
        nameMess: "",
        emailMess: "",
        passMess: "",
        createBtn: true
    })
    /**
     * state for open modal component
     */
    const [openModal, setOpenModal] = useState<boolean>(false)
    const dispatcher = useContext(StoreDispatcher);
    let navigate = useNavigate()
    /**
     * when page render we fetch token
     * and parse it 
     * and then we replace path with user id
     */
    useEffect(() => {
        let pathUrl = window.location.search.split("token=");
        let jwtT = pathUrl[1];
        if (jwtT !== undefined) {
            let myToken = parseJwt(jwtT);
            const { user_id } = myToken;
            _props.di.globalState.set(`${user_id}_auth_token`, jwtT);
            dispatcher({
                type: "user_id",
                state: {
                    user_id: user_id
                }
            })
            navigate(`/auth/${user_id}/register`)
        }
    }, [])
    /**
     * destructure all values
     */
    const { name, email, createPassword, confirmPassword,
        checkbox, loading, eyeoff } = state;
    const { nameError, nameMess, emailError, createPassError,
        confirmPassError, emailMess, passMess, createBtn } = error;
    let { emailFormat
    } = regexValidation;
    /**
     * onblur() this function will check name field validation
     */
    const nameValHandler = () => {
        if (name === "") {
            setError({
                ...error,
                nameError: true,
                createBtn: true
            })
        } else if (name.length > 100) {
            setError({
                ...error,
                nameError: true,
                createBtn: true,
                nameMess: "Maximum character limit is 100."
            })
        }
    }
    /**
     * onblur() this function will check email field validation
     */
    const emailValHandler = () => {
        if (email === "") {
            setError({
                ...error,
                emailError: true,
                createBtn: true
            })
            return false
        } else if (email !== "" && emailFormat.test(email) === false) {
            setError({
                ...error,
                emailError: true,
                emailMess: "Please enter a valid email",
                createBtn: true
            })
            return false
        }
        return true
    }
    /**
      * onblur() this function will check create password field validation
     */
    const createPassVal = () => {
        if (createPassword === "") {
            setError({
                ...error,
                createPassError: true,
                createBtn: true
            })
        }
    }
    /**
     * this is create account button handler function
     * we send a POST request
     * after getting success response we open modal 
     */
    const createBtnHandler = () => {
        setState({
            ...state,
            loading: true
        })
        const { di: { POST } } = _props;
        const { post: {
            emailExistsCheck
        } } = urlFetchCalls;
        POST(emailExistsCheck, {
            "data": {
                "email": email
            }
        }).then((res) => {
            setState({
                ...state,
                loading: false
            })
            if (res.success === false) {
                _props.error(res.message)
            } else if (res.success === true) {
                setOpenModal(true)
            }
        }).catch((mess) => console.log(mess))
    }
    return (
        <FormElement>
            <TextField
                name="Store / Brand Name"
                error={nameError}
                showHelp={nameMess}
                placeHolder='Enter Store / Brand name'
                required={true}
                onChange={(e) => {
                    setState({
                        ...state,
                        name: e
                    })
                    /**
                     * Error Handling
                     */
                    if (e !== "" && email !== "" && createPassword !== "" && confirmPassword !== "" && checkbox === true) {
                        setError({
                            ...error,
                            createBtn: false,
                            nameError: false,
                            nameMess: ""
                        })
                    } else {
                        setError({
                            ...error,
                            createBtn: true,
                        })
                    }
                }}
                onKeyUp={() => {
                    setError({
                        ...error,
                        nameError: false,
                        nameMess: ""
                    })
                }}
                type="text"
                value={name}
                onblur={nameValHandler}
            />
            <TextField
                name="Email"
                error={emailError}
                showHelp={emailMess}
                placeHolder='ex: abc@gmail.com'
                required={true}
                onChange={(e) => {
                    setState({
                        ...state,
                        email: e
                    })
                    /**
                     * Error Handling
                     */
                    if (name !== "" && e !== "" && emailFormat.test(e) === true && createPassword !== "" && confirmPassword !== "" && checkbox === true) {
                        setError({
                            ...error,
                            createBtn: false
                        })
                    }
                    else {
                        setError({
                            ...error,
                            emailError: false,
                            createBtn: true,
                            emailMess: ""
                        })
                    }

                }}
                type="email"
                value={email}
                onKeyUp={() => {
                    setError({
                        ...error,
                        emailError: false,
                        emailMess: ""
                    })
                }}
                onblur={emailValHandler}
            />
            <TextField
                name={'Create Password'}
                error={createPassError}
                required={true}
                placeHolder={'Enter Password'}
                onChange={(e) => {
                    let strenght = PasswordStrenght(e);
                    setState({
                        ...state,
                        createPassword: e
                    })
                    /**
                     * Error Handling
                     */
                    if (confirmPassword !== "") {
                        if (confirmPassword !== e) {
                            setError({
                                ...error,
                                createPassError: false,
                                confirmPassError: true,
                                createBtn: true,
                                passMess: "Passwords do not match!"
                            })
                        } else {
                            if (name !== "" && email !== "" && e !== "" && confirmPassword !== "" && checkbox === true) {
                                setError({
                                    ...error,
                                    createBtn: false,
                                    confirmPassError: false,
                                    passMess: ""
                                })
                            }
                        }
                    }
                    else if (strenght !== 100) {
                        setError({
                            ...error,
                            createPassError: false,
                            createBtn: true
                        })
                    }
                }}
                onblur={createPassVal}
                value={createPassword}
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
                name="Confirm Password"
                error={confirmPassError}
                showHelp={passMess}
                placeHolder='Confirm Password'
                required={true}
                onChange={(e) => {
                    setState({
                        ...state,
                        confirmPassword: e
                    })
                    /**
                     * match password validation
                     */
                    if (createPassword !== e) {
                        setError({
                            ...error,
                            confirmPassError: true,
                            createBtn: true,
                            passMess: "Passwords do not match!"
                        })
                    } else {
                        if (name !== "" && email !== "" && createPassword !== "" && e !== "" && checkbox === true) {
                            setError({
                                ...error,
                                createBtn: false,
                                confirmPassError: false,
                                passMess: ""
                            })
                        } else {
                            setError({
                                ...error,
                                confirmPassError: false,
                                passMess: ""
                            })
                        }


                    }
                }}
                type="password"
                value={confirmPassword}
            />
            <FlexLayout spacing="extraTight" halign="start">
                <CheckBox
                    id="two"
                    labelVal={"Accept Terms and Conditions."}
                    name="Name"
                    onClick={() => {
                        setState({
                            ...state,
                            checkbox: !checkbox
                        })
                        if (name !== "" && email !== "" && createPassword !== "" && confirmPassword !== "" && !checkbox === true) {
                            setError({
                                ...error,
                                createBtn: false,
                            })
                        } else {
                            setError({
                                ...error,
                                createBtn: true,
                            })
                        }
                    }}
                    checked={checkbox}
                />
                <Button
                    halign="Center"
                    iconAlign="left"
                    length="none"
                    onAction={function noRefCheck() { }}
                    onClick={() =>
                        window.open(
                            `https://cedcommerce.com/privacy-policy`
                        )
                    }
                    thickness="thin"
                    type="TextButton">
                    Read Our Policies
                </Button>
            </FlexLayout>
            <hr></hr>
            <Button
                content="Create Account"
                length="fullBtn"
                thickness='large'
                disable={createBtn}
                onClick={createBtnHandler}
                loading={loading}
            />
            {/* Modal Component Call */}
            {openModal ? <OtpModal email={email} openModal={OtpModal} modalMethod={() => setOpenModal(!openModal)} /> : null}
        </FormElement>
    )
}

export default DI(Register)