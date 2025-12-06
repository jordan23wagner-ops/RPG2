// Dark Realms RPG - Main Game Engine
// Top-down RPG inspired by Diablo and Runescape

// ============================================
// GAME CONFIGURATION
// ============================================

const GAME_CONFIG = {
    tileSize: 32,
    dungeonWidth: 100,  // tiles - smaller for shorter distances
    dungeonHeight: 80,  // tiles - smaller for shorter distances
    viewportWidth: 800,
    viewportHeight: 600,
    enemiesPerLevel: 30, // Doubled from 15
    bossEveryNLevels: 3,
    corridorWidth: 3 // Wider corridors (in tiles)
};

// Speed bonus ranges for item generation
const SPEED_BONUS_CONFIG = {
    rareMin: 1,
    rareMax: 5,
    epicMin: 5,
    epicMax: 10
};

// ============================================
// ITEM DEFINITIONS
// ============================================

const RARITIES = {
    common: { name: 'Common', color: '#808080', dropChance: 0.50, statMultiplier: 1.0 },
    uncommon: { name: 'Uncommon', color: '#1eff00', dropChance: 0.25, statMultiplier: 1.3 },
    rare: { name: 'Rare', color: '#0070dd', dropChance: 0.15, statMultiplier: 1.6 },
    epic: { name: 'Epic', color: '#a335ee', dropChance: 0.07, statMultiplier: 2.0 },
    legendary: { name: 'Legendary', color: '#ff8000', dropChance: 0.025, statMultiplier: 2.5 },
    mythic: { name: 'Mythic', color: '#e6cc80', dropChance: 0.005, statMultiplier: 3.5 }
};

const ITEM_TYPES = {
    weapon: {
        slot: 'weapon',
        baseStats: { attack: 10 },
        icon: '⚔️',
        names: ['Sword', 'Axe', 'Mace', 'Dagger', 'Hammer', 'Scimitar', 'Blade', 'Cleaver']
    },
    helmet: {
        slot: 'helmet',
        baseStats: { defense: 5, maxHp: 10 },
        icon: '🪖',
        names: ['Helm', 'Hood', 'Crown', 'Circlet', 'Coif', 'Cap', 'Mask']
    },
    armor: {
        slot: 'armor',
        baseStats: { defense: 15, maxHp: 25 },
        icon: '🛡️',
        names: ['Chestplate', 'Robe', 'Tunic', 'Mail', 'Brigandine', 'Vest', 'Cuirass']
    },
    shield: {
        slot: 'shield',
        baseStats: { defense: 10 },
        icon: '🛡️',
        names: ['Shield', 'Buckler', 'Tower Shield', 'Kite Shield', 'Round Shield']
    },
    boots: {
        slot: 'boots',
        baseStats: { defense: 3, speed: 1.5 }, // Base speed increased to 1.5 to work with new configurable speed bonus system (see SPEED_BONUS_CONFIG)
        icon: '👢',
        names: ['Boots', 'Greaves', 'Sandals', 'Treads', 'Sabatons', 'Shoes']
    },
    gloves: {
        slot: 'gloves',
        baseStats: { attack: 3, defense: 2 },
        icon: '🧤',
        names: ['Gloves', 'Gauntlets', 'Bracers', 'Grips', 'Handwraps']
    },
    ring: {
        slot: 'ring',
        baseStats: { attack: 2, maxMana: 10 },
        icon: '💍',
        names: ['Ring', 'Band', 'Loop', 'Signet', 'Circle']
    },
    amulet: {
        slot: 'amulet',
        baseStats: { maxHp: 15, maxMana: 15 },
        icon: '📿',
        names: ['Amulet', 'Pendant', 'Necklace', 'Talisman', 'Charm', 'Medallion']
    }
};

const RARITY_PREFIXES = {
    common: ['Old', 'Worn', 'Simple', 'Basic', 'Plain'],
    uncommon: ['Fine', 'Quality', 'Sturdy', 'Reinforced', 'Polished'],
    rare: ['Enchanted', 'Mystic', 'Arcane', 'Blessed', 'Runed'],
    epic: ['Heroic', 'Valiant', 'Noble', 'Glorious', 'Exalted'],
    legendary: ['Ancient', 'Divine', 'Celestial', 'Mythical', 'Eternal'],
    mythic: ['Godforged', 'Primordial', 'Cosmic', 'Transcendent', 'Omnipotent']
};

// Simplified potion system - only healing potions, instant pickup
const POTION_TYPES = {
    health: { name: 'Health Potion', icon: '❤️', effect: 'hp', amount: 50, color: '#dc3545' }
};

// ============================================
// SHOP/UPGRADE DEFINITIONS
// ============================================

const SHOP_UPGRADES = {
    attackUpgrade: {
        name: 'Sharpen Weapons',
        description: '+5 Base Attack',
        baseCost: 100,
        costMultiplier: 1.5,
        stat: 'baseAttack',
        amount: 5,
        maxLevel: 20,
        icon: '⚔️'
    },
    defenseUpgrade: {
        name: 'Reinforce Armor',
        description: '+3 Base Defense',
        baseCost: 80,
        costMultiplier: 1.5,
        stat: 'baseDefense',
        amount: 3,
        maxLevel: 20,
        icon: '🛡️'
    },
    healthUpgrade: {
        name: 'Vitality Training',
        description: '+25 Max HP',
        baseCost: 120,
        costMultiplier: 1.4,
        stat: 'maxHp',
        amount: 25,
        maxLevel: 20,
        icon: '❤️'
    },
    speedUpgrade: {
        name: 'Agility Training',
        description: '+0.5 Movement Speed',
        baseCost: 150,
        costMultiplier: 1.6,
        stat: 'baseSpeed',
        amount: 0.5,
        maxLevel: 10,
        icon: '👢'
    },
    potionCapacity: {
        name: 'Potion Belt',
        description: '+3 Max Potions',
        baseCost: 200,
        costMultiplier: 2,
        stat: 'maxPotions',
        amount: 3,
        maxLevel: 5,
        icon: '🧪'
    }
};

// ============================================
// DIABLO-INSPIRED FEATURES
// ============================================

// Elemental damage types
const ELEMENT_TYPES = {
    fire: { name: 'Fire', color: '#ff6600', damageBonus: 1.2 },
    ice: { name: 'Ice', color: '#00ccff', damageBonus: 1.1, slow: 0.5 },
    poison: { name: 'Poison', color: '#00ff00', damageBonus: 1.0, dot: 5 },
    lightning: { name: 'Lightning', color: '#ffff00', damageBonus: 1.3, chain: 2 }
};

// Enemy affixes (like Diablo's champion/rare modifiers)
const ENEMY_AFFIXES = [
    { name: 'Frozen', color: '#00ccff', effect: 'freeze', hpMultiplier: 1.3 },
    { name: 'Molten', color: '#ff6600', effect: 'fire', hpMultiplier: 1.4 },
    { name: 'Arcane', color: '#a335ee', effect: 'arcane', hpMultiplier: 1.5 },
    { name: 'Vampiric', color: '#8b0000', effect: 'lifesteal', hpMultiplier: 1.3 },
    { name: 'Fast', color: '#ffff00', effect: 'speed', hpMultiplier: 1.2 },
    { name: 'Shielded', color: '#4da6ff', effect: 'shield', hpMultiplier: 1.6 }
];

// ============================================
// MONSTER DEFINITIONS
// ============================================

const MONSTER_TYPES = [
    {
        name: 'Zombie',
        icon: '🧟',
        color: '#2a3a2a',  // Darker rotting green
        baseHp: 40,
        baseDamage: 6,
        baseExp: 15,
        baseGold: [2, 8],
        lootChance: 0.15,
        potionDropChance: 0.12,
        speed: 0.8,
        size: 28,
        minLevel: 1,
        isBoss: false
    },
    {
        name: 'Fallen',
        icon: '👤',
        color: '#3a2a1a',  // Dark corrupted
        baseHp: 50,
        baseDamage: 8,
        baseExp: 20,
        baseGold: [3, 10],
        lootChance: 0.18,
        potionDropChance: 0.15,
        speed: 1.5,
        size: 26,
        minLevel: 1,
        isBoss: false
    },
    {
        name: 'Skeleton',
        icon: '💀',
        color: '#3a3a3a',  // Dark gray bones
        baseHp: 60,
        baseDamage: 10,
        baseExp: 25,
        baseGold: [5, 15],
        lootChance: 0.2,
        potionDropChance: 0.18,
        speed: 1.5,
        size: 30,
        minLevel: 2,
        isBoss: false
    },
    {
        name: 'Wraith',
        icon: '👻',
        color: '#1a1a3a',  // Dark spectral
        baseHp: 70,
        baseDamage: 12,
        baseExp: 30,
        baseGold: [8, 20],
        lootChance: 0.22,
        potionDropChance: 0.2,
        speed: 2.0,
        size: 32,
        minLevel: 3,
        isBoss: false
    },
    {
        name: 'Werewolf',
        icon: '🐺',
        color: '#2a1a0a',  // Dark fur
        baseHp: 120,
        baseDamage: 18,
        baseExp: 50,
        baseGold: [15, 35],
        lootChance: 0.25,
        potionDropChance: 0.22,
        speed: 2.5,
        size: 35,
        minLevel: 4,
        isBoss: false
    },
    {
        name: 'Demon',
        icon: '😈',
        color: '#3a0000',  // Darker blood red
        baseHp: 180,
        baseDamage: 22,
        baseExp: 80,
        baseGold: [25, 50],
        lootChance: 0.28,
        potionDropChance: 0.25,
        speed: 2.2,
        size: 38,
        minLevel: 5,
        isBoss: false
    },
    {
        name: 'Elite Zombie',
        icon: '🧟',
        color: '#1a2a1a',  // Very dark green
        baseHp: 200,
        baseDamage: 25,
        baseExp: 100,
        baseGold: [30, 60],
        lootChance: 0.3,
        potionDropChance: 0.28,
        speed: 1.2,
        size: 40,
        minLevel: 6,
        isBoss: false
    },
    {
        name: 'Elite Wraith',
        icon: '👻',
        color: '#0a0a2a',  // Very dark spectral
        baseHp: 220,
        baseDamage: 28,
        baseExp: 120,
        baseGold: [40, 80],
        lootChance: 0.32,
        potionDropChance: 0.3,
        speed: 2.3,
        size: 42,
        minLevel: 7,
        isBoss: false
    },
    {
        name: 'Dragon',
        icon: '🐉',
        color: '#4a1500',  // Dark fire orange
        baseHp: 300,
        baseDamage: 35,
        baseExp: 180,
        baseGold: [60, 120],
        lootChance: 0.35,
        potionDropChance: 0.32,
        speed: 2.5,
        size: 45,
        minLevel: 8,
        isBoss: false
    },
    {
        name: 'Legendary Demon',
        icon: '😈',
        color: '#2a0000',  // Very dark blood red
        baseHp: 400,
        baseDamage: 45,
        baseExp: 250,
        baseGold: [100, 200],
        lootChance: 0.4,
        potionDropChance: 0.35,
        speed: 2.4,
        size: 50,
        minLevel: 9,
        isBoss: false
    },
    {
        name: 'Elder Dragon',
        icon: '🐲',
        color: '#2a0030',  // Dark violet
        baseHp: 500,
        baseDamage: 50,
        baseExp: 350,
        baseGold: [150, 300],
        lootChance: 0.45,
        potionDropChance: 0.38,
        speed: 2,
        size: 55,
        minLevel: 10,
        isBoss: false
    }
];

// Boss monsters for dungeon levels
const BOSS_TYPES = [
    {
        name: 'Zombie King',
        icon: '🧟',
        color: '#001a00',  // Very dark green
        baseHp: 250,
        baseDamage: 18,
        baseExp: 150,
        baseGold: [50, 100],
        lootChance: 1.0,
        potionDropChance: 0.8,
        speed: 1.0,
        size: 50,
        minLevel: 3,
        isBoss: true,
        guaranteedRarity: 'rare'
    },
    {
        name: 'Wraith Lord',
        icon: '👻',
        color: '#0a0020',  // Very dark spectral
        baseHp: 400,
        baseDamage: 25,
        baseExp: 300,
        baseGold: [100, 200],
        lootChance: 1.0,
        potionDropChance: 0.85,
        speed: 2.0,
        size: 55,
        minLevel: 6,
        isBoss: true,
        guaranteedRarity: 'epic'
    },
    {
        name: 'Demon Overlord',
        icon: '😈',
        color: '#200000',  // Very dark blood red
        baseHp: 700,
        baseDamage: 40,
        baseExp: 500,
        baseGold: [200, 400],
        lootChance: 1.0,
        potionDropChance: 0.9,
        speed: 2.2,
        size: 60,
        minLevel: 9,
        isBoss: true,
        guaranteedRarity: 'legendary'
    },
    {
        name: 'Ancient Dragon',
        icon: '🐲',
        color: '#100020',  // Dark purple/black
        baseHp: 1200,
        baseDamage: 60,
        baseExp: 1000,
        baseGold: [500, 1000],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 2.5,
        size: 70,
        minLevel: 12,
        isBoss: true,
        guaranteedRarity: 'mythic'
    }
];

// ============================================
// GAME STATE
// ============================================

const gameState = {
    currentLocation: 'town', // 'town' or 'dungeon'
    dungeonLevel: 1,
    player: {
        x: 400,
        y: 300,
        worldX: 400, // position in world coordinates
        worldY: 300,
        size: 28,
        speed: 4,
        baseSpeed: 4,
        hp: 100,
        maxHp: 100,
        mana: 50,
        maxMana: 50,
        exp: 0,
        expToLevel: 100,
        level: 1,
        gold: 50, // Start with some gold
        attack: 10,
        baseAttack: 10,
        defense: 5,
        baseDefense: 5,
        isAttacking: false,
        attackCooldown: 0,
        attackRange: 60,
        direction: 'down', // 'up', 'down', 'left', 'right'
        animFrame: 0,
        animTimer: 0,
        isMoving: false,
        equipment: {
            helmet: null,
            weapon: null,
            armor: null,
            shield: null,
            boots: null,
            gloves: null,
            ring: null,
            amulet: null
        },
        buffs: [],
        upgrades: {
            attackUpgrade: 0,
            defenseUpgrade: 0,
            healthUpgrade: 0,
            speedUpgrade: 0,
            potionCapacity: 0
        }
    },
    inventory: [],
    maxInventory: 28,
    potions: {
        health: 5,
        maxHealth: 10
    },
    monsters: [],
    loot: [],
    particles: [],
    damageNumbers: [],
    messages: [],
    keys: {
        up: false,
        down: false,
        left: false,
        right: false,
        attack: false
    },
    dungeon: {
        tiles: [],
        width: GAME_CONFIG.dungeonWidth,
        height: GAME_CONFIG.dungeonHeight,
        entrance: { x: 0, y: 0 },
        exit: { x: 0, y: 0 },
        enemiesRemaining: 0,
        totalEnemies: 0,
        bossSpawned: false,
        bossDefeated: false,
        highestLevelReached: 1
    },
    town: {
        shopOpen: false,
        dungeonEntranceX: 700,
        dungeonEntranceY: 300
    },
    camera: {
        x: 0,
        y: 0
    },
    gameTime: 0,
    regenTimer: 0,
    isPaused: false,
    showShop: false,
    // Diablo-inspired features
    corpses: [], // Persistent corpses on ground
    healthGlobes: [], // Health pickups
    ambientParticles: [], // Dark fog/embers
    screenShake: { active: false, intensity: 0, duration: 0 }
};

