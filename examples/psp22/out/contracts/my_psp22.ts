/* This file is auto-generated */

import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import ABI from '../../artifacts/my_psp22.json';
import QueryMethods from '../query/my_psp22';
import BuildExtrinsicMethods from '../build-extrinsic/my_psp22';
import TxSignAndSendMethods from '../tx-sign-and-send/my_psp22';
import MixedMethods from '../mixed-methods/my_psp22';


export default class Contract {
	readonly query : QueryMethods;
	readonly buildExtrinsic : BuildExtrinsicMethods;
	readonly tx : TxSignAndSendMethods;
	readonly methods : MixedMethods;
	readonly address : string;
	readonly signer : KeyringPair;

	private nativeContract : ContractPromise;
	private nativeAPI : ApiPromise;
	private contractAbi: Abi;

	/**
	* @constructor

	* @param address - The address of the contract.
	* @param signer - The signer to use for signing transactions.
	* @param nativeAPI - The API instance to use for queries.
	*/
	constructor(
		address : string,
		signer : KeyringPair,
		nativeAPI : ApiPromise,
	) {
		this.address = address;
		this.nativeContract = new ContractPromise(nativeAPI, ABI, address);
		this.nativeAPI = nativeAPI;
		this.signer = signer;
		this.contractAbi = new Abi(ABI);

		this.query = new QueryMethods(this.nativeContract, signer.address);
		this.buildExtrinsic = new BuildExtrinsicMethods(this.nativeContract);
		this.tx = new TxSignAndSendMethods(nativeAPI, this.nativeContract, signer);
		this.methods = new MixedMethods(nativeAPI, this.nativeContract, signer);
	}

	/**
	* name
	*
	* @returns The name of the contract.
	*/
	get name() : string {
		return this.nativeContract.abi.info.contract.name.toString();
	}

	/**
	* abi
	*
	* @returns The abi of the contract.
	*/
	get abi() : Abi {
		return this.contractAbi;
	}

	/**
	* withSigner
	*
	* @param signer - The signer to use for signing transactions.
	* @returns New instance of the contract class with new signer.
	* @example
	* ```typescript
	* const contract = new Contract(address, signerAlice, api);
	* await contract.mint(signerBob.address, 100);
	* await contract.withSigner(signerBob).transfer(signerAlice.address, 100);
	* ```
	*/
	withSigner(signer : KeyringPair) : Contract {
		return new Contract(this.address, signer, this.nativeAPI);
	}

	/**
	* withAddress
	*
	* @param address - The address of the contract.
	* @returns New instance of the contract class to interact with new contract.
	*/
	withAddress(address : string) : Contract {
		return new Contract(address, this.signer, this.nativeAPI);
	}

	/**
	* withAPI
	*
	* @param api - The API instance to use for queries.
	* @returns New instance of the contract class to interact with new API.
	*/
	withAPI(api : ApiPromise) : Contract {
		return new Contract(this.address, this.signer, api);
	}
}