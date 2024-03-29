import { AdvanceFilter, AutoComplete, Button, Card, CheckBox, FlexChild, FlexLayout, Grid, Image, PageHeader, Pagination, Loader, Alert, Modal } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Filter, RefreshCw } from 'react-feather'
import { urlFetchCalls } from '../../../../../src/Constant'
import { DI, DIProps } from "../../../../Core"
import ProductsStatus, { closeFilterHandler, FilterTagComp, myFilterHandler, ProductApiData, ProductsActions, ProductsTitle, removeFilterFromSelected } from '../DashUtility'

import productFallBackImg from "../../../../Asests/Images/png/productFallBack.png"
import ProductsFallback from '../Fallback/ProductsFallback'
import { webSocketInit } from '../../../../../src/Components/Auth/function'
interface paginationObj {
    activePage: number
    countPerPage: number
    start: number
    end: number
}
interface bannerObj {
    message: string;
    destroy: boolean;
}
function Products(_props: DIProps) {
    const [allData, setAllData] = useState<any>([])
    const [loader, setLoader] = useState<boolean>(true)
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<paginationObj>({
        activePage: 1,
        countPerPage: 5,
        start: 0,
        end: 5,
    })
    const [search, setSearch] = useState<string>("");
    const [banner, setBanner] = useState<bannerObj>({
        message: "",
        destroy: false
    })
    const [modal, setModal] = useState<boolean>(false);
    const [btnLoader, setBtnLoader] = useState<boolean>(false);
    const { message, destroy } = banner
    const { get: { getRefineProductsUrl, queuedTaskUrl } } = urlFetchCalls;
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

    const [gridLoader, setGridLoader] = useState<boolean>(false)

    const { activePage, countPerPage, start, end } = pagination;

    useEffect(() => {
        /**
         * Call Websocket Function
         */
        webSocketInit(_props, setBanner, "banner")
    }, [])

    useEffect(() => {
        setGridLoader(true)
        GET(`${getRefineProductsUrl}?is_only_parent_allow=false&filter[items.buyability][1]=BUYABLE&activePage=1&count=5`)
            .then(() => {
                setLoader(false)
                setGridLoader(false)
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
                        status: <ProductsStatus data={pagination} status={element.items} />,
                        actions: <ProductsActions open={element.container_id} status={element.items} />
                    }
                    arr.push(obj)
                }
                setAllData(arr)
                setData(arr.slice(start, end))
            })
    }, [start, end])

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
            width: 160,
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

        let start = countPerPage * activePage;
        let end = countPerPage * activePage + countPerPage;
        setPagination({
            ...pagination,
            activePage: activePage + 1,
            start: start,
            end: end
        })
    }
    /**
    * prev page handler function
     */
    const prevPageHandler = () => {
        //for delay active state value we more decrement value by one
        let start = countPerPage * (activePage - 1) - countPerPage;
        let end = countPerPage * (activePage - 1);
        setPagination({
            ...pagination,
            activePage: activePage - 1,
            start: start,
            end: end
        })
    }
    /**
   * on enter change handler
   * @param val user press on grid
   */
    const onEnterChange = (val: number) => {
        let start = countPerPage * val - countPerPage;
        let end = countPerPage * val;
        setPagination({
            ...pagination,
            activePage: val,
            start: start,
            end: end
        })
    }

    const catalogHandler = () => {
        setModal(!modal)
        // webSocketInit(_props, setBanner, "banner")
    }
    console.log("STATE ", banner)
    if (loader === false)
        return (
            <div>
                <PageHeader title="Products" description="Your Buy with Prime products and their status appear here."
                    action={<Button onClick={catalogHandler} icon={<RefreshCw />}>Catalog Sync</Button>}
                />
                {(message === "product_upload" || message === "product_upload_complete")
                    && destroy === false ?
                    <FlexChild desktopWidth='50'>
                        <>
                            <Alert
                                desciption={
                                    message === "product_upload" ?
                                        "Take a break. Your upload is in process." : "Upload Complete!"
                                }
                                destroy
                                icon
                                onClose={() => {
                                    setBanner(
                                        {
                                            ...banner,
                                            destroy: !destroy
                                        }
                                    )
                                }}
                                type={message === "product_upload" ? "info" : "success"}
                            >
                                {message === "product_upload" ? "Products Uploading!" : "Products successfully uploaded."}
                            </Alert>
                            <br></br>
                        </>
                    </FlexChild>
                    : null
                }
                {data.length !== 0 ?
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
                            {gridLoader === true ? <Loader type='Loader1' /> : <Grid
                                columns={gridColumns}
                                dataSource={data}
                            />}

                            <Pagination
                                countPerPage={countPerPage}
                                currentPage={activePage}
                                onCountChange={(e: any) => countChangeHandler(e)}
                                onEnter={(e: any) => onEnterChange(e)}
                                onNext={nextPageHandler}
                                onPrevious={prevPageHandler}
                                totalitem={allData.length}
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
                    : <ProductsFallback />}
                <Modal
                    close={() => {
                        setModal(!modal)
                    }}
                    heading="Sync your product catalog"
                    modalSize="small"
                    primaryAction={{
                        content: 'Yes',
                        loading: btnLoader,
                        onClick: () => {
                            setBtnLoader(true)
                            GET(queuedTaskUrl)
                                .then((res: any) => {
                                    setBtnLoader(false)
                                    if (res.success === true) {
                                        if (res.data.rows[0].process_code === "product_upload") {
                                            _props.error("Product syncing already in progress, kindly try after sometime.")
                                        }
                                        setBanner({
                                            message: res.data.rows[0].process_code,
                                            destroy: false
                                        })
                                    }
                                    setModal(false)
                                })
                        }
                    }}
                    secondaryAction={{
                        content: 'Cancel',
                        loading: false,
                        onClick: () => {
                            setModal(!modal)
                        }
                    }} open={modal}>
                    Are you sure you want to sync your product catalog?
                </Modal>
            </div>
        )
    else {
        return (
            <Loader />
        )
    }
}

export default DI(Products)