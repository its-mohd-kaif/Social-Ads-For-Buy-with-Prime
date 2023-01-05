import {
    TextField,
    Button,
    TextStyles,
    FormElement,
} from '@cedcommerce/ounce-ui';
import React, { useContext, useEffect, useState } from 'react';
import { DI, DIProps } from '../../../Core';
import { ArrowLeft } from 'react-feather';
import ResetPasswordAlert from '../Layouts/ResetPasswordAlert';
import { ObjI } from 'src/Core/@types';
import { StoreDispatcher } from '../../..';
import { RegistrationPage } from '../StaticMessages';
import {
    APP_SOURCE_NAME,
    regexValidation,
    subject,
    urlFetchCalls,
} from '../../../Constant';

interface stateObjInterface {
    userEmail: string;
    loading: boolean;
    linkSent: boolean;
}

interface emailInterface {
    error: boolean;
    message: string;
    showError: boolean;
}

interface errorValidationInterface {
    [name: string]: emailInterface;
}

function Forgot(_props: DIProps): JSX.Element {
    const dispatcher = useContext(StoreDispatcher);
    const [state, setState] = useState<stateObjInterface>({
        userEmail: '',
        loading: false,
        linkSent: false,
    });
    const [errorValidation, setErrorValidation] =
        useState<errorValidationInterface>({
            email: { error: false, message: '', showError: false },
        });
    const { emailFormat } = regexValidation;
    const redirectLink = 'http://' + window.location.host;
    const forgotLinkSend = (): void => {
        if (!userEmail.match(emailFormat)) {
            return;
        }
        setState({ ...state, loading: true });
        const payload: ObjI = {
            email: userEmail,
            subject: subject.passwordReset,
            templateSource: APP_SOURCE_NAME,
        };
        payload['reset-link'] = redirectLink + urlFetchCalls.redirect.resetPage;
        payload['frontend_app_url'] = redirectLink;
        _props.di
            .POST(urlFetchCalls.post.forgotPassword, payload)
            .then((event) => {
                const { success, message } = event;
                if (success) {
                    _props.history('/auth/forgotsuccess');
                    setState({ ...state, linkSent: true });
                } else {
                    setState({ ...state, loading: false });
                    _props.error(message);
                }
            });
    };

    useEffect(() => {
        dispatcher({
            type: 'logout',
            state: {},
        });
        _props.di.globalState.removeLocalStorage('auth_token');
    }, []);

    const { userEmail, loading, linkSent } = state;
    if (linkSent) {
        return <ResetPasswordAlert />;
    }
    return (
        <>
            <FormElement>
                <TextField
                    value={userEmail}
                    showHelp={errorValidation.email.message}
                    error={errorValidation.email.showError}
                    onChange={(e) => {
                        if (e.length == 0) {
                            setErrorValidation({
                                ...errorValidation,
                                email: {
                                    message: '',
                                    error: false,
                                    showError: false,
                                },
                            });
                        } else if (e.match(emailFormat)) {
                            setErrorValidation({
                                ...errorValidation,
                                email: {
                                    message: '',
                                    error: false,
                                    showError: false,
                                },
                            });
                        } else {
                            setErrorValidation({
                                ...errorValidation,
                                email: {
                                    message: '',
                                    error: true,
                                    showError: false,
                                },
                            });
                        }
                        setState({
                            ...state,
                            userEmail: e.toLowerCase().trim(),
                        });
                    }}
                    onblur={() => {
                        if (state.userEmail.trim() != '') {
                            if (!state.userEmail.match(emailFormat)) {
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
                    placeHolder="Enter Email"
                    onEnter={() => forgotLinkSend()}
                />
                <hr />
                <Button
                    type="Primary"
                    thickness="large"
                    loading={loading}
                    disable={
                        errorValidation.email.error || userEmail.trim() == ''
                    }
                    length="fullBtn"
                    onClick={() => forgotLinkSend()}>
                    Generate link
                </Button>
                <TextStyles>
                    <Button
                        iconRound={false}
                        icon={<ArrowLeft size={20} />}
                        type="Plain"
                        thickness="extraThin"
                        onClick={() =>
                            _props.history(urlFetchCalls.redirect.loginPage)
                        }>
                        Back to Login
                    </Button>
                </TextStyles>
            </FormElement>
        </>
    );
}
export default DI(Forgot);
