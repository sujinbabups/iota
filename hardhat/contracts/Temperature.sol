// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract IoTTemperatureStorage {
    // Struct to store temperature data
    struct TemperatureRecord {
        uint256 timestamp;
        int256 temperature; 
    }

    // Array to store temperature records
    TemperatureRecord[] private temperatureRecords;

    // Mapping to track the number of records per IoT device
    mapping(address => uint256) public recordsCount;

    // Event emitted when a temperature is stored
    event TemperatureStored(address indexed device, int256 temperature, uint256 timestamp);

    // Constructor to add dummy data
    constructor() {
        // Dummy data
        temperatureRecords.push(TemperatureRecord({timestamp: 1672531200, temperature: 25})); // Jan 1, 2023
        temperatureRecords.push(TemperatureRecord({timestamp: 1672617600, temperature: -5})); // Jan 2, 2023
        temperatureRecords.push(TemperatureRecord({timestamp: 1672704000, temperature: 15})); // Jan 3, 2023
    }

 
   

    function getAllTemperatureRecords() external view returns (TemperatureRecord[] memory records) {
        return temperatureRecords;
    }

  
    function getTotalRecords() external view returns (uint256 count) {
        return temperatureRecords.length;
    }
}
