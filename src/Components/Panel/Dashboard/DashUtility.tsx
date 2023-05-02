import { Badge, Button, FlexLayout, OverlappingImages, Popover, TextStyles, Tag, Modal, Accordion, FlexChild, Loader } from "@cedcommerce/ounce-ui"
import React, { useEffect, useState } from "react"
import { AlertTriangle, } from "react-feather"
import { DI, DIProps } from "../../../../src/Core"
import GrayDot from "../../../../src/Asests/Images/svg/GrayDot"
import GreenDot from "../../../../src/Asests/Images/svg/GreenDot"
import actions from "../../../Asests/Images/png/actions.png"
import fb from "../../../Asests/Images/png/fb.png"
import ig from "../../../Asests/Images/png/ig.png"
import { APP_TARGET_NAME, urlFetchCalls } from "../../../../src/Constant"

export const Actions = (_props: any) => {
    const [openActions, setOpenActions] = useState<boolean>(false)
    return (
        <>
            <Popover
                activator={<Button disable={_props.status === "archived" ? true :
                    _props.status === "disconnected" ? true :
                        _props.status === "ended" ? true :
                            _props.status === "pending" ? true :
                                false} onClick={() => setOpenActions(!openActions)} type='TextButton'><img src={actions} /></Button>}
                open={openActions}
                onClose={() => setOpenActions(!openActions)}>
                <FlexLayout direction="vertical">
                    <Button type="Plain">Edit</Button>
                    <Button type="Plain">Archive</Button>
                    <Button type="Plain">Unpause</Button>
                </FlexLayout>
            </Popover>
        </>
    )
}
export const ProductsActions = (_props: any) => {
    const [openActions, setOpenActions] = useState<boolean>(false)
    return (
        <>
            <Popover
                activator={<Button disable={_props.status.length === 1 && _props.status[0]["status"] === undefined ? true : false} onClick={() => setOpenActions(!openActions)} type='TextButton'><img src={actions} /></Button>}
                open={openActions}
                onClose={() => setOpenActions(!openActions)}>
                <FlexLayout direction="vertical">
                    <Button type="Plain">Edit in Buy with Prime</Button>
                    <Button type="Plain">Sync</Button>
                </FlexLayout>
            </Popover>
        </>
    )
}

export const CampaignStatus = (_props: any) => {
    if (_props === "SCHEDULED") {
        return <Badge type="Positive-100">Scheduled</Badge>
    } else if (_props === "PENDING") {
        return <Badge type="Neutral-100-Border">Pending</Badge>
    } else if (_props === "ERRORS") {
        return <FlexLayout spacing='extraTight' halign='center' valign='center'>
            <AlertTriangle size={15} color='red' />
            <TextStyles textcolor="negative">Errors</TextStyles>
        </FlexLayout>
    } else if (_props === "ACTIVE") {
        return <Badge type="Positive-200">Active</Badge>
    } else if (_props === "ENDED") {
        return <Badge type="Neutral-200">Ended</Badge>
    } else if (_props === "DISCONNECTED") {
        return <Badge type="Neutral-100">Disconnected</Badge>
    } else if (_props === "ARCHIVED") {
        return <Badge type="Info-100">Archived</Badge>
    } else if (_props === "PAUSED") {
        return <Badge type="Warning-100">Paushed</Badge>
    } else {
        return null
    }
}

export const CampaignPlacement = (_props: any) => {
    if (_props[0] === "facebook" &&
        _props[1] === "instagram") {
        return <OverlappingImages>
            <img src={fb} />
            <img src={ig} />
        </OverlappingImages>
    } else if (_props[0] === "instagram" &&
        _props[1] === "facebook") {
        return <OverlappingImages>
            <img src={ig} />
            <img src={fb} />
        </OverlappingImages>
    } else if (_props[0] === "facebook" &&
        _props[1] === undefined) {
        return <OverlappingImages><img src={fb} /></OverlappingImages>
    } else if (_props[0] === "instagram" &&
        _props[1] === undefined) {
        return <OverlappingImages><img src={ig} /></OverlappingImages>
    } else {
        return null
    }
}

