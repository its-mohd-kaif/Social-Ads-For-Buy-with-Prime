import React, { useContext, useEffect, useState } from 'react';
import { DI, DIProps, parseJwt } from '../../../Core';
import { loginStatus } from '../../../Actions';
import * as queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreDispatcher } from '../../..';
import { Eye, EyeOff } from 'react-feather';
import {
    Button,
    FlexLayout,
    FormElement,
    TextField,
} from '@cedcommerce/ounce-ui';
import {
    APP_SOURCE_NAME,
    regexValidation,
    urlFetchCalls,
} from '../../../Constant';
import { RegistrationPage } from '../StaticMessages';

interface PropsI extends DIProps {
    loginStatus: () => void;
}
interface objIErrorValidate {
    error?: boolean;
    message?: string;
    showError?: boolean;
}
interface objectState {
    [name: string]: objIErrorValidate;
}
interface loginStateObj {
    email: string;
    password: string;
    loading: boolean;
    eyeoff: boolean;
}
interface errorMessObj {
    emailError: boolean;
    message: string;
    passError: boolean;
    loginBtn: boolean;
}
function Login(_props: PropsI): JSX.Element {
    /**
     * make a state object for input fields
     */
    const [state, setState] = useState<loginStateObj>({
        email: '',
        password: '',
        loading: false,
        eyeoff: false,
    });
    /**
     * make a state object for showing alert messages
     */
    const [errorMess, setErrorMess] = useState<errorMessObj>({
        emailError: false,
        message: "",
        passError: false,
        loginBtn: true
    })
    const [pageLoad, pageLoadingState] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatcher = useContext(StoreDispatcher);

    const [params] = useSearchParams()

    useEffect(() => {
        dispatcher({
            type: 'logout',
            state: {},
        });
        _props.di.globalState.removeLocalStorage('auth_token');
        pageLoadingState(false);
        return () => { };
    }, []);
    /**
     * On this useEffect we check connection status in url params
     * also we save user id in redux
     * and save new token in session storage
     * and last we navigate to prepare dashboard component
     */
    useEffect(() => {
        let connection_status = params.get("connection_status");
        let token: any = params.get("user_token");
        if (connection_status === "1") {
            let response = parseJwt(token);
            let { user_id } = response;
            dispatcher({
                type: "user_id",
                state: {
                    user_id: user_id
                }
            })
            _props.di.globalState.set(`${user_id}_auth_token`, token)
            navigate(`/prepareDashboard`)
        }
    }, [])
    if (pageLoad) {
        return <></>;
    }
    /**
     * destructure all state values 
     */
    const { email, password, loading, eyeoff } = state;
    const { emailError, passError, message, loginBtn } = errorMess
    let { emailFormat
    } = regexValidation;

    /**
     * OnBlur() this function run and check validation of email field
     */
    const checkEmailValidation = () => {
        if (emailFormat.test(email) === false || email === "") {
            setErrorMess({
                ...errorMess,
                emailError: true,
                message: "Please enter a valid email",
                loginBtn: true
            })
        }
    }
    /**
     * OnBlur() this function run and check validation of pasword field
     */
    const checkPassValidation = () => {
        if (password === "") {
            setErrorMess({
                ...errorMess,
                passError: true,
                loginBtn: true
            })
        }
    }
    /**
     * In this function we make post request and pass user credentials information
     * after response we get token 
     * we parse token and get user id
     * and save user id into redux state
     * also set user token in session storage
     */
    const loginHandler = () => {
        setState({
            ...state,
            loading: true
        })
        const { di: { POST } } = _props
        const { post: {
            userLogin
        } } = urlFetchCalls
        POST(userLogin, {
            email: email,
            password: password
        }).then((res) => {
            setState({
                ...state,
                loading: false
            })
            if (res.success === false) {
                _props.error(res.message)
            } else if (res.success === true) {
                const { data: {
                    token
                } } = res
                let response = parseJwt(token);
                let { user_id } = response
                _props.loginStatus();
                dispatcher({
                    type: "user_id",
                    state: {
                        user_id: user_id
                    }
                })
                _props.di.globalState.set(`${user_id}_auth_token`, token)
                _props.history(`/panel/${user_id}/dashboard`)
            }
        })
            .catch((mess) => console.log(mess))
    }

    return (
        <>
            <FormElement>
                <TextField
                    name={'Email'}
                    error={emailError}
                    showHelp={message}
                    required={true}
                    placeHolder={'ex: abc@gmail.com'}
                    value={email}
                    type="email"
                    onChange={(e) => {
                        /**
                         * onchange we check email validation and store value in state
                         */
                        setErrorMess({
                            ...errorMess,
                            emailError: false,
                            message: "",
                            loginBtn: true
                        })
                        setState({ ...state, email: e })
                        if (emailFormat.test(e) === true && password !== "") {
                            setErrorMess({
                                ...errorMess,
                                emailError: false,
                                message: "",
                                loginBtn: false
                            })
                        }
                    }}
                    onblur={() => checkEmailValidation()}
                />
                <div>
                    <FlexLayout direction="vertical" spacing="mediumTight">
                        <TextField
                            name={'Password'}
                            required={true}
                            placeHolder={'Enter Password'}
                            value={password}
                            strength={false}
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
                            onChange={(e) => {
                                /**
                                * onchange we check password validation and store value in state
                                */
                                setErrorMess({
                                    ...errorMess,
                                    passError: false,
                                    loginBtn: true
                                })
                                setState({ ...state, password: e })
                                if (emailFormat.test(email) === true && e !== "") {
                                    setErrorMess({
                                        ...errorMess,
                                        passError: false,
                                        loginBtn: false
                                    })
                                }
                            }}
                            onblur={() => checkPassValidation()}
                            error={passError}
                        />

                        <FlexLayout halign="end">
                            <Button
                                type="TextButton"
                                thickness="thin"
                                onClick={() => _props.history("/auth/forgot")}>
                                Forgot Password?
                            </Button>
                        </FlexLayout>
                    </FlexLayout>
                </div>
                <hr />
                <Button
                    thickness="large"
                    length="fullBtn"
                    loading={loading}
                    disable={loginBtn}
                    onClick={() => {
                        loginHandler()
                    }}>
                    Login
                </Button>
            </FormElement>
        </>
    );
}

export default DI(Login, { func: { loginStatus } });

