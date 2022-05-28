// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// NUS Central Bank Ropsten address: 0x8f8013BC181Dc7B02fF6278DaeB5B5fd433a3C08
// 2nd deploy: 0x4238bE617FB3055B4c40D9EF878d19c160968441
// 3rd deploy: 0xB61271d05D13A29e6379E18D533f6c1B110d46Db

// Avax testnet address: 0x2139dbd3d1ECFEC96F11a9b3951900a63062d283

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
