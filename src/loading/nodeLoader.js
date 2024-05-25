import RelationshipManager from './relationshipManager.js';

class NodeLoader {
    constructor(graphService, dataModel) {
        this.graphService = graphService;
        this.dataModel = dataModel;
        this.relationshipManager = new RelationshipManager(graphService, dataModel);
    }

    async createNodeWithRelationships(dataType, dataPoint) {
        try {
            const processedNode = this.processNode(dataType, dataPoint);
            if (!processedNode) return null;

            const newNode = await this.graphService.createNode(processedNode);
            await this.relationshipManager.createRelationships(newNode, dataType, dataPoint);
            return newNode;
        } catch (error) {
            console.error(`Error creating node of type ${dataType}:`, error);
        }
    }

    async loadNodes(nodes) {
        return await this.graphService.createNodes(nodes);
    }
}

export default NodeLoader;