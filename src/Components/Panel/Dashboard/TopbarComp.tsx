import { Button, FlexLayout, Notification, Popover, Skeleton, Topbar } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { ArrowRight, Bell } from "react-feather";
import { DI, DIProps } from "../../../../src/Core"
import moment from "moment"
import { webSocketInit } from '../../../../src/Components/Auth/function';
function TopbarComp(_props: DIProps) {
    const [flag, setFlag] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any>([])
    const [dot, setDot] = useState<string | null>("")
    const { di: { GET } } = _props;
    useEffect(() => {
        /**
         * Call WebSocketInit Function
         */
        webSocketInit(_props, setDot, "dot")
    }, [])
    /**
  * state for showing skeleton 
  */
    const [skeleton, setSkeleton] = useState(true);
    const notificationHandler = () => {
        localStorage.setItem(`${_props.match.uId}_showNotification`, "false")
        setDot(localStorage.getItem(`${_props.match.uId}_showNotification`))
        setFlag(!flag)
        setSkeleton(true)
        GET("/connector/get/allNotifications?active_page=1&count=3")
            .then((res) => {
                let tempArr: any = []
                res.data.rows.forEach((element: any) => {
                    let a = moment(new Date())
                    let b = moment(element.created_at);
                    let obj = {
                        message: element.message,
                        severity: element.severity,
                        created_at: a.diff(b, 'minutes') <= 60 ? `${a.diff(b, 'minutes')} minutes ago` :
                            a.diff(b, 'hours') <= 24 ? `${a.diff(b, 'hours')} hours ago` :
                                moment(element.created_at).format("MM-DD-YYYY")
                    }
                    tempArr.push(obj)
                });
                setSkeleton(false)
                setNotifications(tempArr)
            })
    }
    return (
        <>
            <Topbar
                connectRight={<FlexLayout spacing="loose">
                    <Popover
                        open={flag}
                        activator={
                            <>
                                <span className=
                                    {dot === "true" ? "red-dot" : ""}>
                                </span>
                                <Button
                                    onClick={notificationHandler}
                                    icon={<Bell size={16} />}
                                    type="Outlined"
                                />
                            </>

                        }
                        onClose={() => setFlag(!flag)}
                        popoverContainer="element"
                        popoverWidth={295}
                    >
                        {skeleton === true ?
                            <Skeleton
                                height="45px"
                                line={3}
                                type="line"
                                width="50px"
                            />
                            :

                            notifications.map((val: any, index: number) => (
                                <FlexLayout key={index} direction='vertical' spacing="loose" wrap="noWrap">
                                    <Notification
                                        destroy={false}
                                        onClose={function noRefCheck() { }}
                                        subdesciption={val.created_at}
                                        type={val.severity === "error" ? "danger" : val.severity}
                                    >
                                        {val.message.substring(0, 31)}...
                                    </Notification>
                                </FlexLayout>
                            ))
                        }
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