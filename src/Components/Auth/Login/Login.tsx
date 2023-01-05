import React, { useContext, useEffect, useState } from 'react';
import { DI, DIProps, parseJwt, extractUSername } from '../../../Core';
import { loginStatus } from '../../../Actions';
import * as queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
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
    username: string;
    password: string;
    loading: boolean;
    eyeoff: boolean;
}
function Login(_props: PropsI): JSX.Element {
    const [state, setState] = useState<loginStateObj>({
        username: '',
        password: '',
        loading: false,
        eyeoff: false,
    });
    const [pageLoad, pageLoadingState] = useState<boolean>(true);
    const [errorValidation, setErrorValidation] = useState<objectState>({
        email: { error: false, message: '', showError: false },
        password: { error: false, showError: false },
    });
    const navigate = useNavigate();
    const dispatcher = useContext(StoreDispatcher);

    useEffect(() => {
        if (_props.redux.user_id !== undefined) {
            const token = sessionStorage.getItem(
                _props.redux.user_id + '_auth_token'
            );
            token && navigate(`/panel/${_props.redux.user_id}/dashboard`);
        } else {
            dispatcher({
                type: 'logout',
                state: {},
            });
            _props.di.globalState.removeLocalStorage('auth_token');
            autoRedirect();
        }
        pageLoadingState(false);
        return () => {};
    }, []);

    /**
     * Function to call LOGIN API
     */
    function SubmitData(): void {
        let emailFlag = false;
        let passFlag = false;
        if (username.trim() == '' || errorValidation.email.error) {
            emailFlag = true;
        }
        if (password.trim() == '' || errorValidation.password.error) {
            passFlag = true;
        }
        setErrorValidation({
            ...errorValidation,
            email: { error: emailFlag, message: '', showError: emailFlag },
            password: { error: passFlag, showError: passFlag },
        });
        if (emailFlag || passFlag) {
            return;
        }

        const payload = {
            email: username.trim(),
            password: password.trim(),
            templateSource: APP_SOURCE_NAME,
        };
        setState({ ...state, loading: true });
        _props.di
            .POST(urlFetchCalls.post.userLogin, payload)
            .then((response) => {
                const { success, message, data } = response;
                if (success) {
                    const tokenDecoded = parseJwt(data.token);
                    _props.di.globalState.set(
                        `${tokenDecoded['user_id']}_user_authenticated`,
                        `true`
                    );
                    _props.di.globalState.set(
                        `${tokenDecoded['user_id']}_auth_token`,
                        data.token
                    );
                    _props.di.globalState.set(
                        `${tokenDecoded['user_id']}_username`,
                        extractUSername(username)
                    );
                    sessionStorage.setItem('webhook_call', 'true');
                    _props.di.globalState.removeLocalStorage(
                        `${tokenDecoded['user_id']}_showInstagramWarning`
                    );
                    _props.di.globalState.removeLocalStorage(
                        `${tokenDecoded['user_id']}_showPaymentWarning`
                    );
                    _props.loginStatus();
                    _props.history(
                        `/panel/${tokenDecoded['user_id']}/dashboard`
                    );
                } else {
                    const updatedMessage = message.replace('username', 'email');
                    _props.error(updatedMessage);
                }
                setState({ ...state, loading: false });
            });
    }

    /**
     * checks the token on query param and authenticate the user if success then user get auto login
     */
    const autoRedirect = () => {
        const queryParams: any = queryString.parse(_props.location.search);
        if (
            queryParams['connectionStatus'] != null &&
            queryParams['connectionStatus']
        ) {
            navigate(`/show/message?success=true`);
            return;
        } else if (queryParams['user_token'] != null) {
            const tokenDecoded = parseJwt(queryParams['user_token']);
            _props.di.globalState.set(
                `${tokenDecoded['user_id']}_user_authenticated`,
                `true`
            );
            _props.di.globalState.set(
                `${tokenDecoded['user_id']}_auth_token`,
                queryParams['user_token']
            );
            _props.di.globalState.set(
                `${tokenDecoded['user_id']}_username`,
                extractUSername(queryParams['username'] ?? 'User')
            );
            _props.di.globalState.removeLocalStorage(
                `${tokenDecoded['user_id']}_showInstagramWarning`
            );
            _props.di.globalState.removeLocalStorage(
                `${tokenDecoded['user_id']}_showPaymentWarning`
            );
            _props.loginStatus();
            navigate(`/panel/${tokenDecoded['user_id']}/dashboard`);
        } else if (queryParams['admin_user_token']) {
            const tokenDecoded = parseJwt(queryParams['admin_user_token']);
            _props.di.globalState.set(
                `${tokenDecoded['user_id']}_user_authenticated`,
                `true`
            );
            _props.di.globalState.set(
                `${tokenDecoded['user_id']}_auth_token`,
                queryParams['admin_user_token']
            );
            _props.di.globalState.set(
                `${tokenDecoded['user_id']}_username`,
                'User'
            );
            _props.di.globalState.removeLocalStorage(
                `${tokenDecoded['user_id']}_showInstagramWarning`
            );
            _props.di.globalState.removeLocalStorage(
                `${tokenDecoded['user_id']}_showPaymentWarning`
            );
            _props.loginStatus();
            navigate(`/panel/${tokenDecoded['user_id']}/dashboard`);
        }
    };

    if (pageLoad) {
        return <></>;
    }

    const { username, password, loading, eyeoff } = state;
    const { emailFormat } = regexValidation;
    return (
        <>
            <FormElement>
                <TextField
                    name={'Email'}
                    error={errorValidation.email.showError}
                    showHelp={errorValidation.email.message}
                    required={true}
                    placeHolder={'ex: abc@gmail.com'}
                    value={username}
                    onblur={() => {
                        if (username.trim() != '') {
                            if (!username.match(emailFormat)) {
                                setErrorValidation({
                                    ...errorValidation,
                                    email: {
                                        ...errorValidation.email,
                                        error: true,
                                        message: RegistrationPage.emailError,
                                        showError: true,
                                    },
                                });
                            } else {
                                setErrorValidation({
                                    ...errorValidation,
                                    email: {
                                        ...errorValidation.email,
                                        error: false,
                                        message: '',
                                        showError: false,
                                    },
                                });
                            }
                        } else {
                            setErrorValidation({
                                ...errorValidation,
                                email: {
                                    ...errorValidation.email,
                                    error: true,
                                    message: '',
                                    showError: true,
                                },
                            });
                        }
                    }}
                    onChange={(e: string) => {
                        if (e.length == 0) {
                            setErrorValidation({
                                ...errorValidation,
                                email: {
                                    error: true,
                                    message: '',
                                    showError: false,
                                },
                            });
                        } else if (!e.match(emailFormat)) {
                            setErrorValidation({
                                ...errorValidation,
                                email: {
                                    ...errorValidation.email,
                                    error: true,
                                    message: '',
                                    showError: false,
                                },
                            });
                        } else {
                            setErrorValidation({
                                ...errorValidation,
                                email: {
                                    ...errorValidation.email,
                                    error: false,
                                    message: '',
                                    showError: false,
                                },
                            });
                        }
                        setState({
                            ...state,
                            username: e.toLowerCase().trim(),
                        });
                    }}
                    onEnter={() => SubmitData()}
                />
                <div>
                    <FlexLayout direction="vertical" spacing="mediumTight">
                        <TextField
                            name={'Password'}
                            error={errorValidation.password.showError}
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
                            onEnter={() => SubmitData()}
                            onblur={() => {
                                if (password.length == 0) {
                                    setErrorValidation({
                                        ...errorValidation,
                                        password: {
                                            error: true,
                                            showError: true,
                                        },
                                    });
                                } else {
                                    setErrorValidation({
                                        ...errorValidation,
                                        password: {
                                            error: false,
                                            showError: false,
                                        },
                                    });
                                }
                            }}
                            onChange={(e) => {
                                if (e.length == 0) {
                                    setErrorValidation({
                                        ...errorValidation,
                                        password: {
                                            error: true,
                                            showError: false,
                                        },
                                    });
                                } else {
                                    setErrorValidation({
                                        ...errorValidation,
                                        password: {
                                            error: false,
                                            showError: false,
                                        },
                                    });
                                }
                                setState({ ...state, password: e.trim() });
                            }}
                        />

                        <FlexLayout halign="end">
                            <Button
                                type="TextButton"
                                thickness="thin"
                                onClick={() => _props.history('/auth/forgot')}>
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
                    disable={
                        errorValidation.email.error ||
                        errorValidation.password.error
                    }
                    onClick={() => {
                        SubmitData();
                    }}>
                    Login
                </Button>
            </FormElement>
        </>
    );
}

export default DI(Login, { func: { loginStatus } });
