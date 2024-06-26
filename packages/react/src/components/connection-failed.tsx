import { Button, EmptyState } from '../lib/ui/index.js'
import { useHandleConnect } from '../hooks/handle-connect.js'
import { useWalletKitContext } from '../utils/provider.js'
import { useWalletKit } from '../context/wallet-kit-value-provider.js'

const ConnectionFailed = () => {
    const { lastConnected, setError } = useWalletKitContext()
    const { connecting } = useWalletKit()
    const { handleConnectClick } = useHandleConnect()
    return (
        <EmptyState
            title={'Connection Failed'}
            description={
                'You have rejected the connection request or it has failed due to some reason. Please try again!'
            }
            icon={'danger-skull-duo-solid'}
            className="!md:py-0 px-4"
        >
            <Button
                //can add onclick and isLoading
                className="w-full"
                variant="secondary"
                isLoading={connecting}
                onClick={(e) => lastConnected && handleConnectClick(e, lastConnected)}
                leftIconName="rotate-right"
                loadingText="Connecting"
                size="xl"
            >
                Retry
            </Button>
            <Button
                onClick={() => setError(null)}
                //can add onclick and isLoading
                className="w-full text-color-fg-primary-subdued"
                variant="unStyled"
            >
                Go Back
            </Button>
        </EmptyState>
    )
}

export default ConnectionFailed
