import { Avatar, Button, FlexChild, FlexLayout, Notification, Popover, TextStyles, Topbar } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { ArrowRight, Bell } from "react-feather";
import { DI, DIProps } from "../../../../src/Core"

function TopbarComp(_props: DIProps) {
    const [flag, setFlag] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any>([])
    const { di: { GET } } = _props
    const notificationHandler = () => {
        setFlag(!flag)
        GET("/connector/get/allNotifications?active_page=1&count=3")
            .then((res) => {
                console.log(res);
                setNotifications(res.data.rows)
            })
    }
    console.log(notifications)
    return (
        <>
            <Topbar
                connectRight={<FlexLayout spacing="loose">
                    <Popover
                        open={flag}
                        activator={
                            <Button
                                onClick={notificationHandler}
                                icon={<Bell size={16} />}
                                type="Outlined"
                            />
                        }
                        onClose={() => setFlag(!flag)}
                        popoverContainer="element"
                        popoverWidth={295}
                    >
                        {notifications.map((val: any, index: number) => (
                            <FlexLayout key={index} direction='vertical' spacing="loose" wrap="noWrap">
                                <Notification
                                    destroy={false}
                                    onClose={function noRefCheck() { }}
                                    subdesciption="Yesterday"
                                    type={val.severity === "error" ? "danger" : val.severity}
                                >
                                    {val.message.substring(0, 31)}...
                                </Notification>
                            </FlexLayout>
                        ))}
                        <hr></hr>
                        <Button
                            icon={<ArrowRight size={20} />}
                            type="Plain"
                            onClick={() => {
                                setFlag(!flag)
                                _props.history("notifications")
                            }}>
                            View all Notifications
                        </Button>
                    </Popover>
                </FlexLayout>}
            />

        </>
    )
}

export default DI(TopbarComp)