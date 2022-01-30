pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > 1 ether);
        players.push(msg.sender);
    }
     //Keccak256 is a cryptographic function built into solidity. This function takes in any amount of inputs and converts it to a unique 32 byte hash
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players)); 
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    //only for manager to run the pickwinner function
    modifier restricted() {
        require(msg.sender == manager);
        _; // rest of the above code will be executed here
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
}   