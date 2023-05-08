
import { Badge, Button, Card, FlexChild, FlexLayout, Image,PageHeader, Tabs, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect } from 'react'
import { Edit } from 'react-feather'
import fb from "../../../../Asests/Images/png/fb.png"
import ig from "../../../../Asests/Images/png/ig.png"
function Accounts() {
    return (
        <div>
            <Card title="Accounts">
                <Card title={"Facebook / Instagram Accounts"} cardType='Bordered'>
                    <FlexLayout spacing='mediumLoose' direction='vertical'>
                        <FlexLayout halign='fill'>
                            <FlexChild>
                                <>
                                    <FlexLayout spacing='loose'>
                                        <FlexChild>
                                            <>
                                                <Image
                                                    alt="Image Data Not Found"
                                                    fit="cover"
                                                    height={32}
                                                    radius="none"
                                                    src={fb}
                                                    type="none"
                                                    width={32}
                                                />
                                            </>
                                        </FlexChild>
                                        <FlexChild>
                                            <>
                                                <FlexLayout spacing='extraTight' direction='vertical'>
                                                    <TextStyles fontweight='bold' paragraphTypes='MD-1.4'>
                                                        FB Account Name
                                                    </TextStyles>
                                                    <TextStyles textcolor='light' paragraphTypes='MD-1.4'>
                                                        Ads account name
                                                    </TextStyles>
                                                    <Badge
                                                        position="bottom"
                                                        size="small"
                                                        type="Positive-100"
                                                    >
                                                        Active Account
                                                    </Badge>
                                                </FlexLayout>
                                            </>
                                        </FlexChild>
                                    </FlexLayout>
                                </>
                            </FlexChild>
                            <Button type='Outlined'>
                                Update
                            </Button>
                        </FlexLayout>
                        <FlexLayout halign='fill'>
                            <FlexChild>
                                <>
                                    <div style={{ marginLeft: "50px" }}>
                                        <FlexLayout direction='vertical'>
                                            <TextStyles paragraphTypes='MD-1.4'>
                                                Pixel ID
                                            </TextStyles>
                                            <TextStyles textcolor='light' paragraphTypes='MD-1.4'>
                                                277632452644288
                                            </TextStyles>
                                        </FlexLayout>
                                    </div>
                                </>
                            </FlexChild>
                            <Button icon={<Edit size="18" />} type='Outlined'>
                                Edit
                            </Button>
                        </FlexLayout>
                        <FlexLayout spacing='loose'>
                            <FlexChild>
                                <>
                                    <Image
                                        alt="Image Data Not Found"
                                        fit="cover"
                                        height={32}
                                        radius="none"
                                        src={ig}
                                        type="none"
                                        width={32}
                                    />
                                </>
                            </FlexChild>
                            <FlexChild>
                                <FlexLayout direction='vertical' spacing='extraTight'>
                                    <TextStyles paragraphTypes='MD-1.4' textcolor='light'>
                                        Instagram Account
                                    </TextStyles>
                                    <TextLink label="Learn how to connect your instagram account" />
                                    <Badge type='Neutral-200' children={"Not Connected"} />
                                </FlexLayout>
                            </FlexChild>
                        </FlexLayout>
                    </FlexLayout>
                </Card>
            </Card>
        </div>
    )
}

export default Accounts