export const ProductsTitle = (title: any, items: any) => {
    if (items.length > 1) {
        let totalVariants = items.length - 1;
        return <>
            <FlexLayout direction="vertical" spacing="extraTight">
                <TextStyles>{title}</TextStyles>
                <div style={{ fontWeight: "bold" }}>
                    <TextStyles>{totalVariants > 0 && totalVariants < 10 ? `0${totalVariants}` : totalVariants} Variants</TextStyles>
                </div>
            </FlexLayout>
        </>
    } else {
        return <TextStyles>{title}</TextStyles>
    }
}
interface ProductTypes extends DIProps {
    data: any
    status: any
}
interface InfoTypes {
    title: string;
    description: string;
    solutions: string | undefined
    response: boolean | null;
}
const ProductsStatus = (param: ProductTypes) => {
    const _props = param.status;
    const { di: { POST } } = param
    const { post: {
        solutionsUrl
    } } = urlFetchCalls
    const [open, setOpen] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [accordion, setAccordion] = useState<boolean>(false);
    const [multiaccor, setMultiacor] = useState<any>([]);
    const [multisol, setMultisol] = useState<any>([]);
    const [loader, setLoader] = useState<boolean>(false)
    const [info, setInfo] = useState<any>([])
    const ResolutionsApi = (propsTitle: string, propDescription: string, propSku: string) => {
        setLoader(true)
        POST(`${solutionsUrl}`,
            [
                {
                    "title": propsTitle,
                    "marketplace": APP_TARGET_NAME
                }
            ]
        ).then((res) => {
            if (propSku === "") {
                setOpen(true)
            } else {
                setModal2(true)
            }
            setLoader(false)
            let obj = {
                title: propsTitle,
                description: propDescription,
                sku: propSku,
                response: res.data[0].solution_exists,
                solutions: res.data[0].answer,
            }
            info.push(obj)
            setInfo([...info])
            setMultiacor([...multiaccor, false])
            setMultisol([...multisol, false])
        })
    }
    if (_props.length === 1 && _props[0].type === "simple" && _props[0].visibility === "Catalog and Search") {
        if (_props[0]["status"] === "active") {
            return <FlexLayout halign="start" spacing="extraTight">
                <GreenDot />
                <TextStyles>
                    Active
                </TextStyles>
            </FlexLayout>
        } else if (_props[0]["status"] === "error") {
            return <>
                <Button loading={loader} onClick={() => {
                    ResolutionsApi(_props[0].errors[0].title, _props[0].errors[0].description, "")
                }} icon={<AlertTriangle size={15} color='red' />} type="DangerPlain">
                    Errors
                </Button>
                <Modal
                    close={() => setOpen(!open)}
                    heading="Errors"
                    modalSize="small"
                    open={open}>
                    {info.length !== 0 ? <FlexLayout direction="vertical" spacing="extraTight">
                        <FlexChild>
                            <>
                                <FlexLayout valign="center" spacing="tight">
                                    <AlertTriangle size={17} color='red' />
                                    <TextStyles fontweight="extraBolder">{info[0].title}</TextStyles>
                                </FlexLayout>
                                <div style={{ marginLeft: "28px" }}>
                                    <TextStyles>
                                        {info[0].description}
                                    </TextStyles>
                                </div>
                            </>
                        </FlexChild>
                        <FlexChild>
                            <>
                                {info[0].solutions !== undefined && info[0].response ? <Accordion
                                    active={accordion}
                                    boxed
                                    icon
                                    iconAlign="left"
                                    onClick={() => setAccordion(!accordion)}
                                    title="Resolutions"
                                >
                                    <TextStyles textcolor="light">
                                        {info[0].solutions}
                                    </TextStyles>
                                </Accordion> : null}
                            </>
                        </FlexChild>
                    </FlexLayout> : null}

                </Modal>
            </>
        } else {
            return <FlexLayout halign="start" spacing="extraTight">
                <GrayDot />
                <TextStyles textcolor="light">Pending</TextStyles>
            </FlexLayout>
        }
    } else if (_props.length > 1) {
        let totalPending = 0;
        let totalErrors = 0;
        let totalActive = 0;
        for (const element of _props) {
            if (element["status"] === "error" && element.type === "simple" && element.visibility === "Not Visible Individually") {
                totalErrors++
            } else if (element["status"] === "active" && element.type === "simple" && element.visibility === "Not Visible Individually") {
                totalActive++
            } else if (element["status"] === undefined && element.type === "simple" && element.visibility === "Not Visible Individually") {
                totalPending++
            }
        }
        return <>
            <FlexLayout halign="start" spacing="extraTight" direction="vertical">
                {totalActive !== 0 ? <FlexLayout spacing="extraTight">
                    <GreenDot />
                    <TextStyles >
                        {totalActive > 0 && totalActive < 10 ? `0${totalActive}` : totalActive} Active
                    </TextStyles>
                </FlexLayout> : null}
                {totalPending !== 0 ? <FlexLayout spacing="extraTight">
                    <GrayDot />
                    <TextStyles>
                        {totalPending > 0 && totalPending < 10 ? `0${totalPending}` : totalPending} Pending
                    </TextStyles>
                </FlexLayout> : null}
                {totalErrors !== 0 ?
                    <>
                        <Button disable={loader} onClick={() => {
                            _props.map((val: any) => {
                                if (val.status === "error") {
                                    ResolutionsApi(val.errors[0].title, val.errors[0].description, val.sku)
                                }
                            })
                        }} icon={<AlertTriangle size={15} color='red' />} type="DangerPlain">
                            {totalErrors > 0 && totalErrors < 10 ? `0${totalErrors}` : totalErrors} Errors
                        </Button>
                        <Modal
                            close={() => setModal2(!modal2)}
                            heading="Errors"
                            modalSize="small"
                            open={modal2}>
                            {info.map((val: any, index: number) => (
                                <>
                                    <Accordion
                                        boxed
                                        icon
                                        iconAlign="left"
                                        onClick={() => {
                                            multiaccor[index] = !multiaccor[index]
                                            setMultiacor([...multiaccor])
                                        }}
                                        active={multiaccor[index]}
                                        title={<TextStyles fontweight="bold" content={`Variants sku : ${val.sku}`} textcolor="negative" />}
                                    >
                                        <FlexLayout direction="vertical" spacing="extraTight">
                                            <FlexChild>
                                                <>
                                                    <FlexLayout valign="center" spacing="tight">
                                                        <AlertTriangle size={17} color='red' />
                                                        <TextStyles fontweight="extraBolder">{val.title}</TextStyles>
                                                    </FlexLayout>
                                                    <div style={{ marginLeft: "28px" }}>
                                                        <TextStyles>
                                                            {val.description}
                                                        </TextStyles>
                                                    </div>
                                                </>
                                            </FlexChild>
                                            <FlexChild>
                                                <>
                                                    {val.solutions !== undefined && val.response ? <Accordion
                                                        active={multisol[index]}
                                                        boxed
                                                        icon
                                                        iconAlign="left"
                                                        onClick={() => {
                                                            multisol[index] = !multisol[index]
                                                            setMultisol([...multisol])
                                                        }}
                                                        title="Resolutions"
                                                    >
                                                        <TextStyles textcolor="light">
                                                            {val.solutions}
                                                        </TextStyles>
                                                    </Accordion> : null}
                                                </>
                                            </FlexChild>
                                        </FlexLayout>
                                    </Accordion>
                                </>
                            ))}
                        </Modal>
                    </>
                    : null}
            </FlexLayout>
        </>
    }
}

