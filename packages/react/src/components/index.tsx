import { useEffect } from 'react'
import { ResponsiveModal } from '@squaress/ui/responsive-modal'
import { MainScreen } from '../components/main-screen.js'
import { useWalletKit } from '../context/wallet-kit-value-provider.js'
import { useWalletKitContext } from '../utils/provider.js'

interface Props {
    open: boolean
    onClose: () => void
    onOpen: () => void
}
export const ModalWallet = ({ open, onClose, onOpen }: Props) => {
    const { connected } = useWalletKit()
    const { withSignIn } = useWalletKitContext()
    useEffect(() => {
        if (connected && open && !withSignIn) {
            onClose()
        }
    }, [connected, open])
    return (
        <ResponsiveModal onClose={onClose} open={open} dialogSize="md" onOpenChange={onOpen}>
            <MainScreen />
        </ResponsiveModal>
    )
}
