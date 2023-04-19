import { Alert, Button, FlexLayout, FormElement, TextStyles } from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react';
import { DI, DIProps } from '../../../Core';
import { ArrowRight } from 'react-feather';


function EmailVerifiedAlert(_props: DIProps) {
    const [time, setTime] = useState(5);
    useEffect(() => {
        let timer = setTimeout(() => {
            setTime((val) => --val)
        }, 1000)
        if (time === 0) {
            clearInterval(timer);
            _props.history(`/panel/${_props.redux.user_id}/connect-fb`);
        }
    }, [time])
    return (
        <>
            <FormElement>
                <TextStyles fontweight='extraBolder' subheadingTypes='XS-1.6' type='SubHeading'>Create Account</TextStyles>
                <Alert type="success" destroy={false}>
                    Your email has been successfully verified. Account creation is in progress.
                </Alert>
                <hr></hr>
                <Button
                    icon={<ArrowRight size={20} />}
                    type="Plain"
                    onClick={() => _props.history(`/panel/${_props.redux.user_id}/connect-fb`)}>
                    Proceed to Account Connection
                </Button>
            </FormElement>
            <br></br>
            <FlexLayout halign='center' valign='center'>
                <TextStyles>Redirecting in {time} seconds.</TextStyles>
            </FlexLayout>

        </>

    );
}

export default DI(EmailVerifiedAlert);