export default DI(ProductsStatus)

/**
* method that check which filter is checked or not
*/
export const myFilterHandler = (val: any, id: number, myfilter: any, setMyFilter: any, setSelected: any, selected: any, removeFilterFromSelected: any) => {
    for (const element of myfilter) {
        if (element.id === id && element.check === false) {
            element.check = true;
            setSelected([...selected, val.label])
        } else if (element.id === id && element.check === true) {
            element.check = false;
            removeFilterFromSelected(val.label, selected, setSelected)
        }
    }
    setMyFilter([...myfilter])
}

export const removeFilterFromSelected = (val: any, selected: any, setSelected: any) => {
    for (let i = 0; i < selected.length; i++) {
        if (selected[i] === val) {
            selected.splice(i, 1)
            setSelected([...selected])
        }
    }
}

export const uncheckFilter = (val: any, myfilter: any, selected: any, setSelected: any, setMyFilter: any) => {
    for (const element of myfilter) {
        if (element.label === val) {
            element.check = false
            removeFilterFromSelected(val, selected, setSelected)
        }
    }
    setMyFilter([...myfilter])
}

export const closeFilterHandler = (selected: any, apply: any, myfilter: any, setSelected: any, setMyFilter: any) => {
    for (let i = 0; i < selected.length; i++) {
        if (selected.length !== apply.length) {
            while (selected[i] !== apply[i]) {
                uncheckFilter(selected[i], myfilter, selected, setSelected, setMyFilter)
            }
        }
    }
}

