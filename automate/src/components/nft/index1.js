import React, { useState } from 'react'
import "./index.css"
import Web3Modal from 'web3modal'
import Web3 from "web3/dist/web3.min.js";
import axios from 'axios';
import {code} from "./code1"
import { useNavigate } from "react-router-dom";
import Address from '../displayAddress';

// @ts-ignore
// import NFT from "../../artifacts/contracts/Parent.sol/NFT.json"
import NFT from "./NFTabi.json"
import byt from "../NFTbytecode.json"
const cors = require('cors');
var $ = require( "jquery" );
//  axios.use(cors()); 
export let contractAddress="";
export default function CreateItem(){
   const [fileUrl, setFileUrl] = useState()
   const [account1,setAccount] = useState("")
   const [address,setAddress] = useState(false)
   const [formInput, updateFormInput] = useState({ name: '', symbol: '', supply: '', price: '', uri: '' })
  var web3 = null;
   var account, Contractaddress = null;
   let url, api, args; 
   let navigate = useNavigate();
async function Wallet(){
  const web3Modal = new Web3Modal()
      var provider = await web3Modal.connect();
		web3 = new Web3(provider); 
		await provider.send('eth_requestAccounts'); 
		var accounts = await web3.eth.getAccounts(); 
		account = accounts[0]; 
        console.log(account)
        setAddress(account);
        // setAddress(account)
        const adr = account.substring(0,9);
        const adr1 = account.substring(account.length - 9);
        const addr2 = `${adr}.....${adr1}`;
        var elem = document.getElementById('wallet');
        elem.innerHTML = addr2;

}

  async function onChange(e) {
    const file = e.target.files[0]
    console.log(file);
}

 async function newContract(){
  const web3Modal = new Web3Modal()
  var provider = await web3Modal.connect();
web3 = new Web3(provider); 
await provider.send('eth_requestAccounts'); 
var accounts = await web3.eth.getAccounts(); 
account = accounts[0]; 
    console.log(account)
  let name = formInput.name
    console.log(name)
    let symbol = formInput.symbol
    console.log(symbol)  
    let supply = formInput.supply
    console.log(supply)
  let price = web3.utils.toWei(formInput.price, 'ether')
    console.log(price)
    let uri = formInput.uri
    console.log(uri)
    let contract = new web3.eth.Contract(NFT);
    web3.eth.net.getId()
.then( netID => {
  if(netID == 5){
    url ="https://api-goerli.etherscan.io/api"
  }
  else if(netID == 11155111){
      url = "https://api-sepolia.etherscan.io/api"
  }
  else if(netID == 97){
    url = "https://api-testnet.bscscan.com/api"
  }
  else if(netID == 56){
    url = "https://api.bscscan.com/api"
  }
  else if(netID == 1){
    url = "https://api.etherscan.io/api"
  }
  else if(netID == 137){
    url = "https://api.polygonscan.com/api"
  }
  else if(netID == 80001)
  url = "https://api-testnet.polygonscan.com/api"
console.log(netID);
if(netID == 97 || netID == 56){
    api = "J9FHY4MFAVAS42EY3ZZXEZ1ZAK6Z3NJAAG"
}
else if(netID == 5 || netID == 1 || netID == 11155111){
    api = "7ZW8Z1FWEGH6VYNV72DUR359XGABPUE6AK"
}
else if(netID == 137 || netID == 80001){
  api = "9JM2SBJZQVW8IT7H4QCC1DUPWRKGFUT99W"
}
});
 
             args = await  web3.eth.abi.encodeParameters([
                'string','string','uint256','uint256','string'],
                [name,symbol,supply,price,uri]);
                args = args.slice(2);
                // console.log(args)
            contract
            .deploy({ data: byt.object,
                arguments: [name, symbol, supply, price, uri],
                // arguments: [name, symbol],
            })
            .send({ from: account, gas: 21000000})
            .on("receipt", async (receipt) => { //event,transactions,contract address will be returned by blockchain
              // if(num == 0){
              Contractaddress = receipt.contractAddress
              contractAddress = Contractaddress;
              console.log("Contract Address:", Contractaddress)

            // uncomment till here
            // }

            const ids = [1, 2, 3, 4, 5]
            const res = await Promise.all(
                ids.map(async id => {
             const response = await axios.post(url,{
            
              //  data: {
                    apikey: api,//A valid API-Key is required        
                    module: 'contract',                             //Do not change
                    action: 'verifysourcecode',                     //Do not change
                    contractaddress: Contractaddress,   //Contract Address starts with 0x...     
                    sourceCode: code,
                    codeformat: 'solidity-single-file',             //solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
                    contractname: 'Parent.sol:NFT',     //ContractName (if codeformat=solidity-standard-json-input, then enter contractname as ex: erc20.sol:erc20)
                    compilerversion: 'v0.8.17+commit.8df45f5f',   // see https://etherscan.io/solcversions for list of support versions
                    optimizationUsed: '1', //0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
                    runs: 200,                                      //set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)        
                    constructorArguements: args,  //if applicable
                    evmversion: '',            //leave blank for compiler default, homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul (applicable when codeformat=solidity-single-file)
                    licenseType: '3'           //Valid codes 1-14 where 1=No License .. 14=Business Source License 1.1, see https://etherscan.io/contract-license-types
                }, {headers: { "Content-Type": "application/x-www-form-urlencoded" }})
                console.log(response)               
        if (response.data.status == "1") {
        // 1 = submission success, use the guid returned (response.data.response.data) to check the status of your submission
        // average time of processing is 30-60 seconds
        console.log(response.data.status + "; " + response.data.message + "; " + response.data.result)
        // response.data.response.data is the GUID receipt for the submission, you can use this guid for checking the verification status
        } else {
        // 0 = error
        console.log(response.data.status + "; " + response.data.message + "; " + response.data.result)
        }
    })
    );

    // navigate('/adr');

 });
      // function routeChange(){ 
        // navigate('/nft');
        {setAddress(true)}
        // {setbtn(false)}
        const element = document.getElementById('container1');
        element.remove();
      // }
     
}
 return (
    <div>
       <div id='container1' className="container1">
       <div className="col-lg-12">
          <div className="section-heading">
            <div className="col-lg-12"></div>
          </div>
        </div>
    <div className="flex justify-center">
      <div id="contact">
        {/* <div className='container'> */}
      <div className='row'>
      {/* <div classNameName="w-1/2 flex flex-col pb-12"> */}
      <h1>Generate Your NFT Contract.</h1>
       <div className="col-lg-6">
                {/* <fieldset> */}
                <label className='label' for="name">Colllection Name</label>
               <input className='form-field'
                  type="text" name="name" id="name" placeholder="Your NFT tittle" autoComplete="on" required
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                      />
                {/* </fieldset> */}
              </div>
              <div className="col-lg-6">
                {/* <fieldset> */}
                  <label className='label' for="description">Symbol</label>
                  <input  className='form-field' type="text" name="description" id="description" placeholder="Your NFT Symbol" autoComplete="on" required
                   onChange={e => updateFormInput({ ...formInput, symbol: e.target.value })}
                  />
                {/* </fieldset> */}
                </div>
                <div className="col-lg-6">
                {/* <fieldset> */}
                  <label className='label' for="price">MaxSupply</label>
                  <input className='form-field' type="number" name="price" id="price" placeholder="Total Supply Of Your Collection" autoComplete="on" required
                  onChange={e => updateFormInput({ ...formInput, supply: e.target.value })}
                  />
                {/* </fieldset> */}
              </div>
              <div className="col-lg-6">
                {/* <fieldset> */}
                  <label className='label' for="price">Minting Rate</label>
                  <input  className='form-field' type="number" name="price" id="price" placeholder="NFT Price in" autoComplete="on" required
                  onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                  />
                {/* </fieldset> */}
              </div>
              <div className="col-lg-6">
                {/* <fieldset> */}
                  <label className='label' for="hash">IPFS Hash</label>
                  <input  className='form-field' type="text" name="hash" id="hash" placeholder="Your Metadata Hash" autoComplete="on" required
                  onChange={e => updateFormInput({ ...formInput, uri: e.target.value })}
                  />
                {/* </fieldset> */}
              </div>
              
              {/* <div className="col-lg-12">
                <fieldset>
                  <label className='label' for="file">Your Metadata File</label>
                  <input  className='form-field' type="file" id="file" name="myfiles[]" multiple
                   onChange={onChange} />
        {
          fileUrl && (
            <img classNameName="rounded mt-4" width="350" src={fileUrl} />
          )
        }
         </fieldset>
              </div>  */}
            
         <div className="col-lg-2"></div>
         <div className="col-lg-8">
         <button onClick={Wallet} id='wallet' className='next'>
          Connect Wallet
        </button>
        <button onClick={newContract}  className='next'>
          Create NFT Contract
        </button>
        </div>
        {/* <div className="col-lg-2"></div> */}
      {/* </div> */}
      </div>
      {/* </div> */}
      </div>
      </div>
    </div>
    
          <div>
            {address && <Address />}
          </div>
  </div>

   )
}