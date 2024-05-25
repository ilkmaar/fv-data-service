import dataModel from '../data/dataModel.js';

/**
 * Function to process fetched data if a processing function is defined.
 * @param {string} dataTypeKey - The type of entity to process data for.
 * @param {any} data - The data to process.
 * @returns {any} The processed data.
 */

function extractProperties(dataType, dataPoint) {
    const properties = {};
    const nodeModel = dataModel.nodes[dataType];

    if (!nodeModel) {
        console.error(`ERROR: Data model for type ${dataType} not found`);
        return properties;
    }

    nodeModel.properties.forEach((prop) => {
        if (dataPoint.hasOwnProperty(prop.field_name)) {
            properties[prop.property_name] = dataPoint[prop.field_name].toString();
        }
    });

    return properties;
}

function processNode(dataType, dataPoint) {
    const nodeModel = dataModel.nodes[dataType];
    if (!nodeModel) {
        console.error(`ERROR: Data model for type ${dataType} not found`);
        return null;
    }

    const labels = nodeModel.labels;
    if (!labels) {
        console.error(`ERROR: Data type ${dataType} does not have valid labels`);
        return null;
    }

    const properties = extractProperties(dataType, dataPoint);
    return { labels, properties };
}

function processData(dataType, data) {
    return data.map((dataPoint) => processNode(dataType, dataPoint));
}
  
export default {
    processData
};