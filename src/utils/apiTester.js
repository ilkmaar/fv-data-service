// apiTester.js
import fs from 'fs';
import path from 'path';
import dataModel from '../data/dataModel.js';

const logFilePath = path.resolve('./src/utils/endpointMetadata.json');

// Function to test a single API endpoint.
async function checkMetadata(dataType, data) {
    if (!data || data.length === 0) {
        console.log(`No data to check for ${dataType}`);
        return null;
    }

    const allFields = Object.keys(data[0]);
    const fields = {};
    allFields.forEach(field => {
        fields[field] = isNumericAndIncreasing(data, field);
    });

    const result = {
        dataType: dataType,
        hasRawTime: hasField(data, 'raw_time'),
        hasCreatedDate: hasField(data, 'created_date'),
        hasWorldId: hasField(data, 'world_id'),
        idField: getIdFieldName(dataType),
        fields,
    };

    await checkForChanges(dataType, result);
    return result;
}

function hasField(data, field) {
    return data.length > 0 && data.every(item => field in item);
}

function isSortedByField(data, field) {
    if (!hasField(data, field)) {
        return false;
    }
    for (let i = 1; i < data.length; i++) {
        if (new Date(data[i][field]) < new Date(data[i - 1][field])) {
            return false;
        }
    }
    return true;
}

function isNumericAndIncreasing(data, field) {
    for (let i = 1; i < data.length; i++) {
        const prevValue = data[i - 1][field];
        const currentValue = data[i][field];
        
        if (typeof prevValue !== 'number' || typeof currentValue !== 'number') {
            return false;
        }
        
        if (currentValue <= prevValue) {
            return false;
        }
    }
    return true;
}

function getIdFieldName(dataType) {
    const typeModel = dataModel.nodes[dataType]
    const properties = typeModel.properties;
    const idProperty = properties.find(property => property.property_name === 'externalId');
    if (idProperty) {
        return idProperty.field_name;
    }
    return null;
}

async function checkForChanges(dataType, result) {
    const existingMetaData = fs.existsSync(logFilePath) ? JSON.parse(fs.readFileSync(logFilePath)) : {};

    let hasChanged = false;
    if (existingMetaData.hasOwnProperty(dataType) && existingMetaData[dataType]) {
        if (JSON.stringify(existingMetaData[dataType]) !== JSON.stringify(result)) {
            hasChanged = true;
            console.log(`METADATA has CHANGED for ${dataType}`);
            return;
        }
    } else {
        const updatedData = { ...existingMetaData, [dataType]: result}
        fs.writeFileSync(logFilePath, JSON.stringify(updatedData, null, 2));
    }
}

export default { 
    getIdFieldName,
    checkMetadata,
    getMetadata: async () => fs.existsSync(logFilePath) ? JSON.parse(fs.readFileSync(logFilePath)) : {}
}