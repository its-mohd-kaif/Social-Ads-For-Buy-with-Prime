
import { Alert, Badge, Button, Card, FlexChild, FlexLayout, FormElement, Image, Loader, Modal, PageHeader, Select, Skeleton, Tabs, TextLink, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather'
import fb from "../../../../Asests/Images/png/fb.png"
import fbDisable from "../../../../Asests/Images/png/fb-disable.png"
import ig from "../../../../Asests/Images/png/ig.png"
import { syncConnectorInfo, syncNecessaryInfo } from "../../../../Actions"
import { DI, DIProps } from "../../../../../src/Core"
import { urlFetchCalls } from '../../../../../src/Constant'
import SkeletonComp from './SkeletonComp'
interface accountObj {
    ad: string;
    pixelId: string;
    name: string;
}
interface PropsInfo extends DIProps {
    syncConnectorInfo: any;
    syncNecessaryInfo: () => void;
}
function Accounts(_props: PropsInfo) {
    const { di: { GET, POST }, redux: { user_id } } = _props;
    const { get: { getPixelsUrl, getDisconnectedAccountUrl, }, post: { updatePixelUrl } } = urlFetchCalls;
    /**
     * state for holding account information
     */
    const [account, setAccount] = useState<accountObj>({
        ad: "",
        pixelId: "",
        name: ""
    })
    /**
     * loaderComp for when page inital render then we seen a loader until we get api response
     */
    const [loaderComp, setLoaderComp] = useState<boolean>(false)
    /**
     * all pixel array
     */
    const [allPixel, setAllPixel] = useState<any>([])
    /**
     * all disconnect accounts array
     */
    const [disconnect, setDisconnect] = useState<any>([])
    /**
     * for open close modal
     */
    const [modal, setModal] = useState<boolean>(false)
    /**
     * for update modal
     */
    const [updateModal, setUpdateModal] = useState<boolean>(false)
    /**
     * for select pixel id
     */
    const [select, setSelect] = useState<string>("")
    /**
     * loader for when we click on save changes
     */
    const [loader, setLoader] = useState<boolean>(false)
    const [flag, setFlag] = useState(false);
    const { ad, pixelId, name } = account

    useEffect(() => {
        setLoaderComp(true)
        async function getAsyncCall() {
            await _props.syncConnectorInfo(_props);
            await _props.syncNecessaryInfo()
            setFlag(true);
            setLoaderComp(false)
        };
        // You need to restrict it at some point
        if (!flag) {
            getAsyncCall();
        }
        GET(getDisconnectedAccountUrl, { shop_id: sessionStorage.getItem(`${user_id}_target_id`) })
            .then((res) => {
                setDisconnect(res.data)
            })
    }, [])
    /**
     * get name, pixed id, ad from redux state
     */
    useEffect(() => {
        if (_props.redux.account !== undefined) {
            setAccount({
                name: _props.redux.account.target.meta[0].data.user_name,
                pixelId: _props.redux.account.target.meta[0].data.pixel_id,
                ad: _props.redux.account.target.meta[0].data.account_name
            })
        }
    }, [_props.redux.account])
    const updateHandler = () => {
        setUpdateModal(true)
    }
    /**
     * Edit Handler
     * make a object array for showing select options
     */
    const editHandler = () => {
        setModal(true)
        GET(`${getPixelsUrl}?shop_id=${sessionStorage.getItem(`${user_id}_target_id`)}`)
            .then((res) => {
                if (res.success === true) {
                    let tempArr: any = []
                    res.data.filter((ele: any) => ele.id !== pixelId).map((val: any) => {
                        let obj = {
                            label: `${val.name} - (${val.id})`,
                            value: val.id,
                            pixel_id: val.id,
                            name: val.name
                        }
                        tempArr.push(obj)
                    })
                    setAllPixel(tempArr)
                }
            })
    }
    /**
     * Save change handler
     */
    const saveChangesHandler = () => {
        setLoader(true)
        POST(`${updatePixelUrl}`, {
            "shop_id": sessionStorage.getItem(`${user_id}_target_id`),
            "pixel": select
        }
        ).then((res) => {
            setLoader(false)
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
                    <SkeletonComp />
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
                                                                {ad}
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
                                            <TextLink onClick={() => {
                                                window.open("https://testing.cedcommerce.bwpapps.com/info/faq?query=meta_connect_my_instagram_account")
                                            }
                                            } label="Learn how to connect your instagram account" />
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
                                                    {val.username}
                                                </TextStyles>
                                                <TextStyles paragraphTypes='MD-1.4' textcolor='light'>
                                                    {val.account_name}
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
                            options={allPixel}
                            popoverContainer="body"
                            thickness="thick"
                            value={select}
                        />
                    </FormElement>
                </FlexLayout>
            </Modal>
            <Modal
                close={() => {
                    setUpdateModal(!updateModal)
                }}
                heading="Update Facebook Account Settings"
                modalSize="small"
                primaryAction={{
                    content: 'Continue',
                    loading: false,
                    onClick: function noRefCheck() { }
                }}
                secondaryAction={{
                    content: 'Cancel',
                    loading: false,
                    onClick: () => {
                        setUpdateModal(!updateModal)
                    }
                }} open={updateModal}>
                <FlexLayout direction='vertical' spacing='mediumLoose'>
                    <TextStyles>
                        Your Facebook account <span style={{ fontWeight: "bold" }}>{name}</span> is currently connected to the Social Ads for
                        Buy with Prime account. Use the same Facebook account, Business Manager <span style={{ fontWeight: "bold" }}>Lakhan Store</span>,
                        and Facebook Ads account <span style={{ fontWeight: "bold" }}>{ad}</span>
                    </TextStyles>
                    <TextStyles>
                        If any of the conditions do not meet. Your accounts’ catalogs get deleted on ads manager.
                        Existing campaigns will be deleted on the ads manager and get disconnected in the app.
                    </TextStyles>
                </FlexLayout>
            </Modal>
        </div>
    )
}

export default DI(Accounts, { func: { syncConnectorInfo, syncNecessaryInfo } })