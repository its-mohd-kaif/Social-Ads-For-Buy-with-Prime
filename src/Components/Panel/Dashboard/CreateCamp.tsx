
import React from 'react'
import {
  Alert,
  Button,
  Card,
  Datepicker,
  FlexChild,
  FlexLayout,
  FormElement,
  PageHeader,
  TextField,
  TextStyles,
  Radio,
} from '@cedcommerce/ounce-ui';
import { CheckCircle } from 'react-feather';
function CreateCamp() {
  return (
    <div>
       <PageHeader
                action={
                    <Button
                        onClick={function noRefCheck() {}}
                        type="TextButton">
                        Action
                    </Button>
                }
                description="Facebook Dynamic Ads automatically target the audience based on their interest, intent, and actions."
                onClick={function noRefCheck() {}}
                reverseNavigation
                sticky={false}
                title="Setup Campaign "
            />
            <FlexLayout spacing="loose">
                <FlexChild desktopWidth="75" tabWidth="75" mobileWidth="100">
                    <FormElement>
                        <Card cardType="Shadowed">
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
                                            color="#1c2433"
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
                                            required
                                            onChange={function noRefCheck() {}}
                                            placeHolder="Enter campaign name"
                                            showHelp="Campaign name limited to 394 characters."
                                            type="text"
                                            value=""
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
                                                        disabledDate={function noRefCheck() {}}
                                                        format="DD/MM/YYYY HH:mm:ss"
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
                                                        disabledDate={function noRefCheck() {}}
                                                        format="DD/MM/YYYY HH:mm:ss"
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
                                                onChange={function noRefCheck() {}}
                                                showHelp="Minimum daily budget is $5. You are charged only when shopper clicks on the Ad."
                                                type="text"
                                                value=""
                                            />
                                            <TextField
                                                name="Ad Text"
                                                required
                                                innerPreIcon="$"
                                                onChange={function noRefCheck() {}}
                                                placeHolder="Insert the Suitable Ad Text"
                                                showHelp="To know more about high performing and quality content for Ads refer to our Content guide."
                                                type="text"
                                                value=""
                                            />
                                        </FlexLayout>
                                    </FlexLayout>
                                    <hr></hr>
                                </FlexLayout>
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
                                    destroy
                                    onClose={function noRefCheck() {}}
                                    type="info">
                                    You have synchronized 42 in-stock Buy with
                                    Prime-eligible products.
                                </Alert>
                                <hr></hr>
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
                                        destroy
                                        onClose={function noRefCheck() {}}
                                        type="info">
                                        Target location is limited to the US
                                        only.
                                    </Alert>
                                </FlexLayout>
                                <hr></hr>
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
                                                Target Location
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
                                            checked
                                            id="0"
                                            labelVal="Prospective Audience"
                                            name="2"
                                            onClick={function noRefCheck() {}}
                                            value={0}
                                        />
                                        <Radio
                                            id="1"
                                            labelVal="Retargeting Audience"
                                            name="2"
                                            onClick={function noRefCheck() {}}
                                            value={0}
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
                                            Define the group of people who will
                                            see your Ads based on their
                                            demographics, interests, behavior,
                                            and more.
                                        </TextStyles>
                                        <Card cardType='Bordered'>
                                            <FormElement>
                                                
                                            </FormElement>
                                        </Card>
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

export default CreateCamp