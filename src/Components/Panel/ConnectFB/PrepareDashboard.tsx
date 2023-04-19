import { FlexLayout, Progressbar, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import BigGreenCheck from "../../../Asests/Images/svg/BigGreenCheck"
import "./PrepareDashboard.css"
function PrepareDashboard() {
    const [percentage, setPercentage] = useState(0);
    useEffect(() => {
        let cal = setInterval(() => {
            setPercentage((val) => val + 25)
        }, 500)
        if (percentage === 100) {
            clearInterval(cal)
        }
    }, [])
    return (
        <div className='prepareDashboard'>
            <FlexLayout valign='center' direction='vertical'>
                <BigGreenCheck />
                <TextStyles fontweight='bold' type='Heading'>You are all set!</TextStyles>
            </FlexLayout>
            <div className='prepareDashboard__bar'>
                <div className='prepareDashboard__bar__title'>
                    <TextStyles alignment='center'>Prepping your Dashboard</TextStyles>
                </div>
                <Progressbar
                    percentage={percentage}
                    progessThickness="none"
                />
            </div>

        </div>
    )
}

export default PrepareDashboard