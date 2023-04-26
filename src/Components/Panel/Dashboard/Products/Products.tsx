import { Button, PageHeader } from '@cedcommerce/ounce-ui'
import React from 'react'
import { RefreshCw } from 'react-feather'

function Products() {
    return (
        <div>
            <PageHeader title="Products" description="Your Buy with Prime products and their status appear here." 
                action={<Button icon={<RefreshCw />}>Catalog Sync</Button>}
            />
        </div>
    )
}

export default Products