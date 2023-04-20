import { Button, ButtonDropdown, Card, Grid, CheckBox, FlexChild, FlexLayout, PageHeader, Pagination, Popover, TextField, ToolTip, Badge, TextStyles, OverlappingImages } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { AlertTriangle, Download, Filter, Plus, Search } from 'react-feather'
import fb from "../../../Asests/Images/png/fb.png"
import ig from "../../../Asests/Images/png/ig.png"
import actions from "../../../Asests/Images/png/actions.png"
const apiData = [
  {
    "success": true,
    "data": {
      "total_count": 3,
      "totalPageRead": "1",
      "current_count": 3,
      "rows": [
        {
          "campaign_name": "retargeting campaign",
          "campaign_id": "23854594149590431",
          "daily_budget": 86,
          "status": "SCHEDULED",
          "campaign_placement": [
            "facebook"
          ],
          "user_id": "643fa76ff0ed0bf6ab0c2c82",
          "shop_id": 902,
          "start_date": "04/28/2023",
          "end_date": "05/01/2023",
          "spend": 0,
          "impressions": 0,
          "clicks": 0,
          "orders": 0,
          "sales": 0,
          "roas": 0
        },
        {
          "campaign_name": "syed campaign",
          "campaign_id": "23854594122030431",
          "daily_budget": 85,
          "status": "SCHEDULED",
          "campaign_placement": [
            "facebook"
          ],
          "user_id": "643fa76ff0ed0bf6ab0c2c82",
          "shop_id": 902,
          "start_date": "04/28/2023",
          "end_date": "04/30/2023",
          "spend": 0,
          "impressions": 0,
          "clicks": 0,
          "orders": 0,
          "sales": 0,
          "roas": 0
        },
        {
          "campaign_name": "arfah campaign",
          "campaign_id": "23854582774900431",
          "daily_budget": 87,
          "status": "PAUSED",
          "campaign_placement": [
            "facebook"
          ],
          "user_id": "643fa76ff0ed0bf6ab0c2c82",
          "shop_id": 902,
          "start_date": "04/19/2023",
          "end_date": "04/20/2023",
          "spend": 63.63,
          "impressions": 53,
          "clicks": 1,
          "orders": 0,
          "sales": 0,
          "roas": 0
        },
        {
          "campaign_name": "temp campaign",
          "campaign_id": "23854594122030431",
          "daily_budget": 85,
          "status": "errors",
          "campaign_placement": [
            "facebook",
            "instagram"
          ],
          "user_id": "643fa76ff0ed0bf6ab0c2c82",
          "shop_id": 902,
          "start_date": "04/28/2023",
          "end_date": "04/30/2023",
          "spend": 0,
          "impressions": 0,
          "clicks": 0,
          "orders": 0,
          "sales": 0,
          "roas": 0
        },
      ],
      "next": null
    },
    "ip": "103.97.184.106",
    "time_taken": "0.096"
  }
]
function Dashboard() {
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState<any>([])
  const [obj, setObj] = useState<any>(
    {
      campaign_name: "",
      campaign_placement: [],
      status: "",
      start_date: "",
      end_date: "",
      daily_budget: "",
      spend: "",
      sales: "",
      impressions: ""
    }
  )
  const [checkbox, setCheckbox] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  })
  useEffect(() => {
    console.log(apiData[0].data.rows, obj);
    let temp = apiData[0].data.rows;
    let arr = []
    for (const element of temp) {
      let obj = {
        campaign_name: element.campaign_name,
        status: element.status.toUpperCase() === "SCHEDULED" ? <Badge type="Positive-100">Scheduled</Badge> :
          element.status.toUpperCase() === "PENDING" ? <Badge type="Neutral-100-Border">Pending</Badge> :
            element.status.toUpperCase() === "ERRORS" ? <FlexLayout spacing='extraTight' halign='center' valign='center'><AlertTriangle fontSize={"14"} color='red' /><TextStyles textcolor="negative">Errors</TextStyles></FlexLayout> :
              element.status.toUpperCase() === "ACTIVE" ? <Badge type="Positive-200">Active</Badge> :
                element.status.toUpperCase() === "ENDED" ? <Badge type="Neutral-200">Ended</Badge> :
                  element.status.toUpperCase() === "DISCONNECTED" ? <Badge type="Neutral-100">Disconnected</Badge> :
                    element.status.toUpperCase() === "ARCHIVED" ? <Badge type="Info-100">Archived</Badge> :
                      element.status.toUpperCase() === "PAUSED" ? <Badge type="Warning-100">Paushed</Badge> : null,
        campaign_placement:
          element.campaign_placement[0] === "facebook" &&
            element.campaign_placement[1] === "instagram" ?
            <OverlappingImages>
              <img src={fb} />
              <img src={ig} />
            </OverlappingImages> :
            element.campaign_placement[0] === "instagram" &&
              element.campaign_placement[1] === "facebook" ?
              <OverlappingImages>
                <img src={ig} />
                <img src={fb} />
              </OverlappingImages> :
              element.campaign_placement[0] === "facebook" &&
                element.campaign_placement[1] === undefined
                ? <OverlappingImages><img src={fb} /></OverlappingImages> :
                element.campaign_placement[0] === "instagram" &&
                  element.campaign_placement[1] === undefined
                  ? <OverlappingImages><img src={ig} /></OverlappingImages> : null,
        start_date: element.start_date === "" ? "MM/DD/YYYY" : element.start_date,
        end_date: element.end_date === "" ? "MM/DD/YYYY" : element.end_date,
        daily_budget: `$${element.daily_budget}`,
        spend: `$${element.spend}`,
        sales: `$${element.sales}`,
        impressions: `$${element.impressions}`,
        actions: <Button type='TextButton'><img src={actions} /></Button>
      }
      arr.push(obj)
    }
    setData(arr)
  }, [])
  const { check1, check2, check3, check4 } = checkbox
  const columns = [
    {
      align: 'center',
      dataIndex: 'campaign_name',
      key: 'campaign_name',
      title: 'Campaign',
      width: 100,
      fixed: "left"
    },
    {
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      title: 'Status',
      width: 100,
      fixed: "left"
    },
    {
      align: 'center',
      dataIndex: 'campaign_placement',
      key: 'campaign_placement',
      title: 'Placement',
      width: 100
    },
    {
      align: 'center',
      dataIndex: 'start_date',
      key: 'start_date',
      title: 'Start Date',
      width: 100
    },
    {
      align: 'center',
      dataIndex: 'end_date',
      key: 'end_date',
      title: 'End Date',
      width: 100
    },
    {
      align: 'center',
      dataIndex: 'daily_budget',
      key: 'daily_budget',
      title: 'Daily Budget',
      width: 100
    },
    {
      align: 'center',
      dataIndex: 'spend',
      key: 'spend',
      title: 'Spend',
      width: 100
    },
    {
      align: 'center',
      dataIndex: 'sales',
      key: 'sales',
      title: 'Sales',
      width: 100
    },
    {
      align: 'center',
      dataIndex: 'impressions',
      key: 'impressions',
      title: 'Impressions',
      width: 100
    },
    {
      align: 'center',
      dataIndex: 'actions',
      key: 'actions',
      title: 'Actions',
      width: 100,
      fixed: "right"
    }
  ]
  return (
    <div>
      <PageHeader action={<Button icon={<Plus />}>Create Campaign</Button>}
        title="Welcome to Social Ads for Buy with Prime!"
        description="Create and manage all your Buy with Prime
        Facebook and Instagram campaigns here." />
      <Card title={"Campaigns"} action={
        <ToolTip
          helpText="If you want to download reports for specific campaigns, make sure you apply the required filters, then click on download report. Else, for a general report of all the campaigns. First, ensure no filters are selected before you download the report."
          popoverContainer="body"
          position="top"
          type="light" open={false}>
          <Button icon={<Download />} type='Outlined' thickness="thin">
            Download Report
          </Button>
        </ToolTip>}>
        <FlexLayout direction='vertical' spacing='extraTight'>
          <FlexLayout halign='fill'>
            <FlexChild desktopWidth='50'>
              <TextField innerPreIcon={<Search />} placeHolder="Search Campaign" />
            </FlexChild>
            <FlexChild>
              <FlexLayout spacing='tight'>
                <Button icon={<Filter />} type='Outlined' thickness="thin">
                  Filter
                </Button>

                <Popover
                  activator={<Button icon={<Plus />} type='Outlined' onClick={() => setFlag(!flag)}>Manage Columns</Button>}
                  onClose={() => setFlag(!flag)}
                  popoverContainer="body"
                  popoverWidth={250}
                  open={flag}
                >
                  <FlexLayout spacing='loose' direction='vertical'>
                    <CheckBox
                      id="two"
                      checked={check1}
                      labelVal="Impressions"
                      name="Impressions"
                      onClick={() => setCheckbox({
                        ...checkbox,
                        check1: !check1
                      })}
                    />
                    <CheckBox
                      checked={check2}
                      id="two"
                      labelVal="Clicks"
                      name="Clicks"
                      onClick={() => setCheckbox({
                        ...checkbox,
                        check2: !check2
                      })}
                    />
                    <CheckBox
                      checked={check3}
                      id="two"
                      labelVal="Orders"
                      name="Orders"
                      onClick={() => setCheckbox({
                        ...checkbox,
                        check3: !check3
                      })}
                    />
                    <CheckBox
                      checked={check4}
                      id="two"
                      labelVal="ROAS"
                      name="ROAS"
                      onClick={() => setCheckbox({
                        ...checkbox,
                        check4: !check4
                      })}
                    />
                  </FlexLayout>
                </Popover>
              </FlexLayout>
            </FlexChild>
          </FlexLayout>
         
        </FlexLayout>
        <Grid
            scrollX={1500}
            columns={columns}
            dataSource={data}
          />
      </Card>
    </div >
  )
}

export default Dashboard