/**
 * This used to load a wallet and also generate a new one
 */
import { useWeb3 } from "@dexlens/core"

function useWallet(){
    const web3 = useWeb3()
    return {
        generateWallet: () => web3.ethers.Wallet.createRandom(),
        loadWallet: (privateKey: string) => new web3.ethers.Wallet(privateKey)
    }
}

export { useWallet }