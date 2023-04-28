import { Button, Card, Grid, CheckBox, FlexChild, FlexLayout, PageHeader, Pagination, Popover, ToolTip, AdvanceFilter, AutoComplete, Loader } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Download, Filter, Plus } from 'react-feather'
import { Actions, CampaignPlacement, CampaignStatus, closeFilterHandler, DashboardApiData, FilterTagComp, myFilterHandler, removeFilterFromSelected } from './DashUtility'
import { DI, DIProps } from "../../../Core"
import { urlFetchCalls } from '../../../../src/Constant'
import { environment } from '../../../../src/environments/environment'
interface paginationObj {
  totalProducts: number
  activePage: number
  countPerPage: number
}
/**
 * dummy api data
 */

function Dashboard(_props: DIProps) {
  /**
   * state for handling loader
   */
  const [loader, setLoader] = useState<boolean>(true)
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
  const [pagination, setPagination] = useState<paginationObj>({
    totalProducts: 0,
    activePage: 0,
    countPerPage: 0,
  })
  /**
   * state that holds all api data
   */
  const [allData, setAllData] = useState<any>([])
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
   * state for open and close tag popover
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
      .then(() => {
        setLoader(false)
        let temp = DashboardApiData[0].data.rows;
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
        setColumns(gridColumns);
        setAllData(arr)
        setData(arr.slice(0, 5))
        setPagination({
          activePage: 1,
          countPerPage: 5,
          totalProducts: arr.length
        })
      })
  }, [])

  const { check1, check2, check3, check4 } = checkbox;
  const { activePage, countPerPage, totalProducts } = pagination
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
   * on count change pagination handler
   * @param val user select from grid 
   */
  const countChangeHandler = (val: any) => {
    let newGrid = allData.slice(0, val)
    setPagination({
      ...pagination,
      countPerPage: val
    })
    setData(newGrid)
  }
  /**
   * next page handler
   */
  const nextPageHandler = () => {
    setPagination({
      ...pagination,
      activePage: activePage + 1,
    })
    let start = countPerPage * activePage;
    let end = countPerPage * activePage + countPerPage;
    let newGrid = allData.slice(start, end)
    setData(newGrid)
  }
  /**
   * prev page handler
   */
  const prevPageHandler = () => {
    setPagination({
      ...pagination,
      activePage: activePage - 1,
    })
    //for delay active state value we more decrement value by one
    let start = countPerPage * (activePage - 1) - countPerPage;
    let end = countPerPage * (activePage - 1);
    let newGrid = allData.slice(start, end)
    setData(newGrid)
  }
  /**
   * on enter change handler
   * @param val user press on grid
   */
  const onEnterChange = (val: number) => {
    setPagination({
      ...pagination,
      activePage: val
    })
    let start = countPerPage * val - countPerPage;
    let end = countPerPage * val;
    let newGrid = allData.slice(start, end)
    setData(newGrid)
  }
  if (loader === false)
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
                  thickness="thin"
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
                                  myFilterHandler(val, val.id, myfilter, setMyFilter, setSelected, selected, removeFilterFromSelected)
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
                    onClose={() => closeFilterHandler(selected, apply, myfilter, setSelected, setMyFilter)}
                    disableApply={false}
                    onApply={applyFilterHandler}
                    disableReset={false}
                    resetFilter={() => {
                      myfilter.map((val: any) => (
                        val.check = false
                      ))
                      setMyFilter([...myfilter])
                      setSelected([])
                      setApply([])
                    }}
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

          {apply.length !== 0 ?
            <>
              <FilterTagComp
                myfilter={myfilter}
                setSelected={setSelected}
                setMyFilter={setMyFilter}
                setApply={setApply}
                setFilterPop={setFilterPop}
                apply={apply}
                selected={selected}
                filterPop={filterPop}
              /><br></br><br></br> </> : null}

          <Grid
            scrollX={1500}
            columns={columns}
            dataSource={data}
          />
          <Pagination
            countPerPage={countPerPage}
            currentPage={activePage}
            onCountChange={(e: any) => countChangeHandler(e)}
            onEnter={(e: any) => onEnterChange(e)}
            onNext={nextPageHandler}
            onPrevious={prevPageHandler}
            totalitem={totalProducts}
            optionPerPage={[
              {
                label: '5',
                value: '5'
              },
              {
                label: '10',
                value: '10'
              },
            ]}
          />
        </Card>
      </div >
    )
  else {
    return (<Loader />)
  }
}

export default DI(Dashboard)