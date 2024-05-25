// apiClient.js
import axios from 'axios';
import axiosRetry from 'axios-retry';
import config from '../config/index.js';
import chalk from 'chalk';

const baseURL = config.api.BASE_URL;
const endpoints = config.api.ENDPOINTS;
const localDataMapping = config.api.LOCAL_DATA;
const cache = {};
const PAGE_MAX = 5;

const apiClient = axios.create({ baseURL });

// Configure axios-retry with exponential backoff
axiosRetry(apiClient, {
    retries: 5, // number of retries
    retryDelay: (retryCount) => axiosRetry.exponentialDelay(retryCount),
    retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status >= 500,
});

// Helper function to log concise error metadata
function logError(error, dataTypeKey, endpoint) {
    const errorInfo = {
        message: error.message,
        code: error.code,
        config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            params: error.config?.params,
        },
        response: {
            status: error.response?.status,
            statusText: error.response?.statusText,
            headers: error.response?.headers,
            data: null,
        },
    };

    // Truncate response data if it's too long or HTML content
    if (error.response?.data) {
        const contentType = error.response.headers['content-type'];
        if (contentType && contentType.includes('text/html')) {
            errorInfo.response.data = error.response.data.substring(0, 100) + '... [truncated]';
        } else if (typeof error.response.data === 'string') {
            errorInfo.response.data = error.response.data.substring(0, 100) + '... [truncated]';
        } else {
            errorInfo.response.data = error.response.data;
        }
    }

    console.error(chalk.red(`Error fetching data for ${dataTypeKey} from ${endpoint}:`), errorInfo);
}

// Generalized function to fetch data from server or local data with optional filters.
async function getDataFromAPI(dataTypeKey, filters = {}) {
    if (cache[dataTypeKey]) {
        return cache[dataTypeKey];
    }

    if (localDataMapping[dataTypeKey]) {
        return localDataMapping[dataTypeKey];
    }

    const endpoint = endpoints[dataTypeKey];

    if (!endpoint) {
        throw new Error(`Endpoint for ${dataTypeKey} is not defined.`);
    }

    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${endpoint}?${queryParams}` : endpoint;

    try {
        console.log(chalk.blue(`Fetching data for ${dataTypeKey} from ${url}`));
        const response = await apiClient.get(url);
        cache[dataTypeKey] = response.data;
        console.log(chalk.green(`Fetched ${response.data.length} items for ${dataTypeKey}.`));
        return response.data;
    } catch (error) {
        logError(error, dataTypeKey, endpoint);
        throw error;
    }
}

// Function to fetch paginated data from API with retry logic.
async function getPaginatedDataFromAPI(dataTypeKey, filters = {}) {
    let allData = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const paginatedFilters = { ...filters, page };
        const data = await getDataFromAPI(dataTypeKey, paginatedFilters);
        console.log(chalk.blue(`Fetched page ${page} with ${data.length} items for ${dataTypeKey}.`));
        allData = allData.concat(data);

        if (data.length < 998) {
            hasMore = false;
        } else {
            page += 1;
        }

        if (page >= PAGE_MAX) {
            console.warn(`Reached maximum page limit for ${dataTypeKey}.`);
            hasMore = false;
        }
    }

    return allData;
}

export default {
    getDataFromAPI,
    getPaginatedDataFromAPI,
};