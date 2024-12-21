import { useWeb3, encrypt } from "@dexlens/core";

/********************************************************************************
 * Creates a protocol wallet for the protocol
 * - The wallet is encrypted with the choosen password
 * - The encrypted wallet is saved in the database
 * - The protocol never knows the users password to decrypt the wallet
 * - The protocol only knows the address, and private key is decrypted on the user's device. 
 *********************************************************************************/
export function createProtocolWallet(choosenPassword: string) {
    const web3 = useWeb3();
    const wallet = web3.ethers.Wallet.createRandom();
    return {
        address: wallet.address,
        privateKey: encrypt(wallet.privateKey, choosenPassword),
        publicKey: wallet.publicKey,
        seedPhrase: encrypt(wallet.mnemonic?.phrase ?? "", choosenPassword),
    };
}