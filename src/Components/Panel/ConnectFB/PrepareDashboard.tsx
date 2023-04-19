import { FlexLayout, Progressbar, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DI, DIProps } from "../../../../src/Core"
import BigGreenCheck from "../../../Asests/Images/svg/BigGreenCheck"
import "./PrepareDashboard.css"
function PrepareDashboard(_props: DIProps) {
    const [percentage, setPercentage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let cal = setInterval(() => {
            setPercentage((val) => val + 1.5625)
        }, 31.25)
        if (percentage === 100) {
            clearInterval(cal)
        }
    }, [])
    /**
     * when 100 percentage in 2 sec completed we navigate to dashboard component 
     */
    useEffect(() => {
        if (percentage === 100) {
            navigate(`/panel/${_props.redux.user_id}/dashboard`)
        }
    }, [percentage])

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
                    progessThickness="thin"
                />
            </div>

        </div>
    )
}

export default DI(PrepareDashboard) 