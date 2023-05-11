import { FlexChild, FlexLayout, Notification, PageHeader, Pagination, Skeleton, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { DI, DIProps } from "../../../../../src/Core"
import moment from "moment"
interface paginationObj {
  activePage: number;
  count: number;
}
function NotificationComp(_props: DIProps) {
  const { di: { GET } } = _props
  /**
   * state for holding all notification data
   */
  const [notifications, setNotifications] = useState<any>([])
  const [totalcount, SetTotalcount] = useState<number>(0)
  /**
   * state for showing skeleton 
   */
  const [skeleton, setSkeleton] = useState(true);
  /**
   * state for handling pagination
   */
  const [pagination, setPagination] = useState<paginationObj>({
    activePage: 1,
    count: 10
  })
  const { activePage, count } = pagination
  /**
   * in this useEffect we fetch notifications data and store into state
   */
  useEffect(() => {
    setSkeleton(true)
    GET(`connector/get/allNotifications?activePage=${activePage}&count=${count}`)
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
        SetTotalcount(res.data.count)
      })
  }, [pagination])
  return (
    <>
      <PageHeader
        onClick={function noRefCheck() { }}
        title="Notifications"
      />
      {skeleton === true ?
        <FlexLayout spacing='loose' direction='vertical'>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
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
        </FlexLayout> :
        notifications.map((val: any, index: number) => (
          <Notification key={index}
            destroy={false}
            onClose={function noRefCheck() { }}
            subdesciption={val.created_at}
            type={val.severity === "error" ? "danger" : val.severity}
          >
            {val.message.match("<br/>") === false ? <TextStyles fontweight='extraBolder' content={val.message} /> :
              val.message.split("<br/>").map((val: any) => (
                val !== "Click here to check the error and troubleshoot." ? <TextStyles content={val} /> :
                  <TextLink label={val} />
              ))}
          </Notification>
        ))
      }

      <Pagination
        countPerPage={count}
        currentPage={activePage}
        onCountChange={(val) => {
          setPagination({
            ...pagination,
            count: val
          })
        }}
        onEnter={(val: any) => {
          setPagination({
            ...pagination,
            activePage: val
          })
        }}
        onNext={() => {
          setPagination({
            ...pagination,
            activePage: activePage + 1
          })
        }}
        onPrevious={() => {
          setPagination({
            ...pagination,
            activePage: activePage - 1
          })
        }}
        optionPerPage={[
          {
            label: '10',
            value: '10'
          },
          {
            label: '15',
            value: '15'
          },
          {
            label: '20',
            value: '20'
          },
        ]}
        totalitem={totalcount}
      />
    </>
  )
}

export default DI(NotificationComp)