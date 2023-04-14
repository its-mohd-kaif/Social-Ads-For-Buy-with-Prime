import { Button, FlexChild, FlexLayout, FormElement, Modal, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { DI, DIProps } from "../../../Core";
import { urlFetchCalls } from '../../../Constant'
interface otpProps extends DIProps {
    email: string;
    openModal: boolean;
    modalMethod: any
}
interface errorObj {
    warn: string;
    type: string;
    message: string;
    resendBtn: boolean;
    loader: boolean;
}
function OtpModal(_props: otpProps,) {
    /**
     * ref array for getting input field details
     */
    const [refs, setRefs] = useState<any>([]);
    /**
     * state object for related errors
     */
    const [error, setError] = useState<errorObj>({
        warn: "",
        type: "",
        message: "",
        resendBtn: true,
        loader: false,
    })
    /**
     * press array for storing which index input value is fill 
     */
    const [press, setPress] = useState<any>([]);
    const [timer, setTimer] = useState<number>(60);
    const [attempt, setAttempt] = useState<number>(4);
    const { di: { GET, POST } } = _props;
    const { get: {
        otpMail
    }, post: {
        validateOtp
    } } = urlFetchCalls;
    const regexForValidation = /^[0-9\b]+$/;
    const { warn, type, message, resendBtn, loader } = error
    /**
     * On render we hit otpMail api that will send otp 
     * and we make a ref array
     */
    useEffect(() => {
        GET(`${otpMail}?email=${_props.email}`)
            .then((res) => {
                if (res.success === false) {
                    _props.error(res.message)
                }
            }).catch((mess) => console.log(mess))

        let length = 5;
        let tempRef: any = [];
        let tempPress: any = [];
        while (length !== 0) {
            tempRef.push(React.createRef());
            tempPress.push(" ");
            length--;
        }
        setRefs(tempRef);
        setPress(tempPress);
    }, [])
    /**
     * Focus on first input box
     */
    useEffect(() => {
        document.getElementById("0")?.focus()
    }, [refs])
    /**
     * timer functionality
     */
    useEffect(() => {
        let time = setTimeout(() => {
            setTimer((val) => --val);
        }, 1000);
        if (timer === 0) {
            setError({
                ...error,
                resendBtn: false
            })
            clearInterval(time);
        }
    }, [timer])
    /**
     * onchange on input box we check validation
     * also we set input value in our press array
     * and call match otp function
     */
    const otpValdation = (index: any) => {
        let value = refs[index].current.value
        if (regexForValidation.test(value) === true) {
            setError({
                ...error,
                message: "",
                warn: "",
                type: "",
            })
            setPress(press.splice(index, 1, refs[index].current.value));
            setPress([...press]);
            if (index !== refs.length - 1) {
                refs[index + 1].current.focus();
            }
            matchOtp()
        } else {
            refs[index].current.value = ""
        }
    }
    /**
     * onbackspace we move pointer
     */
    const backSpaceHandler = (index: any) => {
        if (index !== 0) {
            setError({
                ...error,
                message: "",
                warn: "",
                type: "",
            })
            setPress(press.splice(index, 1, " "));
            setPress(press.splice(index - 1, 1, " "));
            setPress([...press]);
            refs[index - 1].current.focus();
            refs[index - 1].current.value = ""
        }
    }
    /**
     * this is otp match function
     * when all input fields are fill we make a post request
     * with otp value and user email
     * and return response of that api
     */
    const matchOtp = () => {
        if (JSON.stringify(press).includes(" ") === false) {
            setError({
                ...error,
                loader: true
            })
            let string = "";
            for (const element of press) {
                string += element
            }
            let myOTP = parseInt(string)
            POST(validateOtp, {
                "otp": myOTP,
                "email": _props.email
            }).then((res) => {
                setError({
                    ...error,
                    loader: false
                })
                if (res.success === false) {
                    setError({
                        ...error,
                        warn: "Error",
                        message: res.message,
                        type: "negative"
                    })
                    refs[0].current.focus();
                    let tempPress: any = [];
                    for (const element of refs) {
                        element.current.value = "";
                        tempPress.push(" ");
                    }
                    setPress(tempPress);
                } else if (res.success === true) {
                    setError({
                        ...error,
                        message: res.message,
                        type: "positive",
                        warn: "Success"

                    })
                }
            })

        }
    }
    /**
     * resendOtp handler
     * in this we resend otp to user
     */
    const resendOtpHandler = () => {
        setError({
            ...error,
            loader: true
        })
        if (attempt !== 0) {
            GET(`${otpMail}?email=${_props.email}`)
                .then((res) => {
                    if (res.success === false) {
                        _props.error(res.message)
                    } else {
                        setTimer(60)
                        setError({
                            ...error,
                            type: "positive",
                            message: "One-time passcode sent successfully!",
                            loader: false,
                            resendBtn: true,
                            warn: "",
                        })
                        setAttempt((val) => --val)
                        refs[0].current.focus();
                        let tempPress: any = [];
                        for (const element of refs) {
                            element.current.value = "";
                            tempPress.push(" ");
                        }
                        setPress(tempPress);
                    }
                }).catch((mess) => console.log(mess))
        }

    }
    return (
        <>
            <Modal
                close={() => _props.modalMethod()}
                closeOnEscape
                heading="Verify Email Address"
                modalSize="small"
                open={_props.openModal}>
                <FlexLayout direction='vertical' spacing='loose'>
                    <TextStyles>
                        An email with a verification code has been sent to <TextStyles fontweight='bold'>
                            {_props.email}
                        </TextStyles>
                    </TextStyles>
                    <FlexLayout direction='vertical' spacing='tight'>
                        <TextStyles>Enter your code here:</TextStyles>
                        <FlexLayout spacing='tight'>
                            {
                                refs.map((val: any, index: any) => (
                                    <div className='otpModal__textfield' key={val}>
                                        <FormElement>
                                            <TextField
                                                controlStates={warn}
                                                maxlength={1}
                                                ref={refs[index]}
                                                id={index}
                                                onChange={() => otpValdation(index)}
                                                onBackspace={() => backSpaceHandler(index)}
                                                type="text"
                                            />
                                        </FormElement>
                                    </div>
                                ))
                            }
                            <Button loading={loader} type='TextButton'></Button>
                            <TextStyles textcolor={type}>{message}</TextStyles>
                        </FlexLayout>
                    </FlexLayout>
                    <FlexLayout halign='fill'>
                        <FlexLayout spacing='tight'>
                            <Button onClick={resendOtpHandler} disable={resendBtn} type='TextButton'>Resend One-time passcode</Button>
                            <TextStyles textcolor='light'>({attempt} attempts left)</TextStyles>
                        </FlexLayout>
                        {timer !== 0 ? <TextStyles fontweight='extraBold' textcolor='negative'>{timer >= 0 && timer <= 9 ? `00:0${timer} sec` : `00:${timer} sec`}</TextStyles> : null}
                    </FlexLayout>
                </FlexLayout>

            </Modal>
        </>
    )
}

export default DI(OtpModal)