export const FilterTagComp = (_props: any) => {
    const { myfilter,
        setSelected,
        setMyFilter,
        setApply,
        setFilterPop,
        apply, selected, filterPop } = _props
    return <>
        {apply.length === 1 ?
            <Tag destroy={() => {
                uncheckFilter(apply[0], myfilter, selected, setSelected, setMyFilter)
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
                            uncheckFilter(val, myfilter, selected, setSelected, setMyFilter)
                            apply.splice(index, 1);
                            setApply([...apply])
                        }} key={val}>{val}</Tag>
                    ))}
                </FlexLayout>
            </Popover> : null
        }
    </>
}

export const DashboardApiData = [
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

export const ProductApiData =
{

    "totalPageRead": "2",

    "current_count": 5,

    "next": "eyJjdXJzb3IiOnsiJG9pZCI6IjY0NDlmYWM0NmQ2NGViZTU2ZDdiN2VjZiJ9LCJwb2ludGVyIjpbeyIkb2lkIjoiNjQ0YTAyNTU2ZDY0ZWJlNTZkN2MyYzEyIn1dLCJ0b3RhbFBhZ2VSZWFkIjoxfQ==",

    "prev": null,

    "rows": [

        {

            "_id": {

                "$oid": "644a02556d64ebe56d7c2c12"

            },

            "container_id": "2vqz97ya5i0pe4",

            "source_product_id": "2vqz97ya5i0pe4",

            "source_shop_id": "374",

            "target_shop_id": "376",

            "user_id": "64490a9ae81c8318f30e6252",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-27T05:04:21+00:00",

            "items": [

                {

                    "shop_id": "376",

                    "source_product_id": "2vqz97ya5i0pe4",

                    "title": "Classic Notes673",

                    "sku": "SKU934",

                    "quantity": 1,

                    "price": 66,

                    "main_image": "https://amazon-omni-cdn.com/h4g24472t80/owk7p6w2jubp1o/stock-photo-couple-decorating-room-in-new-home-painting-wall-together-1273187983.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta"

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/h4g24472t80/owk7p6w2jubp1o/stock-photo-couple-decorating-room-in-new-home-painting-wall-together-1273187983.jpeg",

            "target_product_id": null,

            "title": "Classic Notes673",

            "type": "simple",

            "updated_at": "2023-04-27T05:05:48+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "644a02636d64ebe56d7c2f47"

            },

            "container_id": "2ysjza60ivsgp3",

            "source_product_id": "2ysjza60ivsgp3",

            "source_shop_id": "374",

            "target_shop_id": "376",

            "user_id": "64490a9ae81c8318f30e6252",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-27T05:04:34+00:00",

            "items": [

                {

                    "shop_id": "376",

                    "source_product_id": "2ysjza60ivsgp3",

                    "title": "Classic Notes724",

                    "sku": "SKU985",

                    "quantity": 1,

                    "price": 66,

                    "main_image": "https://amazon-omni-cdn.com/h4g24472t80/6ju4has6rkwpo2/stock-photo-couple-decorating-room-in-new-home-painting-wall-together-1273187983.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta"

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/h4g24472t80/6ju4has6rkwpo2/stock-photo-couple-decorating-room-in-new-home-painting-wall-together-1273187983.jpeg",

            "target_product_id": null,

            "title": "Classic Notes724",

            "type": "simple",

            "updated_at": "2023-04-27T05:05:48+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "644a024c6d64ebe56d7c2a10"

            },

            "container_id": "3irw3gshurxn1y",

            "source_product_id": "3irw3gshurxn1y",

            "source_shop_id": "374",

            "target_shop_id": "376",

            "user_id": "64490a9ae81c8318f30e6252",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-27T05:04:11+00:00",

            "items": [

                {

                    "shop_id": "376",

                    "source_product_id": "3irw3gshurxn1y",

                    "title": "Classic Notes665",

                    "sku": "SKU926",

                    "quantity": 1,

                    "price": 66,

                    "main_image": "https://amazon-omni-cdn.com/h4g24472t80/tc0us3dcqqr9q5/stock-photo-couple-decorating-room-in-new-home-painting-wall-together-1273187983.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta"

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/h4g24472t80/tc0us3dcqqr9q5/stock-photo-couple-decorating-room-in-new-home-painting-wall-together-1273187983.jpeg",

            "target_product_id": null,

            "title": "Classic Notes665",

            "type": "simple",

            "updated_at": "2023-04-27T05:05:48+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "644a02766d64ebe56d7c3353"

            },

            "container_id": "3keya5vyxdy217",

            "source_product_id": "3keya5vyxdy217",

            "source_shop_id": "374",

            "target_shop_id": "376",

            "user_id": "64490a9ae81c8318f30e6252",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-27T05:04:53+00:00",

            "items": [

                {

                    "shop_id": "376",

                    "source_product_id": "3keya5vyxdy217",

                    "title": "157123157123157123157123157123",

                    "sku": "3keya5vyxdy217",

                    "main_image": "https://amazon-omni-cdn.com/h4g24472t80/7jxpcu4k09fr1n/stock-photo-couple-decorating-room-in-new-home-painting-wall-together-1273187983.jpeg",

                    "type": "variation",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta"

                },

                {

                    "shop_id": "376",

                    "source_product_id": "e1pvmueo2xycc1",

                    "title": "",

                    "sku": "qweqwe",

                    "quantity": 1,

                    "price": 43.08,

                    "main_image": "https://amazon-omni-cdn.com/h4g24472t80/l9rd4ifkvuxh71/Screenshotfrom2022-04-0515-22-40.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Not Visible Individually",

                    "target_marketplace": "meta"

                },

                {

                    "shop_id": "376",

                    "source_product_id": "2trpks8v4baq1e",

                    "title": "",

                    "sku": "CEDCOSS359",

                    "quantity": 1,

                    "price": 43.08,

                    "main_image": "https://amazon-omni-cdn.com/h4g24472t80/la8pc9km6zq2i1/Screenshotfrom2023-03-2512-45-28.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Not Visible Individually",

                    "target_marketplace": "meta"

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/h4g24472t80/7jxpcu4k09fr1n/stock-photo-couple-decorating-room-in-new-home-painting-wall-together-1273187983.jpeg",

            "target_product_id": null,

            "title": "157123157123157123157123157123",

            "type": "variation",

            "updated_at": "2023-04-27T05:05:52+00:00",

            "variant_attributes": [

                "size"

            ]

        },
        {

            "_id": {

                "$oid": "64488c0502b62c9c2463add2"

            },

            "container_id": "kbce0gxj65hoi6",

            "source_product_id": "kbce0gxj65hoi6",

            "source_shop_id": "930",

            "target_shop_id": "931",

            "user_id": "644818c1743ae08d66017212",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-26T02:27:17+00:00",

            "items": [

                {

                    "shop_id": "931",

                    "source_product_id": "kbce0gxj65hoi6",

                    "title": "Mark Feldstein and Associates Original Singing Bird Wall Clock, 13 Inch",

                    "sku": "MFA-DLB023GR",

                    "quantity": 1,

                    "price": 34.5,

                    "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/hqt4nmc5hrosm6/MFA-DLB023GR_1.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in url ",

                            "description": "url : is not available."

                        }

                    ]

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/hqt4nmc5hrosm6/MFA-DLB023GR_1.jpeg",

            "target_product_id": null,

            "title": "Mark Feldstein and Associates Original Singing Bird Wall Clock, 13 Inch",

            "type": "simple",

            "updated_at": "2023-04-26T10:27:47+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "64488bef02b62c9c24639b5a"

            },

            "container_id": "kbg1xohid66h1y",

            "source_product_id": "kbg1xohid66h1y",

            "source_shop_id": "930",

            "target_shop_id": "931",

            "user_id": "644818c1743ae08d66017212",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-26T02:26:55+00:00",

            "items": [

                {

                    "shop_id": "931",

                    "source_product_id": "kbg1xohid66h1y",

                    "title": "Nat and Jules Laying Large Labradoodle Dog Children's Plush Stuffed Animal Toy",

                    "sku": "N00290",

                    "quantity": 1,

                    "price": 32.95,

                    "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/3iy52vb42p9uv1/N00290_1_2707f8a6-0d12-4017-bf91-e0affa13337c.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in url ",

                            "description": "url : is not available."

                        }

                    ]

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/3iy52vb42p9uv1/N00290_1_2707f8a6-0d12-4017-bf91-e0affa13337c.jpeg",

            "target_product_id": null,

            "title": "Nat and Jules Laying Large Labradoodle Dog Children's Plush Stuffed Animal Toy",

            "type": "simple",

            "updated_at": "2023-04-26T10:27:26+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "64488ab102b62c9c24622a10"

            },

            "container_id": "kfbyynbwhfnwb3",

            "source_product_id": "kfbyynbwhfnwb3",

            "source_shop_id": "930",

            "target_shop_id": "931",

            "user_id": "644818c1743ae08d66017212",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-26T02:21:37+00:00",

            "items": [

                {

                    "shop_id": "931",

                    "source_product_id": "kfbyynbwhfnwb3",

                    "title": "50th Anniversary Music Box Plays Song Ave Maria",

                    "sku": "MBC7002S",

                    "quantity": 1,

                    "price": 39.95,

                    "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/ptr5dsksowp4w0/MBC7002S_1.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in url ",

                            "description": "url : is not available."

                        }

                    ]

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/ptr5dsksowp4w0/MBC7002S_1.jpeg",

            "target_product_id": null,

            "title": "50th Anniversary Music Box Plays Song Ave Maria",

            "type": "simple",

            "updated_at": "2023-04-26T10:21:34+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "64488be502b62c9c24638fa3"

            },

            "container_id": "kl42ov3ef084k0",

            "source_product_id": "kl42ov3ef084k0",

            "source_shop_id": "930",

            "target_shop_id": "931",

            "user_id": "644818c1743ae08d66017212",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-26T02:26:45+00:00",

            "items": [

                {

                    "shop_id": "931",

                    "source_product_id": "kl42ov3ef084k0",

                    "title": "Dicksons Full Armor of God Ephesians 6 Shield Shape 3.5 inch Table Top Sign Plaque",

                    "sku": "TPLQM-100",

                    "quantity": 1,

                    "price": 22.95,

                    "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/078s4ib4nl1on4/TPLQM-100_1.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in url ",

                            "description": "url : is not available."

                        }

                    ]

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/078s4ib4nl1on4/TPLQM-100_1.jpeg",

            "target_product_id": null,

            "title": "Dicksons Full Armor of God Ephesians 6 Shield Shape 3.5 inch Table Top Sign Plaque",

            "type": "simple",

            "updated_at": "2023-04-26T10:27:12+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "64488bc202b62c9c24636c2a"

            },

            "container_id": "kxykon404b8111",

            "source_product_id": "kxykon404b8111",

            "source_shop_id": "930",

            "target_shop_id": "931",

            "user_id": "644818c1743ae08d66017212",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-26T02:26:10+00:00",

            "items": [

                {

                    "shop_id": "931",

                    "source_product_id": "kxykon404b8111",

                    "title": "Daughter In Law Silver Tone Jewel Beaded Petite Music Box Plays Wind Beneath My Wings",

                    "sku": "PJ195C",

                    "quantity": 1,

                    "price": 42.95,

                    "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/m03pm92ffsu8n6/PJ195C_1.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in url ",

                            "description": "url : is not available."

                        }

                    ]

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/m03pm92ffsu8n6/PJ195C_1.jpeg",

            "target_product_id": null,

            "title": "Daughter In Law Silver Tone Jewel Beaded Petite Music Box Plays Wind Beneath My Wings",

            "type": "simple",

            "updated_at": "2023-04-26T10:26:37+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "64488b7602b62c9c246314c0"

            },

            "container_id": "ky0916sv5j4l19",

            "source_product_id": "ky0916sv5j4l19",

            "source_shop_id": "930",

            "target_shop_id": "931",

            "user_id": "644818c1743ae08d66017212",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-26T02:24:54+00:00",

            "items": [

                {

                    "shop_id": "931",

                    "source_product_id": "ky0916sv5j4l19",

                    "title": "Octopus Treasure Purple 5.7 x 4.3 Resin Glitter Globe Plays By The Beautiful Sea",

                    "sku": "FH88604-100",

                    "quantity": 1,

                    "price": 25.95,

                    "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/hfpk42e664b9b6/FH88604-100_1.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in url ",

                            "description": "url : is not available."

                        }

                    ]

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/hfpk42e664b9b6/FH88604-100_1.jpeg",

            "target_product_id": null,

            "title": "Octopus Treasure Purple 5.7 x 4.3 Resin Glitter Globe Plays By The Beautiful Sea",

            "type": "simple",

            "updated_at": "2023-04-26T10:25:19+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "64488bab02b62c9c24634fd4"

            },

            "container_id": "kzvkonjnspi113",

            "source_product_id": "kzvkonjnspi113",

            "source_shop_id": "930",

            "target_shop_id": "931",

            "user_id": "644818c1743ae08d66017212",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-26T02:25:47+00:00",

            "items": [

                {

                    "shop_id": "931",

                    "source_product_id": "kzvkonjnspi113",

                    "title": "Cardinal Bereavement Red 5.5 x 3.9 Resin Stone Snow Globe Plays Amazing Grace",

                    "sku": "FH88616-100",

                    "quantity": 1,

                    "price": 26.95,

                    "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/v5zpe8s4wfvc1n/FH88616-100_1.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in url ",

                            "description": "url : is not available."

                        }

                    ]

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/v5zpe8s4wfvc1n/FH88616-100_1.jpeg",

            "target_product_id": null,

            "title": "Cardinal Bereavement Red 5.5 x 3.9 Resin Stone Snow Globe Plays Amazing Grace",

            "type": "simple",

            "updated_at": "2023-04-26T10:26:14+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "64488ab102b62c9c246229fb"

            },

            "container_id": "l1fp23nnzo4ew6",

            "source_product_id": "l1fp23nnzo4ew6",

            "source_shop_id": "930",

            "target_shop_id": "931",

            "user_id": "644818c1743ae08d66017212",

            "app_codes": [

                "bwp"

            ],

            "brand": "",

            "created_at": "2023-04-26T02:21:37+00:00",

            "items": [

                {

                    "shop_id": "931",

                    "source_product_id": "l1fp23nnzo4ew6",

                    "title": "American History Liberty 100MM Water Globe Plays The Tune Star Spangled Banner",

                    "sku": "CI-36092N",

                    "quantity": 1,

                    "price": 29.95,

                    "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/nev1m1axxerct0/CI-36092N_1_cf595a24-7818-46cc-ab7d-0aa5ccf257d7.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in url ",

                            "description": "url : is not available."

                        }

                    ]

                }

            ],

            "main_image": "https://amazon-omni-cdn.com/oeasn8lsapd/nev1m1axxerct0/CI-36092N_1_cf595a24-7818-46cc-ab7d-0aa5ccf257d7.jpeg",

            "target_product_id": null,

            "title": "American History Liberty 100MM Water Globe Plays The Tune Star Spangled Banner",

            "type": "simple",

            "updated_at": "2023-04-26T10:21:34+00:00",

            "variant_attributes": []

        },

        {

            "_id": {

                "$oid": "6449fac46d64ebe56d7b7ecf"

            },

            "container_id": "3tyn2m9u3212p3",

            "source_product_id": "3tyn2m9u3212p3",

            "source_shop_id": "374",

            "target_shop_id": "376",

            "user_id": "64490a9ae81c8318f30e6252",

            "app_codes": [

                "bwp"

            ],

            "created_at": {

                "$date": {

                    "$numberLong": "1682569924267"

                }

            },

            "items": [

                {

                    "shop_id": "376",

                    "source_product_id": "3tyn2m9u3212p3",

                    "title": "Test product-Shristi",

                    "sku": "3tyn2m9u3212p3",

                    "type": "variation",

                    "visibility": "Catalog and Search",

                    "target_marketplace": "meta"

                },

                {

                    "shop_id": "376",

                    "source_product_id": "67cuy5i7zmurm2",

                    "title": "",

                    "sku": "q4",

                    "quantity": 1,

                    "price": 60,

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Not Visible Individually",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in main_image ",

                            "description": "main_image : is not available."

                        }

                    ]

                },
                {

                    "shop_id": "376",

                    "source_product_id": "67cuy5i7zmurm2",

                    "title": "",

                    "sku": "q4",

                    "quantity": 1,

                    "price": 60,

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Not Visible Individually",

                    "target_marketplace": "meta",

                    "status": "active",

                    "errors": [

                        {

                            "title": "Error in main_image ",

                            "description": "main_image : is not available."

                        }

                    ]

                },


                {

                    "shop_id": "376",

                    "source_product_id": "1sevr72ugdt21s",

                    "title": "",

                    "sku": "q3",

                    "quantity": 1,

                    "price": 60,

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Not Visible Individually",

                    "target_marketplace": "meta",

                    "status": "active",

                    "errors": [

                        {

                            "title": "Error in main_image ",

                            "description": "main_image : is not available."

                        }

                    ]

                },


                {

                    "shop_id": "376",

                    "source_product_id": "1sevr72ugdt21s",

                    "title": "",

                    "sku": "q3",

                    "quantity": 1,

                    "price": 60,

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Not Visible Individually",

                    "target_marketplace": "meta",

                    "status": "error",

                    "errors": [

                        {

                            "title": "Error in main_image ",

                            "description": "main_image : is not available."

                        }

                    ]

                },
                {

                    "shop_id": "376",

                    "source_product_id": "e1pvmueo2xycc1",

                    "title": "",

                    "sku": "qweqwe",

                    "quantity": 1,

                    "price": 43.08,

                    "main_image": "https://amazon-omni-cdn.com/h4g24472t80/l9rd4ifkvuxh71/Screenshotfrom2022-04-0515-22-40.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Not Visible Individually",

                    "target_marketplace": "meta"

                },

                {

                    "shop_id": "376",

                    "source_product_id": "2trpks8v4baq1e",

                    "title": "",

                    "sku": "CEDCOSS359",

                    "quantity": 1,

                    "price": 43.08,

                    "main_image": "https://amazon-omni-cdn.com/h4g24472t80/la8pc9km6zq2i1/Screenshotfrom2023-03-2512-45-28.jpeg",

                    "buyability": "BUYABLE",

                    "type": "simple",

                    "visibility": "Not Visible Individually",

                    "target_marketplace": "meta"

                }

            ],

            "tags": null,

            "target_product_id": null,

            "title": "Test product-Shristi",

            "type": "variation",

            "updated_at": "2023-04-27T05:05:04+00:00",

            "variant_attributes": [

                "color"

            ],

            "brand": ""

        }

    ],

    "query": [

        {

            "$match": {

                "user_id": "64490a9ae81c8318f30e6252",

                "source_shop_id": "374",

                "target_shop_id": "376",

                "$or": [

                    {

                        "type": "simple"

                    },

                    {

                        "$and": [

                            {

                                "type": "variation"

                            },

                            {

                                "items": {

                                    "$not": {

                                        "$size": 1

                                    }

                                }

                            }

                        ]

                    }

                ]

            }

        },

        {

            "$match": {

                "$and": [

                    {

                        "items.buyability": "BUYABLE"

                    }

                ]

            }

        },

        {

            "$skip": 5

        },

        {

            "$limit": 6

        }

    ]

}