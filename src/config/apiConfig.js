/**
 * Module for defining missing FV data locally.
 * @module localData
 */

/**
 * The location ID for the diner.
 * @type {string}
 */
export const DINER_LOCATION_ID = '121'

/**
 * Object containing different types of sun.
 * @type {Object.<string, string>}
 */
export const SUN_TYPES = {
    1: 'Sunny',
    2: 'Cloudy',
}

/**
 * Object containing different types of rain.
 * @type {Object.<string, string>}
 */
export const RAIN_TYPES = {
    1: 'Rainy',
    2: 'Dry',
}

/**
 * Array of islands with their IDs and names.
 * @type {Array.<{island_id: number, island_name: string}>}
 */
export const ISLANDS = [
    { island_id: 1, island_name: 'Shadow Island' },
    { island_id: 2, island_name: 'Light Island' },
    { island_id: 3, island_name: 'Growth Island' },
    { island_id: 4, island_name: 'Stability Island' },
]

/**
 * Array of activities with their IDs and names.
 * @type {Array.<{activity_id: number, activity_name: string}>}
 */
export const ACTIVITIES = [
    { activity_id: 0, activity_name: 'None' },
    { activity_id: 1, activity_name: 'Music' },
    { activity_id: 2, activity_name: 'Craft' },
    { activity_id: 3, activity_name: 'Writing' },
    { activity_id: 4, activity_name: 'Textiles' },
]

/**
 * Array of item varieties with their IDs, names, and category IDs.
 * @type {Array.<{item_variety_id: number, item_variety_name: string, item_category_id: number}>}
 */
export const ITEM_VARIETIES = [
    { item_variety_id: 1, item_variety_name: 'Smoothie', item_category_id: 4 },
    { item_variety_id: 2, item_variety_name: 'Jelly', item_category_id: 4 },
    { item_variety_id: 3, item_variety_name: 'Pastry', item_category_id: 4 },
    { item_variety_id: 4, item_variety_name: 'Cupcake', item_category_id: 4 },
    { item_variety_id: 5, item_variety_name: 'Rejuvenation Tea', item_category_id: 2 },
    { item_variety_id: 6, item_variety_name: 'Protection Tonic', item_category_id: 2 },
    { item_variety_id: 7, item_variety_name: 'Enchantment Brew', item_category_id: 2 },
    { item_variety_id: 8, item_variety_name: 'Luminous Boba', item_category_id: 2 },
    { item_variety_id: 9, item_variety_name: 'Harmonics', item_category_id: 8 },
    { item_variety_id: 10, item_variety_name: 'Masonry', item_category_id: 8 },
    { item_variety_id: 11, item_variety_name: 'Secretspinning', item_category_id: 8 },
    { item_variety_id: 12, item_variety_name: 'Fibercraft', item_category_id: 8 },
    { item_variety_id: 13, item_variety_name: 'Growth', item_category_id: 16 },
    { item_variety_id: 14, item_variety_name: 'Stability', item_category_id: 16 },
    { item_variety_id: 15, item_variety_name: 'Shadow', item_category_id: 16 },
    { item_variety_id: 16, item_variety_name: 'Light', item_category_id: 16 },
]

export const INTERACTION_TYPES = {
    0: 'ADD',
    1: 'REMOVE',
}

export const INVENTORIES = [
    {
        inventory_id: 'Icebox',
        inventory_name: 'Icebox',
    },
    {
        inventory_id: 'Ready To Serve',
        inventory_name: 'Ready To Serve',
    },
]

/**
 * Object containing different categories of items and their subcategories.
 * @type {Object.<string, Object.<string, string[]>>}
 */
