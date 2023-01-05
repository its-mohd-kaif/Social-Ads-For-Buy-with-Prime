import React from 'react';
import { DI, DIProps, parseJwt } from '../../../Core';

import ResetPasswordAlert from '../Layouts/ResetPasswordAlert';

function ForgotSuccess(_props: DIProps): JSX.Element {
    return (
        <>
            <ResetPasswordAlert />
        </>
    );
}
export default DI(ForgotSuccess);
