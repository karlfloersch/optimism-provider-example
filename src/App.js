import React from 'react';
import logo from './logo.svg';
import './App.css';
const ethers = require('ethers')
const optimismProvider = require('@eth-optimism/provider')

function App() {
  console.log(ethers)
  console.log(optimismProvider)
  console.log(test())
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

async function test() {
  console.log(window.ethereum)
  
  const accounts = await window.ethereum.enable()
  console.log('Am i enabled?', accounts)

  const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum)
  const provider = new optimismProvider.OptimismProvider('https://goerli.optimism.io', metamaskProvider)

  console.log(accounts)
  const signer = provider.getSigner()
  const chainId = await signer.getChainId()

  const address = await signer.getAddress()
  const nonce = await provider.getTransactionCount(address)

  const etherbase = '0x9858EfFD232B4033E47d90003D41EC34EcaEda94'
  const tx = {
    to: etherbase,
    nonce,
    gasLimit: 210040000,
    gasPrice: 0,
    data: '0x',
    value: 0,
    chainId,
  }

  const result = await signer.sendTransaction(tx)
  const receipt = await result.wait()
  console.log('result:', result)
  console.log('receipt:', receipt)
}

export default App;
