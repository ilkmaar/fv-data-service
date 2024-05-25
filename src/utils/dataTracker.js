// dataTracker.js
import fs from 'fs';
import path from 'path';

// Define the path to the JSON file
const filePath = path.resolve('./src/loading/lastLoadedData.json');

// Function to read the JSON file
async function readLastLoadedData() {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    const rawData = await fs.readFileSync(filePath);
    return JSON.parse(rawData);
}

// Function to write to the JSON file
async function writeLastLoadedData(data) {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFileSync(filePath, jsonData);
}

// Function to get the last loaded data point for a specific type and world
async function getLastLoadedData(type) {
    const data = await readLastLoadedData();
    return data[type] || null;
}

// Function to update the last loaded data point for a specific type and world
async function updateLastLoadedData(type, lastLoadedData) {
    const data = await readLastLoadedData();
    data[type] = lastLoadedData;
    await writeLastLoadedData(data);
}

export default {
    getLastLoadedData,
    updateLastLoadedData,
};