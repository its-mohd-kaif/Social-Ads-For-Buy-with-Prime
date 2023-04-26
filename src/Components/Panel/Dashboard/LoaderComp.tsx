import { Loader } from '@cedcommerce/ounce-ui'
import React from 'react'

function LoaderComp() {
    return (
        <div>
            <Loader
                percentage={20}
                title="Loading..."
                type="Loader1"
            />
        </div>
    )
}

export default LoaderComp