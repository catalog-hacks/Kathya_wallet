// import React,{useState} from 'react';
// // import type {PropsWithChildren} from 'react';
// import { ethers } from 'ethers';

// import {
//   Button,
//   Text,
//   View,
//   // Button,
//   // Alert,
//   // TextInput
// } from 'react-native';

// function generateKeys(){

//   // const mnemonic = ethers.Wallet.createRandom().mnemonic;


//   // const wallet = ethers.Wallet.fromMnemonic(mnemonic.toString());
//   const sample='sense letter between tuna domain fragile gate soul evolve master estate damp';
//   const wallet = ethers.Wallet.fromMnemonic(sample);
 
//   // const publicKey = wallet.publicKey;
//   // const privateKey = wallet.privateKey;
//   // const address=wallet.address;
//   const privateKey="0x9415b5bb22ce60bfef09f447696787440e6b4503ebca9351d37e51901330b611";
//  const publicKey="0x04d1bb2087dad2c0e3fe3abccc85582b585ff91179700019ff9ab3f331287dfca8502c3b45275b854f042a1d2513565b5a1ee885bc5bec8cd2d42b543db825dce7";
//  const address="0xa35d0F3a4d61A72BdDDb0701DcbE48e2cE9509D0";
//   console.log("privateKey:",privateKey);
//   console.log("publicKey:",publicKey);
//   console.log("address:",address);

//   return { publicKey,privateKey,address};
// };

// function App():JSX.Element{
//   const [isWallet,setIsWallet]=useState(false);
//   const {  publicKey,privateKey,address } = generateKeys();
//   // console.log("private",privateKey)
//   return (
//     <View>
//       {!isWallet &&
//       <Button
//       onPress={()=>setIsWallet(!isWallet)}
//       title="click here"/>
//       }
    
//     { isWallet &&
//       <View>
//       <Text>Private Key: {privateKey}</Text> 
//       <Text>Public Key: {publicKey}</Text>
//       <Text>Address: {address}</Text>

//     </View>
//     }
//     </View>
//   );

// }

// export default App;




import React, {useState, useEffect} from 'react';
import {Alert, Button, Text, View,StyleSheet} from 'react-native';
import {ethers} from 'ethers';
import {JsonRpcProvider} from '@ethersproject/providers';
import '@ethersproject/shims';



function App() {

  function differentPkeys(mnemonic: string) {
    return ethers.utils.HDNode.fromMnemonic(mnemonic);
  }
  const mnemonic='sense letter between tuna domain fragile gate soul evolve master estate damp';
  console.log(differentPkeys(mnemonic));
  const HdnodeAddress = differentPkeys(mnemonic);
  const privatekey="0x9415b5bb22ce60bfef09f447696787440e6b4503ebca9351d37e51901330b611";
   const publicKey="0x04d1bb2087dad2c0e3fe3abccc85582b585ff91179700019ff9ab3f331287dfca8502c3b45275b854f042a1d2513565b5a1ee885bc5bec8cd2d42b543db825dce7";
   const publicAddress="0xa35d0F3a4d61A72BdDDb0701DcbE48e2cE9509D0";//kathyas

  const [balance, setBalance] = useState('');
  const [isWallet,setIsWallet]=useState(false);
  const recieverAddress ='0x8364D1f740F25D245ffA2Ec5f94dd9C106427433';
  // '0x8364D1f740F25D245ffA2Ec5f94dd9C106427433'; // charan annas


//   async function SendRecieve(){
//     console.log('func activated');
//     const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli',
//     5,);
//     const sender = new ethers.Wallet(privatekey, provider);

//     const balanceBefore = await provider.getBalance(recieverAddress); 
//     console.log(`Destination balance before sending: ${ethers.utils.formatEther(balanceBefore)} ETH`);
//     console.log("Sending...\n");

//     const tx = await sender.sendTransaction({to: recieverAddress, value: ethers.utils.parseEther("0.0001")});
//     console.log(`TX hash: ${tx.hash}`);
//     console.log("Waiting for receipt...");
//     await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {});
//     const balanceAfter = await provider.getBalance(recieverAddress);
//     console.log(`Destination balance after sending: ${ethers.utils.formatEther(balanceAfter)} ETH`);
// }
async function SR() {
    try {
        console.log('func activated');
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli',
    5,);
    const sender = new ethers.Wallet(privatekey, provider);

    const balanceBefore = await provider.getBalance(recieverAddress); 
    console.log(`Destination balance before sending: ${ethers.utils.formatEther(balanceBefore)} ETH`);
    console.log("Sending...\n");

    const tx = await sender.sendTransaction({to: recieverAddress, value: ethers.utils.parseEther("0.0001")});
    console.log(`TX hash: ${tx.hash}`);
    console.log("Waiting for receipt...");
    await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {});
    const balanceAfter = await provider.getBalance(recieverAddress);
    console.log(`Destination balance after sending: ${ethers.utils.formatEther(balanceAfter)} ETH`);
      } catch (error) {
        console.log(error);
        console.log('Error in Send');
      }
  }

  async function fetchBalance() {
    try {
      const provider = new JsonRpcProvider(
        'https://rpc.ankr.com/eth_goerli',
        5,
      );
      const balancefromwallet = await provider.getBalance(publicAddress);
      setBalance(ethers.utils.formatEther(balancefromwallet).toString());
      console.log('Balance fetched successfully');
    } catch (error) {
      console.log(error);
      console.log('Error fetching balance');
    }
  }


  useEffect(() => {
    fetchBalance();
    //SR();
  }, [publicKey, privatekey, publicAddress,balance]);

  return (

    <View>
       {!isWallet &&
       <Button
       onPress={()=>setIsWallet(!isWallet)}
       title="click here"/>
       }
    
        { isWallet &&
          <View>
              <Text style={styles.appButtonText}>Private Key: {privatekey}</Text> 
              <Text style={styles.appButtonText}>Public Key: {publicKey}</Text>
              <Text style={styles.appButtonText}>Address: { publicAddress}</Text>
              <Button  title="Fetch Balance" onPress={fetchBalance} />
                <Text style={styles.appButtonText}>Balance: {balance} ETH</Text>
              <Button title="Send" onPress={SR} />
          </View>
        }
        
    </View>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "black",
    // fontWeight: "bold",
    alignSelf: "center",
    // textTransform: "uppercase"
  }
});
export default App;