// ============================================
// CANVAS SETUP
// ============================================

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight - 100; // Account for messages
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ============================================
// UTILITY FUNCTIONS
// ============================================

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function darkenColor(color, factor) {
    // Parse hex color and darken it
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const newR = Math.floor(r * factor);
    const newG = Math.floor(g * factor);
    const newB = Math.floor(b * factor);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

// ============================================
// DUNGEON GENERATION
// ============================================

function generateDungeon(level) {
    const width = GAME_CONFIG.dungeonWidth;
    const height = GAME_CONFIG.dungeonHeight;
    const tiles = [];
    
    // Initialize all as walls
    for (let y = 0; y < height; y++) {
        tiles[y] = [];
        for (let x = 0; x < width; x++) {
            tiles[y][x] = 1; // 1 = wall
        }
    }
    
    // Create rooms using BSP-like approach
    const rooms = [];
    const roomCount = 6 + Math.floor(level / 2);
    
    for (let i = 0; i < roomCount; i++) {
        const roomWidth = randomRange(5, 10);
        const roomHeight = randomRange(5, 8);
        const roomX = randomRange(2, width - roomWidth - 2);
        const roomY = randomRange(2, height - roomHeight - 2);
        
        // Check if room overlaps
        let overlaps = false;
        for (const room of rooms) {
            if (roomX < room.x + room.w + 2 && roomX + roomWidth + 2 > room.x &&
                roomY < room.y + room.h + 2 && roomY + roomHeight + 2 > room.y) {
                overlaps = true;
                break;
            }
        }
        
        if (!overlaps) {
            rooms.push({ x: roomX, y: roomY, w: roomWidth, h: roomHeight });
            // Carve out room
            for (let ry = roomY; ry < roomY + roomHeight; ry++) {
                for (let rx = roomX; rx < roomX + roomWidth; rx++) {
                    tiles[ry][rx] = 0; // 0 = floor
                }
            }
        }
    }
    
    // Connect rooms with corridors (wider corridors)
    const corridorWidth = GAME_CONFIG.corridorWidth;
    for (let i = 1; i < rooms.length; i++) {
        const r1 = rooms[i - 1];
        const r2 = rooms[i];
        const x1 = Math.floor(r1.x + r1.w / 2);
        const y1 = Math.floor(r1.y + r1.h / 2);
        const x2 = Math.floor(r2.x + r2.w / 2);
        const y2 = Math.floor(r2.y + r2.h / 2);
        
        // Horizontal then vertical with wider corridors
        if (Math.random() < 0.5) {
            // Horizontal corridor
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                for (let w = -Math.floor(corridorWidth / 2); w <= Math.floor(corridorWidth / 2); w++) {
                    if (y1 + w >= 0 && y1 + w < height) {
                        tiles[y1 + w][x] = 0;
                    }
                }
            }
            // Vertical corridor
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                for (let w = -Math.floor(corridorWidth / 2); w <= Math.floor(corridorWidth / 2); w++) {
                    if (x2 + w >= 0 && x2 + w < width) {
                        tiles[y][x2 + w] = 0;
                    }
                }
            }
        } else {
            // Vertical corridor
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                for (let w = -Math.floor(corridorWidth / 2); w <= Math.floor(corridorWidth / 2); w++) {
                    if (x1 + w >= 0 && x1 + w < width) {
                        tiles[y][x1 + w] = 0;
                    }
                }
            }
            // Horizontal corridor
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                for (let w = -Math.floor(corridorWidth / 2); w <= Math.floor(corridorWidth / 2); w++) {
                    if (y2 + w >= 0 && y2 + w < height) {
                        tiles[y2 + w][x] = 0;
                    }
                }
            }
        }
    }
    
    // Set entrance in first room
    const firstRoom = rooms[0];
    const entranceX = Math.floor(firstRoom.x + firstRoom.w / 2);
    const entranceY = Math.floor(firstRoom.y + firstRoom.h / 2);
    tiles[entranceY][entranceX] = 2; // 2 = entrance
    
    // Set exit in last room
    const lastRoom = rooms[rooms.length - 1];
    const exitX = Math.floor(lastRoom.x + lastRoom.w / 2);
    const exitY = Math.floor(lastRoom.y + lastRoom.h / 2);
    tiles[exitY][exitX] = 3; // 3 = exit (stairs down)
    
    gameState.dungeon.tiles = tiles;
    gameState.dungeon.entrance = { x: entranceX, y: entranceY };
    gameState.dungeon.exit = { x: exitX, y: exitY };
    gameState.dungeon.rooms = rooms;
    
    return { entranceX, entranceY, rooms };
}

function spawnDungeonEnemies() {
    gameState.monsters = [];
    const level = gameState.dungeonLevel;
    const baseEnemyCount = GAME_CONFIG.enemiesPerLevel + Math.floor(level * 1.5);
    const rooms = gameState.dungeon.rooms;
    
    // Filter available monster types for this dungeon level
    const availableMonsters = MONSTER_TYPES.filter(m => m.minLevel <= level);
    
    // Spawn enemies in rooms (not in first room - entrance)
    for (let i = 1; i < rooms.length; i++) {
        const room = rooms[i];
        const enemiesInRoom = Math.floor(baseEnemyCount / (rooms.length - 1)) + randomRange(0, 2);
        
        for (let j = 0; j < enemiesInRoom; j++) {
            const monsterType = randomChoice(availableMonsters);
            const levelScale = 1 + (level - 1) * 0.15;
            
            const x = (room.x + randomRange(1, room.w - 2)) * GAME_CONFIG.tileSize;
            const y = (room.y + randomRange(1, room.h - 2)) * GAME_CONFIG.tileSize;
            
            const goldMin = Math.floor(monsterType.baseGold[0] * levelScale);
            const goldMax = Math.floor(monsterType.baseGold[1] * levelScale);
            
            // DIABLO FEATURE 9: Random affix chance (20% for champions)
            let affix = null;
            let affixMultiplier = 1.0;
            if (Math.random() < 0.2 && level >= 2) {
                affix = randomChoice(ENEMY_AFFIXES);
                affixMultiplier = affix.hpMultiplier;
            }
            
            gameState.monsters.push({
                id: Date.now() + Math.random(),
                ...monsterType,
                x: x,
                y: y,
                hp: Math.floor(monsterType.baseHp * levelScale * affixMultiplier),
                maxHp: Math.floor(monsterType.baseHp * levelScale * affixMultiplier),
                damage: Math.floor(monsterType.baseDamage * levelScale),
                exp: Math.floor(monsterType.baseExp * levelScale * affixMultiplier),
                gold: randomRange(goldMin, goldMax),
                lastAttack: 0,
                attackCooldown: 1000,
                animFrame: 0,
                animTimer: 0,
                affix: affix // Champion modifier
            });
        }
    }
    
    // Spawn boss every N levels
    if (level % GAME_CONFIG.bossEveryNLevels === 0 && !gameState.dungeon.bossDefeated) {
        const bossIndex = Math.min(Math.floor(level / GAME_CONFIG.bossEveryNLevels) - 1, BOSS_TYPES.length - 1);
        const bossType = BOSS_TYPES[bossIndex];
        const levelScale = 1 + (level - 1) * 0.15;
        
        // Spawn boss in last room (exit room)
        const lastRoom = rooms[rooms.length - 1];
        const bossX = (lastRoom.x + Math.floor(lastRoom.w / 2)) * GAME_CONFIG.tileSize;
        const bossY = (lastRoom.y + Math.floor(lastRoom.h / 2) + 1) * GAME_CONFIG.tileSize;
        
        const goldMin = Math.floor(bossType.baseGold[0] * levelScale);
        const goldMax = Math.floor(bossType.baseGold[1] * levelScale);
        
        gameState.monsters.push({
            id: Date.now() + Math.random(),
            ...bossType,
            x: bossX,
            y: bossY,
            hp: Math.floor(bossType.baseHp * levelScale),
            maxHp: Math.floor(bossType.baseHp * levelScale),
            damage: Math.floor(bossType.baseDamage * levelScale),
            exp: Math.floor(bossType.baseExp * levelScale),
            gold: randomRange(goldMin, goldMax),
            lastAttack: 0,
            attackCooldown: 1500,
            animFrame: 0,
            animTimer: 0
        });
        
        gameState.dungeon.bossSpawned = true;
    }
    
    gameState.dungeon.totalEnemies = gameState.monsters.length;
    gameState.dungeon.enemiesRemaining = gameState.monsters.length;
}

// ============================================
// LOCATION MANAGEMENT
// ============================================

function enterTown() {
    gameState.currentLocation = 'town';
    gameState.monsters = [];
    gameState.loot = [];
    gameState.player.worldX = 200;
    gameState.player.worldY = 300;
    gameState.player.hp = gameState.player.maxHp; // Full heal in town
    gameState.camera.x = 0;
    gameState.camera.y = 0;
    
    // Hide minimap in town
    const minimapContainer = document.getElementById('minimap-container');
    if (minimapContainer) minimapContainer.style.display = 'none';
    
    addMessage('Welcome to town! Visit the shop to spend your gold.', 'system');
    updateUI();
}

function enterDungeon(level) {
    gameState.currentLocation = 'dungeon';
    gameState.dungeonLevel = level;
    gameState.dungeon.bossSpawned = false;
    gameState.dungeon.bossDefeated = false;
    gameState.loot = [];
    
    // Track highest level reached
    if (level > gameState.dungeon.highestLevelReached) {
        gameState.dungeon.highestLevelReached = level;
    }
    
    // Generate new dungeon
    const dungeonInfo = generateDungeon(level);
    
    // Place player at entrance
    gameState.player.worldX = dungeonInfo.entranceX * GAME_CONFIG.tileSize;
    gameState.player.worldY = dungeonInfo.entranceY * GAME_CONFIG.tileSize;
    
    // Spawn enemies
    spawnDungeonEnemies();
    
    addMessage(`Entering Dungeon Level ${level}... ${gameState.dungeon.totalEnemies} enemies await!`, 'system');
    if (level % GAME_CONFIG.bossEveryNLevels === 0) {
        addMessage('A powerful BOSS guards this level!', 'combat');
    }
    updateUI();
}

function goToNextLevel() {
    enterDungeon(gameState.dungeonLevel + 1);
}

// ============================================
// SHOP SYSTEM
// ============================================

function toggleShop() {
    gameState.showShop = !gameState.showShop;
    updateShopUI();
}

function getUpgradeCost(upgradeKey) {
    const upgrade = SHOP_UPGRADES[upgradeKey];
    const currentLevel = gameState.player.upgrades[upgradeKey];
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
}

function purchaseUpgrade(upgradeKey) {
    const upgrade = SHOP_UPGRADES[upgradeKey];
    const currentLevel = gameState.player.upgrades[upgradeKey];
    const cost = getUpgradeCost(upgradeKey);
    
    if (currentLevel >= upgrade.maxLevel) {
        addMessage('This upgrade is already maxed out!', 'system');
        return;
    }
    
    if (gameState.player.gold < cost) {
        addMessage('Not enough gold!', 'system');
        return;
    }
    
    gameState.player.gold -= cost;
    gameState.player.upgrades[upgradeKey]++;
    
    // Apply upgrade
    if (upgrade.stat === 'maxPotions') {
        gameState.potions.maxHealth += upgrade.amount;
    } else if (upgrade.stat === 'maxHp') {
        // maxHp is handled by recalculateStats
        recalculateStats();
        gameState.player.hp = gameState.player.maxHp; // Full heal on HP upgrade
    } else {
        gameState.player[upgrade.stat] += upgrade.amount;
        recalculateStats();
    }
    
    addMessage(`Purchased ${upgrade.name} (Level ${gameState.player.upgrades[upgradeKey]})!`, 'loot');
    updateShopUI();
    updateUI();
}

function buyPotion() {
    const cost = 25;
    if (gameState.player.gold < cost) {
        addMessage('Not enough gold!', 'system');
        return;
    }
    if (gameState.potions.health >= gameState.potions.maxHealth) {
        addMessage('Potion inventory full!', 'system');
        return;
    }
    gameState.player.gold -= cost;
    gameState.potions.health++;
    addMessage('Purchased Health Potion!', 'loot');
    updateUI();
}

function updateShopUI() {
    const shopPanel = document.getElementById('shop-panel');
    const shopBackdrop = document.getElementById('shop-backdrop');
    if (!shopPanel) return;
    
    if (gameState.showShop && gameState.currentLocation === 'town') {
        shopPanel.style.display = 'block';
        if (shopBackdrop) shopBackdrop.style.display = 'block';
        
        // Update upgrade buttons
        for (const [key, upgrade] of Object.entries(SHOP_UPGRADES)) {
            const btn = document.getElementById(`upgrade-${key}`);
            if (btn) {
                const currentLevel = gameState.player.upgrades[key];
                const cost = getUpgradeCost(key);
                const maxed = currentLevel >= upgrade.maxLevel;
                btn.innerHTML = `${upgrade.icon} ${upgrade.name}<br>${upgrade.description}<br>Level: ${currentLevel}/${upgrade.maxLevel}<br>Cost: ${maxed ? 'MAXED' : cost + ' gold'}`;
                btn.disabled = maxed || gameState.player.gold < cost;
            }
        }
    } else {
        shopPanel.style.display = 'none';
        if (shopBackdrop) shopBackdrop.style.display = 'none';
    }
}

// ============================================
// ITEM GENERATION
// ============================================

function generateRarity(dungeonLevel = 1, guaranteed = null) {
    if (guaranteed) return guaranteed;
    
    // Better loot on higher levels
    const levelBonus = (dungeonLevel - 1) * 0.02;
    const roll = Math.random() - levelBonus;
    let cumulative = 0;
    for (const [rarity, data] of Object.entries(RARITIES)) {
        cumulative += data.dropChance;
        if (roll < cumulative) {
            return rarity;
        }
    }
    return 'common';
}

