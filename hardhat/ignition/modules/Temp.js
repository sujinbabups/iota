const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TempModule", (m) => {
    const temp = m.contract("IoTTemperatureStorage");
    return { temp };
});