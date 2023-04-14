import { Button, FlexChild, FlexLayout, FormElement, Modal, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { DI, DIProps } from "../../../Core";
import { urlFetchCalls } from '../../../Constant'
interface otpProps extends DIProps {
    email: string
}
type VF = () => void;
function OtpModal(_props: otpProps,) {
    const [flag, setFlag] = useState(true);

    const [refs, setRefs] = useState<any>([]);
    const { di: { GET } } = _props;
    const { get: {
        otpMail
    } } = urlFetchCalls;
    const regexForValidation = /^[0-9\b]+$/;
    useEffect(() => {
        let length = 5;
        let tempRef: any = [];
        while (length !== 0) {
            tempRef.push(React.createRef());
            length--;
        }
        setRefs(tempRef);
    }, [])
    useEffect(() => {
        document.getElementById("0")?.focus()
        // refs[0].current.focus()
        // GET(`${otpMail}?email=${_props.email}`).then(res=>console.log(res))
    }, [refs])
    console.log("REFs", refs);
    const otpValdation = (index: any) => {
        let value = refs[index].current.value
        if (regexForValidation.test(value) === true) {
            if (value === "") {
                console.log("DDDD");

            }
            if (index !== refs.length - 1) {
                refs[index + 1].current.focus();
            }
        } else {
            refs[index].current.value = ""
        }
        console.log("NOO", refs[index].current.value);
    }
    const backSpaceHandler = (index: any) => {
        let value = refs[index].current.value
        console.log("MY VALUE", value);

        if (index !== 0) {
            console.log("YESS");
            refs[index - 1].current.focus();
            if (value !== "") {
                refs[index - 1].current.value = ""
            }

        }
    }
    return (
        <>
            <Modal
                close={() => setFlag(false)}
                closeOnEscape
                heading="Verify Email Address"
                modalSize="small"
                open={flag}>
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
                                                maxlength={1}
                                                ref={refs[index]}
                                                id={index}
                                                onChange={() => otpValdation(index)}
                                                onBackspace={() => backSpaceHandler(index)}
                                                type="text"
                                                controlStates={(e: any) => {
                                                    console.log("CLEAR", e)
                                                }}
                                            // value=""
                                            />
                                        </FormElement>

                                    </div>
                                ))
                            }
                        </FlexLayout>
                    </FlexLayout>
                    <FlexLayout spacing='tight'>
                        <Button type='TextButton'>Resend One-time passcode</Button>
                        <TextStyles textcolor='light'>(4 attempts left)</TextStyles>
                    </FlexLayout>
                </FlexLayout>

            </Modal>
        </>
    )
}

export default DI(OtpModal)