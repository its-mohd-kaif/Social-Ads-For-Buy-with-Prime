import { AdvanceFilter, AutoComplete, Button, Card, CheckBox, FlexChild, FlexLayout, Grid, Image, PageHeader, Pagination, Loader } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Filter, RefreshCw } from 'react-feather'
import { urlFetchCalls } from '../../../../../src/Constant'
import { DI, DIProps } from "../../../../Core"
import { closeFilterHandler, FilterTagComp, myFilterHandler, ProductApiData, ProductsActions, ProductsStatus, ProductsTitle, removeFilterFromSelected } from '../DashUtility'
import productFallBackImg from "../../../../Asests/Images/png/productFallBack.png"
interface paginationObj {
    totalProducts: number
    activePage: number
    countPerPage: number
}
function Products(_props: DIProps) {
    const [allData, setAllData] = useState<any>([])
    const [loader, setLoader] = useState<boolean>(true)
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<paginationObj>({
        totalProducts: 0,
        activePage: 0,
        countPerPage: 0,
    })
    const [search, setSearch] = useState<string>("")
    const { get: { getRefineProductsUrl } } = urlFetchCalls;
    const { di: { GET } } = _props;
    const [myfilter, setMyFilter] = useState<any>([
        {
            label: "Active",
            check: false,
            id: Math.floor(Math.random() * 9191)
        },
        {
            label: "Error",
            check: false,
            id: Math.floor(Math.random() * 9191)
        },
        {
            label: "Pending",
            check: false,
            id: Math.floor(Math.random() * 9191)
        },
    ]
    )
    /**
   * array state for store that selected value from fiter
   */
    const [selected, setSelected] = useState<any>([])
    /**
   * array state for apply filter value
   */
    const [apply, setApply] = useState<any>([])
    /**
   * state for open and close filter
   */
    const [filterPop, setFilterPop] = useState<boolean>(false)
    useEffect(() => {
        GET(`${getRefineProductsUrl}?is_only_parent_allow=false&filter[items.buyability][1]=BUYABLE&activePage=1&count=5`)
            .then(() => {
                setLoader(false)
                let arr = []
                let temp = ProductApiData.rows;
                for (const element of temp) {
                    let obj = {
                        main_image: <Image
                            fit="cover"
                            height={48}
                            radius="corner-radius"
                            src={element["main_image"] !== undefined ? element.main_image : productFallBackImg}
                            width={48}
                        />,
                        title: ProductsTitle(element.title, element.items),
                        status: ProductsStatus(element.items),
                        actions: <ProductsActions open={element.container_id} status={element.items} />
                    }
                    arr.push(obj)
                }
                setAllData(arr)
                setData(arr.slice(0, 5))
                setPagination({
                    activePage: 1,
                    countPerPage: 5,
                    totalProducts: arr.length
                })
            })
    }, [])

    const { activePage, countPerPage, totalProducts } = pagination

    const gridColumns = [
        {
            align: 'left',
            dataIndex: 'main_image',
            key: 'main_image',
            title: 'Image',
            width: 100,
        },
        {
            align: 'left',
            dataIndex: 'title',
            key: 'title',
            title: 'Title',
            width: 716,
        },
        {
            align: 'left',
            dataIndex: 'status',
            key: 'status',
            title: 'Status',
            width: 140,
        },
        {
            align: 'left',
            dataIndex: 'actions',
            key: 'actions',
            title: 'Actions',
            width: 100,
        }
    ]
    /**
  * apply filter handler
  */
    const applyFilterHandler = () => {
        setApply([...selected]);
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
    * prev page handler function
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
                <PageHeader title="Products" description="Your Buy with Prime products and their status appear here."
                    action={<Button icon={<RefreshCw />}>Catalog Sync</Button>}
                />
                <Card>
                    <FlexLayout direction='vertical' spacing='loose'>
                        <FlexLayout spacing='loose' halign='fill'>
                            <FlexChild desktopWidth='50'>
                                <>
                                    <AutoComplete
                                        clearButton
                                        clearFunction={function noRefCheck() { }}
                                        extraClass=""
                                        onChange={(e: any) => {
                                            setSearch(e)
                                            GET(`${getRefineProductsUrl}?filter[title][3]=${e}`)
                                                .then((res) => console.log("API", res))
                                        }}
                                        onClick={function noRefCheck() { }}
                                        onEnter={function noRefCheck() { }}
                                        options={[]}
                                        placeHolder="Search Products"
                                        popoverContainer="body"
                                        popoverPosition="right"
                                        setHiglighted
                                        thickness="thin"
                                        value={search}
                                    />
                                </>
                            </FlexChild>
                            <FlexChild>
                                <>
                                    <AdvanceFilter
                                        button="Filter"
                                        disableApply={false}
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
                                        heading="Filter Heading"
                                        icon={<Filter color="#2a2a2a" size={16} />}
                                        onApply={applyFilterHandler}
                                        onClose={() => closeFilterHandler(selected, apply, myfilter, setSelected, setMyFilter)}
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
                                </>
                            </FlexChild>
                        </FlexLayout>
                        {apply.length !== 0 ?
                            <FilterTagComp
                                myfilter={myfilter}
                                setSelected={setSelected}
                                setMyFilter={setMyFilter}
                                setApply={setApply}
                                setFilterPop={setFilterPop}
                                apply={apply}
                                selected={selected}
                                filterPop={filterPop}
                            /> : null}
                        <br></br>
                        <Grid
                            columns={gridColumns}
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
                                {
                                    label: '15',
                                    value: '15'
                                },
                            ]}
                        />
                    </FlexLayout>
                </Card>
            </div>
        )
    else {
        return (
            <Loader />
        )
    }
}

export default DI(Products)