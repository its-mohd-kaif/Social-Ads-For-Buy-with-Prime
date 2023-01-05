import {
    TextField,
    Button,
    FormElement,
    Alert,
    FlexLayout,
} from '@cedcommerce/ounce-ui';
import React, { useContext, useEffect, useState } from 'react';
import { DI, DIProps, parseJwt } from '../../../Core';
import { Eye, EyeOff } from 'react-feather';
import PasswordCreatedAlert from '../Layouts/PasswordCreatedAlert';
import { PasswordStrenght } from '../function';
import { RegistrationPage } from '../StaticMessages';
import * as queryString from 'query-string';
import { StoreDispatcher } from '../../..';
import CustomHelpPoints from '../../../Components/CustomHelpPoints';
import { urlFetchCalls } from '../../../Constant';

interface statePropsInterface {
    newPassword: string;
    loading: boolean;
    confirmNewPassword: string;
    eyeoff: boolean;
    passwordCreated: boolean;
    alertClose: boolean;
    error: boolean;
    message: string;
}

interface objIErrorValidate {
    error?: boolean;
    message?: string;
    showError?: boolean;
}
interface objectState {
    [name: string]: objIErrorValidate;
}

function Reset(_props: DIProps): JSX.Element {
    const [state, setState] = useState<statePropsInterface>({
        newPassword: '',
        loading: false,
        confirmNewPassword: '',
        eyeoff: false,
        passwordCreated: false,
        alertClose: false,
        error: false,
        message: '',
    });
    const [ErrorValidation, setErrorValidation] = useState<objectState>({
        cnfPass: { error: false, message: '', showError: false },
        newPass: { error: false, message: '', showError: false },
    });
    const [disable, setDisable] = useState(true);
    const queryParams: any = queryString.parse(_props.location.search);
    const tokenJwt =
        queryParams.token && decodeURIComponent(atob(queryParams.token));
    const tokenDecoded = tokenJwt && parseJwt(tokenJwt);
    const desciptionText =
        'You are resetting password for ' + tokenDecoded?.email;

    const reset = (): void => {
        if (PasswordStrenght(newPassword) !== 100) {
            _props.error(RegistrationPage.PassStrenght);
            return;
        }
        if (newPassword == confirmNewPassword) {
            const payload = {
                new_password: newPassword,
                confirm_password: confirmNewPassword,
                token: queryParams.token,
            };
            setState({ ...state, loading: true });
            _props.di
                .POST(urlFetchCalls.post.forgotReset, payload)
                .then((e) => {
                    const { success, message } = e;
                    if (success) {
                        setState({
                            ...state,
                            passwordCreated: true,
                            loading: false,
                        });
                    } else {
                        _props.error(message);
                        setState({ ...state, loading: false });
                    }
                });
        } else {
            _props.error(RegistrationPage.PasswordNotMatched);
        }
    };
    const {
        confirmNewPassword,
        eyeoff,
        loading,
        newPassword,
        passwordCreated,
        alertClose,
    } = state;
    const dispatcher = useContext(StoreDispatcher);
    useEffect(() => {
        dispatcher({
            type: 'logout',
            state: {},
        });
        _props.di.globalState.removeLocalStorage('auth_token');
    }, []);
    return (
        <>
            {passwordCreated ? (
                <PasswordCreatedAlert />
            ) : (
                <FormElement>
                    {!alertClose && (
                        <Alert
                            type="info"
                            desciption={desciptionText}
                            onClose={() => {
                                setState({ ...state, alertClose: true });
                            }}>
                            You're all set!
                        </Alert>
                    )}
                    <FlexLayout direction="vertical" spacing="mediumTight">
                        <TextField
                            value={newPassword}
                            required
                            error={ErrorValidation.newPass.error}
                            showHelp={ErrorValidation.newPass.message}
                            type={'password'}
                            strength={true}
                            show={eyeoff}
                            innerSufIcon={
                                eyeoff ? (
                                    <Eye
                                        onClick={() =>
                                            setState({
                                                ...state,
                                                eyeoff: !eyeoff,
                                            })
                                        }
                                    />
                                ) : (
                                    <EyeOff
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
                                if (
                                    PasswordStrenght(e.trim()) == 100 &&
                                    PasswordStrenght(
                                        state.confirmNewPassword
                                    ) == 100 &&
                                    e.trim() == state.confirmNewPassword
                                ) {
                                    setDisable(false);
                                } else {
                                    setDisable(true);
                                }
                                if (e.length == 0) {
                                    setErrorValidation({
                                        ...ErrorValidation,
                                        newPass: { error: true, message: '' },
                                    });
                                } else if (
                                    e.trim() != state.confirmNewPassword
                                ) {
                                    confirmNewPassword.trim() != ''
                                        ? setErrorValidation({
                                              ...ErrorValidation,
                                              cnfPass: {
                                                  error: true,
                                                  message:
                                                      RegistrationPage.PasswordNotMatched,
                                              },

                                              newPass: {
                                                  error: false,
                                                  message: '',
                                              },
                                          })
                                        : setErrorValidation({
                                              ...ErrorValidation,
                                              newPass: {
                                                  error: false,
                                                  message: '',
                                              },
                                          });
                                } else {
                                    setErrorValidation({
                                        ...ErrorValidation,
                                        cnfPass: { error: false, message: '' },
                                        newPass: { error: false, message: '' },
                                    });
                                }
                                setState({
                                    ...state,
                                    newPassword: e.trim().replace(/\s/g, ''),
                                    error: true,
                                    message:
                                        RegistrationPage.PasswordNotMatched,
                                });
                            }}
                            name="New Password"
                            placeHolder="Enter New Password"
                        />
                        <CustomHelpPoints />
                    </FlexLayout>
                    <TextField
                        showHelp={ErrorValidation.cnfPass.message}
                        value={confirmNewPassword}
                        name="Confirm Password"
                        error={ErrorValidation.cnfPass.error}
                        required
                        strength={false}
                        show={false}
                        type="password"
                        placeHolder="Confirm New Password"
                        onChange={(e) => {
                            if (
                                PasswordStrenght(e.trim()) == 100 &&
                                PasswordStrenght(state.newPassword) == 100 &&
                                e.trim() == state.newPassword
                            ) {
                                setDisable(false);
                            } else {
                                setDisable(true);
                            }
                            if (e.length == 0) {
                                setErrorValidation({
                                    ...ErrorValidation,
                                    cnfPass: { error: true, message: '' },
                                });
                            } else if (state.newPassword != e.trim()) {
                                setErrorValidation({
                                    ...ErrorValidation,
                                    cnfPass: {
                                        error: true,
                                        message:
                                            RegistrationPage.PasswordNotMatched,
                                    },
                                });
                            } else {
                                setErrorValidation({
                                    ...ErrorValidation,
                                    cnfPass: {
                                        error: false,
                                        message: '',
                                    },
                                });
                            }
                            setState({
                                ...state,
                                confirmNewPassword: e.trim().replace(/\s/g, ''),
                            });
                        }}></TextField>
                    <hr />
                    <Button
                        thickness="large"
                        type="Primary"
                        disable={disable}
                        length="fullBtn"
                        loading={loading}
                        onClick={() => reset()}>
                        Save
                    </Button>
                </FormElement>
            )}
        </>
    );
}
export default DI(Reset);
