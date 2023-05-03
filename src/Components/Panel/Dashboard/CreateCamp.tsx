
import React, { useEffect, useState } from 'react'
import {
    Alert,
    Card,
    Datepicker,
    FlexChild,
    FlexLayout,
    FormElement,
    PageHeader,
    TextField,
    TextStyles,
    Radio,
    Select,
    CheckBox,
} from '@cedcommerce/ounce-ui';
import { DI, DIProps } from "../../../../src/Core"
import moment from 'moment'
import { CheckCircle, Search } from 'react-feather';
import { urlFetchCalls } from '../../../../src/Constant';
/**
 * State Types Define
 */
interface stateObj {
    name: string;
    startDate: string;
    endDate: string;
    dailyBudget: string;
    adText: string;
    minAge: string;
    maxAge: string;
    gender: string;
    insta: boolean;
    facebook: boolean;
}
interface errorObj {
    nameErr: boolean;
    dailyErr: boolean;
    adTextErr: boolean;
}
interface ageArrObj {
    disabled: boolean;
    label: string;
    value: string;
}
interface initResObj {
    instaConnected: boolean;
    productsCount: number;
}
function CreateCamp(_props: DIProps) {
    /**
     * state for showing prospective audience content or retargeting audience
     */
    const [target, setTarget] = useState<string>('');
    /**
     * State Object For Storing Input Form
     */
    const [state, setState] = useState<stateObj>({
        name: "",
        startDate: "",
        endDate: "",
        dailyBudget: "",
        adText: "Get fast, free delivery when you check out using Buy with Prime. Just look for the Buy with Prime badge and start shopping.",
        minAge: "",
        maxAge: "",
        gender: "",
        insta: false,
        facebook: true,
    })
    /**
     * State For Store Errors
     */
    const [error, setError] = useState<errorObj>({
        nameErr: false,
        dailyErr: false,
        adTextErr: false,
    })
    /**
     * State For Holding Inti Api Response
     */
    const [initRes, setInitRes] = useState<initResObj>({
        instaConnected: false,
        productsCount: 0
    })
    const [checkCircle, setCheckCircle] = useState<string>("#1c2433")
    const regexOnlyStr = /^[A-Z]+$/i;
    const { di: { GET } } = _props
    const { get: { initCampaignUrl } } = urlFetchCalls
    const { name, startDate, endDate, dailyBudget, adText, minAge, maxAge, gender, insta, facebook } = state
    const { nameErr, dailyErr, adTextErr } = error
    const { instaConnected, productsCount } = initRes
    const [minAgeArr, setMinAgeArr] = useState<ageArrObj[]>([])
    const [maxAgeArr, setMaxAgeArr] = useState<ageArrObj[]>([])
    useEffect(() => {
        /**
         * Make a age array
         */
        let start = 18;
        let end = 65;
        let tempArr: ageArrObj[] = []
        let tempArr2: ageArrObj[] = []
        while (start !== end) {
            let obj1 = {
                disabled: false,
                label: `${start}`,
                value: `${start}`,
            }
            let obj2 = {
                disabled: false,
                label: `${start}`,
                value: `${start}`,
            }
            tempArr.push(obj1)
            tempArr2.push(obj2)
            start++
        }
        tempArr.push({
            disabled: false,
            label: "65+",
            value: "65+",
        })
        tempArr2.push({
            disabled: false,
            label: "65+",
            value: "65+",
        })
        setMinAgeArr([...tempArr])
        setMaxAgeArr([...tempArr2])
        /**
         * Call getInitCampaign api method
         */
        getInitCampaign()
    }, [])

    const getInitCampaign = () => {
        GET(`${initCampaignUrl}`)
            .then((res) => {
                if (res.success === true) {
                    setInitRes({
                        instaConnected: res.data.is_instagram_connected,
                        productsCount: res.data.products_count
                    })
                }
            })
    }

    const disabledStart = (current: any) => {
        if (endDate !== '') {
            return current > moment(endDate).add(-1, 'day');
        } else {
            return current < moment().add(-1, 'day');
        }
    };
    const disabledEnd = (current: any) => {
        if (startDate !== '') {
            return current < moment(startDate).add(+1, 'day');
        }
    };
    useEffect(() => {
        checkCircleEnable()
    }, [name, startDate, endDate, dailyBudget, adText])
    const checkCircleEnable = () => {
        if (name === "" || name.length > 394 || regexOnlyStr.test(name) === false || startDate === "" || endDate === ""
            || dailyBudget === '' || Number(dailyBudget) < 5 || isNaN(Number(dailyBudget)) === true || adText === "") {
            setCheckCircle('#1c2433')
        } else {
            setCheckCircle('#027A48')
        }
    }
    return (
        <div>
            <PageHeader
                description="Facebook Dynamic Ads automatically target the audience based on their interest, intent, and actions."
                onClick={function noRefCheck() { }}
                reverseNavigation
                sticky={false}
                title="Setup Campaign "
            />
            <FlexLayout spacing="loose">
                <FlexChild desktopWidth="75" tabWidth="75" mobileWidth="100">
                    <FormElement>
                        <Card
                            cardType="Shadowed"
                            primaryAction={{
                                content: 'Create Campaign',
                                type: 'Primary',
                            }}
                            secondaryAction={{
                                content: 'Cancel',
                                type: 'Outlined',
                            }}>
                            <FlexLayout
                                spacing="extraLoose"
                                direction="vertical"
                                halign="start">
                                <FlexLayout
                                    direction="vertical"
                                    spacing="extraLoose">
                                    <FlexLayout spacing="tight" halign="start">
                                        <CheckCircle
                                            size="24"
                                            color={checkCircle}
                                        />
                                        <TextStyles
                                            type="SubHeading"
                                            subheadingTypes="XS-1.6"
                                            fontweight="bold">
                                            Campaign Details
                                        </TextStyles>
                                    </FlexLayout>
                                    <FlexLayout
                                        direction="vertical"
                                        spacing="tight">
                                        <TextField
                                            name="Campaign Name"
                                            error={nameErr}
                                            required
                                            onChange={(e: string) => {
                                                setState({
                                                    ...state,
                                                    name: e
                                                })
                                                setError({
                                                    ...error,
                                                    nameErr: false
                                                })
                                            }}
                                            placeHolder="Enter campaign name"
                                            showHelp="Campaign name limited to 394 characters."
                                            type="text"
                                            value={name}
                                            onblur={() => {
                                                if (name === "" || name.length > 394 || regexOnlyStr.test(name) === false) {
                                                    setError({
                                                        ...error,
                                                        nameErr: true,
                                                    })
                                                }
                                            }}
                                        />
                                        <FlexLayout
                                            spacing="loose"
                                            direction="vertical"
                                            halign="start">
                                            <FlexLayout
                                                direction="none"
                                                spacing="mediumLoose"
                                                halign="start">
                                                <FlexChild
                                                    desktopWidth="50"
                                                    tabWidth="50"
                                                    mobileWidth="100">
                                                    <Datepicker
                                                        onChange={(e: any) => {
                                                            setState({
                                                                ...state,
                                                                startDate: moment(e).format('MM/DD/YYYY')
                                                            })
                                                        }}
                                                        disabledDate={disabledStart}
                                                        format="MM/DD/YYYY"
                                                        placeholder="MM/DD/YYYY"
                                                        name="Start Date"
                                                        showToday
                                                        showHelp="Campaign starts at 12 am(EST time zone)"
                                                    />
                                                </FlexChild>
                                                <FlexChild
                                                    desktopWidth="50"
                                                    tabWidth="50"
                                                    mobileWidth="100">
                                                    <Datepicker
                                                        onChange={(e: any) => {
                                                            setState({
                                                                ...state,
                                                                endDate: moment(e).format('MM/DD/YYYY')
                                                            })
                                                        }}
                                                        disabledDate={disabledEnd}
                                                        format="MM/DD/YYYY"
                                                        placeholder="MM/DD/YYYY"
                                                        name="End Date"
                                                        showHelp="Campaign remains active until paused or til the end date."
                                                    />
                                                </FlexChild>
                                            </FlexLayout>
                                            <TextField
                                                name="Daily Budget"
                                                required
                                                innerPreIcon="$"
                                                error={dailyErr}
                                                onChange={(e) => {
                                                    setState({
                                                        ...state,
                                                        dailyBudget: e
                                                    })
                                                    setError({
                                                        ...error,
                                                        dailyErr: false
                                                    })
                                                }}
                                                showHelp="Minimum daily budget is $5. You are charged only when shopper clicks on the Ad."
                                                type="text"
                                                value={dailyBudget}
                                                onblur={() => {
                                                    if (dailyBudget === "" || Number(dailyBudget) < 5 || isNaN(Number(dailyBudget)) === true) {
                                                        setError({
                                                            ...error,
                                                            dailyErr: true
                                                        })
                                                    }
                                                }}
                                            />
                                            <TextField
                                                name="Ad Text"
                                                required
                                                innerPreIcon="$"
                                                error={adTextErr}
                                                onChange={(e) => {
                                                    setState({
                                                        ...state,
                                                        adText: e
                                                    })
                                                    setError({
                                                        ...error,
                                                        adTextErr: false
                                                    })
                                                }}
                                                placeHolder="Insert the Suitable Ad Text"
                                                showHelp="To know more about high performing and quality content for Ads refer to our Content guide."
                                                type="text"
                                                value={adText}
                                                onblur={() => {
                                                    if (adText === "") {
                                                        setError({
                                                            ...error,
                                                            adTextErr: true
                                                        })
                                                    }
                                                }}
                                            />
                                        </FlexLayout>
                                    </FlexLayout>
                                    <hr></hr>
                                </FlexLayout>
                                {/* -------------------- */}
                                <FlexLayout spacing="extraTight" halign="start">
                                    <FlexLayout spacing="tight" halign="start">
                                        <CheckCircle
                                            size="24"
                                            color="#027A48"
                                        />
                                        <TextStyles
                                            type="SubHeading"
                                            subheadingTypes="XS-1.6"
                                            fontweight="bold">
                                            Buy with Prime-eligible products
                                        </TextStyles>
                                    </FlexLayout>
                                    <TextStyles
                                        textcolor="light"
                                        paragraphTypes="MD-1.4"
                                        type="Paragraph">
                                        Make sure your product catalog is synced
                                        with the app so that Facebook can select
                                        the most suitable products to advertise.
                                        Learn more about the Catalog Sync
                                        process.
                                    </TextStyles>
                                </FlexLayout>
                                <Alert
                                    destroy={false}
                                    onClose={function noRefCheck() { }}
                                    type="info">
                                    {`You have synchronized ${productsCount} in-stock Buy with
                                    Prime-eligible products.`}
                                </Alert>
                                {/* ----------- */}
                                <hr></hr>
                                {/* ----------------- */}
                                <FlexLayout
                                    spacing="extraTight"
                                    halign="start"
                                    direction="vertical">
                                    <FlexLayout spacing="tight" halign="start">
                                        <CheckCircle
                                            size="24"
                                            color="#027A48"
                                        />
                                        <TextStyles
                                            type="SubHeading"
                                            subheadingTypes="XS-1.6"
                                            fontweight="bold">
                                            Target Location
                                        </TextStyles>
                                    </FlexLayout>
                                    <Alert
                                        desciption="United States"
                                        destroy={false}
                                        onClose={function noRefCheck() { }}
                                        type="info">
                                        Target location is limited to the US
                                        only.
                                    </Alert>
                                </FlexLayout>
                                <hr></hr>
                                {/* -------- */}
                                <FlexLayout
                                    spacing="loose"
                                    halign="start"
                                    direction="vertical">
                                    <FlexLayout spacing="tight" halign="start">
                                        <CheckCircle
                                            size="24"
                                            color="#70747E"
                                        />
                                        <FlexLayout
                                            spacing="extraTight"
                                            direction="vertical"
                                            halign="start">
                                            <TextStyles
                                                type="SubHeading"
                                                subheadingTypes="XS-1.6"
                                                fontweight="bold">
                                                Target Audience
                                            </TextStyles>
                                            <TextStyles
                                                type="Paragraph"
                                                paragraphTypes="MD-1.4"
                                                fontweight="bold">
                                                Define your target audience.
                                            </TextStyles>
                                        </FlexLayout>
                                    </FlexLayout>
                                    <FlexLayout
                                        spacing="extraLoose"
                                        direction="none"
                                        halign="start">
                                        <Radio
                                            labelVal="Prospective Audience"
                                            name="2"
                                            onClick={() => {
                                                setTarget('Prospective');
                                            }}
                                        />
                                        <Radio
                                            labelVal="Retargeting Audience"
                                            name="2"
                                            onClick={() =>
                                                setTarget('Retarget')
                                            }
                                        />
                                    </FlexLayout>
                                    <FlexLayout
                                        spacing="tight"
                                        direction="vertical"
                                        halign="start">
                                        <TextStyles
                                            textcolor="light"
                                            type="Paragraph"
                                            paragraphTypes="MD-1.4">
                                            {target === 'Prospective'
                                                ? 'Define the group of people who will see your Ads based on their demographics, interests, behavior, and more.'
                                                : target === 'Retarget'
                                                    ? 'Target customers who either viewed your product or added it to their cart, but did not purchase.'
                                                    : null}
                                        </TextStyles>
                                        {target === 'Prospective' ? (
                                            <Card cardType="Bordered">
                                                <FormElement>
                                                    <FlexLayout
                                                        spacing="extraLoose"
                                                        halign="start">
                                                        <FlexChild
                                                            desktopWidth="33"
                                                            tabWidth="33"
                                                            mobileWidth="33">
                                                            <Select
                                                                placeholder="Ex- 18"
                                                                name="Min Age"
                                                                onChange={(e: string) => {
                                                                    console.log(e)
                                                                    setState({
                                                                        ...state,
                                                                        minAge: e
                                                                    })
                                                                    maxAgeArr.forEach(element => {
                                                                        if (Number(element.label.split('+')[0]) < Number(e.split('+')[0])) {
                                                                            element.disabled = true
                                                                        } else {
                                                                            element.disabled = false
                                                                        }
                                                                    });
                                                                    setMaxAgeArr([...maxAgeArr])
                                                                }}
                                                                options={minAgeArr}
                                                                required
                                                                value={minAge}
                                                            />
                                                        </FlexChild>
                                                        <FlexChild
                                                            desktopWidth="33"
                                                            tabWidth="33"
                                                            mobileWidth="33">
                                                            <Select
                                                                name="Max Age"
                                                                placeholder="Ex- 65+"
                                                                onChange={(e: string) => {
                                                                    console.log(e)
                                                                    setState({
                                                                        ...state,
                                                                        maxAge: e
                                                                    })
                                                                    minAgeArr.forEach(element => {
                                                                        if (Number(element.label.split('+')[0]) < Number(e.split('+')[0])) {
                                                                            element.disabled = true
                                                                        } else {
                                                                            element.disabled = false
                                                                        }
                                                                    })
                                                                    setMinAgeArr([...minAgeArr])
                                                                }}
                                                                options={maxAgeArr}
                                                                required
                                                                value={maxAge}
                                                            />
                                                        </FlexChild>
                                                        <FlexChild
                                                            desktopWidth="33"
                                                            tabWidth="33"
                                                            mobileWidth="33">
                                                            <Select
                                                                placeholder="Ex- Male"
                                                                name="Gender"
                                                                onChange={(e) => {
                                                                    setState({
                                                                        ...state,
                                                                        gender: e
                                                                    })
                                                                }}
                                                                options={[
                                                                    {
                                                                        label: 'Male',
                                                                        value: 'Male',
                                                                    },
                                                                    {
                                                                        label: 'Female',
                                                                        value: 'Female',
                                                                    },
                                                                    {
                                                                        label: 'All',
                                                                        value: 'All',
                                                                    },
                                                                ]}
                                                                required
                                                                value={gender}
                                                            />
                                                        </FlexChild>
                                                    </FlexLayout>
                                                    <Card cardType="Subdued">
                                                        <FlexLayout
                                                            spacing="extraTight"
                                                            direction="vertical">
                                                            <TextStyles
                                                                type="Paragraph"
                                                                paragraphTypes="MD-1.4">
                                                                Search and
                                                                Select Groups
                                                            </TextStyles>
                                                            <TextField
                                                                innerPreIcon={
                                                                    <Search
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                }
                                                                onChange={function noRefCheck() { }}
                                                                placeHolder=" Search for demographics, interests, behaviors, etc."
                                                                type="text"
                                                                value=""
                                                            />
                                                        </FlexLayout>
                                                    </Card>
                                                </FormElement>
                                            </Card>
                                        ) : target === 'Retarget' ? (
                                            <Card cardType="Bordered">
                                                <FormElement>
                                                    <FlexLayout
                                                        spacing="loose"
                                                        direction="vertical">
                                                        <TextStyles
                                                            type="Paragraph"
                                                            paragraphTypes="MD-1.4">
                                                            Retargeting Groups
                                                        </TextStyles>
                                                        <Select
                                                            labelInLine
                                                            name="Target customers who viewed your product, but did not purchase."
                                                            onChange={function noRefCheck() { }}
                                                            options={[
                                                                {
                                                                    label: 'Option 1',
                                                                    value: '1',
                                                                },
                                                                {
                                                                    label: 'Option 2',
                                                                    value: '2',
                                                                },
                                                                {
                                                                    label: 'Option 3',
                                                                    value: '3',
                                                                },
                                                            ]}
                                                            value=""
                                                        />
                                                        <hr></hr>
                                                        <CheckBox
                                                            id="two"
                                                            labelVal="Reach people apart from your detailed targeting selections when it's likely to improve performance."
                                                            name="Name"
                                                            onClick={function noRefCheck() { }}
                                                        />
                                                    </FlexLayout>
                                                </FormElement>
                                            </Card>
                                        ) : null}
                                        {/* Proespective Content */}

                                        {/* Retarget Content*/}
                                    </FlexLayout>
                                </FlexLayout>
                                <hr></hr>
                                {/* ------------- */}
                                <FlexLayout
                                    direction="vertical"
                                    spacing="extraTight">
                                    <FlexLayout
                                        direction="none"
                                        spacing="tight"
                                        halign="start">
                                        <CheckCircle
                                            size={20}
                                            color="#70747E"
                                        />
                                        <TextStyles
                                            type="Paragraph"
                                            paragraphTypes="MD-1.4"
                                            fontweight="bold">
                                            Placements
                                        </TextStyles>
                                        <TextStyles
                                            type="Paragraph"
                                            paragraphTypes="MD-1.4">
                                            You can select Facebook, Instagram,
                                            or both to place your Ads. Please
                                            note that if you select both, the
                                            Ads placement gets distributed
                                            between the two platforms based on
                                            the Ad strength.
                                        </TextStyles>

                                        <FlexLayout spacing='extraTight' direction='vertical'>
                                            <FlexChild>
                                                <>
                                                    {facebook === false && insta === false ?
                                                        <Alert
                                                            destroy={false}
                                                            icon
                                                            onClose={function noRefCheck() { }}
                                                            type="warning"
                                                        >
                                                            Atleast one platform should be selected.
                                                        </Alert>
                                                        :
                                                        null
                                                    }
                                                </>
                                            </FlexChild>
                                            <CheckBox
                                                id="two"
                                                labelVal="Facebook"
                                                name="Facebook"
                                                checked={facebook}
                                                onClick={() => {
                                                    setState({
                                                        ...state,
                                                        facebook: !facebook
                                                    })
                                                }}
                                            />
                                            <CheckBox
                                                id="two"
                                                labelVal="Instagram"
                                                name="Instagram"
                                                checked={insta}
                                                disabled={!instaConnected}
                                                onClick={() => {
                                                    setState({
                                                        ...state,
                                                        insta: !insta
                                                    })
                                                }}
                                            />
                                        </FlexLayout>

                                    </FlexLayout>
                                </FlexLayout>
                            </FlexLayout>
                        </Card>
                    </FormElement>
                </FlexChild>
            </FlexLayout>
        </div>
    )
}

export default DI(CreateCamp)