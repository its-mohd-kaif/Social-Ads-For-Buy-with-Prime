import { AutoComplete, PageHeader } from '@cedcommerce/ounce-ui'
import React from 'react'

function FAQ() {
    return (
        <>
            <PageHeader
                title={"Frequently Asked Questions"}
            />
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
        </>
    )
}

export default FAQ