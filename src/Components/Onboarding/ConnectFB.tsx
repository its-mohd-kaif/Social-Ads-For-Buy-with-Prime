import { Card, FlexChild, FlexLayout, TextStyles, List, TextLink } from '@cedcommerce/ounce-ui'

import React from 'react'
import MobileLogo from '../../Asests/Images/svg/MobileLogo'
import "./ConnectFB.css"
function ConnectFB() {
    return (
        <section className='connectFB'>
            <FlexLayout direction='vertical' spacing='extraLoose'>
                <FlexLayout valign='center' spacing='loose'>
                    <MobileLogo />
                    <FlexChild>
                        <>
                            <TextStyles headingTypes='LG-2.8' textcolor='light' type='Heading'>
                                Welcome!
                            </TextStyles>
                            <TextStyles headingTypes='LG-2.8' fontweight='extraBold' type='Heading'>
                                Social Ads for Buy with Prime
                            </TextStyles>
                        </>
                    </FlexChild>
                </FlexLayout>
                <Card>
                    <FlexLayout>
                        <FlexChild desktopWidth='50'>
                            <Card title={"Things you should know!"} cardType='Bordered'>
                                <List type="disc">
                                    <TextStyles>
                                        NOTE: Before linking your Meta account, make sure your Buy with Prime catalog includes all fields required by Meta, including optional fields not required by Buy with Prime. This includes your site's product detail page URL and your product description. These fields are required to build landing pages for your campaigns.
                                        &nbsp;<TextLink onClick={() => window.open("https://www.facebook.com/business/help/120325381656392?id=725943027795860")} label="Check out this guide to know more." />
                                    </TextStyles>
                                </List>
                            </Card>
                        </FlexChild>
                        <FlexChild desktopWidth='50'>
                            <Card title={"Link your Facebook Account"}>

                            </Card>
                        </FlexChild>

                    </FlexLayout>
                </Card>
            </FlexLayout>

        </section>
    )
}

export default ConnectFB