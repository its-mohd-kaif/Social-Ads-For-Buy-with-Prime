import { Card, FlexChild, FlexLayout, Skeleton } from '@cedcommerce/ounce-ui'
import React from 'react'

function SkeletonComp() {
    return (
        <Card title={"Facebook / Instagram Accounts"} cardType='Bordered'>
            <FlexLayout spacing='mediumLoose' direction='vertical'>
                <FlexLayout halign='fill' spacing='loose'>
                    <FlexChild>
                        <>
                            <FlexLayout spacing='loose'>
                                <FlexChild>
                                    <Skeleton
                                        height="32px"
                                        line={1}
                                        type="custom"
                                        width="32px"
                                        rounded
                                    />
                                </FlexChild>
                                <FlexChild>
                                    <FlexLayout direction='vertical' spacing='tight'>
                                        <Skeleton
                                            height="20px"
                                            line={1}
                                            type="custom"
                                            width="150px"
                                        />
                                        <Skeleton
                                            height="20px"
                                            line={1}
                                            type="custom"
                                            width="500px"
                                        />
                                        <Skeleton
                                            height="20px"
                                            line={1}
                                            type="custom"
                                            width="120px"
                                        />
                                    </FlexLayout>
                                </FlexChild>
                            </FlexLayout>
                        </>
                    </FlexChild>
                    <FlexChild>
                        <>
                            <Skeleton
                                height="38px"
                                line={1}
                                type="custom"
                                width="74px"
                            />
                        </>
                    </FlexChild>
                </FlexLayout>
                <FlexLayout halign='fill' spacing='loose'>
                    <FlexChild>
                        <>
                            <FlexLayout spacing='loose'>
                                <FlexChild>
                                    <Skeleton
                                        height="32px"
                                        line={1}
                                        type="custom"
                                        width="32px"
                                        rounded
                                    />
                                </FlexChild>
                                <FlexChild>
                                    <FlexLayout direction='vertical' spacing='tight'>
                                        <Skeleton
                                            height="20px"
                                            line={1}
                                            type="custom"
                                            width="500px"
                                        />
                                        <Skeleton
                                            height="20px"
                                            line={1}
                                            type="custom"
                                            width="150px"
                                        />
                                        <Skeleton
                                            height="20px"
                                            line={1}
                                            type="custom"
                                            width="120px"
                                        />
                                    </FlexLayout>
                                </FlexChild>
                            </FlexLayout>
                        </>
                    </FlexChild>
                    <FlexChild>
                        <>
                            <Skeleton
                                height="38px"
                                line={1}
                                type="custom"
                                width="74px"
                            />
                        </>
                    </FlexChild>
                </FlexLayout>
            </FlexLayout>
        </Card>
    )
}

export default SkeletonComp