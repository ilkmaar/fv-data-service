/**
 * @fileoverview Defines the data model for FV data.
 */

export const values = {
    'Color:Value': {
        labels: ['Color', 'Value'],
        properties: [
            { field_name: 'color_id', property_name: 'externalId' },
            { field_name: 'color_name', property_name: 'name' },
        ],
    },
    'CreatureType:Value': {
        labels: ['CreatureType', 'Value'],
        properties: [
            { field_name: 'creature_type_id', property_name: 'externalId' },
            { field_name: 'creature_type_name', property_name: 'name' },
        ],
    },
    'ResourceCategory:Value': {
        labels: ['ResourceCategory', 'Value'],
        properties: [
            { field_name: 'resource_category_id', property_name: 'externalId' },
            { field_name: 'resource_category_name', property_name: 'name' },
        ],
    },
    'ResourceVariety:Value': {
        labels: ['ResourceVariety', 'Value'],
        properties: [
            { field_name: 'resource_type_id', property_name: 'externalId' },
            { field_name: 'resource_type_name', property_name: 'name' },
        ],
    },
    'ItemCategory:Value': {
        labels: ['ItemCategory', 'Value'],
        properties: [
            { field_name: 'item_category_id', property_name: 'externalId' },
            { field_name: 'item_category_name', property_name: 'name' },
        ],
    },
    'ItemVariety:Value': {
        labels: ['ItemVariety', 'Value'],
        properties: [
            { field_name: 'item_variety_id', property_name: 'externalId' },
            { field_name: 'item_variety_name', property_name: 'name' },
        ],
    },
    'ItemType:Value': {
        labels: ['ItemType', 'Value'],
        properties: [
            { field_name: 'item_def_id', property_name: 'externalId' },
            { field_name: 'item_def_name', property_name: 'name' },
        ],
    },
    'ResourceType:Value': {
        labels: ['ResourceType', 'Value'],
        properties: [
            { field_name: 'item_def_id', property_name: 'externalId' },
            { field_name: 'item_def_name', property_name: 'name' },
        ],
    },
    'ActivityType:Value': {
        labels: ['ActivityType', 'Value'],
        properties: [
            { field_name: 'activity_id', property_name: 'externalId' },
            { field_name: 'activity_name', property_name: 'name' },
        ],
    },
}

