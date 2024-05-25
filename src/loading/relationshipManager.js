import chalk from "chalk";

class RelationshipManager {
    constructor(graphService, dataModel) {
        this.graphService = graphService;
        this.dataModel = dataModel;
    }

    async createRelationships(newNode, dataType, dataPoint) {
        const relationshipsToCreate = this.dataModel.relationships[dataType] || [];

        for (const relationship of relationshipsToCreate) {
            const targetType = relationship.targetType;
            const targetLabels = this.dataModel.nodes[targetType].labels;

            if (!dataPoint[relationship.match_on]) {
                console.error(chalk.red(`ERROR: Data point lacks id to link to for ${targetType}: `), relationship.match_on, dataPoint);
                continue;
            }

            const targetExternalId = dataPoint[relationship.match_on].toString();
            const targetProperties = { externalId: targetExternalId };

            const { nodeIds, nodes } = await this.graphService.getNodesWithProperties(targetLabels, targetProperties);
            if (nodeIds.length === 0) {
                console.error(chalk.red(`ERROR: No target nodes found with labels ${targetLabels} and properties: `), targetProperties);
                continue;
            }

            let targetNodeId = nodeIds[0];
            let targetNode = nodes[targetNodeId];

            if (targetNodeId && targetNode) {
                await this.linkNodes(relationship, newNode.properties.id, targetNodeId);
            } else {
                console.error(chalk.red(`ERROR: Failed to create relationship for ${dataType} with relationship: `), relationship, nodeIds, nodes, targetNodeId, targetNode);
            }
        }
    }

    async linkNodes(relationship, newNodeId, targetNodeId) {
        const { relation, direction } = relationship;
        await this.graphService.createRelationship(
            relation,
            direction === 'to' ? newNodeId : targetNodeId,
            direction === 'to' ? targetNodeId : newNodeId,
        );
    }
}

export default RelationshipManager;