function generateItem(forcedType = null, forcedRarity = null, dungeonLevel = 1) {
    const typeKeys = Object.keys(ITEM_TYPES);
    const type = forcedType || randomChoice(typeKeys);
    const itemType = ITEM_TYPES[type];
    const rarity = forcedRarity || generateRarity(dungeonLevel);
    const rarityData = RARITIES[rarity];
    
    const prefix = randomChoice(RARITY_PREFIXES[rarity]);
    const baseName = randomChoice(itemType.names);
    
    // Scale stats with dungeon level
    const levelScale = 1 + (dungeonLevel - 1) * 0.1;
    
    const stats = {};
    for (const [stat, value] of Object.entries(itemType.baseStats)) {
        // Speed stats use base value only (not scaled by rarity) to prevent excessive values
        if (stat === 'speed') {
            stats[stat] = value; // Use base value only, bonuses added separately below
        } else {
            stats[stat] = Math.floor(value * rarityData.statMultiplier * levelScale * randomFloat(0.8, 1.2));
        }
    }
    
    // Add bonus stats for higher rarities
    if (rarity === 'rare' || rarity === 'epic' || rarity === 'legendary' || rarity === 'mythic') {
        const bonusStats = ['attack', 'defense', 'maxHp', 'maxMana', 'speed'];
        const numBonuses = rarity === 'rare' ? 1 : rarity === 'epic' ? 2 : rarity === 'legendary' ? 3 : 4;
        for (let i = 0; i < numBonuses; i++) {
            const bonusStat = randomChoice(bonusStats);
            const isSpeedStat = bonusStat === 'speed';
            if (isSpeedStat) {
                // Speed bonuses: SPEED_BONUS_CONFIG.rareMin-rareMax for rare, epicMin-epicMax for epic/legendary/mythic
                const isReallyRare = rarity === 'epic' || rarity === 'legendary' || rarity === 'mythic';
                const baseBonus = isReallyRare 
                    ? randomFloat(SPEED_BONUS_CONFIG.epicMin, SPEED_BONUS_CONFIG.epicMax) 
                    : randomFloat(SPEED_BONUS_CONFIG.rareMin, SPEED_BONUS_CONFIG.rareMax);
                const bonusValue = Math.round(baseBonus * 10) / 10;  // Round to 1 decimal for speed
                stats[bonusStat] = (stats[bonusStat] || 0) + bonusValue;
            } else {
                const baseBonus = randomRange(3, 10);
                const scaledBonus = baseBonus * rarityData.statMultiplier * levelScale;
                const bonusValue = Math.floor(scaledBonus);
                stats[bonusStat] = (stats[bonusStat] || 0) + bonusValue;
            }
        }
    }
    
    return {
        id: Date.now() + Math.random(),
        name: `${prefix} ${baseName}`,
        type: type,
        slot: itemType.slot,
        icon: itemType.icon,
        rarity: rarity,
        stats: stats,
        sellPrice: Math.floor(10 * rarityData.statMultiplier * levelScale * randomFloat(0.8, 1.5))
    };
}

// Simplified potion generation - only health potions
function generatePotion() {
    return {
        type: 'potion',
        potionType: 'health',
        ...POTION_TYPES.health
    };
}

// ============================================
// COLLISION DETECTION
// ============================================

function canMoveTo(worldX, worldY) {
    if (gameState.currentLocation === 'town') {
        // Town boundaries
        return worldX > 20 && worldX < 780 && worldY > 20 && worldY < 580;
    }
    
    // Dungeon collision
    const tileX = Math.floor(worldX / GAME_CONFIG.tileSize);
    const tileY = Math.floor(worldY / GAME_CONFIG.tileSize);
    
    if (tileY < 0 || tileY >= gameState.dungeon.height || 
        tileX < 0 || tileX >= gameState.dungeon.width) {
        return false;
    }
    
    const tile = gameState.dungeon.tiles[tileY]?.[tileX];
    return tile !== 1; // Can move if not a wall
}

// ============================================
// COMBAT SYSTEM
// ============================================

function playerAttack() {
    if (gameState.player.attackCooldown > 0) return;
    if (gameState.currentLocation === 'town') return;
    
    gameState.player.isAttacking = true;
    gameState.player.attackCooldown = 500;
    
    // Find monsters in attack range
    for (const monster of gameState.monsters) {
        const dist = distance(gameState.player.worldX, gameState.player.worldY, monster.x, monster.y);
        if (dist <= gameState.player.attackRange) {
            const damage = Math.max(1, gameState.player.attack - Math.floor(monster.baseDamage * 0.1));
            const finalDamage = Math.floor(damage * randomFloat(0.8, 1.2));
            monster.hp -= finalDamage;
            
            // Show damage number
            createDamageNumber(monster.x, monster.y, finalDamage, '#ff6b6b');
            
            // Create hit particles
            createParticles(monster.x, monster.y, monster.color, 5);
            
            addMessage(`You hit ${monster.name} for ${finalDamage} damage!`, 'combat');
            
            if (monster.hp <= 0) {
                killMonster(monster);
            }
        }
    }
    
    setTimeout(() => {
        gameState.player.isAttacking = false;
    }, 200);
}

function monsterAttack(monster) {
    if (Date.now() - monster.lastAttack < monster.attackCooldown) return;
    
    const dist = distance(gameState.player.worldX, gameState.player.worldY, monster.x, monster.y);
    if (dist <= monster.size + gameState.player.size) {
        monster.lastAttack = Date.now();
        
        const damage = Math.max(1, monster.damage - Math.floor(gameState.player.defense * 0.5));
        const finalDamage = Math.floor(damage * randomFloat(0.8, 1.2));
        gameState.player.hp -= finalDamage;
        
        createDamageNumber(gameState.player.worldX, gameState.player.worldY, finalDamage, '#ff0000');
        createParticles(gameState.player.worldX, gameState.player.worldY, '#ff0000', 3);
        
        addMessage(`${monster.name} hits you for ${finalDamage} damage!`, 'combat');
        
        if (gameState.player.hp <= 0) {
            playerDeath();
        }
    }
}

function killMonster(monster) {
    // Grant exp and gold
    gameState.player.exp += monster.exp;
    gameState.player.gold += monster.gold;
    
    const isBoss = monster.isBoss;
    const affixName = monster.affix ? monster.affix.name + ' ' : '';
    if (isBoss) {
        addMessage(`BOSS DEFEATED! ${affixName}${monster.name} vanquished! +${monster.exp} XP, +${monster.gold} Gold`, 'levelup');
        gameState.dungeon.bossDefeated = true;
        // Screen shake on boss death
        triggerScreenShake(15, 500);
    } else {
        addMessage(`${affixName}${monster.name} defeated! +${monster.exp} XP, +${monster.gold} Gold`, 'loot');
    }
    
    // Check for level up
    checkLevelUp();
    
    // DIABLO FEATURE 1: Blood splatter effects
    createBloodSplatter(monster.x, monster.y, 20);
    
    // DIABLO FEATURE 4: Persistent corpse
    gameState.corpses.push({
        x: monster.x,
        y: monster.y,
        icon: monster.icon,
        color: darkenColor(monster.color, 0.5),
        size: monster.size,
        alpha: 0.6,
        fadeTime: Date.now()
    });
    
    // Drop loot - bosses have guaranteed drops
    if (Math.random() < monster.lootChance || isBoss) {
        const guaranteedRarity = isBoss ? monster.guaranteedRarity : null;
        dropLoot(monster.x, monster.y, guaranteedRarity);
    }
    
    // DIABLO FEATURE 6: Health globe drops (50% chance)
    if (Math.random() < 0.5) {
        gameState.healthGlobes.push({
            x: monster.x + randomRange(-15, 15),
            y: monster.y + randomRange(-15, 15),
            healAmount: 30,
            createdTime: Date.now()
        });
    }
    
    // Drop health potion (instant pickup) - reduced chance since we have health globes
    if (Math.random() < (monster.potionDropChance || 0.3) * 0.5) {
        // Auto-pickup potion if space available
        if (gameState.potions.health < gameState.potions.maxHealth) {
            gameState.potions.health++;
            addMessage('Picked up Health Potion!', 'heal');
            createParticles(monster.x, monster.y, '#dc3545', 8);
        }
    }
    
    // DIABLO FEATURE 10: Death animation with fade
    monster.dying = true;
    monster.deathTime = Date.now();
    monster.deathAlpha = 1.0;
    
    // Create death particles
    createParticles(monster.x, monster.y, monster.color, 15);
    
    // Remove monster after brief delay for death animation
    setTimeout(() => {
        const index = gameState.monsters.indexOf(monster);
        if (index > -1) {
            gameState.monsters.splice(index, 1);
        }
        gameState.dungeon.enemiesRemaining = gameState.monsters.length;
        updateUI();
    }, 300);
}

// DIABLO FEATURE 1: Blood splatter
function createBloodSplatter(x, y, count) {
    for (let i = 0; i < count; i++) {
        gameState.particles.push({
            x: x,
            y: y,
            vx: randomFloat(-5, 5),
            vy: randomFloat(-5, 5),
            color: '#8b0000',
            life: 1,
            decay: randomFloat(0.01, 0.03),
            size: randomRange(2, 6)
        });
    }
}

// DIABLO FEATURE 2: Screen shake
function triggerScreenShake(intensity, duration) {
    gameState.screenShake.active = true;
    gameState.screenShake.intensity = intensity;
    gameState.screenShake.duration = duration;
    gameState.screenShake.startTime = Date.now();
}

function dropLoot(x, y, guaranteedRarity = null) {
    const item = generateItem(null, guaranteedRarity, gameState.dungeonLevel);
    const lootItem = {
        ...item,
        x: x + randomRange(-20, 20),
        y: y + randomRange(-20, 20)
    };
    
    // DIABLO FEATURE 5: Rare item beam effect for epic+ items
    if (item.rarity === 'epic' || item.rarity === 'legendary' || item.rarity === 'mythic') {
        lootItem.hasBeam = true;
        lootItem.beamColor = RARITIES[item.rarity].color;
    }
    
    gameState.loot.push(lootItem);
    addMessage(`${item.name} dropped!`, 'loot');
    showLootPanel();
}

function checkLevelUp() {
    while (gameState.player.exp >= gameState.player.expToLevel) {
        gameState.player.exp -= gameState.player.expToLevel;
        gameState.player.level++;
        gameState.player.expToLevel = Math.floor(gameState.player.expToLevel * 1.5);
        
        // Increase base stats
        gameState.player.maxHp += 10;
        gameState.player.maxMana += 5;
        gameState.player.baseAttack += 2;
        gameState.player.baseDefense += 1;
        gameState.player.hp = gameState.player.maxHp;
        gameState.player.mana = gameState.player.maxMana;
        
        addMessage(`LEVEL UP! You are now level ${gameState.player.level}!`, 'levelup');
        
        // Visual effect
        createParticles(gameState.player.worldX, gameState.player.worldY, '#ffd700', 30);
        
        recalculateStats();
    }
}

function playerDeath() {
    addMessage('You have died! Returning to town...', 'system');
    
    // Lose some gold
    const goldLost = Math.floor(gameState.player.gold * 0.1);
    gameState.player.gold -= goldLost;
    if (goldLost > 0) {
        addMessage(`You lost ${goldLost} gold.`, 'system');
    }
    
    // Return to town with half health
    gameState.player.hp = Math.floor(gameState.player.maxHp * 0.5);
    gameState.player.mana = Math.floor(gameState.player.maxMana * 0.5);
    
    enterTown();
}

// ============================================
// INVENTORY MANAGEMENT
// ============================================

function addToInventory(item) {
    if (gameState.inventory.length >= gameState.maxInventory) {
        addMessage('Inventory full!', 'system');
        return false;
    }
    gameState.inventory.push(item);
    updateInventoryUI();
    return true;
}

function removeFromInventory(index) {
    if (index >= 0 && index < gameState.inventory.length) {
        gameState.inventory.splice(index, 1);
        updateInventoryUI();
    }
}

function equipItem(item, inventoryIndex) {
    const slot = item.slot;
    const currentEquipped = gameState.player.equipment[slot];
    
    // Unequip current item if any
    if (currentEquipped) {
        if (gameState.inventory.length >= gameState.maxInventory) {
            addMessage('Inventory full! Cannot swap equipment.', 'system');
            return;
        }
        gameState.inventory.push(currentEquipped);
    }
    
    // Equip new item
    gameState.player.equipment[slot] = item;
    removeFromInventory(inventoryIndex);
    
    recalculateStats();
    updateEquipmentUI();
    updateInventoryUI();
    
    addMessage(`Equipped ${item.name}`, 'system');
}

function unequipItem(slot) {
    const item = gameState.player.equipment[slot];
    if (!item) return;
    
    if (gameState.inventory.length >= gameState.maxInventory) {
        addMessage('Inventory full!', 'system');
        return;
    }
    
    gameState.inventory.push(item);
    gameState.player.equipment[slot] = null;
    
    recalculateStats();
    updateEquipmentUI();
    updateInventoryUI();
    
    addMessage(`Unequipped ${item.name}`, 'system');
}

function sellItem(inventoryIndex) {
    const item = gameState.inventory[inventoryIndex];
    if (!item || item.type === 'potion') return;
    
    gameState.player.gold += item.sellPrice;
    removeFromInventory(inventoryIndex);
    
    addMessage(`Sold ${item.name} for ${item.sellPrice} gold`, 'loot');
    updateUI();
}

function recalculateStats() {
    const p = gameState.player;
    
    // Reset to base stats
    p.attack = p.baseAttack;
    p.defense = p.baseDefense;
    p.speed = p.baseSpeed;
    let bonusHp = 0;
    let bonusMana = 0;
    
    // Add equipment bonuses
    for (const item of Object.values(p.equipment)) {
        if (item && item.stats) {
            p.attack += item.stats.attack || 0;
            p.defense += item.stats.defense || 0;
            p.speed += item.stats.speed || 0;
            bonusHp += item.stats.maxHp || 0;
            bonusMana += item.stats.maxMana || 0;
        }
    }
    
    // Add buff bonuses
    for (const buff of p.buffs) {
        if (buff.stat === 'attack') p.attack += buff.amount;
        if (buff.stat === 'speed') p.speed += buff.amount;
    }
    
    // Update max HP/Mana (includes upgrade bonuses)
    const baseMaxHp = 100 + (p.level - 1) * 10;
    const baseMaxMana = 50 + (p.level - 1) * 5;
    const upgradeHpBonus = (p.upgrades.healthUpgrade || 0) * SHOP_UPGRADES.healthUpgrade.amount;
    p.maxHp = baseMaxHp + bonusHp + upgradeHpBonus;
    p.maxMana = baseMaxMana + bonusMana;
    
    // Clamp current values
    p.hp = Math.min(p.hp, p.maxHp);
    p.mana = Math.min(p.mana, p.maxMana);
    
    updateUI();
}

// ============================================
// POTION SYSTEM (Simplified - Health only)
// ============================================

function usePotion() {
    if (gameState.potions.health <= 0) {
        addMessage('No health potions left!', 'system');
        return;
    }
    
    if (gameState.player.hp >= gameState.player.maxHp) {
        addMessage('Already at full health!', 'system');
        return;
    }
    
    const potionData = POTION_TYPES.health;
    gameState.potions.health--;
    
    const healAmount = Math.min(potionData.amount, gameState.player.maxHp - gameState.player.hp);
    gameState.player.hp += healAmount;
    addMessage(`Healed for ${healAmount} HP!`, 'heal');
    createParticles(gameState.player.worldX, gameState.player.worldY, '#32cd32', 10);
    
    updateUI();
}

// ============================================
// VISUAL EFFECTS
// ============================================

function createParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        gameState.particles.push({
            x: x,
            y: y,
            vx: randomFloat(-3, 3),
            vy: randomFloat(-3, 3),
            color: color,
            life: 1,
            decay: randomFloat(0.02, 0.05),
            size: randomRange(3, 8)
        });
    }
}

function createDamageNumber(x, y, damage, color) {
    gameState.damageNumbers.push({
        x: x + randomRange(-10, 10),
        y: y,
        text: damage.toString(),
        color: color,
        life: 1,
        vy: -2
    });
}

function updateParticles() {
    gameState.particles = gameState.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        return p.life > 0;
    });
    
    gameState.damageNumbers = gameState.damageNumbers.filter(d => {
        d.y += d.vy;
        d.life -= 0.02;
        return d.life > 0;
    });
}

// ============================================
// MONSTER SPRITE RENDERING
// ============================================

// Helper function to draw a scary smile
// Number of teeth to draw in scary smiles
const SCARY_SMILE_TEETH_COUNT = 5;

