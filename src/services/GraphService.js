import { v4 as uuidv4 } from 'uuid';
import DBClient from '../utils/dbClient.js';

class GraphService {
    constructor() {
        this.batchSize = 100;
        this.db = new DBClient();
    }

    formatLabels(labels) {
        return Array.isArray(labels) ? labels.sort().join(':') : labels;
    }

    async getNodesWithProperties(labels, properties) {
        const labelString = this.formatLabels(labels)
        const queryKeys = Object.keys(properties)
        const queryConditions = queryKeys.map((key) => `${key}: $${key}`).join(', ')
        return this.db.withSession(async (session) => {
            const query = `MATCH (e:${labelString} {${queryConditions}}) RETURN e, labels(e) as labels`
            const records = await this.db.runCypherQuery(session, query, properties)

            let nodeIds = []
            let nodes = {}
            records.forEach((record) => {
                const node = record.get('e')
                const nodeId = node.properties.id
                nodes[nodeId] = {
                    labels: record.get('labels'),
                    properties: node.properties,
                }
                nodeIds.push(nodeId)
            })
            return { nodeIds, nodes }
        })
    }

    async createNodes(nodesToCreate) {
        nodesToCreate.forEach((node) => {
            if (!node.properties.id) {
                node.properties.id = uuidv4()
            }
        })

        if (nodesToCreate.length <= this.batchSize) {
            return this._batchcreateNodes(nodesToCreate)
        } else {
            const nodeIds = []
            const nodes = {}
            for (let i = 0; i < nodesToCreate.length; i += this.batchSize) {
                const batch = nodesToCreate.slice(i, i + this.batchSize)
                const { nodeIds: batchCreatedIds, nodes: batchnodes } = await this._batchcreateNodes(batch)
                nodeIds.push(...batchCreatedIds)
                Object.assign(nodes, batchnodes)
            }
            return { nodeIds, nodes }
        }
    }

    async _batchcreateNodes(nodes) {
        return this.db.withSession(async (session) => {
            const transaction = session.beginTransaction()
            const results = []
            const nodesMap = {}
            const currentDate = Date.now()

            try {
                for (const node of nodes) {
                    const labelString = this.formatLabels(node.labels)
                    const record = await transaction.run(
                        `CREATE (e:${labelString}) SET e += $properties, e.created_date = $currentDate RETURN e, labels(e) AS labels`,
                        { properties: node.properties, currentDate },
                    )
                    const creatednode = record.records[0].get('e')
                    const labels = record.records[0].get('labels')
                    const nodeId = node.properties.id // Use the pre-assigned UUID
                    nodesMap[nodeId] = {
                        labels: labels,
                        properties: creatednode.properties,
                    }
                    results.push(nodeId)
                }
                await transaction.commit()
                return { nodeIds: results, nodes: nodesMap }
            } catch (error) {
                await transaction.rollback()
                throw error
            }
        })
    }

    async createRelationship({type, sourceId, targetId}) {
        return this.db.withSession(async (session) => {
            const query = `
                MATCH (a {id: $sourceId}), (b {id: $targetId})
                CREATE (a)-[r:${type}]->(b)
                RETURN r
            `;
            const params = { sourceId, targetId };
            await this.db.runCypherQuery(session, query, params);
        });
    }
}

export const graphService = new GraphService();