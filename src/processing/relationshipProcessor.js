const DEFAULT_WORLD = "DEFAULT_WORLD"

class RelationshipProcessor {
    constructor(dataModel, graphService) {
        this.dataModel = dataModel;
        this.graphService = graphService;
    }

    async processRelationships(dataType, FVdata, nodeIds) {
        if (!nodeIds) {
            console.error('ERROR: No data to process relationships for: ', nodeIds);
            return [];
        }
        
        const relationshipsToCreate = [];
        // iterate with index 
        for (let i = 0; i < FVdata.length; i++) {
            const dataPoint = FVdata[i];
            const currentNodeId = nodeIds[i];

            const relationshipsModel = this.dataModel.relationships[dataType] || [];
            for (const relationship of relationshipsModel) {
    
                // Get the target node type and properties (externalId)
                const targetType = relationship.typeKey;
                if (!dataPoint[relationship.match_on] && dataPoint[relationship.match_on] !== 0) {
                    console.error(`BAD DATA ERROR: Data point lacks idField to link to for ${targetType}: `, relationship.match_on, dataPoint);
                    continue;
                }
                const targetExternalId = dataPoint[relationship.match_on].toString();
                const targetLabels = this.dataModel.nodes[targetType].labels;
                const targetProperties = { externalId: targetExternalId };
                
                //
                // Get the target node(s) from the graph
                //
                const { nodeIds: targetIds, nodes: targetNodes } = await this.graphService.getNodesWithProperties(targetLabels, targetProperties);
                
                // If no matches found, skip if relationship is optional
                if (targetIds.length === 0) {
                    if (!relationship.optional) {
                        console.error(`ERROR: Loading ${dataType} and trying to find ${targetType}. But no target nodes found with labels ${targetLabels} and properties: `, targetProperties);     
                    }
                    continue;
                }
    
                // Otherwise choose which node to link to
                let targetNodeId = null;
                let targetNode = null;
                if (targetIds.length === 1) {
                    targetNodeId = targetIds[0];
                    targetNode = targetNodes[targetNodeId];
                } else {
                    let targetWorld = dataPoint.world_id;
                    if (!targetWorld) {
                        console.log("WARNING: No world found; using DEFAULT_WORLD for point: ", dataPoint)
                        targetWorld = DEFAULT_WORLD
                    }

                    const nodesInWorld = {}
                    for (const id of targetIds) {
                        const node = targetNodes[id];
                        if (node && node.properties.world === targetWorld) {
                            nodesInWorld[id] = node;
                        }
                    }

                    if (Object.keys(nodesInWorld).length === 1) {
                        targetNodeId = Object.keys(nodesInWorld)[0];
                        targetNode = nodesInWorld[targetNodeId];
                    } else if (Object.keys(nodesInWorld).length > 1) {
                        console.error(`ERROR: Multiple nodes of type ${targetType} found in the same world ${targetWorld}; `, nodesInWorld);
                        
                        // Pick the oldest node
                        console.log('Picking the oldest one as targetNodeId');
                        const nodesToSort = Object.values(nodesInWorld);
                        nodesToSort.sort((a, b) => a.properties.created_date - b.properties.created_date);
                        targetNode = nodesToSort[0];
                        targetNodeId = targetNode.properties.id;
                    } else {
                        if (!relationship.optional) {
                            console.error("ERROR: No nodes found in the same world for :",)
                        }
                    }
                }

                // Create the relationship
                if (targetNodeId && targetNode) {
                    relationshipsToCreate.push({
                        type: relationship.relation,
                        sourceId: currentNodeId,
                        targetId: targetNodeId,
                    });
                } else {
                    console.error(`ERROR: Failed to create relationship for ${dataType} with relationship: `, relationship, targetIds, targetNodes, targetNodeId, targetNode);
                }
            }
        }
        return relationshipsToCreate || [];
    }
}

export default RelationshipProcessor;