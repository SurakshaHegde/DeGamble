const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "antique more coach upper hood minor rich proud famous sea bulb vapor",
  // remember to change this to your own phrase!
  "https://rinkeby.infura.io/v3/e77c9f95653a46a9b0d921753ec1a255"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas:"1000000", gasPrice: "5000000000", from: accounts[0] });

  console.log(interface)
  console.log("Contract deployed to", result.options.address);
};
deploy();
