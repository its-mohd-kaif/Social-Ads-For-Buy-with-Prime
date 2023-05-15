import { Accordion, AutoComplete, Button, Card, FlexChild, FlexLayout, PageHeader, Skeleton, Tag, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { DI, DIProps } from "../../../../../src/Core"
import { urlFetchCalls } from '../../../../../src/Constant'
import { PlusCircle } from 'react-feather';
import FAQFallback from '../../../../../src/Components/Panel/Dashboard/Fallback/FAQFallback';
function FAQ(_props: DIProps) {
    const { di: { POST } } = _props;
    const { get: { faqSearch } } = urlFetchCalls;
    const [skeleton, setSkeleton] = useState(true);
    const [data, setData] = useState<any>([]);
    const [btnLoader, setBtnLoader] = useState<boolean>(false);
    const [searchLoader, setSearchLoader] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [options, setOptions] = useState<any>([]);
    const [searchSelect, setSearchSelect] = useState<any>([]);
    const [searchAccordian, setSearchAccordian] = useState<boolean>(false);

    /**
     * in this useEffect we make a post request 
     * and make data and store into state
     */
    useEffect(() => {
        setSkeleton(true)
        POST(faqSearch, {
            "marketplace": "meta",
            "limit": 5
        })
            .then((res) => {
                let tempArr: any = []
                Object.values(res.data.meta).map((val: any, index: number) => {
                    let dataObj: any = []
                    val.data.map((item: any) => {
                        let obj = {
                            answer: item.answer,
                            marketplace: item.marketplace,
                            title: item.title,
                            _id: item._id,
                        }
                        dataObj.push(obj)
                    })
                    let obj = {
                        next_page: val.next_page,
                        group_name: val.group_name,
                        data: dataObj,
                        btn: false
                    }
                    tempArr.push(obj)
                })
                setData(tempArr)
                setSkeleton(false)
            })
    }, [])
    /**
     * show more handler
     * @param next_page pass next_page string
     * @param group_name pass group name string
     */
    const showMoreHandler = (next_page: any, group_name: any) => {
        setBtnLoader(true)
        POST(faqSearch, {
            "group": group_name,
            "lastId": next_page,
            "limit": 5,
            "marketplace": "meta",
            "next": true
        }).then((res) => {
            setBtnLoader(false)
            res.data.meta[group_name].data.map((item: any) => {
                let obj = {
                    answer: item.answer,
                    marketplace: item.marketplace,
                    title: item.title,
                    _id: item._id,
                    open: false
                }
                for (let i = 0; i < data.length; i++) {
                    if (data[i].group_name.toLowerCase() === group_name) {
                        data[i].next_page = res.data.meta[group_name].next_page;
                        data[i].data.push(obj);
                        setData([...data])
                    }
                }
            })
        })
    }
    /**
     * Accordian open/close handler
     * @param id pass id for check which accordian hit by user
     * @returns when condition match then return 
     */
    const accordianHandler = (id: any) => {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].data.length; j++) {
                if (data[i].data[j]._id === id) {
                    data[i].data[j].open = !data[i].data[j].open;
                    setData([...data])
                    return
                }
            }
        }
    }
    /**
     * debounce functionality on search handler
     */
    useEffect(() => {
        if (search !== "") {
            setSearchLoader(true)
            const getData = setTimeout(() => {
                POST(faqSearch, {
                    "keyword": search,
                    "limit": 5,
                    "marketplace": "meta"
                }).then((res) => {
                    setSearchLoader(false)
                    let tempArr: any = []
                    Object.values(res.data.meta).map((val: any) => {
                        val.data.map((item: any) => {
                            let obj = {
                                label: item.title,
                                value: item.title,
                                answer: item.answer,
                                _id: item._id
                            }
                            tempArr.push(obj)
                        })
                    })
                    setOptions(tempArr)
                })
            }, 3000);
            return () => clearInterval(getData);
        }
    }, [search])
    return (
        <>
            <PageHeader
                title={"Frequently Asked Questions"}
            />
            <FlexLayout direction='vertical' spacing='mediumLoose'>
                <AutoComplete
                    clearButton={true}
                    clearFunction={() => {
                        setSearch("")
                        setSearchSelect([])
                    }}
                    onChange={(e: string) => {
                        setSearch(e)
                    }}
                    onClick={(e: any) => {
                        options.map((val: any) => {
                            if (val.label === e) {
                                setSearchSelect(val)
                            }
                        })
                    }}
                    onEnter={function noRefCheck() { }}
                    options={options}
                    placeHolder="Search Your Items"
                    popoverContainer="body"
                    popoverPosition="right"
                    setHiglighted
                    thickness="thick"
                    value={search}
                    loading={searchLoader}
                />
                {skeleton === true ?
                    <Skeleton
                        height="45px"
                        line={10}
                        type="line"
                        width="50px"
                    />
                    :
                    data.length === 0 ? <FAQFallback /> :
                        searchSelect.label !== undefined ?
                            <FlexLayout spacing='extraLoose' direction='vertical'>
                                <FlexLayout valign='center' spacing='tight'>
                                    <TextStyles fontweight='extraBold' headingTypes='LG-2.8'>
                                        Search result for:
                                    </TextStyles>
                                    <Tag destroy={() => {
                                        setSearch("")
                                        setSearchSelect([])
                                    }}>
                                        {searchSelect.label}
                                    </Tag>
                                </FlexLayout>
                                <Card>
                                    <Accordion
                                        boxed
                                        icon
                                        iconAlign="left"
                                        onClick={() => setSearchAccordian(!searchAccordian)}
                                        title={searchSelect.label}
                                        active={searchAccordian}
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: searchSelect.answer }}></div>
                                    </Accordion>
                                </Card>

                            </FlexLayout> :
                            data.map((val: any, index: number) => (
                                <>
                                    {val.next_page !== null || val.data.length !== 0 ?
                                        <Card title={val.group_name}>
                                            {val.data.map((item: any, index: number) => (
                                                <>
                                                    <Accordion
                                                        boxed
                                                        icon
                                                        iconAlign="left"
                                                        onClick={() => accordianHandler(item._id)}
                                                        title={item.title}
                                                        active={item.open}
                                                    >
                                                        <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                                                    </Accordion>
                                                </>
                                            ))}
                                            <br></br>
                                            {
                                                val.next_page !== null ? <FlexLayout halign='center'>
                                                    <Button disable={btnLoader} onClick={() => showMoreHandler(val.next_page, val.group_name.toLowerCase(),)} icon={<PlusCircle size={18} />} type='Outlined'>Show more</Button>
                                                </FlexLayout> : null
                                            }
                                        </Card> : null
                                    }
                                </>
                            ))}
            </FlexLayout>

        </>
    )
}

export default DI(FAQ)