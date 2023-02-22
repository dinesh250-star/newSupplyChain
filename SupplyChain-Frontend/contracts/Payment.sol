// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Payment {
  address owner;
   
    constructor(){
        owner = msg.sender;
    }
    function Deposit() public payable returns (bool){
        payable(msg.sender).transfer(msg.value);
        return true;
    }

    receive() payable external{
       
    }

}
