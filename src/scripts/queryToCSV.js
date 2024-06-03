import DBClient from '../utils/dbClient.js';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

// sample usage:
// npm run query actionsByPlayer --params '{"playerName": "Player 1", "startTime": "2024-05-29T15:52:12.398571Z", "endTime": "2024-05-29T20:30:35.470960Z"}'
//

// Command-line argument parsing
const argv = yargs(hideBin(process.argv))
  .option('query', {
    alias: 'q',
    describe: 'Query name to run',
    type: 'string',
    demandOption: true
  })
  .option('params', {
    alias: 'p',
    describe: 'Query parameters in JSON format',
    type: 'string',
    demandOption: true
  })
  .argv;

// Predefined queries
const queries = {
  'actionsByPlayer': {
      cypher:`
        MATCH (p:Player)-[:DOES_ACTION]-(a:Action)
        WHERE p.name = $playerName
          AND a.time >= $startTime
          AND a.time <= $endTime
        WITH labels(a) AS actionLabels
        UNWIND actionLabels AS actionLabel
        RETURN actionLabel, COUNT(*) AS actionCount
        ORDER BY actionCount DESC
      `,
      header:  [
        { id: 'actionLabel', title: 'Action Label' },
        { id: 'actionCount', title: 'Action Count' }
      ],
      recordMap: (record) => {
        return {
          actionLabel: record.get('actionLabel'),
          actionCount: record.get('actionCount')
        };
      }
    }
};

// Get query and parameters
const queryName = argv.query;
const queryParams = JSON.parse(argv.params);

if (!queries[queryName]) {
  console.error(`Query "${queryName}" not found`);
  process.exit(1);
}

const query = queries[queryName].cypher;
const db = new DBClient();

const csvWriter = createCsvWriter({
  path: `./datasets/${queryName}.csv`,
  header: queries[queryName].header
});

async function runQueryAndWriteToCSV() {
  try {
    await db.withSession(async (session) => {
      const records = await db.runCypherQuery(session, query, queryParams);

      console.log(`Query "${queryName}" returned ${records.length} records: `, records);
      const resultRecords = records.map(record => (queries[queryName].recordMap(record)));

      console.log('Writing CSV file...', resultRecords);
      await csvWriter.writeRecords(resultRecords);
      console.log('CSV file was written successfully');
    });
  } catch (error) {
    console.error('Error running query', error);
  }
}

await runQueryAndWriteToCSV();
console.log('Done!');