import { FlexChild, FlexLayout, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import FAQFallbackSvg from '../../../../../src/Asests/Images/svg/FAQFallbackSvg'

function FAQFallback() {
    return (
        <FlexLayout spacing='extraLoose' direction='vertical' valign='center'>
            <FlexChild>
                <FAQFallbackSvg />
            </FlexChild>
            <FlexLayout spacing='tight' valign='center' direction='vertical'>
                <TextStyles fontweight='extraBolder' subheadingTypes='XS-1.6'>
                    We’re facing some issue!
                </TextStyles>
                <TextStyles textcolor='light'>
                    Please check back after some time!
                </TextStyles>
            </FlexLayout>
        </FlexLayout>
    )
}

export default FAQFallback