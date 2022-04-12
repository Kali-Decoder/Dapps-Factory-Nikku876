import web3 from './web3';

const abi = [
  {
    constant: false,
    inputs: [{ name: "_id", type: "uint256" }],
    name: "getTask",
    outputs: [
      { name: "", type: "uint256" },
      { name: "", type: "uint256" },
      { name: "", type: "string" },
      { name: "", type: "string" },
      { name: "", type: "bool" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_content", type: "string" },
      { name: "_author", type: "string" },
    ],
    name: "createTodo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "lastTaskId",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "getTaskIds",
    outputs: [{ name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "id", type: "uint256" },
      { indexed: false, name: "date", type: "uint256" },
      { indexed: false, name: "content", type: "string" },
      { indexed: false, name: "author", type: "string" },
      { indexed: false, name: "done", type: "bool" },
    ],
    name: "CreateTask",
    type: "event",
  },
];

const addressContract = "0x925B4406A6cFe187554882504B5d55CAAcA1dB68";


const todo=new web3.eth.Contract(abi,addressContract);
export default todo;
