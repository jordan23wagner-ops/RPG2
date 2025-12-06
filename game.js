// Dark Realms RPG - Main Game Engine
// Top-down RPG inspired by Diablo and Runescape

// ============================================
// GAME CONFIGURATION
// ============================================

const GAME_CONFIG = {
    tileSize: 32,
    dungeonWidth: 50,  // tiles
    dungeonHeight: 40, // tiles
    viewportWidth: 800,
    viewportHeight: 600,
    enemiesPerLevel: 15,
    bossEveryNLevels: 3
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
        baseStats: { defense: 3, speed: 2 },
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
// MONSTER DEFINITIONS
// ============================================

const MONSTER_TYPES = [
    {
        name: 'Rat',
        icon: '🐀',
        color: '#8b4513',
        baseHp: 20,
        baseDamage: 3,
        baseExp: 10,
        baseGold: [1, 5],
        lootChance: 0.2,
        potionDropChance: 0.15,
        speed: 1.5,
        size: 20,
        minLevel: 1,
        isBoss: false
    },
    {
        name: 'Slime',
        icon: '🟢',
        color: '#32cd32',
        baseHp: 30,
        baseDamage: 5,
        baseExp: 15,
        baseGold: [2, 8],
        lootChance: 0.25,
        potionDropChance: 0.2,
        speed: 1,
        size: 25,
        minLevel: 1,
        isBoss: false
    },
    {
        name: 'Goblin',
        icon: '👺',
        color: '#228b22',
        baseHp: 50,
        baseDamage: 8,
        baseExp: 25,
        baseGold: [5, 15],
        lootChance: 0.35,
        potionDropChance: 0.25,
        speed: 2,
        size: 28,
        minLevel: 2,
        isBoss: false
    },
    {
        name: 'Skeleton',
        icon: '💀',
        color: '#f5f5dc',
        baseHp: 60,
        baseDamage: 10,
        baseExp: 35,
        baseGold: [8, 20],
        lootChance: 0.4,
        potionDropChance: 0.25,
        speed: 1.5,
        size: 30,
        minLevel: 2,
        isBoss: false
    },
    {
        name: 'Orc',
        icon: '👹',
        color: '#556b2f',
        baseHp: 100,
        baseDamage: 15,
        baseExp: 50,
        baseGold: [15, 35],
        lootChance: 0.5,
        potionDropChance: 0.3,
        speed: 1.8,
        size: 35,
        minLevel: 3,
        isBoss: false
    },
    {
        name: 'Dark Mage',
        icon: '🧙',
        color: '#4b0082',
        baseHp: 70,
        baseDamage: 20,
        baseExp: 60,
        baseGold: [20, 45],
        lootChance: 0.55,
        potionDropChance: 0.35,
        speed: 1.2,
        size: 30,
        minLevel: 4,
        isBoss: false
    },
    {
        name: 'Troll',
        icon: '👾',
        color: '#708090',
        baseHp: 150,
        baseDamage: 18,
        baseExp: 80,
        baseGold: [30, 60],
        lootChance: 0.6,
        potionDropChance: 0.35,
        speed: 1,
        size: 40,
        minLevel: 5,
        isBoss: false
    },
    {
        name: 'Demon',
        icon: '😈',
        color: '#8b0000',
        baseHp: 200,
        baseDamage: 25,
        baseExp: 120,
        baseGold: [50, 100],
        lootChance: 0.7,
        potionDropChance: 0.4,
        speed: 2.2,
        size: 38,
        minLevel: 6,
        isBoss: false
    },
    {
        name: 'Dragon Whelp',
        icon: '🐉',
        color: '#ff4500',
        baseHp: 300,
        baseDamage: 35,
        baseExp: 200,
        baseGold: [80, 150],
        lootChance: 0.8,
        potionDropChance: 0.5,
        speed: 2.5,
        size: 45,
        minLevel: 7,
        isBoss: false
    },
    {
        name: 'Elder Dragon',
        icon: '🐲',
        color: '#800080',
        baseHp: 500,
        baseDamage: 50,
        baseExp: 400,
        baseGold: [150, 300],
        lootChance: 1.0,
        potionDropChance: 0.6,
        speed: 2,
        size: 55,
        minLevel: 9,
        isBoss: false
    }
];

// Boss monsters for dungeon levels
const BOSS_TYPES = [
    {
        name: 'Goblin King',
        icon: '👺',
        color: '#006400',
        baseHp: 200,
        baseDamage: 15,
        baseExp: 150,
        baseGold: [50, 100],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 1.5,
        size: 50,
        minLevel: 3,
        isBoss: true,
        guaranteedRarity: 'rare'
    },
    {
        name: 'Skeleton Lord',
        icon: '💀',
        color: '#daa520',
        baseHp: 400,
        baseDamage: 25,
        baseExp: 300,
        baseGold: [100, 200],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 1.8,
        size: 55,
        minLevel: 6,
        isBoss: true,
        guaranteedRarity: 'epic'
    },
    {
        name: 'Demon Lord',
        icon: '😈',
        color: '#8b0000',
        baseHp: 700,
        baseDamage: 40,
        baseExp: 500,
        baseGold: [200, 400],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 2,
        size: 60,
        minLevel: 9,
        isBoss: true,
        guaranteedRarity: 'legendary'
    },
    {
        name: 'Ancient Dragon',
        icon: '🐲',
        color: '#4b0082',
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
        bossDefeated: false
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
    showShop: false
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
    
    // Connect rooms with corridors
    for (let i = 1; i < rooms.length; i++) {
        const r1 = rooms[i - 1];
        const r2 = rooms[i];
        const x1 = Math.floor(r1.x + r1.w / 2);
        const y1 = Math.floor(r1.y + r1.h / 2);
        const x2 = Math.floor(r2.x + r2.w / 2);
        const y2 = Math.floor(r2.y + r2.h / 2);
        
        // Horizontal then vertical
        if (Math.random() < 0.5) {
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                tiles[y1][x] = 0;
            }
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                tiles[y][x2] = 0;
            }
        } else {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                tiles[y][x1] = 0;
            }
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                tiles[y2][x] = 0;
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
            
            gameState.monsters.push({
                id: Date.now() + Math.random(),
                ...monsterType,
                x: x,
                y: y,
                hp: Math.floor(monsterType.baseHp * levelScale),
                maxHp: Math.floor(monsterType.baseHp * levelScale),
                damage: Math.floor(monsterType.baseDamage * levelScale),
                exp: Math.floor(monsterType.baseExp * levelScale),
                gold: randomRange(goldMin, goldMax),
                lastAttack: 0,
                attackCooldown: 1000,
                animFrame: 0,
                animTimer: 0
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
    addMessage('Welcome to town! Visit the shop to spend your gold.', 'system');
    updateUI();
}

function enterDungeon(level) {
    gameState.currentLocation = 'dungeon';
    gameState.dungeonLevel = level;
    gameState.dungeon.bossSpawned = false;
    gameState.dungeon.bossDefeated = false;
    gameState.loot = [];
    
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
    if (!shopPanel) return;
    
    if (gameState.showShop && gameState.currentLocation === 'town') {
        shopPanel.style.display = 'block';
        
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
        stats[stat] = Math.floor(value * rarityData.statMultiplier * levelScale * randomFloat(0.8, 1.2));
    }
    
    // Add bonus stats for higher rarities
    if (rarity === 'rare' || rarity === 'epic' || rarity === 'legendary' || rarity === 'mythic') {
        const bonusStats = ['attack', 'defense', 'maxHp', 'maxMana', 'speed'];
        const numBonuses = rarity === 'rare' ? 1 : rarity === 'epic' ? 2 : rarity === 'legendary' ? 3 : 4;
        for (let i = 0; i < numBonuses; i++) {
            const bonusStat = randomChoice(bonusStats);
            const bonusValue = Math.floor(randomRange(3, 10) * rarityData.statMultiplier * levelScale);
            stats[bonusStat] = (stats[bonusStat] || 0) + bonusValue;
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
    if (isBoss) {
        addMessage(`BOSS DEFEATED! ${monster.name} vanquished! +${monster.exp} XP, +${monster.gold} Gold`, 'levelup');
        gameState.dungeon.bossDefeated = true;
    } else {
        addMessage(`${monster.name} defeated! +${monster.exp} XP, +${monster.gold} Gold`, 'loot');
    }
    
    // Check for level up
    checkLevelUp();
    
    // Drop loot - bosses have guaranteed drops
    if (Math.random() < monster.lootChance || isBoss) {
        const guaranteedRarity = isBoss ? monster.guaranteedRarity : null;
        dropLoot(monster.x, monster.y, guaranteedRarity);
    }
    
    // Drop health potion (instant pickup)
    if (Math.random() < (monster.potionDropChance || 0.3)) {
        // Auto-pickup potion if space available
        if (gameState.potions.health < gameState.potions.maxHealth) {
            gameState.potions.health++;
            addMessage('Picked up Health Potion!', 'heal');
            createParticles(monster.x, monster.y, '#dc3545', 8);
        }
    }
    
    // Create death particles
    createParticles(monster.x, monster.y, monster.color, 15);
    
    // Remove monster
    const index = gameState.monsters.indexOf(monster);
    if (index > -1) {
        gameState.monsters.splice(index, 1);
    }
    
    gameState.dungeon.enemiesRemaining = gameState.monsters.length;
    
    updateUI();
}

function dropLoot(x, y, guaranteedRarity = null) {
    const item = generateItem(null, guaranteedRarity, gameState.dungeonLevel);
    gameState.loot.push({
        ...item,
        x: x + randomRange(-20, 20),
        y: y + randomRange(-20, 20)
    });
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
            enterDungeon(1);
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
    
    // Update UI
    updateUI();
    updateShopUI();
}

function render() {
    // Clear canvas
    ctx.fillStyle = '#0a0a15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (gameState.currentLocation === 'town') {
        renderTown();
    } else {
        renderDungeon();
    }
    
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
}

function renderTown() {
    const p = gameState.player;
    
    // Draw town background - grass
    ctx.fillStyle = '#2d5a27';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stone path pattern
    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(350, 0, 100, canvas.height);
    ctx.fillRect(0, 250, canvas.width, 100);
    
    // Draw buildings/structures
    // Shop building
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(320, 80, 160, 100);
    ctx.fillStyle = '#654321';
    ctx.fillRect(380, 140, 40, 40); // door
    ctx.fillStyle = '#c9a227';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏪 SHOP', 400, 60);
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.fillText('Press E to open', 400, 200);
    
    // Dungeon entrance
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(gameState.town.dungeonEntranceX, gameState.town.dungeonEntranceY, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4a4a4a';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    ctx.fillStyle = '#ff6b6b';
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
                // Wall
                ctx.fillStyle = '#2a2a3a';
                ctx.fillRect(screenX, screenY, tileSize, tileSize);
                ctx.strokeStyle = '#1a1a2a';
                ctx.lineWidth = 1;
                ctx.strokeRect(screenX, screenY, tileSize, tileSize);
            } else if (tile === 0) {
                // Floor
                ctx.fillStyle = '#3a3a4a';
                ctx.fillRect(screenX, screenY, tileSize, tileSize);
                // Add some floor detail
                if ((x + y) % 3 === 0) {
                    ctx.fillStyle = '#353545';
                    ctx.fillRect(screenX + 2, screenY + 2, tileSize - 4, tileSize - 4);
                }
            } else if (tile === 2) {
                // Entrance (stairs up)
                ctx.fillStyle = '#3a5a3a';
                ctx.fillRect(screenX, screenY, tileSize, tileSize);
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('🚪', screenX + tileSize / 2, screenY + tileSize / 2);
            } else if (tile === 3) {
                // Exit (stairs down)
                ctx.fillStyle = '#5a3a3a';
                ctx.fillRect(screenX, screenY, tileSize, tileSize);
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('⬇️', screenX + tileSize / 2, screenY + tileSize / 2);
            }
        }
    }
    
    // Draw loot on ground
    for (const item of gameState.loot) {
        const screenX = item.x - camX;
        const screenY = item.y - camY;
        
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Glow effect for rarity
        const rarityColor = RARITIES[item.rarity]?.color || '#fff';
        ctx.shadowColor = rarityColor;
        ctx.shadowBlur = 10;
        ctx.fillText(item.icon, screenX, screenY);
        ctx.shadowBlur = 0;
    }
    
    // Draw monsters
    for (const monster of gameState.monsters) {
        const screenX = monster.x - camX;
        const screenY = monster.y - camY;
        
        // Skip if off screen
        if (screenX < -50 || screenX > canvas.width + 50 || 
            screenY < -50 || screenY > canvas.height + 50) continue;
        
        // Boss glow effect
        if (monster.isBoss) {
            ctx.shadowColor = '#ff0000';
            ctx.shadowBlur = 20;
        }
        
        // Monster body
        ctx.beginPath();
        ctx.arc(screenX, screenY, monster.size, 0, Math.PI * 2);
        ctx.fillStyle = monster.color;
        ctx.fill();
        ctx.strokeStyle = monster.isBoss ? '#ffd700' : '#fff';
        ctx.lineWidth = monster.isBoss ? 3 : 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Monster icon with animation
        const animOffset = monster.animFrame === 1 ? 2 : 0;
        ctx.font = `${monster.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(monster.icon, screenX, screenY - animOffset);
        
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
        
        // Monster name (with BOSS indicator)
        ctx.font = monster.isBoss ? 'bold 14px Arial' : '12px Arial';
        ctx.fillStyle = monster.isBoss ? '#ffd700' : '#fff';
        ctx.fillText(monster.isBoss ? `👑 ${monster.name}` : monster.name, screenX, barY - 8);
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
    ctx.ellipse(screenX, screenY + p.size - 5, p.size * 0.8, p.size * 0.3, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
    
    // Player body with animation
    const animBounce = p.isMoving ? Math.sin(p.animFrame * Math.PI / 2) * 3 : 0;
    
    ctx.beginPath();
    ctx.arc(screenX, screenY - animBounce, p.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(screenX - 5, screenY - 5 - animBounce, 5, screenX, screenY - animBounce, p.size);
    gradient.addColorStop(0, '#4da6ff');
    gradient.addColorStop(1, '#0066cc');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Player direction-based sprite
    const directionIcons = {
        'up': '🧑',
        'down': '🧑',
        'left': '🧑',
        'right': '🧑'
    };
    
    ctx.font = '22px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(directionIcons[p.direction] || '🧑', screenX, screenY - animBounce);
    
    // Attack indicator
    if (p.isAttacking) {
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.attackRange, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.5)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Weapon swing effect based on direction
        ctx.font = '28px Arial';
        const weaponIcon = gameState.player.equipment.weapon?.icon || '⚔️';
        let offsetX = 0, offsetY = 0;
        switch (p.direction) {
            case 'up': offsetY = -35; break;
            case 'down': offsetY = 35; break;
            case 'left': offsetX = -35; break;
            case 'right': offsetX = 35; break;
        }
        ctx.fillText(weaponIcon, screenX + offsetX, screenY + offsetY);
    }
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