export const entities = {
    'World:Entity': {
        labels: ['World', 'Entity'],
        properties: [
            { field_name: 'world_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'name' },
        ],
    },
    'Player:Entity': {
        labels: ['Player', 'Entity'],
        properties: [
            { field_name: 'player_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'player_name', property_name: 'name' },
        ],
    },
    'Faction:Entity': {
        labels: ['Faction', 'Entity'],
        properties: [
            { field_name: 'faction_id', property_name: 'externalId' },
            { field_name: 'faction_name', property_name: 'name' },
        ],
    },
    'Creature:Entity': {
        labels: ['Creature', 'Entity'],
        properties: [
            { field_name: 'creature_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'creature_name', property_name: 'name' },
            { field_name: 'created_date', property_name: 'created_date' },
        ],
    },
    'Island:Entity': {
        labels: ['Island', 'Entity'],
        properties: [
            { field_name: 'island_id', property_name: 'externalId' },
            { field_name: 'island_name', property_name: 'name' },
        ],
    },
    'Area:Entity': {
        labels: ['Area', 'Entity'],
        properties: [
            { field_name: 'location_id', property_name: 'externalId' },
            { field_name: 'location_name', property_name: 'name' },
            { field_name: 'location_position_x', property_name: 'x' },
            { field_name: 'location_position_y', property_name: 'y' },
        ],
    },
    'Plot:Entity': {
        labels: ['Plot', 'Entity'],
        properties: [{ field_name: 'plot_id', property_name: 'externalId' }],
    },
    'Patch:Entity': {
        labels: ['Patch', 'Entity'],
        properties: [{ field_name: 'patch_id', property_name: 'externalId' }],
    },
    'Item:Entity': {
        labels: ['Item', 'Entity'],
        properties: [
            { field_name: 'item_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'created_date', property_name: 'created_date' },
            { field_name: 'item_quality', property_name: 'quality' },
        ],
    },
    'Resource:Entity': {
        labels: ['Resource', 'Entity'],
        properties: [
            { field_name: 'item_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'created_date', property_name: 'created_date' },
            { field_name: 'item_quality', property_name: 'quality' },
        ],
    },
    'Inventory:Entity': {
        labels: ['Inventory', 'Entity'],
        properties: [
            { field_name: 'inventory_id', property_name: 'externalId' },
            { field_name: 'inventory_name', property_name: 'name' },
        ],
    },
    'DataTable:Entity': {
        labels: ['DataTable', 'Entity'],
        properties: [
            { field_name: 'table_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'name', property_name: 'name' },
        ],
    },
}

export const states = {
    'Location:State': {
        labels: ['Location', 'State'],
        properties: [
            { field_name: 'player_move_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'player_move_event_pos_x', property_name: 'x' },
            { field_name: 'player_move_event_pos_y', property_name: 'y' },
        ],
    },
    'Weather:State': {
        labels: ['Weather', 'State'],
        properties: [
            { field_name: 'weather_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'sun_type', property_name: 'sun' },
            { field_name: 'rain_type', property_name: 'rain' },
            { field_name: 'day_id', property_name: 'day' },
        ],
    },
    'CreatureLocation:State': {
        labels: ['CreatureLocation', 'State'],
        properties: [
            { field_name: 'creature_move_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'day_id', property_name: 'day' },
            { field_name: 'time_of_day_id', property_name: 'time_of_day' },
        ],
    },
    'CreatureActivity:State': {
        labels: ['CreatureActivity', 'State'],
        properties: [
            { field_name: 'creature_activity_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'day_id', property_name: 'day' },
            { field_name: 'time_of_day_id', property_name: 'time_of_day' },
        ],
    },
}

export const events = {
    'Foraging:Action': {
        labels: ['Foraging', 'Action'],
        properties: [
            { field_name: 'interaction_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'day_id', property_name: 'day' },
            { field_name: 'time_of_day_id', property_name: 'time_of_day' },
            { field_name: 'interaction_event_event_pos_x', property_name: 'x' },
            { field_name: 'interaction_event_event_pos_y', property_name: 'y' },
        ],
    },
    'Crafting:Action': {
        labels: ['Crafting', 'Action'],
        properties: [
            { field_name: 'interaction_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'day_id', property_name: 'day' },
            { field_name: 'time_of_day_id', property_name: 'time_of_day' },
        ],
    },
    'Gifting:Action': {
        labels: ['Gifting', 'Action'],
        properties: [
            { field_name: 'interaction_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'day_id', property_name: 'day' },
            { field_name: 'time_of_day_id', property_name: 'time_of_day' },
        ],
    },
    'Inventory:Action': {
        labels: ['Inventory', 'Action'],
        properties: [
            { field_name: 'player_item_interaction_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'type', property_name: 'type' },
            { field_name: 'interaction_event_event_pos_x', property_name: 'x' },
            { field_name: 'interaction_event_event_pos_y', property_name: 'y' },
        ],
    },
    'DinerSeating:Action': {
        labels: ['DinerSeating', 'Action'],
        properties: [
            { field_name: 'diner_seating_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'day_id', property_name: 'day' },
            { field_name: 'time_of_day_id', property_name: 'time_of_day' },
            { field_name: 'seat_id', property_name: 'seat' },
            { field_name: 'seat_type_id', property_name: 'area' },
        ],
    },
    'DinerReview:Action': {
        labels: ['DinerReview', 'Action'],
        properties: [
            { field_name: 'diner_rating_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'day_id', property_name: 'day' },
            { field_name: 'time_of_day_id', property_name: 'time_of_day' },
            { field_name: 'rating', property_name: 'rating' },
        ],
    },
    'Data:Action': {
        labels: ['Data', 'Action'],
        properties: [
            { field_name: 'player_manipulate_data_event_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'raw_time', property_name: 'time' },
            { field_name: 'table_name', property_name: 'table' },
            { field_name: 'data_event_type_id', property_name: 'type' },
        ],
    },
}

export const relationshipEntities = {
    'Friendship:Relationship': {
        labels: ['Friendship', 'Relationship'],
        properties: [
            { field_name: 'personal_rep_id', property_name: 'externalId' },
            { field_name: 'world_id', property_name: 'world' },
            { field_name: 'personal_rep_value', property_name: 'level' },
        ],
    },
}

const relationships = {
    'ItemVariety:Value': [
        { direction: 'to', typeKey: 'ItemCategory:Value', relation: 'IN_CATEGORY', match_on: 'item_category_id' },
    ],
    'ItemType:Value': [
        { direction: 'to', typeKey: 'ItemCategory:Value', relation: 'IN_CATEGORY', match_on: 'item_category_id' },
        { direction: 'to', typeKey: 'ItemVariety:Value', relation: 'OF_VARIETY', match_on: 'item_variety_id' },
    ],
    'ResourceType:Value': [
        {
            direction: 'to',
            typeKey: 'ResourceCategory:Value',
            relation: 'IN_CATEGORY',
            match_on: 'resource_category_id',
        },
        { direction: 'to', typeKey: 'ResourceVariety:Value', relation: 'OF_VARIETY', match_on: 'resource_type_id' },
    ],
    'Location:State': [
        { direction: 'from', typeKey: 'Player:Entity', relation: 'HAS_COMPONENT', match_on: 'player_id' },
        { direction: 'to', typeKey: 'Area:Entity', relation: 'IN_CONTEXT', match_on: 'location_id' },
    ],
    'Weather:State': [
        {
            direction: 'from',
            typeKey: 'Island:Entity',
            relation: 'HAS_COMPONENT',
            match_on: 'weather_event_island',
        },
    ],
    'CreatureLocation:State': [
        { direction: 'from', typeKey: 'Creature:Entity', relation: 'HAS_COMPONENT', match_on: 'creature_id' },
        { direction: 'to', typeKey: 'Area:Entity', relation: 'IN_CONTEXT', match_on: 'location_id' },
    ],
    'CreatureActivity:State': [
        { direction: 'from', typeKey: 'Creature:Entity', relation: 'HAS_COMPONENT', match_on: 'creature_id' },
        { direction: 'to', typeKey: 'ActivityType:Value', relation: 'OF_TYPE', match_on: 'activity_event_type' },
        { direction: 'to', typeKey: 'Area:Entity', relation: 'IN_CONTEXT', match_on: 'location_id' },
    ],
    'Creature:Entity': [
        { direction: 'to', typeKey: 'Faction:Entity', relation: 'HAS_COMPONENT', match_on: 'faction_id' },
        { direction: 'to', typeKey: 'Color:Value', relation: 'HAS_COMPONENT', match_on: 'color_id' },
        { direction: 'to', typeKey: 'CreatureType:Value', relation: 'HAS_COMPONENT', match_on: 'creature_type_id' },
    ],
    'Area:Entity': [
        { direction: 'to', typeKey: 'Island:Entity', relation: 'IN_CONTEXT', match_on: 'location_island' },
        {
            direction: 'to',
            typeKey: 'ActivityType:Value',
            relation: 'HAS_COMPONENT',
            match_on: 'location_creature_activity_type',
        },
    ],
    'Plot:Entity': [{ direction: 'to', typeKey: 'Area:Entity', relation: 'IN_CONTEXT', match_on: 'location_id' }],
    'Patch:Entity': [{ direction: 'to', typeKey: 'Plot:Entity', relation: 'IN_CONTEXT', match_on: 'plot_id' }],
    'Item:Entity': [{ direction: 'to', typeKey: 'ItemType:Value', relation: 'HAS_COMPONENT', match_on: 'item_def_id' }],
    'Resource:Entity': [
        { direction: 'to', typeKey: 'ResourceType:Value', relation: 'HAS_COMPONENT', match_on: 'item_def_id' },
    ],
    'Foraging:Action': [
        { direction: 'from', typeKey: 'Player:Entity', relation: 'DOES_ACTION', match_on: 'player_id' },
        { direction: 'to', typeKey: 'Area:Entity', relation: 'IN_CONTEXT', match_on: 'location_id' },
        { direction: 'to', typeKey: 'Resource:Entity', relation: 'CREATES', match_on: 'output_item1' },
    ],
    'Crafting:Action': [
        { direction: 'to', typeKey: 'Player:Entity', relation: 'DOES_ACTION', match_on: 'player_id' },
        { direction: 'from', typeKey: 'Resource:Entity', relation: 'USED_IN', match_on: 'input_item1' },
        { direction: 'from', typeKey: 'Resource:Entity', relation: 'USED_IN', match_on: 'input_item2' },
        { direction: 'to', typeKey: 'Item:Entity', relation: 'CREATES', match_on: 'output_item1' },
    ],
    'Gifting:Action': [
        { direction: 'from', typeKey: 'Player:Entity', relation: 'DOES_ACTION', match_on: 'player_id' },
        { direction: 'to', typeKey: 'Creature:Entity', relation: 'TARGETS', match_on: 'creature_id' },
        { direction: 'from', typeKey: 'Item:Entity', relation: 'USED_IN', match_on: 'input_item1' },
    ],
    'Inventory:Action': [
        { direction: 'from', typeKey: 'Player:Entity', relation: 'DOES_ACTION', match_on: 'player_id' },
        { direction: 'from', typeKey: 'Resource:Entity', relation: 'USED_IN', match_on: 'item_id', optional: true},
        { direction: 'from', typeKey: 'Item:Entity', relation: 'USED_IN', match_on: 'item_id', optional: true},
        { direction: 'to', typeKey: 'Inventory:Entity', relation: 'TARGETS', match_on: 'inventory' },
        { direction: 'to', typeKey: 'Area:Entity', relation: 'IN_CONTEXT', match_on: 'location_id' },
    ],
    'DinerSeating:Action': [
        { direction: 'from', typeKey: 'Player:Entity', relation: 'DOES_ACTION', match_on: 'player_id' },
        { direction: 'to', typeKey: 'Creature:Entity', relation: 'TARGETS', match_on: 'creature_id' },
        { direction: 'to', typeKey: 'Area:Entity', relation: 'IN_CONTEXT', match_on: 'location_id' },
    ],
    'DinerReview:Action': [
        { direction: 'from', typeKey: 'Creature:Entity', relation: 'DOES_ACTION', match_on: 'creature_id' },
        { direction: 'to', typeKey: 'Item:Entity', relation: 'TARGETS', match_on: 'item_id' },
    ],
    'Data:Action': [
        { direction: 'from', typeKey: 'Player:Entity', relation: 'DOES_ACTION', match_on: 'player_id' },
        { direction: 'to', typeKey: 'DataTable:Entity', relation: 'TARGETS', match_on: 'table_name' },
    ],
    'Friendship:Relationship': [
        { direction: 'from', typeKey: 'Player:Entity', relation: 'HAS_FRIENDSHIP', match_on: 'player_id' },
        { direction: 'from', typeKey: 'Creature:Entity', relation: 'HAS_FRIENDSHIP', match_on: 'creature_id' },
    ],
}

const dataModel = {
    nodes: {
        ...values,
        ...entities,
        ...states,
        ...events,
        ...relationshipEntities,
    },
    relationships: relationships,
}
export default dataModel