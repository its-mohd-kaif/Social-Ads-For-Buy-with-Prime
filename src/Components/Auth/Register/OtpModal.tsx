import { Button, Modal } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'

function OtpModal() {
    const [flag, setFlag] = useState(true)
    return (
        <>
            <Modal
                close={() => setFlag(false)}
                closeOnEscape
                heading="Modal With Icon"
                modalSize="small"
                secondaryAction={{
                    content: 'Close',
                    loading: false,
                    onClick: function noRefCheck() { }
                }} open={flag}>
                <h1>Modal</h1>
            </Modal>
        </>
    )
}

export default OtpModal