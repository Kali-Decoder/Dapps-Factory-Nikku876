import Web3 from 'web3';
import Crud from '../build/contracts/Crud.json';

let web3;
let crudContract;

const initWeb3 = () => {
    return new Promise((resolve, reject) => {
      if(typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable()
          .then(() => {
            resolve(
              new Web3(window.ethereum)
            );
          })
          .catch(e => {
            reject(e);
          });
        return;
      }
      if(typeof window.web3 !== 'undefined') {
        return resolve(
          new Web3(window.web3.currentProvider)
        );
      }
      resolve(new Web3('http://localhost:7545'));
    });
  };
  
  const initContract = () => {
    const deploymentKey = Object.keys(Crud.networks)[0];
    return new web3.eth.Contract(
      Crud.abi, 
      Crud
        .networks[deploymentKey]
        .address
    );
  };


  const initApp =async ()=>{
    const input= document.querySelector("#input");
    const submit= document.querySelector("#submit");
    const taskarea= document.querySelector(".taskarea");
    const update= document.querySelector(".update");
    const destroyUser= document.querySelector(".delete");
    let accounts=[];

    web3.eth.getAccounts().then((acc)=>{
        accounts=acc;
    }).catch(e=>console.log(e));


    submit.addEventListener('click',async (e)=>{
        e.preventDefault();
        if(input.value.trim()){
            crudContract.methods.create(input.value).send({from: accounts[0]})
        .then(result => {
            const div=`<div class="tasks">
            <p>${input.value}</p>
            <div class="task-update-delete">
              <div class="update">
                <a href="#">
                  <i class="fas fa-pen-square"></i>
                </a>
              </div>
              <div class="delete">
                <a href="#">
                  <i class="fas fa-times-circle"></i>
                </a>
              </div>
            </div>
          </div>`;
            taskarea.innerHTML+=div;
            console.log(result);
        })
        .catch(_e => {
            console.log(`Ooops... there was an error while trying to create a new user...`);
        });



        }else{
            console.log("Please enter a value ");
        }
        
    })
  }

document.addEventListener('DOMContentLoaded',async ()=>{
    initWeb3().then((d)=>{
        web3 = d;
        crudContract = initContract();
        console.log(crudContract.methods);
        initApp();
    }).catch((e)=>{
        console.log(e);
    })
})