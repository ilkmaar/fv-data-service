/**
 * @module dataProcessing
 * @description This module provides functions for processing and filtering various types of data related to a game.
 */
import { ITEMS, DINER_LOCATION_ID, SUN_TYPES, RAIN_TYPES, ITEM_VARIETIES, INTERACTION_TYPES } from '../config/apiConfig.js'
import apiTester from '../utils/apiTester.js';

/**
 * Flattens the input data by converting the nested input_items and output_items arrays into individual properties.
 * @param {Array} data - The data to be flattened.
 * @returns {Array} - The flattened data.
 */
function flattenData(data) {
    return data.map((event) => {
        const flattened = { ...event }
        event.input_items.forEach((item, index) => {
            flattened[`input_item${index + 1}`] = item.item_id
        })
        delete flattened.input_items

        event.output_items.forEach((item, index) => {
            flattened[`output_item${index + 1}`] = item.item_id
        })
        delete flattened.output_items

        return flattened
    })
}

/**
 * Retrieves the item variety details for a given item name.
 * @param {string} itemName - The name of the item.
 * @returns {Object|null} - The item variety details or null if not found.
 */
function getItemVarietyDetails(itemName) {
    // Find the item's variety name by looping through the ITEMS data structure
    for (const category in ITEMS) {
        for (const itemType in ITEMS[category]) {
            if (ITEMS[category][itemType].includes(itemName)) {
                // With the itemType, find the corresponding item_variety_id
                const itemVariety = ITEM_VARIETIES.find((variety) => variety.item_variety_name === itemType)
                return {
                    item_variety_id: itemVariety ? itemVariety.item_variety_id : null,
                }
            }
        }
    }
    return null
}

/**
 * Filters the interaction events based on the specified type and then flattens the filtered events.
 * @param {Array} data - The data to be processed.
 * @param {number} type - The interaction event type to filter by.
 * @returns {Array} - The flattened filtered events.
 */
function processInteractionEvents(data, type) {
    const filteredEvents = data.filter((event) => event.interaction_event_type === type)
    return flattenData(filteredEvents)
}

/**
 * Generic function to filter data based on a specific field and value.
 * @param {Array} data - The data to be filtered.
 * @param {string} field - The field to filter by.
 * @param {any} value - The value to filter by.
 * @param {boolean} invert - Invert the filter (not equal to the value).
 * @returns {Array} - The filtered data.
 */
function filterByField(data, field, value, invert = false) {
    return data.filter((item) => (invert ? item[field] != value : item[field] == value))
}

/**
 * Adds a static property to each item in the data.
 * @param {Array} data - The data to be processed.
 * @param {string} property - The property name.
 * @param {any} value - The value of the property.
 * @returns {Array} - The processed data.
 */
function addStaticProperty(data, property, value) {
    return data.map((item) => ({ ...item, [property]: value }))
}

/**
 * Adds dynamic properties based on an object mapping.
 * @param {Array} data - The data to be processed.
 * @param {Object} mapping - The mapping of old property values to new property values.
 * @param {string} sourceProperty - The property name to map from.
 * @param {string} targetProperty - The property name to map to.
 * @returns {Array} - The processed data.
 */
function addDynamicProperties(data, mapping, sourceProperty, targetProperty) {
    return data.map((item) => ({
        ...item,
        [targetProperty]: mapping[item[sourceProperty]],
    }))
}

/**
 * Object containing various data processing functions.
 * @type {Object}
 */
const dataProcessingFunctions = {
    'Plot:Entity': (data) => data.map(({ world_id, ...rest }) => rest),

    'ResourceType:Value': (data) => filterByField(data, 'item_category_id', '1'),

    'ResourceCategory:Value': (data) => filterByField(data, 'resource_category_id', '-1', true),

    'ResourceVariety:Value': (data) => filterByField(data, 'resource_type_id', '4', true),

    'Resource:Entity': async (data, apiClient) => {
        const definitions = await apiClient.getDataFromAPI('ResourceType:Value')
        const processedDefs = await preProcessData('ResourceType:Value', definitions, apiClient)
        const valid_ids = new Set(processedDefs.map((item_def) => item_def.item_def_id))
        const entities = data.filter((item) => valid_ids.has(item.item_def_id))
        return entities
    },

    'Item:Entity': async (data, apiClient) => {
        const definitions = await apiClient.getDataFromAPI('ItemType:Value')
        const processedDefs = await preProcessData('ItemType:Value', definitions, apiClient)
        const valid_ids = new Set(processedDefs.map((item_def) => item_def.item_def_id))
        const entities = data.filter((item) => valid_ids.has(item.item_def_id))
        return entities
    },

    'DataTable:Entity': (data) => {
        const uniqueTables = [];
        const seen = new Set();
    
        data.forEach((item) => {
            const combination = `${item.table_name}-${item.world_id}`;
            if (!seen.has(combination)) {
                seen.add(combination);
                uniqueTables.push({
                    table_id: item.table_name,
                    name: item.table_name,
                    world_id: item.world_id
                });
            }
        });
    
        return uniqueTables;
    },

    'ItemType:Value': (data) => {
        const filtered_item_definitions = data.filter((item_def) => item_def.item_category_id != '1')
        const definitions_with_types_and_varieties = filtered_item_definitions.map((item_def) => {
            const variety_details = getItemVarietyDetails(item_def.item_def_name)
            const def = {
                item_def_id: item_def.item_def_id,
                item_category_id: item_def.item_category_id,
                item_variety_id: variety_details ? variety_details.item_variety_id : null,
                item_def_name: item_def.item_def_name,
            }
            return def
        })
        return definitions_with_types_and_varieties
    },

    'ItemCategory:Value': (data) => filterByField(data, 'item_category_id', '1', true),

    'Weather:State': (data) => addDynamicProperties(data, SUN_TYPES, 'sun_type', 'sun_type')
        .map((event) => addDynamicProperties([event], RAIN_TYPES, 'rain_type', 'rain_type')[0]),

    'Foraging:Action': (data) => processInteractionEvents(data, 1),

    'Crafting:Action': (data) => processInteractionEvents(data, 2),

    'Gifting:Action': (data) => processInteractionEvents(data, 4),

    'DinerSeating:Action': (data) => addStaticProperty(data, 'location_id', DINER_LOCATION_ID),

    'DinerRating:Event': (data) => addStaticProperty(data, 'location_id', DINER_LOCATION_ID),

    'Inventory:Action': (data) => addDynamicProperties(data, INTERACTION_TYPES, 'player_item_interaction_type_id', 'type'),

    'Data:Action': (data) => data,
}

async function preProcessData(dataType, data, apiClient) {
    if (dataProcessingFunctions[dataType]) {
        const processedData = await dataProcessingFunctions[dataType](data, apiClient)
        const validFormat = apiTester.checkMetadata(dataType, processedData)
        return processedData
    }
    return data
}

async function testProcessedData(dataType, data) {

}
  
export default {
    preProcessData
};