import React from 'react'
import { Button, EmptyState } from 'lib/ui'

const ConnectionFailed = () => {
    return (
        <EmptyState
            title={'Connection Failed'}
            description={
                'Connecting to wallet failed. Try again or go back to try with a new wallet.'
            }
            icon={'DangerSkullDuoSolid'}
        >
            <Button
                //can add onclick and isLoading
                className="w-full md:w-fit"
                variant="primary"
            >
                Retry
            </Button>
            <Button
                //can add onclick and isLoading
                className="w-full md:w-fit no-underline"
                variant="link"
            >
                Go Back
            </Button>
        </EmptyState>
    )
}

export default ConnectionFailed
