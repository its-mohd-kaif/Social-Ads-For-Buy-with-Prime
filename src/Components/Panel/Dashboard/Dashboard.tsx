import { Button, Card, Grid, CheckBox, FlexChild, FlexLayout, PageHeader, Pagination, Popover, TextField, ToolTip, Badge, TextStyles, OverlappingImages, AdvanceFilter, Tag } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Download, Filter, Plus, Search } from 'react-feather'
import { Actions, CampaignPlacement, CampaignStatus } from './DashUtility'
import { DI, DIProps } from "../../../Core"
import { urlFetchCalls } from '../../../../src/Constant'

const apiData = [
  {
    "success": true,
    "data": {
      "total_count": 4,
      "totalPageRead": "1",
      "current_count": 2,
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
function Dashboard(_props: DIProps) {
  const [flag, setFlag] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [page, setPage] = useState<any>({
    activePage: null,
    totalPage: null,
    currentCount: null
  })
  const [checkbox, setCheckbox] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  })
  const [filter, setFilter] = useState({
    archived: false,
    active: false,
    disconnected: false,
    ended: false,
    error: false,
    paused: false,
    pending: false,
    scheduled: false,
  })
  const [filterPop, setFilterPop] = useState<boolean>(false)
  const [selected, setSelected] = useState<any>([])
  const [apply, setApply] = useState<any>([])
  const { di: { GET } } = _props
  const { get: { getCampaignsUrl } } = urlFetchCalls
  useEffect(() => {
    GET(`${getCampaignsUrl}?shop_id=801&count=10&filter[shop_id]=801&activePage=1`)
      .then((res) => console.log("API", res))
  }, [])
  useEffect(() => {
    let temp = apiData[0].data.rows;
    let arr = []
    for (const element of temp) {
      let obj = {
        campaign_id: element.campaign_id,
        campaign_name: element.campaign_name,
        status: CampaignStatus(element.status.toUpperCase()),
        campaign_placement: CampaignPlacement(element.campaign_placement),
        start_date: element.start_date === "" ? "MM/DD/YYYY" : element.start_date,
        end_date: element.end_date === "" ? "MM/DD/YYYY" : element.end_date,
        daily_budget: `$${element.daily_budget}`,
        spend: `$${element.spend}`,
        sales: `$${element.sales}`,
        impressions: `$${element.impressions}`,
        clicks: `$${element.clicks}`,
        orders: `$${element.orders}`,
        roas: `$${element.roas}`,
        actions: <Actions open={element.campaign_id} />
      }
      arr.push(obj)
    }
    setData(arr)
    setColumns(gridColumns);
    setPage({
      activePage: parseInt(apiData[0].data.totalPageRead),
      totalPage: apiData[0].data.total_count,
      currentCount: apiData[0].data.current_count
    })
    console.log(apiData[0].data);
  }, [])
  const { check1, check2, check3, check4 } = checkbox;
  const { activePage, totalPage, currentCount } = page;
  const { active, archived, disconnected, ended, error, paused, pending, scheduled } = filter
  const gridColumns = [
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
      dataIndex: 'actions',
      key: 'actions',
      title: 'Actions',
      width: 100,
      fixed: "right"
    }
  ]
  const manageColumns = (check: any, string: any) => {
    if (check === true) {
      let obj = {
        align: 'center',
        dataIndex: string.toLowerCase(),
        key: string.toLowerCase(),
        title: string,
        width: 100,
      }
      columns.splice(columns.length - 1, 0, obj);
      setColumns([...columns])
    } else if (check === false) {
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].title === string) {
          columns.splice(i, 1)
          setColumns([...columns])
        }
      }
    }
  }
  const filterHandler = (filter: any, string: any) => {
    if (filter === true) {
      setSelected([...selected, string])
    } else if (filter === false) {
      for (let i = 0; i < selected.length; i++) {
        if (selected[i] === string) {
          selected.splice(i, 1)
          setSelected([...selected])
        }
      }
    }
  }
  // const uncheckFilter = (filter: any) => {
  //   if (filter === "Archived") {
  //     setFilter({
  //       ...filter,
  //       archived: false
  //     })
  //   } else if (filter === "Active") {
  //     setFilter({
  //       ...filter,
  //       active: false
  //     })
  //   } else if (filter === "Disconnected") {
  //     setFilter({
  //       ...filter,
  //       disconnected: false
  //     })
  //   } else if (filter === "Ended") {
  //     setFilter({
  //       ...filter,
  //       ended: false
  //     })
  //   } else if (filter === "Paused") {
  //     setFilter({
  //       ...filter,
  //       paused: false
  //     })
  //   } else if (filter === "Pending") {
  //     setFilter({
  //       ...filter,
  //       pending: false
  //     })
  //   } else if (filter === "Scheduled") {
  //     setFilter({
  //       ...filter,
  //       scheduled: false
  //     })
  //   }
  // }

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
                <AdvanceFilter
                  button="More Filter"
                  filters={[
                    {
                      children: <>
                        <FlexLayout direction='vertical' spacing='tight'>
                          <CheckBox
                            labelVal="Archived"
                            name="Archived"
                            checked={archived}
                            onClick={() => {
                              setFilter({
                                ...filter,
                                archived: !archived
                              })
                              filterHandler(!archived, "Archived")
                            }}
                          />
                          <CheckBox
                            labelVal="Active"
                            name="Active"
                            checked={active}
                            onClick={() => {
                              setFilter({
                                ...filter,
                                active: !active
                              })
                              filterHandler(!active, "Active")
                            }}
                          /><CheckBox
                            labelVal="Disconnected"
                            name="Disconnected"
                            checked={disconnected}
                            onClick={() => {
                              setFilter({
                                ...filter,
                                disconnected: !disconnected
                              })
                              filterHandler(!disconnected, "Disconnected")
                            }}
                          />
                          <CheckBox
                            labelVal="Ended"
                            name="Ended"
                            checked={ended}
                            onClick={() => {
                              setFilter({
                                ...filter,
                                ended: !ended
                              })
                              filterHandler(!ended, "Ended")
                            }}
                          /><CheckBox
                            labelVal="Error"
                            name="Error"
                            checked={error}
                            onClick={() => {
                              setFilter({
                                ...filter,
                                error: !error
                              })
                              filterHandler(!error, "Error")
                            }}
                          />
                          <CheckBox
                            labelVal="Paused"
                            name="Paused"
                            checked={paused}
                            onClick={() => {
                              setFilter({
                                ...filter,
                                paused: !paused
                              })
                              filterHandler(!paused, "Paused")
                            }}
                          /><CheckBox
                            labelVal="Pending"
                            name="Pending"
                            checked={pending}
                            onClick={() => {
                              setFilter({
                                ...filter,
                                pending: !pending
                              })
                              filterHandler(!pending, "Pending")
                            }}
                          />
                          <CheckBox
                            labelVal="Scheduled"
                            name="Scheduled"
                            checked={scheduled}
                            onClick={() => {
                              setFilter({
                                ...filter,
                                scheduled: !scheduled
                              })
                              filterHandler(!scheduled, "Scheduled")
                            }}
                          />
                        </FlexLayout>
                      </>,
                      name: 'Status'
                    }
                  ]}
                  heading="Filters"
                  icon={<Filter color="#2a2a2a" size={16} />}
                  onClose={() => console.log("CLOSE")}
                  disableApply={false}
                  onApply={() => setApply([...selected])}
                  type="Outlined"
                />
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
                      onClick={() => {
                        setCheckbox({
                          ...checkbox,
                          check1: !check1
                        })
                        manageColumns(!check1, "Impressions")
                      }
                      }
                    />
                    <CheckBox
                      checked={check2}
                      id="two"
                      labelVal="Clicks"
                      name="Clicks"
                      onClick={() => {
                        setCheckbox({
                          ...checkbox,
                          check2: !check2
                        })
                        manageColumns(!check2, "Clicks")
                      }}
                    />
                    <CheckBox
                      checked={check3}
                      id="two"
                      labelVal="Orders"
                      name="Orders"
                      onClick={() => {
                        setCheckbox({
                          ...checkbox,
                          check3: !check3
                        })
                        manageColumns(!check3, "Orders")
                      }}
                    />
                    <CheckBox
                      checked={check4}
                      id="two"
                      labelVal="ROAS"
                      name="ROAS"
                      onClick={() => {
                        setCheckbox({
                          ...checkbox,
                          check4: !check4
                        })
                        manageColumns(!check4, "ROAS")
                      }}
                    />
                  </FlexLayout>
                </Popover>
              </FlexLayout>
            </FlexChild>
          </FlexLayout>
        </FlexLayout>
        {apply.length === 1 ?
          <Tag destroy={() => {
            // uncheckFilter(apply[0])
            setApply([])
          }}>
            {apply[0]}</Tag> :
          apply.length >= 1 ? <Popover
            activator={<Tag destroy={() => setApply([])} count={`+${apply.length - 1}`} popover togglePopup={() => setFilterPop(!filterPop)}>Status : {apply[0]}</Tag>}
            onClose={() => setFilterPop(!filterPop)}
            popoverContainer="element" open={filterPop}>
            <FlexLayout spacing="mediumTight">
              {apply.map((val: any, index: number) => (
                <Tag destroy={() => {
                  // uncheckFilter(val)
                  apply.splice(index, 1);
                  setApply([...apply])
                }} key={val}>{val}</Tag>
              ))}
            </FlexLayout>
          </Popover> : null
        }
        <br></br>
        <br></br>
        <Grid
          scrollX={1500}
          columns={columns}
          dataSource={data}
        />
        <Pagination
          countPerPage={currentCount}
          currentPage={activePage}
          onCountChange={(e: any) => setPage({
            ...page,
            currentCount: e
          })}
          onEnter={function noRefCheck() { }}
          onNext={() => setPage({
            ...page,
            activePage: activePage + 1
          })}
          onPrevious={() => setPage({
            ...page,
            activePage: activePage - 1
          })}
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
            {
              label: '25',
              value: '25'
            },
            {
              label: '50',
              value: '50'
            }
          ]}
          totalitem={totalPage}
        />
      </Card>
    </div >
  )
}

export default DI(Dashboard)