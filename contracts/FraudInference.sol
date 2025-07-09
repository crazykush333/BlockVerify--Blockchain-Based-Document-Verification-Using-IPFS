// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title Fraud Inference Hash Registry
/// @notice Stores keccak256 hashes of model inference results for auditability
contract FraudInference {
    address public owner;

    event InferenceStored(bytes32 indexed idHash, uint256 indexed timestamp);

    mapping(bytes32 => uint256) public storedAt;

    constructor() {
        owner = msg.sender;
    }

    function storeInferenceHash(bytes32 idHash) external returns (bool) {
        require(storedAt[idHash] == 0, "Hash already stored");
        storedAt[idHash] = block.timestamp;
        emit InferenceStored(idHash, block.timestamp);
        return true;
    }

    function verifyHash(bytes32 idHash) external view returns (bool exists, uint256 timestamp) {
        timestamp = storedAt[idHash];
        exists = timestamp != 0;
    }
}