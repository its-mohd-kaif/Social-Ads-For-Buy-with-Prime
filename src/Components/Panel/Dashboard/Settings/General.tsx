import { Button, Card, FlexChild, FlexLayout, Modal, Skeleton, TextField, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { Edit } from 'react-feather'
import { urlFetchCalls } from '../../../../../src/Constant'
import { DI, DIProps } from "../../../../../src/Core"
interface stateObj {
    url: string;
    email: string;
}

function General(_props: DIProps) {
    const { di: { GET, POST }, redux: { user_id } } = _props
    const { post: { getConfigUrl, updateConfigUrl }, get: { initCampaignUrl } } = urlFetchCalls;
    const [state, setState] = useState<stateObj>({
        url: "",
        email: "",
    })
    const [brand, setBrand] = useState<string>("")
    const [modal, setModal] = useState<boolean>(false);
    const [newStore, setNewStore] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [skeleton, setSkeleton] = useState<boolean>(true);
    const { url, email } = state;
    /**
     * in this useEffect we get website url from init call
     * email from redux state
     * brand name from getConfigUrl call
     */
    useEffect(() => {
        GET(initCampaignUrl, { shop_id: sessionStorage.getItem(`${user_id}_target_id`) })
            .then((res) => {
                if (res.success === true) {
                    setState({
                        ...state,
                        url: res.data.website_url,
                        email: _props.redux.current.source.email
                    })
                    POST(getConfigUrl, {
                        "target_marketplace": sessionStorage.getItem(`${user_id}_auth_token`),
                        "source": {
                            "shopId": sessionStorage.getItem(`${user_id}_source_id`),
                            "marketplace": sessionStorage.getItem(`${user_id}_source_name`)
                        },
                        "key": [
                            "brand"
                        ],
                        "group_code": [
                            "bwp-product"
                        ]
                    }).then((res) => {
                        setSkeleton(false)
                        setBrand(res.data[0].value.brand);
                        setNewStore(
                            res.data[0].value.brand
                        );
                    })
                }
            })
    }, [])
    /**
     * for open modal
     */
    const editHandler = () => {
        setModal(true)
    }
    /**
     * in this we make a post request for update our store name
     */
    const saveChangesHandler = () => {
        setLoader(true)
        POST(updateConfigUrl, {
            "source": {
                "shopId": sessionStorage.getItem(`${user_id}_source_id`),
                "marketplace": sessionStorage.getItem(`${user_id}_source_name`)
            },
            "data": [
                {
                    "group_code": "bwp-product",
                    "data": {
                        "brand": newStore
                    }
                }
            ]
        }).then((res) => {
            setLoader(false)
            if (res.success === true) {
                _props.success(res.message);
                setBrand(newStore);
                setLoader(false);
                setModal(false);
            } else if (res.success === false) {
                _props.error(res.message)
            }
        })
    }
    return (
        <>
            <Card title={"General Details"}>
                <FlexLayout spacing='mediumLoose' direction='vertical'>
                    <FlexChild>
                        <FlexLayout direction='vertical'>
                            <TextStyles>Store URL</TextStyles>
                            {skeleton === false ?
                                <TextStyles textcolor='light'>{url}</TextStyles>
                                : <Skeleton
                                    height="20px"
                                    line={1}
                                    type="custom"
                                    width="245px"
                                />}
                        </FlexLayout>
                    </FlexChild>
                    <FlexChild>
                        <FlexLayout direction='vertical'>
                            <TextStyles>Email</TextStyles>
                            {skeleton === false ?
                                <TextStyles textcolor='light'>{email}</TextStyles>
                                : <Skeleton
                                    height="20px"
                                    line={1}
                                    type="custom"
                                    width="225px"
                                />}
                        </FlexLayout>
                    </FlexChild>
                    <FlexChild>
                        <FlexLayout halign='fill'>
                            <FlexLayout direction='vertical'>
                                <TextStyles>Store / Brand Name</TextStyles>
                                {skeleton === false ?
                                    <TextStyles textcolor='light'>{brand}</TextStyles>
                                    : <Skeleton
                                        height="20px"
                                        line={1}
                                        type="custom"
                                        width="125px"
                                    />}
                            </FlexLayout>
                            <FlexChild>
                                <Button onClick={editHandler} icon={<Edit size={"17"} />} type='Outlined'>Edit</Button>
                            </FlexChild>
                        </FlexLayout>
                    </FlexChild>
                </FlexLayout>
            </Card>
            <Modal
                close={() => {
                    setModal(!modal)
                }}
                heading="Edit Store / Brand Name"
                modalSize="small"
                primaryAction={{
                    content: 'Save Changes',
                    loading: loader,
                    onClick: saveChangesHandler,
                    disable: newStore === "" ? true : false
                }}
                secondaryAction={{
                    content: 'Cancel',
                    loading: false,
                    onClick: () => {
                        setModal(!modal)
                    }
                }} open={modal}>
                <TextField
                    autocomplete="off"
                    name="Add new Store / Brand Name"
                    onChange={(e) => {
                        setNewStore(e);
                        if (e === "") {
                            setError(true)
                        } else {
                            setError(false);
                        }
                    }}
                    placeHolder="Enter New Name"
                    type="text"
                    value={newStore}
                    error={error}
                    onblur={() => {
                        if (newStore === "") {
                            setError(true)
                        }
                    }}
                />
            </Modal>
        </>
    )
}

export default DI(General)