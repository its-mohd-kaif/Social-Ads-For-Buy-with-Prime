import { Badge, Button, FlexLayout, OverlappingImages, Popover, TextStyles } from "@cedcommerce/ounce-ui"
import React, { useState } from "react"
import { AlertTriangle } from "react-feather"
import actions from "../../../Asests/Images/png/actions.png"
import fb from "../../../Asests/Images/png/fb.png"
import ig from "../../../Asests/Images/png/ig.png"

export const Actions = (_props: any) => {
    const [openActions, setOpenActions] = useState<boolean>(false)
    return (
        <>
            <Popover
                activator={<Button onClick={() => setOpenActions(!openActions)} type='TextButton'><img src={actions} /></Button>}
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

export const CampaignStatus = (_props: any) => {
    if (_props === "SCHEDULED") {
        return <Badge type="Positive-100">Scheduled</Badge>
    } else if (_props === "PENDING") {
        return <Badge type="Neutral-100-Border">Pending</Badge>
    } else if (_props === "ERRORS") {
        return <FlexLayout spacing='extraTight' halign='center' valign='center'>
            <AlertTriangle fontSize={"14"} color='red' />
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