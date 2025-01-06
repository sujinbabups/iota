// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IoTTemperatureStorage {
    // Struct to store seed data
    struct Seed {
        string seedId;
        string seedName;
        int256 currentTemperature;
    }

    // Mapping to store seed data based on seedId
    mapping(string => Seed) public seeds;

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
    event TemperatureStored(string indexed seedId, int256 temperature, uint256 timestamp);

    /**
     * @dev Store temperature data from an IoT device
     * @param seedId The unique identifier of the seed
     * @param currentTemperature The temperature reading from the device
     */
    function storeTemperature(string memory seedId, int256 currentTemperature) public {
        require(currentTemperature >= -273, "Temperature must be above absolute zero");

        // Check if seed exists
        Seed storage seed = seeds[seedId];
        require(bytes(seed.seedName).length != 0, "Seed not found");

        // Store the temperature
        seed.currentTemperature = currentTemperature;

        // Add the record to the temperature records array
        temperatureRecords.push(TemperatureRecord({
            timestamp: block.timestamp,
            temperature: currentTemperature
        }));

        // Emit the event with the seedId, current temperature, and timestamp
        emit TemperatureStored(seedId, currentTemperature, block.timestamp);
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

    /**
     * @dev Add a new seed to the contract
     * @param seedId The unique identifier of the seed
     * @param seedName The name of the seed
     */
    function addSeed(string memory seedId, string memory seedName) public {
        require(bytes(seeds[seedId].seedName).length == 0, "Seed already exists");

        seeds[seedId] = Seed({
            seedId: seedId,
            seedName: seedName,
            currentTemperature: 0 // Default temperature
        });
    }
}
