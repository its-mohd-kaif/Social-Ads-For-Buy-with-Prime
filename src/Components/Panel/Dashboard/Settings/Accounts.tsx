
import { Alert, Badge, Button, Card, FlexChild, FlexLayout, FormElement, Image, Loader, Modal, PageHeader, Select, Tabs, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather'
import fb from "../../../../Asests/Images/png/fb.png"
import fbDisable from "../../../../Asests/Images/png/fb-disable.png"
import ig from "../../../../Asests/Images/png/ig.png"
import { DI, DIProps } from "../../../../../src/Core"
import { urlFetchCalls } from '../../../../../src/Constant'
interface accountObj {
    pixelId: string;
    name: string;
}
function Accounts(_props: DIProps) {
    const { di: { GET, POST }, redux: { user_id } } = _props;
    const { get: { getPixelsUrl, initCampaignUrl }, post: { updatePixelUrl } } = urlFetchCalls;
    /**
     * state for holding account information
     */
    const [account, setAccount] = useState<accountObj>({
        pixelId: "",
        name: ""
    })
    /**
     * loaderComp for when page inital render then we seen a loader until we get api response
     */
    const [loaderComp, setLoaderComp] = useState<boolean>(false)
    /**
     * all disconnect accounts array
     */
    const [disconnect, setDisconnect] = useState<any>([])
    /**
     * for open close modal
     */
    const [modal, setModal] = useState<boolean>(false)
    /**
     * for select pixel id
     */
    const [select, setSelect] = useState<string>("")
    /**
     * loader for when we click on save changes
     */
    const [loader, setLoader] = useState<boolean>(false)
    const { pixelId, name } = account
    useEffect(() => {
        setLoaderComp(true)
        GET(initCampaignUrl, { shop_id: sessionStorage.getItem(`${user_id}_target_id`) })
            .then((res) => {
                if (res.success === true) {
                    GET(`${getPixelsUrl}?shop_id=1192`)
                        .then((res1) => {
                            if (res1.success === true) {
                                setLoaderComp(false)
                                res1.data.forEach((element: any) => {
                                    if (element.id === res.data.pixel_id) {
                                        setAccount({
                                            pixelId: element.id,
                                            name: element.name
                                        })
                                    }
                                });
                                let tempArr: any = []
                                res1.data.filter((ele: any) => ele.id !== res.data.pixel_id).map((val: any) => {
                                    let obj = {
                                        label: `${val.name} - (${val.id})`,
                                        value: val.id,
                                        pixel_id: val.id,
                                        name: val.name
                                    }
                                    tempArr.push(obj)
                                })
                                setDisconnect(tempArr)
                            } else if (res1.success === false) {
                                _props.error(res1.message)
                            }
                        })
                } else {
                    _props.error(res.message)
                }
            })
    }, [])
    const updateHandler = () => {
        alert("update")
    }
    const editHandler = () => {
        setModal(true)

    }
    const saveChangesHandler = () => {
        setLoader(true)
        POST(`${updatePixelUrl}`, {
            "shop_id": sessionStorage.getItem(`${user_id}_target_id`),
            "pixel": select
        }
        ).then((res) => {
            if (res.success === true) {
                _props.success(res.message)
                setAccount({
                    ...account,
                    pixelId: select
                })
                setModal(false)
            } else if (res.success === false) {
                _props.error(res.message)
            }
        })
    }
    return (
        <div>
            <Card title="Accounts">
                {loaderComp === true ?
                    <Loader type='Loader2' />
                    : <FlexLayout spacing='loose' direction='vertical'>
                        <Card title={"Facebook / Instagram Accounts"} cardType='Bordered'>
                            <FlexLayout spacing='mediumLoose' direction='vertical'>
                                <FlexLayout wrap='noWrap' halign='fill'>
                                    <FlexChild>
                                        <>
                                            <FlexLayout spacing='loose'>
                                                <FlexChild>
                                                    <>
                                                        <Image
                                                            alt="Image Data Not Found"
                                                            fit="cover"
                                                            height={32}
                                                            radius="none"
                                                            src={fb}
                                                            type="none"
                                                            width={32}
                                                        />
                                                    </>
                                                </FlexChild>
                                                <FlexChild>
                                                    <>
                                                        <FlexLayout spacing='extraTight' direction='vertical'>
                                                            <TextStyles fontweight='bold' paragraphTypes='MD-1.4'>
                                                                {name}
                                                            </TextStyles>
                                                            <TextStyles textcolor='light' paragraphTypes='MD-1.4'>
                                                                Ads account name
                                                            </TextStyles>
                                                            <Badge
                                                                position="bottom"
                                                                size="small"
                                                                type="Positive-100"
                                                            >
                                                                Active Account
                                                            </Badge>
                                                        </FlexLayout>
                                                    </>
                                                </FlexChild>
                                            </FlexLayout>
                                        </>
                                    </FlexChild>
                                    <Button onClick={updateHandler} type='Outlined'>
                                        Update
                                    </Button>
                                </FlexLayout>
                                <FlexLayout halign='fill'>
                                    <FlexChild>
                                        <>
                                            <div style={{ marginLeft: "50px" }}>
                                                <FlexLayout direction='vertical'>
                                                    <TextStyles paragraphTypes='MD-1.4'>
                                                        Pixel ID
                                                    </TextStyles>
                                                    <TextStyles textcolor='light' paragraphTypes='MD-1.4'>
                                                        {pixelId}
                                                    </TextStyles>
                                                </FlexLayout>
                                            </div>
                                        </>
                                    </FlexChild>
                                    <Button onClick={editHandler} icon={<Edit size="18" />} type='Outlined'>
                                        Edit
                                    </Button>
                                </FlexLayout>
                                <FlexLayout spacing='loose'>
                                    <FlexChild>
                                        <>
                                            <Image
                                                alt="Image Data Not Found"
                                                fit="cover"
                                                height={32}
                                                radius="none"
                                                src={ig}
                                                type="none"
                                                width={32}
                                            />
                                        </>
                                    </FlexChild>
                                    <FlexChild>
                                        <FlexLayout direction='vertical' spacing='extraTight'>
                                            <TextStyles paragraphTypes='MD-1.4' textcolor='light'>
                                                Instagram Account
                                            </TextStyles>
                                            <TextLink label="Learn how to connect your instagram account" />
                                            <Badge type='Neutral-200' children={"Not Connected"} />
                                        </FlexLayout>
                                    </FlexChild>
                                </FlexLayout>
                            </FlexLayout>
                        </Card>
                        <Card cardType='Bordered' title={"Disconnected Accounts"}>
                            {disconnect.map((val: any) => (
                                <>
                                    <FlexLayout spacing='loose'>
                                        <FlexChild>
                                            <>
                                                <Image
                                                    alt="Image Data Not Found"
                                                    fit="cover"
                                                    height={32}
                                                    radius="none"
                                                    src={fbDisable}
                                                    type="none"
                                                    width={32}
                                                />
                                            </>
                                        </FlexChild>
                                        <FlexChild>
                                            <FlexLayout direction='vertical' spacing='extraTight'>
                                                <TextStyles fontweight='bold' paragraphTypes='MD-1.4'>
                                                    {val.name}
                                                </TextStyles>
                                                <TextStyles paragraphTypes='MD-1.4' textcolor='light'>
                                                    Ads account name
                                                </TextStyles>
                                                <br></br>
                                            </FlexLayout>
                                        </FlexChild>
                                    </FlexLayout>
                                </>
                            ))}
                        </Card>
                    </FlexLayout>}
            </Card>
            <Modal
                close={() => {
                    setModal(!modal)
                }}
                heading="Edit Pixel"
                modalSize="large"
                overlayClose
                primaryAction={{
                    disable: select === "" ? true : false,
                    content: 'Save Changes',
                    loading: loader,
                    onClick: saveChangesHandler
                }}
                secondaryAction={{
                    content: 'Cancel',
                    loading: false,
                    onClick: () => {
                        setModal(!modal)
                    }
                }} open={modal}>
                <FlexLayout direction='vertical' spacing='tight'>
                    <Alert
                        desciption="Changing the pixel Id might result in tracking metrics inconsistency. For a smooth tracking experience, please ensure your DTC website has the same pixel Id as your Buy With Prime pixel Id."
                        destroy={false}
                        icon
                        onClose={function noRefCheck() { }}
                        type="warning"
                    >
                        Are you sure you want to change the Pixel ID?
                    </Alert>
                    <FormElement>
                        <Select
                            name="Pixel"
                            placeholder='Select Pixel'
                            onChange={(e) => {
                                setSelect(e)
                            }}
                            options={disconnect}
                            popoverContainer="body"
                            thickness="thick"
                            value={select}
                        />
                    </FormElement>
                </FlexLayout>
            </Modal>
        </div>
    )
}

export default DI(Accounts)