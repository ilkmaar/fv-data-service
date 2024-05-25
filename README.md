# FV Data Loader Service

The FV Data Loader Service is a standalone module designed to periodically scrape the FV API for data, check for updates, load the data into a configured Neo4j graph database, and run any necessary processing scripts to process or relate the data.

## Usage

To start the FV Data Loader Service, use the following command:

```bash
npm run start:service
```

This will start the service and begin periodically checking the FV API for new data based on the configured schedule.

## License

This project is licensed under the MIT License.