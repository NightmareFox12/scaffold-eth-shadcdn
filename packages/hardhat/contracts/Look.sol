// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Look {

  struct Juan {
    string name;
    uint256 age;
    bool life;
  }

   uint public juanID;
   mapping (uint256 => Juan) public juans;
  
  function read()  public view returns(uint){
    return 6;
  }

  function testing() public view returns(string memory, uint, bool) {
    return ("jaun con chuleta",343434343,false);
  }

  function buyJuan(string memory name,uint age,bool life) payable public returns(uint256) {
    
    juans[juanID] = Juan(name,age,life);
    juanID++;
    return juanID;
  }

}