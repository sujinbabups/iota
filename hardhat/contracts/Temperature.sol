// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IoTTemperatureStorage {
    // Struct to store temperature data
    struct TemperatureRecord {
        uint256 timestamp;
        int256 temperature; // Temperature in Celsius (can be negative)
    }

    // Array to store temperature records
    TemperatureRecord[] private temperatureRecords;

    // Mapping to track the number of records per IoT device
    mapping(address => uint256) public recordsCount;

    // Event emitted when a temperature is stored
    event TemperatureStored(address indexed device, int256 temperature, uint256 timestamp);

    /**
     * @dev Store temperature data from an IoT device
     * @param _temperature The temperature reading from the device
     */
    function storeTemperature(int256 _temperature) external {
        // Create a new temperature record
        TemperatureRecord memory newRecord = TemperatureRecord({
            timestamp: block.timestamp,
            temperature: _temperature
        });

        // Store the record in the array
        temperatureRecords.push(newRecord);

        // Increment the record count for the sender (IoT device)
        recordsCount[msg.sender] += 1;

        // Emit an event
        emit TemperatureStored(msg.sender, _temperature, block.timestamp);
    }

    /**
     * @dev Retrieve the latest temperature record
     * @return temperature The last recorded temperature
     * @return timestamp The timestamp of the last record
     */
    function getLatestTemperature() external view returns (int256 temperature, uint256 timestamp) {
        require(temperatureRecords.length > 0, "No temperature records available");

        // Get the latest record
        TemperatureRecord storage latestRecord = temperatureRecords[temperatureRecords.length - 1];
        return (latestRecord.temperature, latestRecord.timestamp);
    }

    /**
     * @dev Retrieve all temperature records
     * @return records An array of all temperature records
     */
    function getAllTemperatureRecords() external view returns (TemperatureRecord[] memory records) {
        return temperatureRecords;
    }

    /**
     * @dev Get the total number of temperature records
     * @return count The number of temperature records stored
     */
    function getTotalRecords() external view returns (uint256 count) {
        return temperatureRecords.length;
    }
}