import * as ethWeb3 from 'npm:web3'
import * as solanaWeb3 from 'npm:@solana/web3.js'
/**
 * A wrapper that allows you to use web3 eth and web3 solana in one typed function
 * It's also used to add functionality on top of the web3 libraries
 */
function useWeb3(){
    return {
        eth: ethWeb3 as typeof ethWeb3,
        solana: solanaWeb3 as typeof solanaWeb3
    }
}

export { useWeb3 }