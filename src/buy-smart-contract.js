import WertWidget from '@wert-io/widget-initializer';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import { v4 as uuidv4 } from 'uuid';

import { Buffer } from 'buffer/';

window.Buffer = Buffer; // needed to use `signSmartContractData` in browser

/* We advise you not to use the private key on the frontend
    It is used here for example only
*/
const privateKey = '0x687079c151720e44c97b40c00ac257699fa4fc2c96ef617d964113c059dafe3d';
const signedData = signSmartContractData({
  address: '0x96D5990185022212d367A0e09263B12Dbb4EE06A',
  commodity: 'ETH',
  commodity_amount: '0.3',
  pk_id: 'key1',
  sc_address: '0x3b2305502bd6f8b1eb2ed474ac15c61c6702b18b',
  sc_id: uuidv4(), // must be unique for any request
  sc_input_data: '0x9dae76ea000000000000000000000000000000000000000000000000000000000000003700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001',
}, privateKey);
const otherWidgetOptions = {
  partner_id: '01GCRJZ1P7GP32304PZCS6RSPD',
  commodity: 'ETH:Ethereum-Goerli',  
  container_id: 'widget',
  click_id: uuidv4(), // unique id of purhase in your system
  origin: 'https://sandbox.wert.io', // this option needed only for this example to work
  width: 400,
  height: 600,
  listeners: {
    loaded: () => console.log('loaded'),
  },
};

const wertWidget = new WertWidget({
  ...signedData,
  ...otherWidgetOptions,
});

wertWidget.mount();
