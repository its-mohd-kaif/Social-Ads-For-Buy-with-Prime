import { Card, CheckBox, FlexLayout, Skeleton, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { urlFetchCalls } from '../../../../../src/Constant'
import { DI, DIProps } from "../../../../../src/Core"
function Privacy(_props: DIProps) {
    const { di: { POST } } = _props
    const { post: { getConfigUrl, updateConfigUrl } } = urlFetchCalls;
    /**
     * state for store checkbox data
     */
    const [check, setCheck] = useState<boolean>(false);
    /**
     * state for manage disable/enable button
     */
    const [disable, setDisable] = useState<boolean>(false);
    /**
     * state for button loader
     */
    const [loader, setLoader] = useState<boolean>(false);
    const [skeleton, setSkeleton] = useState<boolean>(true);
    /**
     * get the value of checbox from getConfigUrl call 
     * and save into state
     */
    useEffect(() => {
        POST(getConfigUrl, {
            "group_code": [
                "meta_TnC"
            ]
        }).then((res) => {
            setSkeleton(false)
            setCheck(res.data[0].value.meta_LDU)
        })
        setDisable(true)
    }, [])
    /**
     * update checkbox value
     */
    const saveChangesHandler = () => {
        setLoader(true)
        POST(updateConfigUrl, {
            "data": [
                {
                    "group_code": "meta_TnC",
                    "data": {
                        "meta_LDU": check
                    }
                }
            ]
        }).then((res) => {
            setLoader(false)
            if (res.success === true) {
                _props.success(res.message)
            } else if (res.success === false) {
                _props.error(res.message)
            }
        })
        setDisable(true)
    }
    return (
        <Card primaryAction={{
            content: 'Save Changes',
            type: 'Primary',
            onClick: saveChangesHandler,
            disable: disable,
            loading: loader
        }} title={"Privacy settings"}>
            <FlexLayout spacing='mediumLoose' direction='vertical'>
                <TextStyles>Under state-specific privacy laws, your customers may have the right to opt out
                    of your sale or sharing of their personal information for cross-context behavioral advertising.
                    You can choose to restrict how your customers' personal information is used by your ad channels.
                </TextStyles>
                <TextStyles>
                    For the Meta CAPI, you can turn on the Limited Data Use flag below for all of your Buy with Prime orders.
                </TextStyles>
                {skeleton === true ?
                    <Skeleton
                        height="20px"
                        line={1}
                        type="custom"
                        width="296px"
                    /> :
                    <CheckBox
                        id="two"
                        labelVal="Turn on Limited Data Use flag for Meta CAPI"
                        name="Turn on Limited Data Use flag for Meta CAPI"
                        onClick={() => {
                            setCheck(!check)
                            setDisable(!disable)
                        }}
                        checked={check}
                    />}

            </FlexLayout>
        </Card>
    )
}

export default DI(Privacy)