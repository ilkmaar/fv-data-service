// loader.js
import dataModel from '../data/dataModel.js';
import fetchingFilter from '../utils/fetchingFilter.js';
import dataTracker from '../utils/dataTracker.js';
import apiClient from '../utils/apiClient.js';
import apiTester from '../utils/apiTester.js';
import preProcessor from '../processing/preProcessor.js';
import nodeProcessor from '../processing/nodeProcessor.js';
import RelationshipProcessor from '../processing/relationshipProcessor.js';
import { graphService } from '../services/GraphService.js';
import chalk from 'chalk';

const relationshipProcessor = new RelationshipProcessor(dataModel, graphService);

async function fetchNewerData(dataType) {
    try {
        const lastLoadedData = await dataTracker.getLastLoadedData(dataType);
        const metadata = await apiTester.getMetadata()[dataType];

        // Step 1. Fetch Data
        const filters = {};
        if (metadata?.hasCreatedDate && lastLoadedData?.created_date) {
            const lastLoadedDate = lastLoadedData.created_date;
            filters['after'] = lastLoadedDate;
        }

        console.log(chalk.gray(`Fetching new data for ${dataType} with filters:`), filters);
        const data = await apiClient.getPaginatedDataFromAPI(dataType, filters);

        // Step 2. Validate Response Data Structure
        const validResponse = await apiTester.checkMetadata(dataType, data);

        // Step 3. Filter New Data
        return await fetchingFilter.filter(dataType, data, lastLoadedData);
    } catch (error) {
        console.error(chalk.red(`Error fetching newer data for ${dataType}: ${error.message}`));
        throw error;
    }
}

async function preProcessData(dataType, data) {
    return await preProcessor.preProcessData(dataType, data, apiClient); // needs apiClient to fetch related data
}

async function processData(dataType, data) {
    return await nodeProcessor.processData(dataType, data);
}

async function loadNodes(nodes) {
    return await graphService.createNodes(nodes);
}

async function processRelationships(dataType, FVdata, nodeIds) {
    return await relationshipProcessor.processRelationships(dataType, FVdata, nodeIds);
}

async function createRelationships(relationshipsToCreate) {
    const relationships = [];
    for (const relationshipToCreate of relationshipsToCreate) {
        relationships.push(await graphService.createRelationship(relationshipToCreate));
    }
}

async function loadNewData(dataType) {    
    try {
        const { newLastLoaded, filteredData: newData } = await fetchNewerData(dataType);
        console.log(chalk.gray(`New data found for ${dataType}:`), newData.length);

        if (!newData || newData.length === 0) {
            return { success: true, added: 0 };
        }

        const processedData = await preProcessData(dataType, newData);
        const nodesData = await processData(dataType, processedData);
        const { nodeIds, nodes } = await loadNodes(nodesData);
        console.log(chalk.green(`Nodes loaded for ${dataType}:`), nodeIds.length);

        const relationships = await processRelationships(dataType, processedData, nodeIds);
        await createRelationships(relationships);

        await dataTracker.updateLastLoadedData(dataType, newLastLoaded);
        return { success: true, added: newData.length };
    } catch (error) {
        console.error(chalk.red(`Error loading new data for ${dataType}: ${error.message}`));
        return { success: false, added: 0 };
    }
}

export default {
    loadNewData
};