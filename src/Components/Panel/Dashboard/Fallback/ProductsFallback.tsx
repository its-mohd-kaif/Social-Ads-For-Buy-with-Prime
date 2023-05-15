import { Card, FlexChild, FlexLayout, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import NoProductSvg from '../../../../../src/Asests/Images/svg/NoProductSvg'

function ProductsFallback() {
    return (
        <Card>
            <FlexLayout spacing='extraLoose'  direction='vertical' valign='center'>
                <FlexChild>
                    <NoProductSvg />
                </FlexChild>
                <FlexChild>
                    <FlexLayout spacing='tight' valign='center' direction='vertical'>
                        <FlexChild>
                            <TextStyles fontweight='extraBolder' subheadingTypes='XS-1.6'>
                                No Products Found
                            </TextStyles>
                        </FlexChild>
                        <FlexChild>
                            <FlexLayout valign='center' direction='vertical'>
                                <TextStyles textcolor='light'>
                                    Please ensure that your product catalog is synchronized with the app so that Facebook can select the most suitable product(s) to promote.
                                </TextStyles>
                                <TextStyles textcolor='light'>
                                    Learn more about the <TextLink label="Catalog Sync process"/>
                                </TextStyles>
                            </FlexLayout>
                        </FlexChild>
                    </FlexLayout>
                </FlexChild>
            </FlexLayout>
        </Card>
    )
}

export default ProductsFallback