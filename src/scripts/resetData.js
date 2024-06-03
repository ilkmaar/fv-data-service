// resetData.js is a script that can be used to run predefined queries and reset the lastLoadedData.json file.
// run with: node resetData.js --query deleteExternalIdNodes
// or npm run reset:FV

import DBClient from '../utils/dbClient.js';
import fs from 'fs';
import path from 'path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

// Initialize Logger
import logger from '../utils/logger.js';
const log = logger.initializeLogger();

// Command-line argument parsing
const argv = yargs(hideBin(process.argv))
  .option('query', {
    alias: 'q',
    describe: 'Query name to run',
    type: 'string',
    demandOption: true
  })
  .argv;

// Predefined queries
const queries = {
  'resetExternalData': {
    cypher: `
      MATCH (n)
      WHERE n.externalId IS NOT NULL
      DETACH DELETE n
    `
  },
  // Add other queries here
};

// Get query
const queryName = argv.query;

if (!queries[queryName]) {
  console.error(`Query "${queryName}" not found`);
  process.exit(1);
}

const query = queries[queryName].cypher;
const db = new DBClient();

async function runQuery() {
  try {
    await db.withSession(async (session) => {
      const result = await db.runCypherQuery(session, query, {});

      console.log(`Query "${queryName}" executed successfully.`);
      log.info(`RAN QUERY: "${queryName}`);

      console.log('Result:', result);
    });
  } catch (error) {
    console.error('Error running query', error);
  }
}

// Path to the JSON file
const filePath = path.resolve('./src/loading/lastLoadedData.json');

// Function to reset the JSON file
async function resetLastLoadedData() {
  const emptyData = {};
  const jsonData = JSON.stringify(emptyData, null, 2);
  await fs.writeFileSync(filePath, jsonData);
  console.log('lastLoadedData.json has been reset to an empty object.');
}

async function main() {
  await runQuery();
  
  if (queryName === 'resetExternalData') {
    await resetLastLoadedData();
  }
}

await main();
console.log('Done!');
