import { Button, Card, Grid, CheckBox, FlexChild, FlexLayout, PageHeader, Pagination, Popover, TextField, ToolTip, Badge, TextStyles, OverlappingImages, AdvanceFilter, Tag, AutoComplete, Alert } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Download, Filter, Plus } from 'react-feather'
import { Actions, CampaignPlacement, CampaignStatus } from './DashUtility'
import { DI, DIProps } from "../../../Core"
import { urlFetchCalls } from '../../../../src/Constant'
import { environment } from '../../../../src/environments/environment'
/**
 * dummy api data
 */
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
          "status": "Pending",
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
          "campaign_name": "retargeting campaign",
          "campaign_id": "23854594149590431",
          "daily_budget": 86,
          "status": "Active",
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
          "campaign_name": "retargeting campaign",
          "campaign_id": "23854594149590431",
          "daily_budget": 86,
          "status": "Ended",
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
          "campaign_name": "retargeting campaign",
          "campaign_id": "23854594149590431",
          "daily_budget": 86,
          "status": "Disconnected",
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
        {
          "campaign_name": "arfah2 campaign",
          "campaign_id": "23854582774900431",
          "daily_budget": 87,
          "status": "Archived",
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
      ],
      "next": null
    },
    "ip": "103.97.184.106",
    "time_taken": "0.096"
  }
]
function Dashboard(_props: DIProps) {
  /**
   * flag state for open manage column popover
   */
  const [flag, setFlag] = useState<boolean>(false);
  /**
   *  state for store api data
   */
  const [data, setData] = useState<any>([]);
  /**
   * state for grid columns details
   */
  const [columns, setColumns] = useState<any>([]);
  /**
   * state for handling pagination
   */
  const [page, setPage] = useState<any>({
    activePage: null,
    totalPage: null,
    currentCount: null
  })
  /**
   * state for manage columns checkboxes
   */
  const [checkbox, setCheckbox] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  })
  /**
   * state for filter
   */
  const [myfilter, setMyFilter] = useState<any>([
    {
      label: "Archived",
      check: false,
      id: Math.floor(Math.random() * 9191)
    },
    {
      label: "Active",
      check: false,
      id: Math.floor(Math.random() * 9191)
    },
    {
      label: "Disconnected",
      check: false,
      id: Math.floor(Math.random() * 9191)
    },
    {
      label: "Ended",
      check: false,
      id: Math.floor(Math.random() * 9191)
    },
    {
      label: "Error",
      check: false,
      id: Math.floor(Math.random() * 9191)
    },
    {
      label: "Paused",
      check: false,
      id: Math.floor(Math.random() * 9191)
    },
    {
      label: "Pending",
      check: false,
      id: Math.floor(Math.random() * 9191)
    },
    {
      label: "Scheduled",
      check: false,
      id: Math.floor(Math.random() * 9191)
    }
  ]
  )
  /**
   * state for storing search input fields data
   */
  const [search, setSearch] = useState<string>("");
  /**
   * state for open and close filter
   */
  const [filterPop, setFilterPop] = useState<boolean>(false)
  /**
   * array state for store that selected value from fiter
   */
  const [selected, setSelected] = useState<any>([])
  /**
   * array state for apply filter value
   */
  const [apply, setApply] = useState<any>([])
  const { di: { GET, globalState: { get } }, redux: { current } } = _props
  const { get: { getCampaignsUrl, bulkExportCSV } } = urlFetchCalls
  /**
   * after mounting get campaign api call
   */
  useEffect(() => {
    GET(`${getCampaignsUrl}?shop_id=801&count=10&filter[shop_id]=801&activePage=1`)
      .then(() => { })
  }, [])
  /**
   * useEffect for make data that shows on grid
   */
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
        actions: <Actions open={element.campaign_id} status={element.status.toLowerCase()} />
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
  }, [])
  const { check1, check2, check3, check4 } = checkbox;
  const { activePage, totalPage, currentCount } = page;
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
  /**
   * method that add new columns or removes columns from grid 
   */
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
  /**
   * method that check which filter is checked or not
   */
  const myFilterHandler = (val: any, id: number) => {
    for (const element of myfilter) {
      if (element.id === id && element.check === false) {
        element.check = true;
        setSelected([...selected, val.label])
      } else if (element.id === id && element.check === true) {
        element.check = false;
        removeFilterFromSelected(val.label)
      }
    }
    setMyFilter([...myfilter])
  }
  /**
   * method that remove those filter from array which is not checked
   */
  const removeFilterFromSelected = (val: any) => {
    for (let i = 0; i < selected.length; i++) {
      if (selected[i] === val) {
        selected.splice(i, 1)
        setSelected([...selected])
      }
    }
  }
  /**
   * method that mark uncheck from filter array
   */
  const uncheckFilter = (val: any) => {
    for (const element of myfilter) {
      if (element.label === val) {
        element.check = false
        removeFilterFromSelected(val)
      }
    }
    setMyFilter([...myfilter])
  }
  /**
   * download report handler
   */
  const downloadReport = () => {
    let downloadURL = environment.API_ENDPOINT + bulkExportCSV +
      `?shop_id=${_props.redux.current?.target._id}&bearer=${get(
        'auth_token'
      )}`;
    window.open(downloadURL)
  }
  /**
   * apply filter handler
   */
  const applyFilterHandler = () => {
    setApply([...selected]);
    let str: string = ""
    let arr: string[] = []
    selected.forEach((ele: any, i: number) => {
      str = `filter[status][${i}]=${ele.toLowerCase()}`;
      arr.push(str)
    });
    GET(getCampaignsUrl, {
      shop_id: current?.target._id,
      filter: arr,
      order: 1,
      count: 5,
      activePage: 2,
    }).then(() => { });
  }
  /**
   * on close filter we remove those who not selected after apply buttton
   */
  const closeFilterHandler = () => {
    for (let i = 0; i < selected.length; i++) {
      if (selected.length !== apply.length) {
        while (selected[i] !== apply[i]) {
          uncheckFilter(selected[i])
        }
      }
    }
  }
  return (
    <div>
      <PageHeader action={<Button onClick={() => {
        _props.history(`/panel/${_props.redux.user_id}/create`)
      }} icon={<Plus />}>Create Campaign</Button>}
        title="Welcome to Social Ads for Buy with Prime!"
        description="Create and manage all your Buy with Prime
        Facebook and Instagram campaigns here." />
      <Card title={"Campaigns"} action={
        <ToolTip
          helpText="If you want to download reports for specific campaigns, make sure you apply the required filters, then click on download report. Else, for a general report of all the campaigns. First, ensure no filters are selected before you download the report."
          popoverContainer="body"
          position="top"
          type="light" open={false}>
          <Button onClick={downloadReport} icon={<Download />} type='Outlined' thickness="thin">
            Download Report
          </Button>
        </ToolTip>}>
        <hr></hr>
        <br></br>
        <FlexLayout direction='vertical' spacing='extraTight'>
          <FlexLayout spacing='loose' halign='fill'>
            <FlexChild desktopWidth='50'>
              <AutoComplete
                clearButton
                clearFunction={function noRefCheck() { }}
                extraClass=""
                onChange={(e: string) => {
                  setSearch(e)
                  GET(`meta/campaign/campaignAutoComplete?shop_id=902&keyword=${e}`)
                    .then(() => { })
                }}
                onClick={function noRefCheck() { }}
                onEnter={function noRefCheck() { }}
                options={[]}
                placeHolder="Search Your Items"
                popoverContainer="body"
                popoverPosition="right"
                setHiglighted
                thickness="thick"
                value={search}
              />
            </FlexChild>
            <FlexChild>
              <FlexLayout spacing='tight'>
                <AdvanceFilter
                  button="More Filter"
                  filters={[
                    {
                      children: <>
                        <FlexLayout direction='vertical' spacing='tight'>
                          {myfilter.map((val: any) => (
                            <CheckBox
                              key={val.id}
                              labelVal={val.label}
                              name={val.label}
                              checked={val.check}
                              onClick={() => {
                                myFilterHandler(val, val.id)
                              }}
                            />
                          ))}
                        </FlexLayout>
                      </>,
                      name: 'Status'
                    }
                  ]}
                  heading="Filters"
                  icon={<Filter color="#2a2a2a" size={16} />}
                  onClose={closeFilterHandler}
                  disableApply={false}
                  onApply={applyFilterHandler}
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
            uncheckFilter(apply[0])
            setApply([])
          }}>
            {apply[0]}</Tag> :
          apply.length >= 1 ? <Popover
            activator={<Tag destroy={() => {
              myfilter.map((val: any) => (
                val.check = false
              ))
              setMyFilter([...myfilter])
              setSelected([])
              setApply([])
            }} count={`+${apply.length - 1}`} popover togglePopup={() => setFilterPop(!filterPop)}>Status : {apply[0]}</Tag>}
            onClose={() => setFilterPop(!filterPop)}
            popoverContainer="element" open={filterPop}>
            <FlexLayout spacing="mediumTight">
              {apply.map((val: any, index: number) => (
                <Tag destroy={() => {
                  uncheckFilter(val)
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
          optionPerPage={[]}
          totalitem={totalPage}
        />
      </Card>
    </div >
  )
}

export default DI(Dashboard)