function drawScarySmile(ctx, size, yOffset, smileWidth = 0.2, smileColor = '#ff0000') {
    ctx.save();
    // Draw evil smile curve
    ctx.strokeStyle = smileColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, yOffset, size * smileWidth, 0.2, Math.PI - 0.2);
    ctx.stroke();
    // Draw teeth
    ctx.fillStyle = '#ffffff';
    const teethWidth = size * smileWidth * 2 / SCARY_SMILE_TEETH_COUNT;
    for (let i = 0; i < SCARY_SMILE_TEETH_COUNT; i++) {
        if (i % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(-size * smileWidth + i * teethWidth + teethWidth * 0.2, yOffset - size * 0.02);
            ctx.lineTo(-size * smileWidth + i * teethWidth + teethWidth * 0.5, yOffset + size * 0.08);
            ctx.lineTo(-size * smileWidth + i * teethWidth + teethWidth * 0.8, yOffset - size * 0.02);
            ctx.closePath();
            ctx.fill();
        }
    }
    ctx.restore();
}

// Helper function to draw glowing red eyes
function drawGlowingEyes(ctx, size, leftX, rightX, y, eyeSize = 0.08) {
    // Glow effect
    ctx.save();
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 8;
    // Eyes
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(leftX, y, size * eyeSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rightX, y, size * eyeSize, 0, Math.PI * 2);
    ctx.fill();
    // Pupils
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(leftX, y, size * eyeSize * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rightX, y, size * eyeSize * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function renderMonsterSprite(ctx, monster, screenX, screenY) {
    const animOffset = monster.animFrame === 1 ? 2 : 0;
    const size = monster.size;
    const color = monster.color;
    const isBoss = monster.isBoss;
    
    ctx.save();
    ctx.translate(screenX, screenY - animOffset);
    
    // Dark aura effect for all monsters - more intense for bosses
    ctx.shadowColor = '#3a0020';
    ctx.shadowBlur = isBoss ? 25 : 10;
    
    // Boss glow effect
    if (isBoss) {
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 20;
    }
    
    // Draw different sprites based on monster name
    switch (monster.name) {
        case 'Rat':
            drawRatSprite(ctx, size, color);
            break;
        case 'Slime':
            drawSlimeSprite(ctx, size, color, monster.animFrame);
            break;
        case 'Goblin':
        case 'Goblin King':
            drawGoblinSprite(ctx, size, color, isBoss);
            break;
        case 'Skeleton':
        case 'Skeleton Lord':
            drawSkeletonSprite(ctx, size, color, isBoss);
            break;
        case 'Orc':
            drawOrcSprite(ctx, size, color);
            break;
        case 'Dark Mage':
            drawMageSprite(ctx, size, color);
            break;
        case 'Troll':
            drawTrollSprite(ctx, size, color);
            break;
        case 'Demon':
        case 'Demon Lord':
            drawDemonSprite(ctx, size, color, isBoss);
            break;
        case 'Dragon Whelp':
        case 'Elder Dragon':
        case 'Ancient Dragon':
            drawDragonSprite(ctx, size, color, isBoss);
            break;
        default:
            drawGenericMonsterSprite(ctx, size, color);
    }
    
    ctx.shadowBlur = 0;
    ctx.restore();
}

function drawRatSprite(ctx, size, color) {
    // Body - oval shape
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.8, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.ellipse(size * 0.5, -size * 0.1, size * 0.4, size * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Ears
    ctx.beginPath();
    ctx.arc(size * 0.4, -size * 0.4, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.6, -size * 0.35, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner ears - dark
    ctx.fillStyle = '#1a0010';
    ctx.beginPath();
    ctx.arc(size * 0.4, -size * 0.4, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.6, -size * 0.35, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing red eyes
    drawGlowingEyes(ctx, size, size * 0.45, size * 0.65, -size * 0.15, 0.06);
    
    // Scary smile with teeth
    ctx.save();
    ctx.translate(size * 0.55, 0);
    drawScarySmile(ctx, size, size * 0.05, 0.15, '#ff3333');
    ctx.restore();
    
    // Tail
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-size * 0.6, 0);
    ctx.quadraticCurveTo(-size * 0.9, -size * 0.3, -size, size * 0.2);
    ctx.stroke();
    
    // Legs
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.4, size * 0.3, size * 0.15, size * 0.2);
    ctx.fillRect(-size * 0.1, size * 0.3, size * 0.15, size * 0.2);
    ctx.fillRect(size * 0.15, size * 0.3, size * 0.15, size * 0.2);
    ctx.fillRect(size * 0.35, size * 0.3, size * 0.15, size * 0.2);
}

function drawSlimeSprite(ctx, size, color, animFrame) {
    // Slime body - bouncy blob shape
    const squish = animFrame === 1 ? 0.15 : 0;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, size * 0.1, size * (1 + squish), size * (0.8 - squish), 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Dark highlight/shine
    ctx.fillStyle = 'rgba(0, 50, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(-size * 0.3, -size * 0.2, size * 0.25, size * 0.15, -0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing red eyes
    drawGlowingEyes(ctx, size, -size * 0.25, size * 0.25, -size * 0.1, 0.1);
    
    // Scary smile
    drawScarySmile(ctx, size, size * 0.25, 0.25, '#ff0000');
}

function drawGoblinSprite(ctx, size, color, isBoss) {
    const scale = isBoss ? 1.3 : 1;
    
    // Body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, size * 0.2 * scale, size * 0.5 * scale, size * 0.4 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.arc(0, -size * 0.2 * scale, size * 0.4 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Ears (pointy)
    ctx.beginPath();
    ctx.moveTo(-size * 0.35 * scale, -size * 0.3 * scale);
    ctx.lineTo(-size * 0.6 * scale, -size * 0.5 * scale);
    ctx.lineTo(-size * 0.25 * scale, -size * 0.15 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(size * 0.35 * scale, -size * 0.3 * scale);
    ctx.lineTo(size * 0.6 * scale, -size * 0.5 * scale);
    ctx.lineTo(size * 0.25 * scale, -size * 0.15 * scale);
    ctx.closePath();
    ctx.fill();
    
    // Glowing red eyes
    drawGlowingEyes(ctx, size * scale, -size * 0.15 * scale, size * 0.15 * scale, -size * 0.25 * scale, 0.1);
    
    // Nose - dark
    ctx.fillStyle = '#0a1a0a';
    ctx.beginPath();
    ctx.arc(0, -size * 0.1 * scale, size * 0.08 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Scary smile with teeth
    drawScarySmile(ctx, size * scale, size * 0.02 * scale, 0.18, '#ff3333');
    
    // Arms
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.55 * scale, 0, size * 0.15 * scale, size * 0.35 * scale);
    ctx.fillRect(size * 0.4 * scale, 0, size * 0.15 * scale, size * 0.35 * scale);
    
    // Legs
    ctx.fillRect(-size * 0.3 * scale, size * 0.45 * scale, size * 0.2 * scale, size * 0.3 * scale);
    ctx.fillRect(size * 0.1 * scale, size * 0.45 * scale, size * 0.2 * scale, size * 0.3 * scale);
    
    // Boss crown - dark gold
    if (isBoss) {
        ctx.fillStyle = '#8a6c00';
        ctx.beginPath();
        ctx.moveTo(-size * 0.3, -size * 0.6);
        ctx.lineTo(-size * 0.2, -size * 0.8);
        ctx.lineTo(-size * 0.1, -size * 0.65);
        ctx.lineTo(0, -size * 0.9);
        ctx.lineTo(size * 0.1, -size * 0.65);
        ctx.lineTo(size * 0.2, -size * 0.8);
        ctx.lineTo(size * 0.3, -size * 0.6);
        ctx.closePath();
        ctx.fill();
    }
}

function drawSkeletonSprite(ctx, size, color, isBoss) {
    const boneColor = isBoss ? '#4a3a10' : color;
    
    // Ribcage/torso
    ctx.strokeStyle = boneColor;
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.1 + i * size * 0.12, size * 0.3 - i * 0.03, size * 0.08, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Spine
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.3);
    ctx.lineTo(0, size * 0.4);
    ctx.stroke();
    
    // Skull
    ctx.fillStyle = boneColor;
    ctx.beginPath();
    ctx.arc(0, -size * 0.45, size * 0.35, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye sockets
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(-size * 0.12, -size * 0.5, size * 0.1, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(size * 0.12, -size * 0.5, size * 0.1, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Red glowing eyes
    ctx.save();
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(-size * 0.12, -size * 0.5, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.12, -size * 0.5, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Nose hole
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.4);
    ctx.lineTo(-size * 0.05, -size * 0.3);
    ctx.lineTo(size * 0.05, -size * 0.3);
    ctx.closePath();
    ctx.fill();
    
    // Scary grinning teeth
    ctx.fillStyle = boneColor;
    ctx.beginPath();
    ctx.arc(0, -size * 0.2, size * 0.2, 0, Math.PI);
    ctx.fill();
    // Draw individual teeth
    ctx.fillStyle = '#1a1a1a';
    for (let i = 0; i < 6; i++) {
        ctx.fillRect(-size * 0.15 + i * size * 0.05, -size * 0.22, size * 0.02, size * 0.08);
    }
    
    // Arms (bones)
    ctx.strokeStyle = boneColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-size * 0.3, -size * 0.1);
    ctx.lineTo(-size * 0.5, size * 0.2);
    ctx.lineTo(-size * 0.4, size * 0.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(size * 0.3, -size * 0.1);
    ctx.lineTo(size * 0.5, size * 0.2);
    ctx.lineTo(size * 0.4, size * 0.4);
    ctx.stroke();
    
    // Legs (bones)
    ctx.beginPath();
    ctx.moveTo(-size * 0.1, size * 0.35);
    ctx.lineTo(-size * 0.15, size * 0.7);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(size * 0.1, size * 0.35);
    ctx.lineTo(size * 0.15, size * 0.7);
    ctx.stroke();
    
    // Boss crown - dark
    if (isBoss) {
        ctx.fillStyle = '#3a0000';
        ctx.beginPath();
        ctx.moveTo(-size * 0.25, -size * 0.75);
        ctx.lineTo(-size * 0.15, -size * 0.95);
        ctx.lineTo(0, -size * 0.8);
        ctx.lineTo(size * 0.15, -size * 0.95);
        ctx.lineTo(size * 0.25, -size * 0.75);
        ctx.closePath();
        ctx.fill();
    }
}

function drawOrcSprite(ctx, size, color) {
    // Bulky body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, size * 0.15, size * 0.6, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.arc(0, -size * 0.35, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Brow ridge - darker
    ctx.fillStyle = '#0a1a0a';
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.45, size * 0.35, size * 0.1, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    
    // Glowing red eyes
    drawGlowingEyes(ctx, size, -size * 0.15, size * 0.15, -size * 0.35, 0.08);
    
    // Tusks - yellowed
    ctx.fillStyle = '#8a8a6a';
    ctx.beginPath();
    ctx.moveTo(-size * 0.2, -size * 0.1);
    ctx.lineTo(-size * 0.25, -size * 0.35);
    ctx.lineTo(-size * 0.1, -size * 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(size * 0.2, -size * 0.1);
    ctx.lineTo(size * 0.25, -size * 0.35);
    ctx.lineTo(size * 0.1, -size * 0.15);
    ctx.closePath();
    ctx.fill();
    
    // Scary smile
    drawScarySmile(ctx, size, -size * 0.12, 0.15, '#ff3333');
    
    // Muscular arms
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(-size * 0.55, size * 0.1, size * 0.2, size * 0.35, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(size * 0.55, size * 0.1, size * 0.2, size * 0.35, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Legs
    ctx.fillRect(-size * 0.35, size * 0.5, size * 0.25, size * 0.35);
    ctx.fillRect(size * 0.1, size * 0.5, size * 0.25, size * 0.35);
}

function drawMageSprite(ctx, size, color) {
    // Robe body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-size * 0.4, -size * 0.2);
    ctx.lineTo(-size * 0.5, size * 0.7);
    ctx.lineTo(size * 0.5, size * 0.7);
    ctx.lineTo(size * 0.4, -size * 0.2);
    ctx.closePath();
    ctx.fill();
    
    // Hood
    ctx.beginPath();
    ctx.arc(0, -size * 0.3, size * 0.35, Math.PI, Math.PI * 2);
    ctx.lineTo(size * 0.35, size * 0.1);
    ctx.lineTo(-size * 0.35, size * 0.1);
    ctx.closePath();
    ctx.fill();
    
    // Face (shadowed)
    ctx.fillStyle = '#0a0a15';
    ctx.beginPath();
    ctx.arc(0, -size * 0.15, size * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing purple-red eyes
    ctx.save();
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.arc(-size * 0.08, -size * 0.2, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.08, -size * 0.2, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Scary smile in the darkness
    drawScarySmile(ctx, size, -size * 0.02, 0.12, '#ff3333');
    
    // Staff - dark wood
    ctx.strokeStyle = '#2a1a0a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(size * 0.5, -size * 0.5);
    ctx.lineTo(size * 0.5, size * 0.6);
    ctx.stroke();
    
    // Staff orb - dark purple
    ctx.save();
    ctx.shadowColor = '#9932cc';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#4a1066';
    ctx.beginPath();
    ctx.arc(size * 0.5, -size * 0.6, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Hands - gray/dead
    ctx.fillStyle = '#3a3a4a';
    ctx.beginPath();
    ctx.arc(-size * 0.3, size * 0.2, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
}

function drawTrollSprite(ctx, size, color) {
    // Large body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, size * 0.2, size * 0.7, size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head (smaller than body)
    ctx.beginPath();
    ctx.arc(0, -size * 0.4, size * 0.35, 0, Math.PI * 2);
    ctx.fill();
    
    // Warts/bumps - darker
    ctx.fillStyle = '#1a2a2a';
    ctx.beginPath();
    ctx.arc(-size * 0.2, -size * 0.35, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.15, size * 0.1, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-size * 0.4, size * 0.3, size * 0.07, 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing eyes (small and beady)
    drawGlowingEyes(ctx, size, -size * 0.1, size * 0.1, -size * 0.45, 0.06);
    
    // Big nose - darker
    ctx.fillStyle = '#1a2a2a';
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.3, size * 0.12, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Scary smile
    drawScarySmile(ctx, size, -size * 0.12, 0.18, '#ff3333');
    
    // Thick arms
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(-size * 0.65, size * 0.15, size * 0.25, size * 0.4, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(size * 0.65, size * 0.15, size * 0.25, size * 0.4, -0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Hands (clubs) - darker
    ctx.fillStyle = '#1a2a2a';
    ctx.beginPath();
    ctx.arc(-size * 0.7, size * 0.5, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.7, size * 0.5, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    // Stubby legs
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.4, size * 0.6, size * 0.3, size * 0.25);
    ctx.fillRect(size * 0.1, size * 0.6, size * 0.3, size * 0.25);
}

function drawDemonSprite(ctx, size, color, isBoss) {
    const scale = isBoss ? 1.2 : 1;
    
    // Body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, size * 0.15 * scale, size * 0.5 * scale, size * 0.45 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.arc(0, -size * 0.3 * scale, size * 0.35 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Horns - darker
    ctx.fillStyle = '#0a0000';
    ctx.beginPath();
    ctx.moveTo(-size * 0.25 * scale, -size * 0.5 * scale);
    ctx.quadraticCurveTo(-size * 0.5 * scale, -size * 0.9 * scale, -size * 0.35 * scale, -size * 0.95 * scale);
    ctx.lineTo(-size * 0.2 * scale, -size * 0.55 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(size * 0.25 * scale, -size * 0.5 * scale);
    ctx.quadraticCurveTo(size * 0.5 * scale, -size * 0.9 * scale, size * 0.35 * scale, -size * 0.95 * scale);
    ctx.lineTo(size * 0.2 * scale, -size * 0.55 * scale);
    ctx.closePath();
    ctx.fill();
    
    // Glowing eyes
    drawGlowingEyes(ctx, size * scale, -size * 0.12 * scale, size * 0.12 * scale, -size * 0.35 * scale, 0.1);
    
    // Evil smile with teeth
    drawScarySmile(ctx, size * scale, -size * 0.12 * scale, 0.18, '#ffff00');
    
    // Wings - darker
    ctx.fillStyle = '#1a0000';
    ctx.beginPath();
    ctx.moveTo(-size * 0.4 * scale, -size * 0.1 * scale);
    ctx.quadraticCurveTo(-size * 0.9 * scale, -size * 0.5 * scale, -size * 0.8 * scale, size * 0.1 * scale);
    ctx.quadraticCurveTo(-size * 0.6 * scale, 0, -size * 0.4 * scale, size * 0.2 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(size * 0.4 * scale, -size * 0.1 * scale);
    ctx.quadraticCurveTo(size * 0.9 * scale, -size * 0.5 * scale, size * 0.8 * scale, size * 0.1 * scale);
    ctx.quadraticCurveTo(size * 0.6 * scale, 0, size * 0.4 * scale, size * 0.2 * scale);
    ctx.closePath();
    ctx.fill();
    
    // Tail
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, size * 0.5 * scale);
    ctx.quadraticCurveTo(size * 0.4 * scale, size * 0.8 * scale, size * 0.2 * scale, size * 0.9 * scale);
    ctx.stroke();
    
    // Tail point
    ctx.fillStyle = '#0a0000';
    ctx.beginPath();
    ctx.moveTo(size * 0.2 * scale, size * 0.85 * scale);
    ctx.lineTo(size * 0.35 * scale, size * 0.95 * scale);
    ctx.lineTo(size * 0.15 * scale, size * 0.95 * scale);
    ctx.closePath();
    ctx.fill();
    
    // Boss aura - darker red
    if (isBoss) {
        ctx.strokeStyle = 'rgba(200, 0, 0, 0.7)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.1, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function drawDragonSprite(ctx, size, color, isBoss) {
    const scale = isBoss ? 1.3 : 1;
    
    // Body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, size * 0.1 * scale, size * 0.6 * scale, size * 0.45 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Neck and head
    ctx.beginPath();
    ctx.ellipse(size * 0.3 * scale, -size * 0.35 * scale, size * 0.25 * scale, size * 0.35 * scale, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Snout
    ctx.beginPath();
    ctx.ellipse(size * 0.55 * scale, -size * 0.5 * scale, size * 0.2 * scale, size * 0.15 * scale, -0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Nostrils with smoke - darker
    ctx.fillStyle = '#0a0000';
    ctx.beginPath();
    ctx.arc(size * 0.65 * scale, -size * 0.55 * scale, size * 0.04 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.65 * scale, -size * 0.45 * scale, size * 0.04 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing eye
    ctx.save();
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.ellipse(size * 0.4 * scale, -size * 0.45 * scale, size * 0.08 * scale, size * 0.1 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(size * 0.42 * scale, -size * 0.45 * scale, size * 0.03 * scale, size * 0.06 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Horns/spikes on head - darker
    ctx.fillStyle = '#0a0005';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(size * (0.15 + i * 0.15) * scale, -size * (0.5 + i * 0.05) * scale);
        ctx.lineTo(size * (0.1 + i * 0.15) * scale, -size * (0.75 + i * 0.1) * scale);
        ctx.lineTo(size * (0.25 + i * 0.15) * scale, -size * (0.5 + i * 0.05) * scale);
        ctx.closePath();
        ctx.fill();
    }
    
    // Dragon smile with teeth
    ctx.save();
    ctx.translate(size * 0.5 * scale, -size * 0.35 * scale);
    ctx.rotate(-0.3);
    drawScarySmile(ctx, size * scale, size * 0.02 * scale, 0.12, '#ff3333');
    ctx.restore();
    
    // Wings - darker
    ctx.fillStyle = darkenColor(color, 0.5);
    ctx.beginPath();
    ctx.moveTo(-size * 0.3 * scale, -size * 0.2 * scale);
    ctx.quadraticCurveTo(-size * scale, -size * 0.8 * scale, -size * 0.7 * scale, size * 0.1 * scale);
    ctx.quadraticCurveTo(-size * 0.5 * scale, 0, -size * 0.3 * scale, size * 0.15 * scale);
    ctx.closePath();
    ctx.fill();
    
    // Wing membrane lines
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-size * 0.3 * scale, -size * 0.1 * scale);
    ctx.lineTo(-size * 0.8 * scale, -size * 0.4 * scale);
    ctx.moveTo(-size * 0.35 * scale, 0);
    ctx.lineTo(-size * 0.7 * scale, -size * 0.15 * scale);
    ctx.stroke();
    
    // Legs with claws
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.35 * scale, size * 0.4 * scale, size * 0.2 * scale, size * 0.3 * scale);
    ctx.fillRect(size * 0.15 * scale, size * 0.4 * scale, size * 0.2 * scale, size * 0.3 * scale);
    
    // Claws - dark
    ctx.fillStyle = '#0a0a0a';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-size * 0.35 * scale + i * size * 0.08 * scale, size * 0.7 * scale);
        ctx.lineTo(-size * 0.32 * scale + i * size * 0.08 * scale, size * 0.85 * scale);
        ctx.lineTo(-size * 0.28 * scale + i * size * 0.08 * scale, size * 0.7 * scale);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(size * 0.15 * scale + i * size * 0.08 * scale, size * 0.7 * scale);
        ctx.lineTo(size * 0.18 * scale + i * size * 0.08 * scale, size * 0.85 * scale);
        ctx.lineTo(size * 0.22 * scale + i * size * 0.08 * scale, size * 0.7 * scale);
        ctx.closePath();
        ctx.fill();
    }
    
    // Tail
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-size * 0.5 * scale, size * 0.2 * scale);
    ctx.quadraticCurveTo(-size * 0.9 * scale, size * 0.5 * scale, -size * 0.85 * scale, size * 0.3 * scale);
    ctx.quadraticCurveTo(-size * 0.7 * scale, size * 0.15 * scale, -size * 0.5 * scale, size * 0.3 * scale);
    ctx.closePath();
    ctx.fill();
    
    // Tail spikes - darker
    ctx.fillStyle = '#0a0005';
    ctx.beginPath();
    ctx.moveTo(-size * 0.85 * scale, size * 0.25 * scale);
    ctx.lineTo(-size * scale, size * 0.2 * scale);
    ctx.lineTo(-size * 0.85 * scale, size * 0.35 * scale);
    ctx.closePath();
    ctx.fill();
    
    // Boss aura - darker purple
    if (isBoss) {
        ctx.strokeStyle = 'rgba(80, 0, 100, 0.8)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.2, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function drawGenericMonsterSprite(ctx, size, color) {
    // Generic humanoid monster - dark and scary
    ctx.fillStyle = color;
    
    // Body
    ctx.beginPath();
    ctx.ellipse(0, size * 0.1, size * 0.4, size * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.arc(0, -size * 0.4, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing red eyes
    drawGlowingEyes(ctx, size, -size * 0.1, size * 0.1, -size * 0.45, 0.08);
    
    // Scary smile
    drawScarySmile(ctx, size, -size * 0.25, 0.15, '#ff3333');
    
    // Arms
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.55, -size * 0.1, size * 0.15, size * 0.4);
    ctx.fillRect(size * 0.4, -size * 0.1, size * 0.15, size * 0.4);
    
    // Legs
    ctx.fillRect(-size * 0.25, size * 0.4, size * 0.15, size * 0.35);
    ctx.fillRect(size * 0.1, size * 0.4, size * 0.15, size * 0.35);
}

// Helper function to darken a color
function darkenColor(color, factor) {
    // Convert hex to RGB, darken, convert back
    let r, g, b;
    if (color.startsWith('#')) {
        let hex = color.slice(1);
        // Support both 3-character and 6-character hex colors
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            return color; // Invalid hex, return as-is
        }
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        return color; // Return as-is if not hex
    }
    
    r = Math.floor(r * factor);
    g = Math.floor(g * factor);
    b = Math.floor(b * factor);
    
    return `rgb(${r}, ${g}, ${b})`;
}

// ============================================
// ITEM SPRITE RENDERING
// ============================================

function renderItemSprite(ctx, item, screenX, screenY, size = 20) {
    const rarityColor = RARITIES[item.rarity]?.color || '#fff';
    
    ctx.save();
    ctx.translate(screenX, screenY);
    
    // Glow effect for rarity
    ctx.shadowColor = rarityColor;
    ctx.shadowBlur = 10;
    
    switch (item.slot || item.type) {
        case 'weapon':
            drawWeaponSprite(ctx, size, rarityColor);
            break;
        case 'helmet':
            drawHelmetSprite(ctx, size, rarityColor);
            break;
        case 'armor':
            drawArmorSprite(ctx, size, rarityColor);
            break;
        case 'shield':
            drawShieldSprite(ctx, size, rarityColor);
            break;
        case 'boots':
            drawBootsSprite(ctx, size, rarityColor);
            break;
        case 'gloves':
            drawGlovesSprite(ctx, size, rarityColor);
            break;
        case 'ring':
            drawRingSprite(ctx, size, rarityColor);
            break;
        case 'amulet':
            drawAmuletSprite(ctx, size, rarityColor);
            break;
        case 'potion':
            drawPotionSprite(ctx, size);
            break;
        default:
            drawGenericItemSprite(ctx, size, rarityColor);
    }
    
    ctx.shadowBlur = 0;
    ctx.restore();
}

function drawWeaponSprite(ctx, size, color) {
    // Blade
    ctx.fillStyle = '#c0c0c0';
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.9);
    ctx.lineTo(size * 0.15, -size * 0.2);
    ctx.lineTo(0, 0);
    ctx.lineTo(-size * 0.15, -size * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Guard
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.3, 0, size * 0.6, size * 0.12);
    
    // Handle
    ctx.fillStyle = '#5c3d2e';
    ctx.fillRect(-size * 0.08, size * 0.12, size * 0.16, size * 0.5);
    
    // Pommel
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, size * 0.7, size * 0.12, 0, Math.PI * 2);
    ctx.fill();
}

function drawHelmetSprite(ctx, size, color) {
    // Main helm
    ctx.fillStyle = '#707080';
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.5, Math.PI, 0);
    ctx.lineTo(size * 0.5, size * 0.3);
    ctx.lineTo(-size * 0.5, size * 0.3);
    ctx.closePath();
    ctx.fill();
    
    // Visor
    ctx.fillStyle = '#505060';
    ctx.fillRect(-size * 0.4, size * 0.05, size * 0.8, size * 0.15);
    
    // Eye slit
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(-size * 0.3, size * 0.08, size * 0.2, size * 0.08);
    ctx.fillRect(size * 0.1, size * 0.08, size * 0.2, size * 0.08);
    
    // Accent
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.05, -size * 0.5, size * 0.1, size * 0.3);
}

function drawArmorSprite(ctx, size, color) {
    // Chestplate
    ctx.fillStyle = '#707080';
    ctx.beginPath();
    ctx.moveTo(-size * 0.4, -size * 0.5);
    ctx.lineTo(size * 0.4, -size * 0.5);
    ctx.lineTo(size * 0.5, size * 0.5);
    ctx.lineTo(-size * 0.5, size * 0.5);
    ctx.closePath();
    ctx.fill();
    
    // Center ridge
    ctx.fillStyle = '#606070';
    ctx.fillRect(-size * 0.05, -size * 0.4, size * 0.1, size * 0.8);
    
    // Accent trim
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.4, -size * 0.52, size * 0.8, size * 0.08);
    ctx.fillRect(-size * 0.5, size * 0.45, size * 1, size * 0.08);
}

function drawShieldSprite(ctx, size, color) {
    // Shield body
    ctx.fillStyle = '#606070';
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.6);
    ctx.lineTo(size * 0.5, -size * 0.3);
    ctx.lineTo(size * 0.5, size * 0.2);
    ctx.lineTo(0, size * 0.6);
    ctx.lineTo(-size * 0.5, size * 0.2);
    ctx.lineTo(-size * 0.5, -size * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#404050';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Shield emblem
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
    ctx.fill();
}

function drawBootsSprite(ctx, size, color) {
    // Boot
    ctx.fillStyle = '#5c3d2e';
    ctx.beginPath();
    ctx.moveTo(-size * 0.3, -size * 0.5);
    ctx.lineTo(size * 0.1, -size * 0.5);
    ctx.lineTo(size * 0.1, size * 0.2);
    ctx.lineTo(size * 0.4, size * 0.2);
    ctx.lineTo(size * 0.4, size * 0.5);
    ctx.lineTo(-size * 0.3, size * 0.5);
    ctx.closePath();
    ctx.fill();
    
    // Boot trim
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.3, -size * 0.52, size * 0.4, size * 0.08);
    
    // Sole
    ctx.fillStyle = '#3a2515';
    ctx.fillRect(-size * 0.3, size * 0.4, size * 0.7, size * 0.12);
}

function drawGlovesSprite(ctx, size, color) {
    // Glove base
    ctx.fillStyle = '#8b6914';
    ctx.beginPath();
    ctx.moveTo(-size * 0.3, -size * 0.3);
    ctx.lineTo(size * 0.3, -size * 0.3);
    ctx.lineTo(size * 0.3, size * 0.5);
    ctx.lineTo(-size * 0.3, size * 0.5);
    ctx.closePath();
    ctx.fill();
    
    // Fingers
    ctx.fillRect(-size * 0.25, -size * 0.5, size * 0.12, size * 0.25);
    ctx.fillRect(-size * 0.08, -size * 0.55, size * 0.12, size * 0.3);
    ctx.fillRect(size * 0.08, -size * 0.5, size * 0.12, size * 0.25);
    
    // Thumb
    ctx.fillRect(size * 0.25, -size * 0.1, size * 0.15, size * 0.25);
    
    // Accent
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.3, size * 0.35, size * 0.6, size * 0.08);
}

function drawRingSprite(ctx, size, color) {
    // Ring band
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = size * 0.15;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.35, 0, Math.PI * 2);
    ctx.stroke();
    
    // Gem
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.55);
    ctx.lineTo(size * 0.15, -size * 0.35);
    ctx.lineTo(0, -size * 0.25);
    ctx.lineTo(-size * 0.15, -size * 0.35);
    ctx.closePath();
    ctx.fill();
    
    // Gem shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(-size * 0.05, -size * 0.45, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
}

function drawAmuletSprite(ctx, size, color) {
    // Chain
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -size * 0.3, size * 0.35, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();
    
    // Pendant
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.1);
    ctx.lineTo(size * 0.2, size * 0.2);
    ctx.lineTo(0, size * 0.5);
    ctx.lineTo(-size * 0.2, size * 0.2);
    ctx.closePath();
    ctx.fill();
    
    // Center gem
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, size * 0.2, size * 0.12, 0, Math.PI * 2);
    ctx.fill();
}

function drawPotionSprite(ctx, size) {
    // Bottle
    ctx.fillStyle = '#2a2a4a';
    ctx.beginPath();
    ctx.moveTo(-size * 0.1, -size * 0.5);
    ctx.lineTo(size * 0.1, -size * 0.5);
    ctx.lineTo(size * 0.1, -size * 0.3);
    ctx.lineTo(size * 0.3, -size * 0.1);
    ctx.lineTo(size * 0.3, size * 0.4);
    ctx.quadraticCurveTo(size * 0.3, size * 0.5, 0, size * 0.5);
    ctx.quadraticCurveTo(-size * 0.3, size * 0.5, -size * 0.3, size * 0.4);
    ctx.lineTo(-size * 0.3, -size * 0.1);
    ctx.lineTo(-size * 0.1, -size * 0.3);
    ctx.closePath();
    ctx.fill();
    
    // Liquid
    ctx.fillStyle = '#dc3545';
    ctx.beginPath();
    ctx.moveTo(-size * 0.25, 0);
    ctx.lineTo(size * 0.25, 0);
    ctx.lineTo(size * 0.25, size * 0.35);
    ctx.quadraticCurveTo(size * 0.25, size * 0.45, 0, size * 0.45);
    ctx.quadraticCurveTo(-size * 0.25, size * 0.45, -size * 0.25, size * 0.35);
    ctx.closePath();
    ctx.fill();
    
    // Cork
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(-size * 0.12, -size * 0.6, size * 0.24, size * 0.15);
    
    // Shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(-size * 0.2, -size * 0.2, size * 0.1, size * 0.4);
}

function drawGenericItemSprite(ctx, size, color) {
    // Generic treasure/item
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.5);
    ctx.lineTo(size * 0.4, -size * 0.2);
    ctx.lineTo(size * 0.4, size * 0.3);
    ctx.lineTo(0, size * 0.5);
    ctx.lineTo(-size * 0.4, size * 0.3);
    ctx.lineTo(-size * 0.4, -size * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = darkenColor(color, 0.7);
    ctx.lineWidth = 2;
    ctx.stroke();
}

// ============================================
// INPUT HANDLING
// ============================================

document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
            gameState.keys.up = true;
            gameState.player.direction = 'up';
            break;
        case 'ArrowDown':
        case 'KeyS':
            gameState.keys.down = true;
            gameState.player.direction = 'down';
            break;
        case 'ArrowLeft':
        case 'KeyA':
            gameState.keys.left = true;
            gameState.player.direction = 'left';
            break;
        case 'ArrowRight':
        case 'KeyD':
            gameState.keys.right = true;
            gameState.player.direction = 'right';
            break;
        case 'Space':
            e.preventDefault();
            playerAttack();
            break;
        case 'Digit1':
        case 'KeyQ':
            usePotion();
            break;
        case 'KeyE':
            // Interact - enter dungeon, go to next level, open shop
            handleInteraction();
            break;
        case 'Escape':
            if (gameState.showShop) {
                toggleShop();
            }
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
            gameState.keys.up = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            gameState.keys.down = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            gameState.keys.left = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            gameState.keys.right = false;
            break;
    }
});

function handleInteraction() {
    const p = gameState.player;
    
    if (gameState.currentLocation === 'town') {
        // Check if near dungeon entrance
        const distToDungeon = distance(p.worldX, p.worldY, gameState.town.dungeonEntranceX, gameState.town.dungeonEntranceY);
        if (distToDungeon < 60) {
            // Continue from current dungeon level (enemies respawn)
            enterDungeon(gameState.dungeonLevel);
            return;
        }
        
        // Check if near shop
        const distToShop = distance(p.worldX, p.worldY, 400, 150);
        if (distToShop < 80) {
            toggleShop();
            return;
        }
    } else if (gameState.currentLocation === 'dungeon') {
        // Check if at dungeon entrance (return to town)
        const entranceX = gameState.dungeon.entrance.x * GAME_CONFIG.tileSize;
        const entranceY = gameState.dungeon.entrance.y * GAME_CONFIG.tileSize;
        const distToEntrance = distance(p.worldX, p.worldY, entranceX, entranceY);
        if (distToEntrance < 40) {
            enterTown();
            return;
        }
        
        // Check if at exit (go to next level) - only if boss is defeated on boss levels
        const exitX = gameState.dungeon.exit.x * GAME_CONFIG.tileSize;
        const exitY = gameState.dungeon.exit.y * GAME_CONFIG.tileSize;
        const distToExit = distance(p.worldX, p.worldY, exitX, exitY);
        if (distToExit < 40) {
            const isBossLevel = gameState.dungeonLevel % GAME_CONFIG.bossEveryNLevels === 0;
            if (isBossLevel && !gameState.dungeon.bossDefeated) {
                addMessage('Defeat the boss to proceed!', 'combat');
                return;
            }
            goToNextLevel();
            return;
        }
    }
}

// ============================================
// UI UPDATES
// ============================================

function updateUI() {
    // Stats bars
    const hpPercent = (gameState.player.hp / gameState.player.maxHp) * 100;
    const manaPercent = (gameState.player.mana / gameState.player.maxMana) * 100;
    const expPercent = (gameState.player.exp / gameState.player.expToLevel) * 100;
    
    document.getElementById('hp-bar').style.width = `${hpPercent}%`;
    document.getElementById('mana-bar').style.width = `${manaPercent}%`;
    document.getElementById('exp-bar').style.width = `${expPercent}%`;
    
    document.getElementById('hp-text').textContent = `${Math.floor(gameState.player.hp)}/${gameState.player.maxHp}`;
    document.getElementById('mana-text').textContent = `${Math.floor(gameState.player.mana)}/${gameState.player.maxMana}`;
    document.getElementById('exp-text').textContent = `${Math.floor(gameState.player.exp)}/${gameState.player.expToLevel}`;
    
    // Character stats
    document.getElementById('player-level').textContent = gameState.player.level;
    document.getElementById('stat-attack').textContent = gameState.player.attack;
    document.getElementById('stat-defense').textContent = gameState.player.defense;
    document.getElementById('stat-speed').textContent = gameState.player.speed.toFixed(1);
    
    // Gold
    document.getElementById('gold-amount').textContent = gameState.player.gold;
    
    // Potions (simplified - just health)
    document.getElementById('hp-potion-count').textContent = `${gameState.potions.health}/${gameState.potions.maxHealth}`;
    
    // Location info
    const locationEl = document.getElementById('location-info');
    if (locationEl) {
        if (gameState.currentLocation === 'town') {
            locationEl.textContent = 'Town';
            locationEl.style.color = '#32cd32';
        } else {
            const isBossLevel = gameState.dungeonLevel % GAME_CONFIG.bossEveryNLevels === 0;
            locationEl.textContent = `Dungeon Level ${gameState.dungeonLevel}${isBossLevel ? ' (BOSS)' : ''}`;
            locationEl.style.color = isBossLevel ? '#ff6b6b' : '#ffc107';
        }
    }
    
    // Enemy count
    const enemyCountEl = document.getElementById('enemy-count');
    if (enemyCountEl) {
        if (gameState.currentLocation === 'dungeon') {
            enemyCountEl.textContent = `Enemies: ${gameState.dungeon.enemiesRemaining}/${gameState.dungeon.totalEnemies}`;
            enemyCountEl.style.display = 'block';
        } else {
            enemyCountEl.style.display = 'none';
        }
    }
}

function updateInventoryUI() {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';
    
    for (let i = 0; i < gameState.maxInventory; i++) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';
        slot.dataset.index = i;
        
        const item = gameState.inventory[i];
        if (item) {
            slot.classList.add('has-item', `rarity-${item.rarity}`);
            slot.textContent = item.icon;
            slot.addEventListener('mouseenter', (e) => showTooltip(item, e));
            slot.addEventListener('mouseleave', hideTooltip);
            slot.addEventListener('click', () => handleInventoryClick(i));
        }
        
        grid.appendChild(slot);
    }
    
    document.getElementById('inventory-count').textContent = `(${gameState.inventory.length}/${gameState.maxInventory})`;
}

function updateEquipmentUI() {
    const rarityClasses = Object.keys(RARITIES).map(r => `rarity-${r}`);
    
    for (const [slot, item] of Object.entries(gameState.player.equipment)) {
        const slotElement = document.getElementById(`slot-${slot}`);
        if (!slotElement) continue;
        
        // Remove all rarity classes dynamically
        slotElement.classList.remove('equipped', ...rarityClasses);
        
        const iconElement = slotElement.querySelector('.slot-icon');
        
        if (item) {
            slotElement.classList.add('equipped', `rarity-${item.rarity}`);
            iconElement.textContent = item.icon;
            slotElement.addEventListener('mouseenter', (e) => showTooltip(item, e));
            slotElement.addEventListener('mouseleave', hideTooltip);
        } else {
            // Reset to default icons
            const defaultIcons = {
                helmet: '🎩', weapon: '⚔️', armor: '🛡️', shield: '🛡️',
                boots: '👢', gloves: '🧤', ring: '💍', amulet: '📿'
            };
            iconElement.textContent = defaultIcons[slot] || '❓';
        }
    }
}

function handleInventoryClick(index) {
    const item = gameState.inventory[index];
    if (!item) return;
    
    if (item.type === 'potion') {
        // Add health potion to inventory
        if (gameState.potions.health < gameState.potions.maxHealth) {
            gameState.potions.health++;
            removeFromInventory(index);
            addMessage(`Added ${item.name} to potion inventory`, 'system');
            updateUI();
        } else {
            addMessage('Potion inventory full!', 'system');
        }
    } else {
        // Equip item
        equipItem(item, index);
    }
}

// Setup equipment slot clicks
document.querySelectorAll('.equipment-slot').forEach(slot => {
    slot.addEventListener('click', () => {
        const slotName = slot.dataset.slot;
        if (gameState.player.equipment[slotName]) {
            unequipItem(slotName);
        }
    });
});

// ============================================
// TOOLTIP SYSTEM
// ============================================

function showTooltip(item, event) {
    const tooltip = document.getElementById('item-tooltip');
    const nameEl = document.getElementById('tooltip-name');
    const typeEl = document.getElementById('tooltip-type');
    const rarityEl = document.getElementById('tooltip-rarity');
    const statsEl = document.getElementById('tooltip-stats');
    const descEl = document.getElementById('tooltip-description');
    const actionsEl = document.getElementById('tooltip-actions');
    
    nameEl.textContent = item.name;
    nameEl.className = `tooltip-name rarity-${item.rarity}`;
    
    typeEl.textContent = item.type.charAt(0).toUpperCase() + item.type.slice(1);
    rarityEl.textContent = RARITIES[item.rarity].name;
    rarityEl.style.color = RARITIES[item.rarity].color;
    
    // Stat name lookup for proper display
    const statDisplayNames = {
        attack: 'Attack',
        defense: 'Defense',
        maxHp: 'Max HP',
        maxMana: 'Max Mana',
        speed: 'Speed'
    };
    
    statsEl.innerHTML = '';
    if (item.stats) {
        for (const [stat, value] of Object.entries(item.stats)) {
            const statEl = document.createElement('div');
            statEl.className = 'tooltip-stat positive';
            const statName = statDisplayNames[stat] || stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            statEl.textContent = `+${value} ${statName}`;
            statsEl.appendChild(statEl);
        }
    }
    
    // Generate flavor text based on rarity
    const flavorTexts = {
        common: 'A basic piece of equipment.',
        uncommon: 'Better than average quality.',
        rare: 'Imbued with magical properties.',
        epic: 'Crafted by master artisans.',
        legendary: 'A weapon of great renown.',
        mythic: 'Forged by the gods themselves.'
    };
    descEl.textContent = flavorTexts[item.rarity];
    
    if (item.type !== 'potion') {
        actionsEl.textContent = `Click to equip | Sell: ${item.sellPrice} gold`;
    } else {
        actionsEl.textContent = 'Click to add to quick slots';
    }
    
    tooltip.style.display = 'block';
    
    // Position tooltip
    const x = event.clientX + 15;
    const y = event.clientY + 15;
    tooltip.style.left = `${Math.min(x, window.innerWidth - tooltip.offsetWidth - 10)}px`;
    tooltip.style.top = `${Math.min(y, window.innerHeight - tooltip.offsetHeight - 10)}px`;
}

function hideTooltip() {
    document.getElementById('item-tooltip').style.display = 'none';
}

// ============================================
// LOOT PANEL
// ============================================

function showLootPanel() {
    const panel = document.getElementById('loot-panel');
    const itemsContainer = document.getElementById('loot-items');
    
    // Only show nearby loot
    const nearbyLoot = gameState.loot.filter(l => 
        distance(gameState.player.worldX, gameState.player.worldY, l.x, l.y) < 100
    );
    
    if (nearbyLoot.length === 0) {
        panel.style.display = 'none';
        return;
    }
    
    panel.style.display = 'block';
    itemsContainer.innerHTML = '';
    
    nearbyLoot.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'loot-item';
        itemEl.style.color = RARITIES[item.rarity]?.color || '#fff';
        itemEl.textContent = `${item.icon} ${item.name}`;
        itemEl.addEventListener('click', () => pickupLoot(item));
        itemsContainer.appendChild(itemEl);
    });
}

function pickupLoot(item) {
    const index = gameState.loot.indexOf(item);
    if (index === -1) return;
    
    // Auto-pickup potions directly to inventory
    if (item.type === 'potion') {
        if (gameState.potions.health < gameState.potions.maxHealth) {
            gameState.potions.health++;
            addMessage(`Picked up ${item.name}`, 'loot');
        } else {
            addMessage('Potion inventory full!', 'system');
            return;
        }
    } else {
        if (!addToInventory(item)) return;
        addMessage(`Picked up ${item.name}`, 'loot');
    }
    
    gameState.loot.splice(index, 1);
    showLootPanel();
}

document.getElementById('loot-all-btn').addEventListener('click', () => {
    const nearbyLoot = gameState.loot.filter(l => 
        distance(gameState.player.worldX, gameState.player.worldY, l.x, l.y) < 100
    );
    
    for (const item of [...nearbyLoot]) {
        pickupLoot(item);
    }
});

// ============================================
// MESSAGE SYSTEM
// ============================================

function addMessage(text, type = 'system') {
    gameState.messages.unshift({ text, type, time: Date.now() });
    if (gameState.messages.length > 50) {
        gameState.messages.pop();
    }
    
    const messagesContainer = document.getElementById('game-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `game-message message-${type}`;
    messageEl.textContent = text;
    messagesContainer.insertBefore(messageEl, messagesContainer.firstChild);
    
    // Remove old messages
    while (messagesContainer.children.length > 20) {
        messagesContainer.removeChild(messagesContainer.lastChild);
    }
}

// ============================================
// GAME LOOP
// ============================================

function update(deltaTime) {
    if (gameState.isPaused) return;
    
    gameState.gameTime += deltaTime;
    
    // Update cooldowns (deltaTime is in seconds, cooldown is in ms)
    if (gameState.player.attackCooldown > 0) {
        gameState.player.attackCooldown -= deltaTime * 1000;
    }
    
    // Update buffs (simplified - no buff potions now)
    gameState.player.buffs = gameState.player.buffs.filter(buff => {
        if (Date.now() > buff.endTime) {
            addMessage(`${buff.stat} buff expired`, 'system');
            recalculateStats();
            return false;
        }
        return true;
    });
    
    // Player movement with collision
    const p = gameState.player;
    let newX = p.worldX;
    let newY = p.worldY;
    let isMoving = false;
    
    if (gameState.keys.up) { newY -= p.speed; isMoving = true; }
    if (gameState.keys.down) { newY += p.speed; isMoving = true; }
    if (gameState.keys.left) { newX -= p.speed; isMoving = true; }
    if (gameState.keys.right) { newX += p.speed; isMoving = true; }
    
    // Check collision and apply movement
    if (canMoveTo(newX, p.worldY)) p.worldX = newX;
    if (canMoveTo(p.worldX, newY)) p.worldY = newY;
    
    p.isMoving = isMoving;
    
    // Animation timer
    if (isMoving) {
        p.animTimer += deltaTime;
        if (p.animTimer > 0.15) {
            p.animTimer = 0;
            p.animFrame = (p.animFrame + 1) % 4;
        }
    } else {
        p.animFrame = 0;
    }
    
    // Update camera for dungeon (center on player)
    if (gameState.currentLocation === 'dungeon') {
        const dungeonPixelWidth = gameState.dungeon.width * GAME_CONFIG.tileSize;
        const dungeonPixelHeight = gameState.dungeon.height * GAME_CONFIG.tileSize;
        
        gameState.camera.x = clamp(
            p.worldX - canvas.width / 2,
            0,
            Math.max(0, dungeonPixelWidth - canvas.width)
        );
        gameState.camera.y = clamp(
            p.worldY - canvas.height / 2,
            0,
            Math.max(0, dungeonPixelHeight - canvas.height)
        );
    }
    
    // Monster AI (only in dungeon)
    if (gameState.currentLocation === 'dungeon') {
        for (const monster of gameState.monsters) {
            // Move towards player if close enough
            const dx = p.worldX - monster.x;
            const dy = p.worldY - monster.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Only chase if within aggro range
            const aggroRange = 250;
            if (dist < aggroRange && dist > 0) {
                const moveX = (dx / dist) * monster.speed;
                const moveY = (dy / dist) * monster.speed;
                
                // Basic collision check for monsters
                const newMonsterX = monster.x + moveX;
                const newMonsterY = monster.y + moveY;
                if (canMoveTo(newMonsterX, monster.y)) monster.x = newMonsterX;
                if (canMoveTo(monster.x, newMonsterY)) monster.y = newMonsterY;
            }
            
            // Update monster animation
            monster.animTimer = (monster.animTimer || 0) + deltaTime;
            if (monster.animTimer > 0.2) {
                monster.animTimer = 0;
                monster.animFrame = ((monster.animFrame || 0) + 1) % 2;
            }
            
            // Attack player
            monsterAttack(monster);
        }
    }
    
    // Update particles
    updateParticles();
    
    // HP/Mana regeneration (every 1 second) - faster in town
    gameState.regenTimer += deltaTime;
    const regenRate = gameState.currentLocation === 'town' ? 0.5 : 1.0;
    if (gameState.regenTimer >= regenRate) {
        gameState.regenTimer = 0;
        const hpRegen = gameState.currentLocation === 'town' ? 5 : 1;
        const manaRegen = gameState.currentLocation === 'town' ? 3 : 0.5;
        if (p.hp < p.maxHp) p.hp = Math.min(p.maxHp, p.hp + hpRegen);
        if (p.mana < p.maxMana) p.mana = Math.min(p.maxMana, p.mana + manaRegen);
    }
    
    // Update loot panel visibility
    showLootPanel();
    
    // DIABLO FEATURE 6: Health globe pickup
    if (gameState.currentLocation === 'dungeon') {
        for (let i = gameState.healthGlobes.length - 1; i >= 0; i--) {
            const globe = gameState.healthGlobes[i];
            const dist = distance(p.worldX, p.worldY, globe.x, globe.y);
            if (dist < 40) {
                // Pick up globe
                const healAmount = Math.min(globe.healAmount, p.maxHp - p.hp);
                p.hp += healAmount;
                if (healAmount > 0) {
                    addMessage(`+${healAmount} HP from Health Globe!`, 'heal');
                    createParticles(globe.x, globe.y, '#ff0000', 10);
                }
                gameState.healthGlobes.splice(i, 1);
            } else if (Date.now() - globe.createdTime > 30000) {
                // Remove old globes after 30 seconds
                gameState.healthGlobes.splice(i, 1);
            }
        }
        
        // DIABLO FEATURE 3: Ambient dark particles (fog/embers)
        if (Math.random() < 0.3) {
            const spawnX = p.worldX + randomRange(-400, 400);
            const spawnY = p.worldY + randomRange(-300, 300);
            gameState.ambientParticles.push({
                x: spawnX,
                y: spawnY,
                vx: randomFloat(-0.5, 0.5),
                vy: randomFloat(-1, -0.3),
                color: randomChoice(['#1a1a2a', '#2a1a1a', '#ff4500']),
                life: randomFloat(0.3, 0.8),
                decay: randomFloat(0.002, 0.005),
                size: randomRange(3, 8)
            });
        }
        
        // Clean up old corpses (fade after 10 seconds)
        gameState.corpses = gameState.corpses.filter(corpse => {
            const age = Date.now() - corpse.fadeTime;
            if (age > 10000) return false;
            corpse.alpha = 0.6 * (1 - age / 10000);
            return true;
        });
        
        // Update ambient particles
        gameState.ambientParticles = gameState.ambientParticles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            return p.life > 0;
        });
    }
    
    // Update screen shake
    if (gameState.screenShake.active) {
        const elapsed = Date.now() - gameState.screenShake.startTime;
        if (elapsed > gameState.screenShake.duration) {
            gameState.screenShake.active = false;
        }
    }
    
    // Update UI
    updateUI();
    updateShopUI();
}

