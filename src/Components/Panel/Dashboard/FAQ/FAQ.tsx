import { Accordion, AutoComplete, Button, Card, FlexChild, FlexLayout, PageHeader, Skeleton } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { DI, DIProps } from "../../../../../src/Core"
import { urlFetchCalls } from '../../../../../src/Constant'
import { PlusCircle } from 'react-feather';
function FAQ(_props: DIProps) {
    const { di: { POST } } = _props;
    const { get: { faqSearch } } = urlFetchCalls;
    // const [faq, setFaq] = useState<any>([]);
    const [multiaccor, setMultiacor] = useState<any>([]);
    const [skeleton, setSkeleton] = useState(true);
    // const [next, setNext] = useState<string | null>(null);
    // const [allData, setAllData] = useState<any>([]);
    // const [title, setTitle] = useState<any>([]);
    const [accordian, setAccordian] = useState<any>([]);
    const [allData, setData] = useState<any>([])
    useEffect(() => {
        setSkeleton(true)
        POST(faqSearch, {
            "marketplace": "meta",
            "limit": 5
        })
            .then((res) => {
                let tempArr: any = []
                let tempAccordian: any = []
                console.log("REs", res.data)
                let allKeys: any = Object.keys(res.data.meta);
                console.log("KEYS", allKeys);
                console.log("CHECK", Object.values(res.data.meta))
                Object.values(res.data.meta).map((val: any, index: number) => {
                    let dataObj: any = []
                    console.log("FIRST ", val)
                    val.data.map((item: any) => {
                        console.log("ITEM", item)
                        let obj = {
                            answer: item.answer,
                            marketplace: item.marketplace,
                            title: item.title,
                            _id: item._id,
                            open: false
                        }
                        dataObj.push(obj)
                    })
                    let obj = {
                        next_page: val.next_page,
                        group_name: val.group_name,
                        data: dataObj
                    }
                    tempArr.push(obj)
                })
                setData(tempArr)
                setSkeleton(false)
                // setFaq(res.data.meta[Object.keys(res.data.meta)[0]].data)
                // setNext(res.data.meta[Object.keys(res.data.meta)[0]].next_page)
                // setAllData(res.data.meta)
                // setTitle(Object.keys(res.data.meta))
                setAccordian(tempAccordian)
            })

        let index = 5;
        while (index !== 1) {
            setMultiacor([...multiaccor, false])
            index--
        }
    }, [])

    const showMoreHandler = () => {
        // allData.meta[Object.keys(allData.meta)[index + 1]].data.map((val: any) => {
        //     faq.push(val)
        //     setFaq([...faq])
        // })
        // setNext(allData.meta[Object.keys(allData.meta)[index]].next_page)
        // setIndex((val) => ++val)
    }
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const accordianHandler = (val: any) => {
        for (let i = 0; i < accordian.length; i++) {
            for (let j = 0; j < val.data.length; j++) {
                if (accordian[i].id === val.data[j]._id) {
                    console.log("YESS")
                    accordian[i].open = !accordian[i].open;
                    setAccordian([...accordian])
                    return
                }
            }
        }
    }
    console.log("KAIF", allData)
    return (
        <>
            <PageHeader
                title={"Frequently Asked Questions"}
            />
            <FlexLayout direction='vertical' spacing='mediumLoose'>
                <AutoComplete
                    clearButton
                    clearFunction={function noRefCheck() { }}
                    onChange={function noRefCheck() { }}
                    onClick={function noRefCheck() { }}
                    onEnter={function noRefCheck() { }}
                    options={[]}
                    placeHolder="Search Your Items"
                    popoverContainer="body"
                    popoverPosition="right"
                    setHiglighted
                    thickness="thick"
                    value=""
                />
                {skeleton === true ?
                    <FlexLayout spacing='loose' direction='vertical'>
                        {
                            [1, 2, 3, 4, 5].map((val) => (
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
                    allData.map((val: any, index: number) => (
                        <>
                            {val.next_page !== null || val.data.length !== 0 ?
                                <Card title={val.group_name}>
                                    {val.data.map((item: any, index: number) => (
                                        <>
                                            <Accordion
                                                boxed
                                                icon
                                                iconAlign="left"
                                                onClick={() => accordianHandler(val)}
                                                title={item.title}
                                                active={accordian.open}
                                            >
                                                <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                                            </Accordion>
                                        </>
                                    ))}
                                </Card> : null
                            }
                        </>
                    ))}

                {/* <Card
                    title={"Common Queries"}
                >
                    {skeleton === true ?
                        <FlexLayout spacing='loose' direction='vertical'>
                            {
                                [1, 2, 3, 4, 5].map((val) => (
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
                        </FlexLayout> : faq.map((val: any, index: number) => (
                            <>
                                <Accordion
                                    boxed
                                    icon
                                    iconAlign="left"
                                    onClick={() => {
                                        multiaccor[index] = !multiaccor[index]
                                        setMultiacor([...multiaccor])
                                    }}
                                    title={val.title}
                                    active={multiaccor[index]}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: val.answer }}></div>
                                </Accordion>
                            </>
                        ))}
                    <br></br>
                    {next !== null ? <FlexLayout halign='center'>
                        <Button onClick={showMoreHandler} icon={<PlusCircle size={18} />} type='Outlined'>Show more</Button>
                    </FlexLayout> : null}

                </Card> */}
            </FlexLayout>

        </>
    )
}

export default DI(FAQ)