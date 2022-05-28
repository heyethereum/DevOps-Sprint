// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// kitten testnet address: 0x3db5c93C420Cc868d9DAd12067A31b2c69285aD5

contract NUSBank {
    address owner;
    bytes32[] public whitelistedSymbols;
    mapping(bytes32 => address) public whitelistedTokens;
    mapping(address => mapping(bytes32 => uint256)) public balances;

    constructor() {
        owner = msg.sender;
    }

    function whitelistToken(bytes32 symbol, address tokenAddress) external {
        require(msg.sender == owner, "Only Owner can whitelist token");

        whitelistedSymbols.push(symbol);
        whitelistedTokens[symbol] = tokenAddress;
    }

    function getWhitelistedSymbols() external view returns (bytes32[] memory) {
        return whitelistedSymbols;
    }

    function getWhitelistedTokenAddress(bytes32 symbol)
        external
        view
        returns (address)
    {
        return whitelistedTokens[symbol];
    }

    receive() external payable {
        balances[msg.sender]["Eth"] += msg.value;
    }

    function withdrawEther(uint256 amount) external {
        require(balances[msg.sender]["Eth"] >= amount, "Insufficient funds");

        balances[msg.sender]["Eth"] -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Call failed");
    }

    function depositTokens(uint256 amount, bytes32 symbol) external {
        balances[msg.sender][symbol] += amount;
        IERC20(whitelistedTokens[symbol]).transferFrom(
            msg.sender,
            address(this),
            amount
        );
    }

    function withdrawTokens(uint256 amount, bytes32 symbol) external {
        require(balances[msg.sender][symbol] >= amount, "Insufficient funds");

        balances[msg.sender][symbol] -= amount;
        IERC20(whitelistedTokens[symbol]).transfer(msg.sender, amount);
    }

    function sendTokens(uint256 amount, bytes32 symbol) external {
        require(balances[owner][symbol] >= amount, "Insufficient funds");

        balances[owner][symbol] -= amount;
        IERC20(whitelistedTokens[symbol]).transfer(msg.sender, amount);
    }

    function getTokenBalance(bytes32 symbol) external view returns (uint256) {
        return balances[msg.sender][symbol];
    }
}
