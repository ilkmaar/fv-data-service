import cron from 'node-cron';
import loader from './loading/loader.js';
import logger from './utils/logger.js';
import chalk from 'chalk';
import dataModel from './data/dataModel.js';

// Initialize Logger
const log = logger.initializeLogger();

async function loadNewData() {
    // Build dependencies map
    const dataTypes = Object.keys(dataModel.nodes);
    const dependenciesMap = new Map();
    for (const entityTypeKey of dataTypes) {
        const dependencies = (dataModel.relationships[entityTypeKey] || []).map((rel) => rel.typeKey);
        dependenciesMap.set(entityTypeKey, dependencies);
    }

    const typesToLoad = dataTypes;
    const typesLoaded = new Set();

    // Update dependencies first
    let loadableFound;
    do {
        loadableFound = false;
        for (const dataType of typesToLoad) {
            if (typesLoaded.has(dataType)) {
                continue;
            }

            // skip if there are unloaded dependencies
            const dependencies = dependenciesMap.get(dataType) || [];
            const unloadedDependencies = dependencies.filter(dep => !typesLoaded.has(dep));
            if (unloadedDependencies.length > 0) {
                console.log(chalk.blue(`Waiting for dependencies to load for: ${dataType}`));
                console.log(chalk.yellow(`Unloaded dependencies: ${unloadedDependencies}`));
                continue;
            }

            // if no unloaded dependencies, load any new data
            console.log(chalk.green(`START Loading: ${dataType}`));

            try {
                const { success, added } = await loader.loadNewData(dataType);
                if (!success) {
                    log.error(chalk.red(`Failed to load data for: ${dataType}`));
                    continue;
                }
                typesLoaded.add(dataType);
                console.log(chalk.green(`END Loaded: ${dataType} (${added} new items)`));
                loadableFound = true;
            } catch (error) {
                log.error(chalk.red(`Error loading data for ${dataType}: ${error.message}`));
            }
        }
    } while (loadableFound);

    if (typesToLoad.some(type => !typesLoaded.has(type))) {
        console.log(chalk.red('Could not resolve all dependencies or load all types.'));
    } else {
        console.log(chalk.green('All data loaded.'));
    }
}

async function update() {
    await loadNewData();
}

// Schedule the data fetching, processing, and updating
cron.schedule('*/10 * * * *', async () => {
    console.log(chalk.blue('Scheduled data fetch process started.'));
    await update();
    console.log(chalk.blue('Scheduled data fetch process completed.'));
});

update();