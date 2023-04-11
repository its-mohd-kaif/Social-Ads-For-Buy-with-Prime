import { Alert, Button, FormElement, List, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'react-feather';

function Reset() {
    const [state, setState] = useState<any>({
        email: '',
        password: '',
        loading: false,
        eyeoff: false,
    });
    const { email, password, loading, eyeoff } = state;
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
                placeHolder={'Enter New Password'}
                // value={password}
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
            <TextStyles textcolor="light">
                To create a strong password make sure the password contains
            </TextStyles>
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
            <TextField
                name={'Confirm Password'}
                required={true}
                placeHolder={'Confirm New Password'}
                // value={password}
                show={eyeoff}
                type="password"
            />
            <hr></hr>
            <Button
                content="Save"
                length="fullBtn"
                thickness='large'
                // disable={generateBtn}
                // onClick={() => _props.history("/auth/reset")}
            />
        </FormElement>
    )
}

export default Reset