export const ITEMS = {
    Food: {
        Smoothie: ['Berry Burst Smoothie', 'Stonefruit Spritzer', 'Chocolate Delight', 'Tropical Punch'],
        Jelly: ['Berry Burst Jelly', 'Apricot Jelly', 'Chocolate Jelly', 'Tropical Fruit Gel'],
        Pastry: ['Wheatberry Pastry', 'Peach Pie', 'Chocolate Tart', 'Tropical Fruit Puff'],
        Cupcake: ['Vanilla Cupcake', 'Peach Cupcake', 'Chocolate Cupcake', 'Funfetti Cupcake'],
    },
    'Health Potion': {
        'Rejuvenation Tea': [
            'Wheatberry Green Tea',
            'Stonefruit Oolong Tea',
            'Cocoa Mint Tea',
            'Sporefruit Herbal Tea',
        ],
        'Protection Tonic': [
            'Wheatberry Guard Tonic',
            'Stonefruit Shield Syrup',
            'Cocoa Barrier Blend',
            'Sporefruit Defense Tonic',
        ],
        'Enchantment Brew': [
            'Wheatberry Luminescent Brew',
            'Stonefruit Illusion Brew',
            'Cocoa Mystic Brew',
            'Sporefruit Enigma Brew',
        ],
        'Luminous Boba': [
            'Wheatberry Glow Boba',
            'Stonefruit Crystal Boba',
            'Cocoberry Bliss Boba',
            'Sporefruit Sparkle Boba',
        ],
    },
    Gift: {
        Harmonics: ['Vitalwood Violin', 'Harmoni-crystal', 'Chitin Chime', 'Mycolumin Lyre'],
        Masonry: ['Stonelace Ivy', 'Seismi-crystal', 'Keystone Relic', 'Glowgrain Marble'],
        Secretspinning: ['Vitalink Codex', 'Mysti-crystal', 'Shadowscript Scroll', 'Mycolumin Manuscript'],
        Fibercraft: ['Lifeweave Vest', 'Prisma-crystal', 'Enchanted Shadowcloak', 'Glowthread Garment'],
    },
    'Growth Potion': {
        Growth: ['Sap Bloom Crystal', 'Sweet Blossom Crystal', 'Honey Sprout Crystal', 'Candy Vine Crystal'],
        Stability: ['Luminaector Stone', 'Silver Glaze Stone', 'Celestial Honey Stone', 'Stardust Stone'],
        Shadow: ['Midnight Shard', 'Nocturnal Sucrose Shard', 'Honeyweb Shard', 'Shadowdust Shard'],
        Light: ['Mushloom Gem', 'Sporeweb Gem', 'Honeyfung Gem', 'Fungal Fluff Gem'],
    },
}

export default {
    BASE_URL: 'https://ilkmaar-data-pre-release.fablevision-dev.com/api/',
    ENDPOINTS: {
        'World:Entity': '/worlds',
        'Player:Entity': '/players',
        'Creature:Entity': '/creatures',
        'Friendship:Relationship': '/personal-reputations',
        'Area:Entity': '/locations',
        'Plot:Entity': '/plots',
        'Patch:Entity': '/patches',
        'Faction:Entity': '/factions',
        'DataTable:Entity': '/player-manipulate-data-events',
        'CreatureType:Value': '/creature-types',
        'Color:Value': '/colors',
        'ResourceType:Value': '/item-definitions',
        'ResourceCategory:Value': '/resource-categories',
        'ResourceVariety:Value': '/resource-types',
        'ItemType:Value': '/item-definitions',
        'ItemCategory:Value': '/item-categories',
        'Item:Entity': '/items',
        'Resource:Entity': '/items',
        'Weather:State': '/weather-events',
        'Location:State': '/player-move-events',
        'CreatureLocation:State': '/creature-move-events',
        'CreatureActivity:State': '/creature-activity-events',
        'Foraging:Action': '/interaction-events',
        'Crafting:Action': '/interaction-events',
        'Gifting:Action': '/interaction-events',
        'DinerSeating:Action': '/diner-seating-events',
        'DinerReview:Action': '/diner-rating-events',
        'Inventory:Action': '/player-item-interaction-events',
        'Data:Action': '/player-manipulate-data-events',
        'FactionReputation:Relationship': '/faction-reputations',
        'Days:Entity': '/days',
        'TimeOfDays:Entity': '/time-of-days',
    },
    LOCAL_DATA: {
        'Island:Entity': ISLANDS,
        'Inventory:Entity': INVENTORIES,
        'ActivityType:Value': ACTIVITIES,
        'ItemVariety:Value': ITEM_VARIETIES,
    },
}