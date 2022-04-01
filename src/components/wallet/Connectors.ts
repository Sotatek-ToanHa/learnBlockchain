import { InjectedConnector } from '@web3-react/injected-connector'
import Web3 from "web3";
import { ethers } from 'ethers';
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})
 
export function getLibrary(provider: any): ethers.providers.Web3Provider {
	const library = new ethers.providers.Web3Provider(provider)
	library.pollingInterval = 12000
	return library
}