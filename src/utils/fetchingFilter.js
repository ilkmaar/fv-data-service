import apiTester from '../utils/apiTester.js';

const filterConfig = {
    hasRawTime: filterByRawTime,
    hasCreatedDate: filterByCreatedDate,
    hasWorldId: {
        true: filterByWorldIdAndIncrementingId,
        false: filterByWorldIdAndArray
    },
    noWorldId: {
        true: filterById,
        false: filterByArrayOfLoadedIds
    }
};

function filterByRawTime(data, lastLoadedData, idField) {
    let filteredData = data;
    if (lastLoadedData) { filteredData = data.filter(dataPoint => new Date(dataPoint.raw_time) > new Date(lastLoadedData.raw_time)); }
    if (filteredData.length === 0) { return { newLastLoaded: lastLoadedData, filteredData }; }
    const newLastLoaded = { raw_time: filteredData[0].raw_time };
    return { newLastLoaded: newLastLoaded, filteredData };
}

function filterByCreatedDate(data, lastLoadedData, idField) {
    let filteredData = data;
    if (lastLoadedData) { filteredData = data.filter(dataPoint => new Date(dataPoint.created_date) > new Date(lastLoadedData.created_date)); }
    if (filteredData.length === 0) { return { newLastLoaded: lastLoadedData, filteredData }; }
    const newLastLoaded = { created_date: filteredData[filteredData.length - 1].created_date };
    return { newLastLoaded: newLastLoaded, filteredData };
}

function filterByWorldIdAndIncrementingId(data, lastLoadedData, idField) {
    let filteredData = [];
    if (!lastLoadedData) { lastLoadedData = {}; }
    let newLastLoaded = lastLoadedData;
    data.forEach(dataPoint => {
        const world = dataPoint.world_id
        if (!newLastLoaded[world]) {
            newLastLoaded[world] = { [idField]: dataPoint[idField] };
            filteredData.push(dataPoint);
        }

        if (newLastLoaded[world][idField] < dataPoint[idField]) {
            newLastLoaded[world][idField] = dataPoint[idField];
            filteredData.push(dataPoint);
        }
    });
    return { newLastLoaded, filteredData };
}

function filterByWorldIdAndArray(data, lastLoadedData, idField) {
    let filteredData = [];
    if (!lastLoadedData) { lastLoadedData = {}; }
    let newLastLoaded = lastLoadedData;

    data.forEach(dataPoint => {
        const world = dataPoint.world_id
        if (!newLastLoaded[world]) {
            newLastLoaded[world] = [dataPoint[idField]];
        }
        if (!newLastLoaded[world].includes(dataPoint[idField])) {
            newLastLoaded[world].push(dataPoint[idField]);
            filteredData.push(dataPoint);
        }
    });
    return { newLastLoaded, filteredData };
}

function filterById(data, lastLoadedData, idField) {
    let filteredData = data;
    if (lastLoadedData) {
        filteredData = data.filter(dataPoint => dataPoint[idField] > lastLoadedData[idField]);
    }
    if (filteredData.length === 0) {
        return { newLastLoaded: lastLoadedData, filteredData }; 
    }
    const newLastLoaded = { [idField]: filteredData[filteredData.length - 1][idField]};
    return { newLastLoaded, filteredData };
}

function filterByArrayOfLoadedIds(data, lastLoadedData, idField) {
    let filteredData = data;
    if (lastLoadedData) {
        filteredData = data.filter(dataPoint => !lastLoadedData.includes(dataPoint[idField]));
    }

    const oldLastLoaded = lastLoadedData || [];
    const newLastLoaded = [...oldLastLoaded, ...filteredData.map(dataPoint => dataPoint[idField])];
    return { newLastLoaded, filteredData };
}

function selectFilterFunction(metadata) {
    if (metadata.hasRawTime) {
        return filterConfig.hasRawTime;
    } else if (metadata.hasCreatedDate) {
        return filterConfig.hasCreatedDate;
    } else {
        const hasWorldId = metadata.hasWorldId;
        const idField = metadata.idField;
        const sortedById = metadata.fields[idField];
        if (hasWorldId && sortedById) {
            return (data, lastLoadedData) => filterConfig.hasWorldId.true(data, lastLoadedData, idField);
        } else if (hasWorldId) {
            return (data, lastLoadedData) => filterConfig.hasWorldId.false(data, lastLoadedData, idField);
        } else if (sortedById) {
            return (data, lastLoadedData) => filterConfig.noWorldId.true(data, lastLoadedData, idField);
        } else {
            return (data, lastLoadedData) => filterConfig.noWorldId.false(data, lastLoadedData, idField);
        }
    }
}

async function filter(dataTypeKey, data, lastLoadedData) {
    const metadata = await apiTester.getMetadata();
    if(!metadata[dataTypeKey]) {
        throw new Error(`No metadata found for ${dataTypeKey}`);
    }

    const idField = metadata[dataTypeKey].idField;
    const filterFunction = selectFilterFunction(metadata[dataTypeKey]);
    const { newLastLoaded, filteredData } = filterFunction(data, lastLoadedData, idField);
    return { newLastLoaded, filteredData };
}

export default {
    filter
};