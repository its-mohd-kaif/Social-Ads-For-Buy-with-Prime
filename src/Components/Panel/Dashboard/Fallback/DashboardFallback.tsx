import { Button, Card, FlexChild, FlexLayout, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React from 'react'
import { Play, Plus } from 'react-feather'
import DashboardFallbackSvg from '../../../../../src/Asests/Images/svg/DashboardFallbackSvg'
import { DI, DIProps } from "../../../../../src/Core"

function DashboardFallback(_props: DIProps) {
    return (
        <Card>
            <FlexLayout spacing='extraLoose' direction='vertical' valign='center'>
                <FlexChild>
                    <DashboardFallbackSvg />
                </FlexChild>
                <FlexChild>
                    <FlexLayout spacing='loose' direction='vertical' valign='center'>
                        <TextStyles fontweight='extraBolder' subheadingTypes='XS-1.6'>
                            Create your First Campaign
                        </TextStyles>
                        <FlexChild>
                            <FlexLayout valign='center' direction='vertical'>
                                <TextStyles>
                                    All you have to do now is start creating new campaigns. You can view and manage all your campaigns here. In case you need
                                </TextStyles>
                                <TextStyles>
                                    help understanding how to create and manage campiagns , check out the <TextLink onClick={()=>{
                                        window.open("https://testing.cedcommerce.bwpapps.com/info/faq?query=meta_create_an_ad_compaign")
                                    }} label="Help Doc" />
                                </TextStyles>
                            </FlexLayout>
                        </FlexChild>

                    </FlexLayout>
                </FlexChild>
                <FlexChild>
                    <FlexLayout spacing='mediumTight'>
                        <Button onClick={() => {
                            _props.history(`/panel/${_props.redux.user_id}/create`)
                        }} icon={<Plus size={16} />}>Create Campaign</Button>
                        <Button icon={<Play size={16} />} type='Outlined'>Campaign Guide</Button>
                    </FlexLayout>
                </FlexChild>
            </FlexLayout>
        </Card>
    )
}

export default DI(DashboardFallback)