/* eslint-disable no-undef */
import WertWidget from '@wert-io/widget-initializer';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer/';


window.Buffer = Buffer; // needed to use `signSmartContractData` in browser

/* We advise you not to use the private key on the frontend
    It is used only as an example
*/
if (window.ethereum) {
  (async () => {
    // Get user address
    const userAccounts = await window.ethereum.request({method: 'eth_requestAccounts'}); 
    const web3 = new Web3(window.ethereum)
    const userAddress = userAccounts[0];
    // Encode the call to mintNFT(address = userAddress, numberOfTokens = 1)
    const sc_input_data = web3.eth.abi.encodeFunctionCall({
      //MeetUsVR building abi
      "inputs":[
        {
          "internalType":"address",
          "name":"to",
          "type":"address"
        },
        {
          "internalType":"uint256",
          "name":"tokenId",
          "type":"uint256"
        }
      ],
      "name":"mint",
      "outputs":[],
      "stateMutability":"payable",
      "type":"function"
      
      //My Token ABI
      // "inputs":[
      //   {
      //     "internalType":"address",
      //     "name":"to",
      //     "type":"address"
      //   },
      //   {
      //     "internalType":"uint256",
      //     "name":"tokenId",
      //     "type":"uint256"
      //   }
      // ],

    }, [userAddress, 3]);
    // not my privateKey
    const privateKey = '0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3';
    // Create signed SC data for wert-widget
    // Please do this on backend
    const signedData = signSmartContractData({
      address: userAddress, // user's address
      commodity: 'ETH',
      commodity_amount: '0.0012', // the crypto amount that should be send to the contract method
      pk_id: 'key1', // always 'key1'
      //MeetUsVrBuilding's Address
      sc_address: '0xd34A9108B9C49dd10B4bD12Ae6Ef77E872F1e21d',
      //MyToken Address
      // sc_address: '0xb803A1892fa8b5a3A63D7eb2F20e7CEddF8B1838', // your SC address
      sc_id: uuidv4(), // must be unique for any request
      sc_input_data,
    }, privateKey);
    const otherWidgetOptions = {
      partner_id: '01GCRJZ1P7GP32304PZCS6RSPD', // your partner id
      container_id: 'widget',
      click_id: uuidv4(), // unique id of purhase in your system
      origin: 'https://sandbox.wert.io', // this option needed only in sandbox only for testing
      width: 1400,
      height: 600,
    };
    const nftOptions = {
      extra: {
        item_info: {
          author: "Dechains",
          // image_url:
          //   "http://localhost:8765/sample_nft.png",
          name: "MeetUsVR Building",
          seller: "Dechains",
        }
      },
    };

    const wertWidget = new WertWidget({
      ...signedData,
      ...otherWidgetOptions,
      ...nftOptions,
    });

    wertWidget.mount();
  })()
}