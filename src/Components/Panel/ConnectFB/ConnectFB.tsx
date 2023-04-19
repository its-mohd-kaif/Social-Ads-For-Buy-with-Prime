import { Card, FlexChild, FlexLayout, TextStyles, List, TextLink, Button, Alert, Modal } from '@cedcommerce/ounce-ui'

import React, { useState } from 'react'
import { environment } from '../../../environments/environment'
import FbLogo from '../../../Asests/Images/svg/FbLogo'
import GreenCheck from '../../../Asests/Images/svg/GreenCheck'
import MobileLogo from '../../../Asests/Images/svg/MobileLogo'
import { DI, DIProps } from "../../../Core"
import { syncConnectorInfo } from '../../../Actions'
import "./ConnectFB.css";
interface PropsI extends DIProps {
    syncConnectorInfo: () => void;
}
function ConnectFB(_props: PropsI) {
    const [openModal, SetOpenModal] = useState(false)
    const { di: { GET }, redux: { user_id } } = _props;
    const { API_ENDPOINT } = environment

    const connectBtnHandler = () => {

        let token = sessionStorage.getItem(`${user_id}_auth_token`); 
        const { redux: { current: { source: { _id } } } } = _props
        console.log("redux", _props.redux.current.source._id);
        console.log("MY TOKEN", token);
        window.open(`${API_ENDPOINT}get/installationForm?code=meta&
        state={"source_shop_id":${_id},
        "app_tag":"bwp_meta","app_code":{"onyx":"bwp","meta":"meta"},"user_id":${user_id},
        "source":"onyx"}&bearer=${token}&currency=USD&timezone=EST`, "_self")
        

    }
    return (
        <section className='connectFB'>
            <FlexLayout direction='vertical' spacing='loose'>
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
                        <FlexLayout spacing='tight'>
                            <FlexChild mobileWidth='100' tabWidth='50' desktopWidth='50'>
                                <Card title={"Things you should know!"} cardType='Bordered'>
                                    <List type="disc">
                                        <TextStyles>
                                            NOTE: Before linking your Meta account, make sure your Buy with Prime catalog includes all fields required by Meta, including optional fields not required by Buy with Prime. This includes your site's product detail page URL and your product description. These fields are required to build landing pages for your campaigns.
                                            &nbsp;<TextLink onClick={() => window.open("https://www.facebook.com/business/help/120325381656392?id=725943027795860")} label="Check out this guide to know more." />
                                        </TextStyles>
                                        <TextStyles>
                                            Please note that once you link your account to the app you will be able to see the Buy with Prime catalog everywhere you manage Facebook campaigns including the Facebook Ads manager account.
                                        </TextStyles>
                                        <TextStyles>
                                            Make sure the product titles are the same as the Direct to Consumer site product titles as these will reflect on the Ad copy.
                                        </TextStyles>
                                        <TextStyles>
                                            The Pixel ID you connect for Social Ads for Buy with Prime will be added to your Buy with Prime checkout pages. You will see this reflected in your Buy with Prime console settings.
                                        </TextStyles>
                                        <TextStyles>
                                            We will use Meta Pixel to leverage customer data to personalize advertising for customers with the best performance of the campaigns in mind. This data is shared with Facebook. Check out this &nbsp;<TextLink onClick={() => window.open("https://www.facebook.com/business/help/471978536642445?id=1205376682832142")} label="About Meta Pixel" /> guide to understand more about privacy and safety.
                                        </TextStyles>
                                        <TextStyles>
                                            For optimum performance and results, check out this <TextLink label="guide on Facebook catalogs." onClick={() => window.open("https://www.facebook.com/business/help/2086567618225367?id=725943027795860")} />
                                        </TextStyles>
                                    </List>
                                </Card>
                            </FlexChild>
                            <FlexChild mobileWidth='100' tabWidth='50' desktopWidth='50'>
                                <>

                                    <Alert
                                        destroy={false}
                                        onClose={function noRefCheck() { }}
                                        type="danger"
                                    >
                                        <TextStyles fontweight='extraBold'>Unable to connect your account. Please try again.</TextStyles>
                                        <TextLink onClick={() => SetOpenModal(!openModal)} label="Wondering what went wrong?" />
                                    </Alert>
                                    <Card subTitle={"To create, manage, and publish your campaigns on Facebook, link your account with Social Ads for Buy with Prime account."} title={"Link your Facebook Account"}>
                                        <Card extraClass='connect-FB-points' subTitle={"Check on the following action items before proceeding:"} title={"Your Journey ahead!"} cardType='Subdued'>
                                            <FlexLayout spacing='extraTight' direction='vertical'>
                                                <FlexLayout spacing='loose'>
                                                    <GreenCheck />
                                                    <TextStyles>
                                                        Select Business Manager
                                                    </TextStyles>
                                                </FlexLayout>
                                                <FlexLayout spacing='loose'>
                                                    <GreenCheck />
                                                    <TextStyles>
                                                        Select an active Facebook Page
                                                    </TextStyles>
                                                </FlexLayout>
                                                <FlexLayout spacing='loose'>
                                                    <GreenCheck />
                                                    <TextStyles>
                                                        Select an active Instagram Profile
                                                    </TextStyles>
                                                </FlexLayout>
                                                <FlexLayout spacing='loose'>
                                                    <GreenCheck />
                                                    <TextStyles>
                                                        Connect Facebook Ad Account
                                                    </TextStyles>
                                                </FlexLayout>
                                                <FlexLayout spacing='loose'>
                                                    <GreenCheck />
                                                    <TextStyles>
                                                        Select Meta Pixel ID
                                                    </TextStyles>
                                                </FlexLayout>
                                            </FlexLayout>
                                        </Card>
                                        <br></br>
                                        <hr></hr>
                                        <br></br>
                                        <div className='connectBtn'>
                                            <Button
                                                onClick={connectBtnHandler}
                                                icon={<FbLogo />}
                                                iconAlign="left"
                                                content="Authorize and Connect"
                                                length="fullBtn"
                                            />
                                        </div>
                                    </Card>
                                </>
                            </FlexChild>
                        </FlexLayout>
                    </Card>
                </FlexLayout>
            </FlexLayout>
            <Modal
                close={() => SetOpenModal(!openModal)}
                heading="Account Connection Error"
                modalSize="small"
                primaryAction={{
                    content: 'Okay',
                    loading: false,
                    onClick: () => SetOpenModal(!openModal)
                }} open={openModal}            >
                An error occured while connecting your Facebook account. Here are some of the reasons why this happened.
            </Modal>
        </section>
    )
}

export default DI(ConnectFB, { func: { syncConnectorInfo } }) 