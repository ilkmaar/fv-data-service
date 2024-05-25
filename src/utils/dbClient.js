import neo4j from 'neo4j-driver';
import config from '../config/index.js';

class DBClient {
    constructor() {
        this.driver = neo4j.driver(
            config.db.neo4j.url,
            neo4j.auth.basic(config.db.neo4j.username, config.db.neo4j.password),
            config.db.neo4j.params
        );
    }

    async runCypherQuery(session, query, params = {}) {
        try {
            const result = await session.run(query, params);
            return result.records;
        } catch (error) {
            console.error('Error running Cypher query:', error);
            throw error;
        }
    }

    async withSession(operation) {
        const session = this.driver.session();
        try {
            return await operation(session);
        } finally {
            await session.close();
        }
    }
}

export default DBClient