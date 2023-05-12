import { Accordion, Button, Card, FlexChild, FlexLayout, PageHeader, Skeleton, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import GenerateTicket from '../../../../../src/Asests/Images/svg/GenerateTicket'
import EmailSvg from '../../../../../src/Asests/Images/svg/EmailSvg'
import VideoSvg from '../../../../../src/Asests/Images/svg/VideoSvg'
import { DI, DIProps } from "../../../../../src/Core"
import { urlFetchCalls } from '../../../../../src/Constant'
function HelpComp(_props: DIProps) {
    const { di: { POST, GET } } = _props;
    const { get: { faqSearch } } = urlFetchCalls;
    const [faq, setFaq] = useState<any>([]);
    const [multiaccor, setMultiacor] = useState<any>([]);
    const [skeleton, setSkeleton] = useState(true);
    useEffect(() => {
        setSkeleton(true)
        POST(faqSearch, {
            "marketplace": "meta",
            "limit": 5
        })
            .then((res) => {
                setSkeleton(false)
                setFaq(res.data.meta.campaign.data)
            })

        let index = 5;
        while (index !== 1) {
            setMultiacor([...multiaccor, false])
            index--
        }
    }, [])
    return (
        <>
            <PageHeader
                title="Help"
            />
            <FlexLayout spacing='extraLoose' direction='vertical'>
                <FlexLayout spacing='mediumLoose'>
                    <FlexChild mobileWidth='100' tabWidth='100' desktopWidth='66'>
                        <Card title={"Get in Touch"}>
                            <FlexLayout spacing='mediumLoose'>
                                <FlexChild mobileWidth='100' tabWidth='100' desktopWidth='50'>
                                    <Card cardType='Bordered'>
                                        <FlexLayout spacing='mediumLoose' direction='vertical'>
                                            <GenerateTicket />
                                            <FlexLayout spacing='mediumLoose' direction='vertical'>
                                                <TextStyles fontweight='extraBolder' subheadingTypes='XS-1.6'>Generate Ticket</TextStyles>
                                                <TextStyles textcolor="light">Is something bothering you? Raise a ticket for a quick resolution.</TextStyles>
                                                <Button onClick={() => {
                                                    window.open("https://socialsadsforbwp.freshdesk.com/en/support/home")
                                                }} type='Outlined'>Generate Ticket</Button>
                                            </FlexLayout>
                                        </FlexLayout>
                                    </Card>
                                </FlexChild>

                                <FlexChild mobileWidth='100' tabWidth='100' desktopWidth='50'>
                                    <Card cardType='Bordered'>
                                        <FlexLayout spacing='mediumLoose' direction='vertical'>
                                            <EmailSvg />
                                            <FlexLayout spacing='mediumLoose' direction='vertical'>
                                                <TextStyles fontweight='extraBolder' subheadingTypes='XS-1.6'>Email</TextStyles>
                                                <TextStyles textcolor="light">We love hearing from you.
                                                    Your feedback and suggestions are appreciated.</TextStyles>
                                                <Button onClick={() => {
                                                    window.open("mailto:socialads@cedcommerce.com")
                                                }} type='Outlined'>Write To Us</Button>
                                            </FlexLayout>
                                        </FlexLayout>
                                    </Card>
                                </FlexChild>
                            </FlexLayout>
                        </Card>
                    </FlexChild>
                    <FlexChild mobileWidth='100' tabWidth='100' desktopWidth='33'>
                        <Card title={"Guide"}>
                            <Card cardType='Bordered'>
                                <FlexLayout spacing='mediumLoose' direction='vertical'>
                                    <VideoSvg />
                                    <FlexLayout spacing='mediumLoose' direction='vertical'>
                                        <TextStyles fontweight='extraBolder' subheadingTypes='XS-1.6'>Watch Video Tutorial</TextStyles>
                                        <TextStyles textcolor="light">View our video guide to learn more about how to use Social Ads for
                                            Buy with Prime app.</TextStyles>
                                        <Button onClick={() => { }} type='Outlined'>View Guide</Button>
                                    </FlexLayout>
                                </FlexLayout>
                            </Card>
                        </Card>
                    </FlexChild>

                </FlexLayout>
                <Card
                    title={"Frequently Asked Question"}
                    action={<Button type='TextButton'>View all FAQ articles</Button>}
                >
                    {skeleton === true ?
                        <FlexLayout spacing='loose' direction='vertical'>
                            {
                                [1, 2, 3, 4, 5].map((val) => (
                                    <FlexChild key={val}>
                                        <Skeleton
                                            height="45px"
                                            line={1}
                                            type="line"
                                            width="50px"
                                        />
                                    </FlexChild>
                                ))
                            }
                        </FlexLayout> : faq.map((val: any, index: number) => (
                            <>
                                <Accordion
                                    boxed
                                    icon
                                    iconAlign="left"
                                    onClick={() => {
                                        multiaccor[index] = !multiaccor[index]
                                        setMultiacor([...multiaccor])
                                    }}
                                    title={val.title}
                                    active={multiaccor[index]}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: val.answer }}></div>
                                </Accordion>
                            </>
                        ))}
                </Card>
            </FlexLayout>
        </>
    )
}

export default DI(HelpComp)