function render() {
    // DIABLO FEATURE 2: Apply screen shake
    let shakeX = 0, shakeY = 0;
    if (gameState.screenShake.active) {
        const progress = (Date.now() - gameState.screenShake.startTime) / gameState.screenShake.duration;
        const intensity = gameState.screenShake.intensity * (1 - progress);
        shakeX = randomFloat(-intensity, intensity);
        shakeY = randomFloat(-intensity, intensity);
    }
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(shakeX, shakeY);
    
    if (gameState.currentLocation === 'town') {
        renderTown();
    } else {
        renderDungeon();
    }
    
    ctx.restore();
    
    // Draw particles (screen space)
    for (const particle of gameState.particles) {
        const screenX = particle.x - gameState.camera.x;
        const screenY = particle.y - gameState.camera.y;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size * particle.life, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
    
    // Draw damage numbers (screen space)
    for (const dmg of gameState.damageNumbers) {
        const screenX = dmg.x - gameState.camera.x;
        const screenY = dmg.y - gameState.camera.y;
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = dmg.color;
        ctx.globalAlpha = dmg.life;
        ctx.fillText(dmg.text, screenX, screenY);
        ctx.globalAlpha = 1;
    }
    
    // Draw HUD overlay
    renderHUD();
    
    // Draw minimap
    if (gameState.currentLocation === 'dungeon') {
        renderMinimap();
    }
}

function renderTown() {
    const p = gameState.player;
    
    // Draw town background - darker, desolate grass
    ctx.fillStyle = '#1a2a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stone path pattern - darker stones
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(350, 0, 100, canvas.height);
    ctx.fillRect(0, 250, canvas.width, 100);
    
    // Draw buildings/structures
    // Shop building - darker wood
    ctx.fillStyle = '#3a2010';
    ctx.fillRect(320, 80, 160, 100);
    ctx.fillStyle = '#2a1510';
    ctx.fillRect(380, 140, 40, 40); // door
    ctx.fillStyle = '#c92727';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏪 SHOP', 400, 60);
    ctx.fillStyle = '#888';
    ctx.font = '12px Arial';
    ctx.fillText('Press E to open', 400, 200);
    
    // Dungeon entrance - darker, more ominous
    ctx.fillStyle = '#0a0a0a';
    ctx.beginPath();
    ctx.arc(gameState.town.dungeonEntranceX, gameState.town.dungeonEntranceY, 50, 0, Math.PI * 2);
    ctx.fill();
    
    // Red glowing border
    ctx.strokeStyle = '#8b0000';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff0000';
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('⚔️ DUNGEON', gameState.town.dungeonEntranceX, gameState.town.dungeonEntranceY - 70);
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.fillText('Press E to enter', gameState.town.dungeonEntranceX, gameState.town.dungeonEntranceY + 70);
    
    // Draw some decorative trees
    const trees = [[100, 100], [100, 500], [600, 80], [150, 400], [650, 450]];
    for (const [tx, ty] of trees) {
        ctx.fillStyle = '#1a4a1a';
        ctx.beginPath();
        ctx.arc(tx, ty, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#5a3a1a';
        ctx.fillRect(tx - 5, ty + 20, 10, 20);
    }
    
    // Draw player
    renderPlayer(p.worldX, p.worldY);
    
    // Draw interaction hints
    const distToShop = distance(p.worldX, p.worldY, 400, 150);
    if (distToShop < 80) {
        ctx.fillStyle = 'rgba(201, 162, 39, 0.8)';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press E to open Shop', 400, 220);
    }
    
    const distToDungeon = distance(p.worldX, p.worldY, gameState.town.dungeonEntranceX, gameState.town.dungeonEntranceY);
    if (distToDungeon < 60) {
        ctx.fillStyle = 'rgba(255, 107, 107, 0.8)';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press E to enter Dungeon', gameState.town.dungeonEntranceX, gameState.town.dungeonEntranceY + 90);
    }
}

function renderDungeon() {
    const tileSize = GAME_CONFIG.tileSize;
    const tiles = gameState.dungeon.tiles;
    const camX = gameState.camera.x;
    const camY = gameState.camera.y;
    
    // Calculate visible tile range
    const startTileX = Math.floor(camX / tileSize);
    const startTileY = Math.floor(camY / tileSize);
    const endTileX = Math.ceil((camX + canvas.width) / tileSize);
    const endTileY = Math.ceil((camY + canvas.height) / tileSize);
    
    // Draw tiles
    for (let y = startTileY; y <= endTileY && y < tiles.length; y++) {
        for (let x = startTileX; x <= endTileX && tiles[y] && x < tiles[y].length; x++) {
            if (y < 0 || x < 0) continue;
            
            const tile = tiles[y][x];
            const screenX = x * tileSize - camX;
            const screenY = y * tileSize - camY;
            
            if (tile === 1) {
                // Wall - much darker
                ctx.fillStyle = '#0a0a0a';
                ctx.fillRect(screenX, screenY, tileSize, tileSize);
                ctx.strokeStyle = '#050505';
                ctx.lineWidth = 1;
                ctx.strokeRect(screenX, screenY, tileSize, tileSize);
            } else if (tile === 0) {
                // Floor - dark stone
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(screenX, screenY, tileSize, tileSize);
                // Add some floor detail
                if ((x + y) % 3 === 0) {
                    ctx.fillStyle = '#151515';
                    ctx.fillRect(screenX + 2, screenY + 2, tileSize - 4, tileSize - 4);
                }
            } else if (tile === 2) {
                // Entrance (stairs up) - green tint
                ctx.fillStyle = '#1a2a1a';
                ctx.fillRect(screenX, screenY, tileSize, tileSize);
                // Draw door/portal sprite
                ctx.fillStyle = '#2a1510';
                ctx.fillRect(screenX + 8, screenY + 4, tileSize - 16, tileSize - 8);
                ctx.fillStyle = '#1a0a05';
                ctx.fillRect(screenX + 10, screenY + 6, tileSize - 20, tileSize - 12);
                ctx.fillStyle = '#32cd32';
                ctx.beginPath();
                ctx.arc(screenX + tileSize - 12, screenY + tileSize / 2, 3, 0, Math.PI * 2);
                ctx.fill();
            } else if (tile === 3) {
                // Exit (stairs down) - red tint
                ctx.fillStyle = '#2a0a0a';
                ctx.fillRect(screenX, screenY, tileSize, tileSize);
                // Draw stairs sprite
                ctx.fillStyle = '#1a1a1a';
                for (let step = 0; step < 4; step++) {
                    ctx.fillRect(screenX + 4 + step * 3, screenY + 4 + step * 6, tileSize - 8 - step * 6, 6);
                }
                ctx.strokeStyle = '#0a0a0a';
                ctx.lineWidth = 1;
                for (let step = 0; step < 4; step++) {
                    ctx.strokeRect(screenX + 4 + step * 3, screenY + 4 + step * 6, tileSize - 8 - step * 6, 6);
                }
            }
        }
    }
    
    // DIABLO FEATURE 3: Draw ambient particles (fog/embers) - behind everything
    for (const particle of gameState.ambientParticles) {
        const screenX = particle.x - camX;
        const screenY = particle.y - camY;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size * particle.life, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life * 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
    
    // DIABLO FEATURE 4: Draw corpses
    for (const corpse of gameState.corpses) {
        const screenX = corpse.x - camX;
        const screenY = corpse.y - camY;
        ctx.save();
        ctx.globalAlpha = corpse.alpha;
        ctx.font = `${corpse.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = corpse.color;
        ctx.fillText(corpse.icon, screenX, screenY);
        ctx.restore();
    }
    
    // DIABLO FEATURE 5: Draw item beams for rare loot
    for (const item of gameState.loot) {
        if (item.hasBeam) {
            const screenX = item.x - camX;
            const screenY = item.y - camY;
            
            // Draw light beam from sky
            ctx.save();
            const gradient = ctx.createLinearGradient(screenX, screenY - 200, screenX, screenY);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(0.5, item.beamColor + '80');
            gradient.addColorStop(1, item.beamColor + 'cc');
            ctx.fillStyle = gradient;
            ctx.fillRect(screenX - 15, screenY - 200, 30, 200);
            
            // Pulsing glow
            const pulseSize = 30 + Math.sin(Date.now() / 200) * 5;
            ctx.shadowBlur = 20;
            ctx.shadowColor = item.beamColor;
            ctx.beginPath();
            ctx.arc(screenX, screenY, pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = item.beamColor + '30';
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Draw loot on ground
    for (const item of gameState.loot) {
        const screenX = item.x - camX;
        const screenY = item.y - camY;
        
        // Render item sprite
        renderItemSprite(ctx, item, screenX, screenY, 20);
    }
    
    // DIABLO FEATURE 6: Draw health globes
    for (const globe of gameState.healthGlobes) {
        const screenX = globe.x - camX;
        const screenY = globe.y - camY;
        
        // Pulsing red globe
        const pulseSize = 12 + Math.sin(Date.now() / 150) * 2;
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff0000';
        ctx.beginPath();
        ctx.arc(screenX, screenY, pulseSize, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, pulseSize);
        gradient.addColorStop(0, '#ff6666');
        gradient.addColorStop(0.5, '#ff0000');
        gradient.addColorStop(1, '#880000');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
        
        // White highlight
        ctx.beginPath();
        ctx.arc(screenX - 3, screenY - 3, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    }
    
    // Draw monsters
    for (const monster of gameState.monsters) {
        const screenX = monster.x - camX;
        const screenY = monster.y - camY;
        
        // Skip if off screen
        if (screenX < -50 || screenX > canvas.width + 50 || 
            screenY < -50 || screenY > canvas.height + 50) continue;
        
        // DIABLO FEATURE 10: Death animation fade
        if (monster.dying) {
            const elapsed = Date.now() - monster.deathTime;
            monster.deathAlpha = Math.max(0, 1 - elapsed / 300);
            ctx.globalAlpha = monster.deathAlpha;
        }
        
        // Draw monster sprite
        renderMonsterSprite(ctx, monster, screenX, screenY);
        
        ctx.globalAlpha = 1;
        
        // Health bar
        const hpPercent = monster.hp / monster.maxHp;
        const barWidth = monster.size * 2;
        const barHeight = 6;
        const barX = screenX - barWidth / 2;
        const barY = screenY - monster.size - 15;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        ctx.fillStyle = hpPercent > 0.5 ? '#32cd32' : hpPercent > 0.25 ? '#ffc107' : '#dc3545';
        ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
        
        // Monster name (with BOSS and AFFIX indicators)
        ctx.font = monster.isBoss ? 'bold 14px Arial' : '12px Arial';
        ctx.textAlign = 'center';
        
        // Show affix in different color
        if (monster.affix) {
            ctx.fillStyle = monster.affix.color;
            const affixText = `[${monster.affix.name}]`;
            ctx.fillText(affixText, screenX, barY - 20);
            ctx.fillStyle = monster.isBoss ? '#ffd700' : '#fff';
        }
        
        const bossIndicator = monster.isBoss ? '[BOSS] ' : '';
        ctx.fillText(bossIndicator + monster.name, screenX, barY - 8);
    }
    
    // Draw player
    const playerScreenX = gameState.player.worldX - camX;
    const playerScreenY = gameState.player.worldY - camY;
    renderPlayer(playerScreenX, playerScreenY);
    
    // Draw interaction hints at entrance/exit
    const entranceX = gameState.dungeon.entrance.x * tileSize;
    const entranceY = gameState.dungeon.entrance.y * tileSize;
    const exitX = gameState.dungeon.exit.x * tileSize;
    const exitY = gameState.dungeon.exit.y * tileSize;
    
    if (distance(gameState.player.worldX, gameState.player.worldY, entranceX, entranceY) < 50) {
        ctx.fillStyle = 'rgba(50, 205, 50, 0.9)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press E to return to Town', entranceX - camX, entranceY - camY - 30);
    }
    
    if (distance(gameState.player.worldX, gameState.player.worldY, exitX, exitY) < 50) {
        const isBossLevel = gameState.dungeonLevel % GAME_CONFIG.bossEveryNLevels === 0;
        if (isBossLevel && !gameState.dungeon.bossDefeated) {
            ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Defeat the BOSS first!', exitX - camX, exitY - camY - 30);
        } else {
            ctx.fillStyle = 'rgba(255, 193, 7, 0.9)';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Press E for next level', exitX - camX, exitY - camY - 30);
        }
    }
}

function renderPlayer(screenX, screenY) {
    const p = gameState.player;
    
    // Player shadow
    ctx.beginPath();
    ctx.ellipse(screenX, screenY + p.size - 5, p.size * 0.6, p.size * 0.25, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
    
    // Animation bounce and walking animation
    const animBounce = p.isMoving ? Math.sin(p.animFrame * Math.PI / 2) * 3 : 0;
    const legSwing = p.isMoving ? Math.sin(p.animFrame * Math.PI) * 8 : 0;
    const armSwing = p.isMoving ? Math.sin(p.animFrame * Math.PI) * 15 : 0;
    
    // Drawing offsets based on direction
    const facingRight = p.direction === 'right';
    const facingLeft = p.direction === 'left';
    const facingUp = p.direction === 'up';
    
    ctx.save();
    ctx.translate(screenX, screenY - animBounce);
    
    // Colors
    const skinColor = '#e8beac';
    const hairColor = '#4a3728';
    const shirtColor = '#2e78c2';
    const pantsColor = '#3d3d5a';
    const bootColor = '#5c3d2e';
    
    // Legs (behind body when facing up)
    if (facingUp) {
        // Left leg
        ctx.fillStyle = pantsColor;
        ctx.fillRect(-8 + legSwing * 0.3, 5, 6, 16);
        ctx.fillStyle = bootColor;
        ctx.fillRect(-8 + legSwing * 0.3, 18, 6, 6);
        
        // Right leg
        ctx.fillStyle = pantsColor;
        ctx.fillRect(2 - legSwing * 0.3, 5, 6, 16);
        ctx.fillStyle = bootColor;
        ctx.fillRect(2 - legSwing * 0.3, 18, 6, 6);
    } else {
        // Left leg
        ctx.fillStyle = pantsColor;
        ctx.fillRect(-7 + legSwing * 0.3, 5, 6, 16);
        ctx.fillStyle = bootColor;
        ctx.fillRect(-7 + legSwing * 0.3, 18, 6, 6);
        
        // Right leg
        ctx.fillStyle = pantsColor;
        ctx.fillRect(1 - legSwing * 0.3, 5, 6, 16);
        ctx.fillStyle = bootColor;
        ctx.fillRect(1 - legSwing * 0.3, 18, 6, 6);
    }
    
    // Body/Torso (tunic/shirt)
    ctx.fillStyle = shirtColor;
    ctx.beginPath();
    // Use fillRect as roundRect has limited browser support
    ctx.fillRect(-10, -12, 20, 20);
    ctx.fill();
    
    // Belt
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(-10, 2, 20, 4);
    
    // Arms
    ctx.fillStyle = shirtColor;
    if (facingLeft) {
        // Left arm (front)
        ctx.save();
        ctx.translate(-10, -8);
        ctx.rotate(armSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 5, 14);
        ctx.fillStyle = skinColor;
        ctx.fillRect(-4, 12, 5, 5);
        ctx.restore();
        
        // Right arm (back, partially hidden)
        ctx.fillStyle = shirtColor;
        ctx.save();
        ctx.translate(10, -8);
        ctx.rotate(-armSwing * Math.PI / 180);
        ctx.fillRect(-1, 0, 4, 12);
        ctx.restore();
    } else if (facingRight) {
        // Right arm (front)
        ctx.save();
        ctx.translate(10, -8);
        ctx.rotate(-armSwing * Math.PI / 180);
        ctx.fillRect(-1, 0, 5, 14);
        ctx.fillStyle = skinColor;
        ctx.fillRect(-1, 12, 5, 5);
        ctx.restore();
        
        // Left arm (back, partially hidden)
        ctx.fillStyle = shirtColor;
        ctx.save();
        ctx.translate(-10, -8);
        ctx.rotate(armSwing * Math.PI / 180);
        ctx.fillRect(-3, 0, 4, 12);
        ctx.restore();
    } else {
        // Both arms visible (front/back view)
        // Left arm
        ctx.save();
        ctx.translate(-10, -8);
        ctx.rotate(armSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 5, 14);
        ctx.fillStyle = skinColor;
        ctx.fillRect(-4, 12, 5, 5);
        ctx.restore();
        
        // Right arm
        ctx.fillStyle = shirtColor;
        ctx.save();
        ctx.translate(10, -8);
        ctx.rotate(-armSwing * Math.PI / 180);
        ctx.fillRect(-1, 0, 5, 14);
        ctx.fillStyle = skinColor;
        ctx.fillRect(-1, 12, 5, 5);
        ctx.restore();
    }
    
    // Head
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(0, -20, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Hair
    ctx.fillStyle = hairColor;
    if (facingUp) {
        // Back of head hair
        ctx.beginPath();
        ctx.arc(0, -20, 10, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(-10, -24, 20, 6);
    } else {
        // Front hair
        ctx.beginPath();
        ctx.ellipse(0, -26, 9, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(-9, -28, 18, 4);
    }
    
    // Face (only when not facing up)
    if (!facingUp) {
        // Eyes
        ctx.fillStyle = '#fff';
        if (facingLeft) {
            ctx.fillRect(-7, -22, 4, 4);
            ctx.fillStyle = '#2d4a6e';
            ctx.fillRect(-6, -21, 2, 2);
        } else if (facingRight) {
            ctx.fillRect(3, -22, 4, 4);
            ctx.fillStyle = '#2d4a6e';
            ctx.fillRect(5, -21, 2, 2);
        } else {
            // Facing down - both eyes
            ctx.fillRect(-6, -22, 4, 4);
            ctx.fillRect(2, -22, 4, 4);
            ctx.fillStyle = '#2d4a6e';
            ctx.fillRect(-5, -21, 2, 2);
            ctx.fillRect(3, -21, 2, 2);
        }
    }
    
    ctx.restore();
    
    // Attack indicator
    if (p.isAttacking) {
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.attackRange, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.5)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Weapon swing effect based on direction - draw a sword sprite
        let offsetX = 0, offsetY = 0;
        let swordRotation = 0;
        switch (p.direction) {
            case 'up': offsetY = -35; swordRotation = -Math.PI / 4; break;
            case 'down': offsetY = 35; swordRotation = Math.PI * 3 / 4; break;
            case 'left': offsetX = -35; swordRotation = -Math.PI / 2; break;
            case 'right': offsetX = 35; swordRotation = Math.PI / 2; break;
        }
        
        // Draw sword sprite
        ctx.save();
        ctx.translate(screenX + offsetX, screenY + offsetY);
        ctx.rotate(swordRotation);
        
        // Blade
        ctx.fillStyle = '#c0c0c0';
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(4, 0);
        ctx.lineTo(0, 5);
        ctx.lineTo(-4, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#808080';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Guard
        ctx.fillStyle = '#8b6914';
        ctx.fillRect(-8, 5, 16, 4);
        
        // Handle
        ctx.fillStyle = '#5c3d2e';
        ctx.fillRect(-2, 9, 4, 10);
        
        ctx.restore();
    }
}

function renderMinimap() {
    const minimapCanvas = document.getElementById('minimap-canvas');
    const minimapContainer = document.getElementById('minimap-container');
    if (!minimapCanvas || !minimapContainer) return;
    
    // Show minimap in dungeon
    minimapContainer.style.display = 'block';
    
    const minimapCtx = minimapCanvas.getContext('2d');
    const dungeonWidth = gameState.dungeon.width;
    const dungeonHeight = gameState.dungeon.height;
    const scaleX = minimapCanvas.width / dungeonWidth;
    const scaleY = minimapCanvas.height / dungeonHeight;
    
    // Clear minimap
    minimapCtx.fillStyle = '#000';
    minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);
    
    // Draw dungeon tiles
    const tiles = gameState.dungeon.tiles;
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            const tile = tiles[y][x];
            const minimapX = x * scaleX;
            const minimapY = y * scaleY;
            
            if (tile === 1) {
                // Wall - dark gray
                minimapCtx.fillStyle = '#1a1a2a';
            } else if (tile === 0) {
                // Floor - lighter gray
                minimapCtx.fillStyle = '#3a3a4a';
            } else if (tile === 2) {
                // Entrance - green
                minimapCtx.fillStyle = '#32cd32';
            } else if (tile === 3) {
                // Exit - gold
                minimapCtx.fillStyle = '#c9a227';
            }
            
            minimapCtx.fillRect(minimapX, minimapY, scaleX + 1, scaleY + 1);
        }
    }
    
    // Draw enemies as red dots
    for (const monster of gameState.monsters) {
        const monsterTileX = Math.floor(monster.x / GAME_CONFIG.tileSize);
        const monsterTileY = Math.floor(monster.y / GAME_CONFIG.tileSize);
        minimapCtx.fillStyle = monster.isBoss ? '#ff0000' : '#ff6b6b';
        minimapCtx.beginPath();
        minimapCtx.arc(
            monsterTileX * scaleX,
            monsterTileY * scaleY,
            monster.isBoss ? 3 : 1.5,
            0,
            Math.PI * 2
        );
        minimapCtx.fill();
    }
    
    // Draw player as bright dot
    const playerTileX = Math.floor(gameState.player.worldX / GAME_CONFIG.tileSize);
    const playerTileY = Math.floor(gameState.player.worldY / GAME_CONFIG.tileSize);
    minimapCtx.fillStyle = '#fff';
    minimapCtx.beginPath();
    minimapCtx.arc(
        playerTileX * scaleX,
        playerTileY * scaleY,
        2,
        0,
        Math.PI * 2
    );
    minimapCtx.fill();
    
    // Player direction indicator
    minimapCtx.strokeStyle = '#fff';
    minimapCtx.lineWidth = 1;
    minimapCtx.beginPath();
    const dirX = playerTileX * scaleX;
    const dirY = playerTileY * scaleY;
    let dx = 0, dy = 0;
    if (gameState.player.direction === 'up') dy = -4;
    else if (gameState.player.direction === 'down') dy = 4;
    else if (gameState.player.direction === 'left') dx = -4;
    else if (gameState.player.direction === 'right') dx = 4;
    minimapCtx.moveTo(dirX, dirY);
    minimapCtx.lineTo(dirX + dx, dirY + dy);
    minimapCtx.stroke();
}

function renderHUD() {
    // Location indicator in top-left
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 200, 60);
    ctx.strokeStyle = '#4a4a6a';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 200, 60);
    
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    if (gameState.currentLocation === 'town') {
        ctx.fillStyle = '#32cd32';
        ctx.fillText('🏠 Town', 20, 35);
        ctx.fillStyle = '#888';
        ctx.font = '12px Arial';
        ctx.fillText('Safe Zone - Full Regen', 20, 55);
    } else {
        const isBossLevel = gameState.dungeonLevel % GAME_CONFIG.bossEveryNLevels === 0;
        ctx.fillStyle = isBossLevel ? '#ff6b6b' : '#ffc107';
        ctx.fillText(`⚔️ Dungeon Level ${gameState.dungeonLevel}`, 20, 35);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.fillText(`Enemies: ${gameState.dungeon.enemiesRemaining}/${gameState.dungeon.totalEnemies}`, 20, 55);
    }
    
    // Mini HP bar
    const hpPercent = gameState.player.hp / gameState.player.maxHp;
    ctx.fillStyle = '#333';
    ctx.fillRect(canvas.width - 160, 15, 150, 20);
    ctx.fillStyle = hpPercent > 0.5 ? '#32cd32' : hpPercent > 0.25 ? '#ffc107' : '#dc3545';
    ctx.fillRect(canvas.width - 160, 15, 150 * hpPercent, 20);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width - 160, 15, 150, 20);
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.floor(gameState.player.hp)}/${gameState.player.maxHp} HP`, canvas.width - 85, 30);
    
    // Potion count
    ctx.fillStyle = '#333';
    ctx.fillRect(canvas.width - 160, 40, 150, 20);
    ctx.fillStyle = '#dc3545';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`❤️ Potions: ${gameState.potions.health}/${gameState.potions.maxHealth} [Q]`, canvas.width - 85, 55);
}

let lastTime = 0;
function gameLoop(timestamp) {
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    
    update(deltaTime);
    render();
    
    requestAnimationFrame(gameLoop);
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Initialize inventory UI
    updateInventoryUI();
    updateEquipmentUI();
    updateUI();
    
    // Give starting equipment
    const starterSword = generateItem('weapon', 'common', 1);
    starterSword.name = 'Rusty Sword';
    starterSword.stats = { attack: 5 };
    addToInventory(starterSword);
    
    // Start in town
    enterTown();
    
    // Welcome messages
    addMessage('Welcome to Dark Realms!', 'system');
    addMessage('Use WASD/Arrow keys to move, SPACE to attack', 'system');
    addMessage('Press E to interact, Q to use health potion', 'system');
    addMessage('Visit the SHOP to buy upgrades, enter the DUNGEON for adventure!', 'system');
    
    // Start game loop
    requestAnimationFrame(gameLoop);
}

// Start the game
init();
