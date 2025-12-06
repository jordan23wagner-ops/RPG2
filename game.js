// Dark Realms RPG - Main Game Engine
// Inspired by Diablo and Runescape

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

const POTION_TYPES = {
    health: { name: 'Health Potion', icon: '❤️', effect: 'hp', amount: 50, color: '#dc3545' },
    mana: { name: 'Mana Potion', icon: '💙', effect: 'mana', amount: 30, color: '#0066cc' },
    speed: { name: 'Speed Potion', icon: '⚡', effect: 'speed', amount: 3, duration: 10000, color: '#ffc107' },
    strength: { name: 'Strength Potion', icon: '💪', effect: 'attack', amount: 10, duration: 15000, color: '#fd7e14' }
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
        speed: 1.5,
        size: 20
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
        speed: 1,
        size: 25
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
        speed: 2,
        size: 28
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
        speed: 1.5,
        size: 30
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
        speed: 1.8,
        size: 35
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
        speed: 1.2,
        size: 30
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
        speed: 1,
        size: 40
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
        speed: 2.2,
        size: 38
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
        speed: 2.5,
        size: 45
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
        speed: 2,
        size: 55
    }
];

// ============================================
// GAME STATE
// ============================================

const gameState = {
    player: {
        x: 400,
        y: 300,
        size: 30,
        speed: 4,
        baseSpeed: 4,
        hp: 100,
        maxHp: 100,
        mana: 50,
        maxMana: 50,
        exp: 0,
        expToLevel: 100,
        level: 1,
        gold: 0,
        attack: 10,
        baseAttack: 10,
        defense: 5,
        baseDefense: 5,
        isAttacking: false,
        attackCooldown: 0,
        attackRange: 60,
        direction: 'right',
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
        buffs: []
    },
    inventory: [],
    maxInventory: 28,
    potions: {
        health: 3,
        mana: 3,
        speed: 0,
        strength: 0
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
    lastSpawnTime: 0,
    spawnInterval: 3000,
    maxMonsters: 10,
    gameTime: 0,
    isPaused: false
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
// ITEM GENERATION
// ============================================

function generateRarity() {
    const roll = Math.random();
    let cumulative = 0;
    for (const [rarity, data] of Object.entries(RARITIES)) {
        cumulative += data.dropChance;
        if (roll < cumulative) {
            return rarity;
        }
    }
    return 'common';
}

function generateItem(forcedType = null, forcedRarity = null) {
    const typeKeys = Object.keys(ITEM_TYPES);
    const type = forcedType || randomChoice(typeKeys);
    const itemType = ITEM_TYPES[type];
    const rarity = forcedRarity || generateRarity();
    const rarityData = RARITIES[rarity];
    
    const prefix = randomChoice(RARITY_PREFIXES[rarity]);
    const baseName = randomChoice(itemType.names);
    
    const stats = {};
    for (const [stat, value] of Object.entries(itemType.baseStats)) {
        stats[stat] = Math.floor(value * rarityData.statMultiplier * randomFloat(0.8, 1.2));
    }
    
    // Add bonus stats for higher rarities
    if (rarity === 'rare' || rarity === 'epic' || rarity === 'legendary' || rarity === 'mythic') {
        const bonusStats = ['attack', 'defense', 'maxHp', 'maxMana', 'speed'];
        const numBonuses = rarity === 'rare' ? 1 : rarity === 'epic' ? 2 : rarity === 'legendary' ? 3 : 4;
        for (let i = 0; i < numBonuses; i++) {
            const bonusStat = randomChoice(bonusStats);
            const bonusValue = Math.floor(randomRange(3, 10) * rarityData.statMultiplier);
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
        sellPrice: Math.floor(10 * rarityData.statMultiplier * randomFloat(0.8, 1.5))
    };
}

function generatePotion() {
    const potionKeys = Object.keys(POTION_TYPES);
    const type = randomChoice(potionKeys);
    return {
        type: 'potion',
        potionType: type,
        ...POTION_TYPES[type]
    };
}

// ============================================
// MONSTER SPAWNING
// ============================================

function spawnMonster() {
    if (gameState.monsters.length >= gameState.maxMonsters) return;
    
    // Select monster based on player level
    const availableMonsters = MONSTER_TYPES.filter((m, index) => index <= Math.floor(gameState.player.level / 2) + 2);
    const monsterType = randomChoice(availableMonsters);
    
    // Scale monster stats with player level
    const levelScale = 1 + (gameState.player.level - 1) * 0.1;
    
    // Spawn at edge of screen
    const side = randomRange(0, 3);
    let x, y;
    switch (side) {
        case 0: x = randomRange(50, canvas.width - 50); y = -30; break;
        case 1: x = canvas.width + 30; y = randomRange(50, canvas.height - 50); break;
        case 2: x = randomRange(50, canvas.width - 50); y = canvas.height + 30; break;
        case 3: x = -30; y = randomRange(50, canvas.height - 50); break;
    }
    
    gameState.monsters.push({
        id: Date.now() + Math.random(),
        ...monsterType,
        x: x,
        y: y,
        hp: Math.floor(monsterType.baseHp * levelScale),
        maxHp: Math.floor(monsterType.baseHp * levelScale),
        damage: Math.floor(monsterType.baseDamage * levelScale),
        exp: Math.floor(monsterType.baseExp * levelScale),
        gold: randomRange(...monsterType.baseGold.map(g => Math.floor(g * levelScale))),
        lastAttack: 0,
        attackCooldown: 1000
    });
}

// ============================================
// COMBAT SYSTEM
// ============================================

function playerAttack() {
    if (gameState.player.attackCooldown > 0) return;
    
    gameState.player.isAttacking = true;
    gameState.player.attackCooldown = 500;
    
    // Find monsters in attack range
    for (const monster of gameState.monsters) {
        const dist = distance(gameState.player.x, gameState.player.y, monster.x, monster.y);
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
    
    const dist = distance(gameState.player.x, gameState.player.y, monster.x, monster.y);
    if (dist <= monster.size + gameState.player.size) {
        monster.lastAttack = Date.now();
        
        const damage = Math.max(1, monster.damage - Math.floor(gameState.player.defense * 0.5));
        const finalDamage = Math.floor(damage * randomFloat(0.8, 1.2));
        gameState.player.hp -= finalDamage;
        
        createDamageNumber(gameState.player.x, gameState.player.y, finalDamage, '#ff0000');
        createParticles(gameState.player.x, gameState.player.y, '#ff0000', 3);
        
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
    
    addMessage(`${monster.name} defeated! +${monster.exp} XP, +${monster.gold} Gold`, 'loot');
    
    // Check for level up
    checkLevelUp();
    
    // Drop loot
    if (Math.random() < monster.lootChance) {
        dropLoot(monster.x, monster.y);
    }
    
    // Random potion drop
    if (Math.random() < 0.3) {
        dropPotion(monster.x, monster.y);
    }
    
    // Create death particles
    createParticles(monster.x, monster.y, monster.color, 15);
    
    // Remove monster
    const index = gameState.monsters.indexOf(monster);
    if (index > -1) {
        gameState.monsters.splice(index, 1);
    }
    
    updateUI();
}

function dropLoot(x, y) {
    const item = generateItem();
    gameState.loot.push({
        ...item,
        x: x + randomRange(-20, 20),
        y: y + randomRange(-20, 20)
    });
    showLootPanel();
}

function dropPotion(x, y) {
    const potion = generatePotion();
    gameState.loot.push({
        ...potion,
        x: x + randomRange(-20, 20),
        y: y + randomRange(-20, 20)
    });
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
        createParticles(gameState.player.x, gameState.player.y, '#ffd700', 30);
        
        recalculateStats();
    }
}

function playerDeath() {
    addMessage('You have died! Respawning...', 'system');
    
    // Lose some gold
    const goldLost = Math.floor(gameState.player.gold * 0.1);
    gameState.player.gold -= goldLost;
    if (goldLost > 0) {
        addMessage(`You lost ${goldLost} gold.`, 'system');
    }
    
    // Respawn
    gameState.player.hp = Math.floor(gameState.player.maxHp * 0.5);
    gameState.player.mana = Math.floor(gameState.player.maxMana * 0.5);
    gameState.player.x = canvas.width / 2;
    gameState.player.y = canvas.height / 2;
    
    // Clear monsters near spawn
    gameState.monsters = gameState.monsters.filter(m => 
        distance(m.x, m.y, gameState.player.x, gameState.player.y) > 200
    );
    
    updateUI();
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
    
    // Update max HP/Mana
    const baseMaxHp = 100 + (p.level - 1) * 10;
    const baseMaxMana = 50 + (p.level - 1) * 5;
    p.maxHp = baseMaxHp + bonusHp;
    p.maxMana = baseMaxMana + bonusMana;
    
    // Clamp current values
    p.hp = Math.min(p.hp, p.maxHp);
    p.mana = Math.min(p.mana, p.maxMana);
    
    updateUI();
}

// ============================================
// POTION SYSTEM
// ============================================

function usePotion(type) {
    if (gameState.potions[type] <= 0) {
        addMessage(`No ${type} potions left!`, 'system');
        return;
    }
    
    const potionData = POTION_TYPES[type];
    gameState.potions[type]--;
    
    if (type === 'health') {
        const healAmount = Math.min(potionData.amount, gameState.player.maxHp - gameState.player.hp);
        gameState.player.hp += healAmount;
        addMessage(`Healed for ${healAmount} HP!`, 'heal');
        createParticles(gameState.player.x, gameState.player.y, '#32cd32', 10);
    } else if (type === 'mana') {
        const manaAmount = Math.min(potionData.amount, gameState.player.maxMana - gameState.player.mana);
        gameState.player.mana += manaAmount;
        addMessage(`Restored ${manaAmount} Mana!`, 'heal');
        createParticles(gameState.player.x, gameState.player.y, '#4da6ff', 10);
    } else if (type === 'speed' || type === 'strength') {
        const stat = potionData.effect;
        const existingBuff = gameState.player.buffs.find(b => b.stat === stat);
        if (existingBuff) {
            existingBuff.endTime = Date.now() + potionData.duration;
        } else {
            gameState.player.buffs.push({
                stat: stat,
                amount: potionData.amount,
                endTime: Date.now() + potionData.duration
            });
        }
        recalculateStats();
        addMessage(`${potionData.name} activated!`, 'system');
        createParticles(gameState.player.x, gameState.player.y, potionData.color, 10);
    }
    
    updateUI();
}

function addPotion(type) {
    gameState.potions[type]++;
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
            break;
        case 'ArrowDown':
        case 'KeyS':
            gameState.keys.down = true;
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
            usePotion('health');
            break;
        case 'Digit2':
            usePotion('mana');
            break;
        case 'Digit3':
            usePotion('speed');
            break;
        case 'Digit4':
            usePotion('strength');
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
    document.getElementById('stat-speed').textContent = gameState.player.speed;
    
    // Gold
    document.getElementById('gold-amount').textContent = gameState.player.gold;
    
    // Potions
    document.getElementById('hp-potion-count').textContent = gameState.potions.health;
    document.getElementById('mana-potion-count').textContent = gameState.potions.mana;
    document.getElementById('speed-potion-count').textContent = gameState.potions.speed;
    document.getElementById('strength-potion-count').textContent = gameState.potions.strength;
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
    for (const [slot, item] of Object.entries(gameState.player.equipment)) {
        const slotElement = document.getElementById(`slot-${slot}`);
        if (!slotElement) continue;
        
        // Remove all rarity classes
        slotElement.classList.remove('equipped', 'rarity-common', 'rarity-uncommon', 'rarity-rare', 'rarity-epic', 'rarity-legendary', 'rarity-mythic');
        
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
        // Add to potion slots
        addPotion(item.potionType);
        removeFromInventory(index);
        addMessage(`Added ${item.name} to quick slots`, 'system');
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
    
    statsEl.innerHTML = '';
    if (item.stats) {
        for (const [stat, value] of Object.entries(item.stats)) {
            const statEl = document.createElement('div');
            statEl.className = 'tooltip-stat positive';
            const statName = stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
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
        distance(gameState.player.x, gameState.player.y, l.x, l.y) < 100
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
    
    if (item.type === 'potion') {
        addPotion(item.potionType);
        addMessage(`Picked up ${item.name}`, 'loot');
    } else {
        if (!addToInventory(item)) return;
        addMessage(`Picked up ${item.name}`, 'loot');
    }
    
    gameState.loot.splice(index, 1);
    showLootPanel();
}

document.getElementById('loot-all-btn').addEventListener('click', () => {
    const nearbyLoot = gameState.loot.filter(l => 
        distance(gameState.player.x, gameState.player.y, l.x, l.y) < 100
    );
    
    for (const item of nearbyLoot) {
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
    
    // Update cooldowns
    if (gameState.player.attackCooldown > 0) {
        gameState.player.attackCooldown -= deltaTime * 1000;
    }
    
    // Update buffs
    gameState.player.buffs = gameState.player.buffs.filter(buff => {
        if (Date.now() > buff.endTime) {
            addMessage(`${buff.stat} buff expired`, 'system');
            recalculateStats();
            return false;
        }
        return true;
    });
    
    // Player movement
    const p = gameState.player;
    if (gameState.keys.up) p.y -= p.speed;
    if (gameState.keys.down) p.y += p.speed;
    if (gameState.keys.left) p.x -= p.speed;
    if (gameState.keys.right) p.x += p.speed;
    
    // Keep player in bounds
    p.x = clamp(p.x, p.size, canvas.width - p.size);
    p.y = clamp(p.y, p.size, canvas.height - p.size);
    
    // Monster AI
    for (const monster of gameState.monsters) {
        // Move towards player
        const dx = p.x - monster.x;
        const dy = p.y - monster.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0) {
            monster.x += (dx / dist) * monster.speed;
            monster.y += (dy / dist) * monster.speed;
        }
        
        // Attack player
        monsterAttack(monster);
    }
    
    // Spawn monsters
    if (Date.now() - gameState.lastSpawnTime > gameState.spawnInterval) {
        spawnMonster();
        gameState.lastSpawnTime = Date.now();
    }
    
    // Update particles
    updateParticles();
    
    // HP/Mana regeneration
    if (gameState.gameTime % 60 < deltaTime) { // Every ~60 frames
        if (p.hp < p.maxHp) p.hp = Math.min(p.maxHp, p.hp + 1);
        if (p.mana < p.maxMana) p.mana = Math.min(p.maxMana, p.mana + 0.5);
    }
    
    // Update loot panel visibility
    showLootPanel();
    
    // Update UI
    updateUI();
}

function render() {
    // Clear canvas
    ctx.fillStyle = '#0a0a15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid pattern
    ctx.strokeStyle = 'rgba(74, 74, 106, 0.2)';
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Draw loot on ground
    for (const item of gameState.loot) {
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Glow effect for rarity
        const rarityColor = RARITIES[item.rarity]?.color || '#fff';
        ctx.shadowColor = rarityColor;
        ctx.shadowBlur = 10;
        ctx.fillText(item.icon, item.x, item.y);
        ctx.shadowBlur = 0;
    }
    
    // Draw monsters
    for (const monster of gameState.monsters) {
        // Monster body
        ctx.beginPath();
        ctx.arc(monster.x, monster.y, monster.size, 0, Math.PI * 2);
        ctx.fillStyle = monster.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Monster icon
        ctx.font = `${monster.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(monster.icon, monster.x, monster.y);
        
        // Health bar
        const hpPercent = monster.hp / monster.maxHp;
        const barWidth = monster.size * 2;
        const barHeight = 6;
        const barX = monster.x - barWidth / 2;
        const barY = monster.y - monster.size - 15;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        ctx.fillStyle = hpPercent > 0.5 ? '#32cd32' : hpPercent > 0.25 ? '#ffc107' : '#dc3545';
        ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
        
        // Monster name
        ctx.font = '12px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText(monster.name, monster.x, barY - 8);
    }
    
    // Draw player
    const p = gameState.player;
    
    // Player shadow
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + p.size - 5, p.size * 0.8, p.size * 0.3, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
    
    // Player body
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(p.x - 5, p.y - 5, 5, p.x, p.y, p.size);
    gradient.addColorStop(0, '#4da6ff');
    gradient.addColorStop(1, '#0066cc');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Player icon
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧑', p.x, p.y);
    
    // Attack indicator
    if (p.isAttacking) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.attackRange, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.5)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Weapon swing effect
        ctx.font = '30px Arial';
        const weaponIcon = gameState.player.equipment.weapon?.icon || '⚔️';
        const offsetX = p.direction === 'right' ? 30 : -30;
        ctx.fillText(weaponIcon, p.x + offsetX, p.y);
    }
    
    // Draw particles
    for (const particle of gameState.particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
    
    // Draw damage numbers
    for (const dmg of gameState.damageNumbers) {
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = dmg.color;
        ctx.globalAlpha = dmg.life;
        ctx.fillText(dmg.text, dmg.x, dmg.y);
        ctx.globalAlpha = 1;
    }
    
    // Draw buff indicators
    if (gameState.player.buffs.length > 0) {
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        let buffY = 30;
        for (const buff of gameState.player.buffs) {
            const remaining = Math.ceil((buff.endTime - Date.now()) / 1000);
            ctx.fillStyle = buff.stat === 'speed' ? '#ffc107' : '#fd7e14';
            ctx.fillText(`${buff.stat.toUpperCase()} +${buff.amount} (${remaining}s)`, 10, buffY);
            buffY += 20;
        }
    }
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
    const starterSword = generateItem('weapon', 'common');
    starterSword.name = 'Rusty Sword';
    starterSword.stats = { attack: 5 };
    addToInventory(starterSword);
    
    // Welcome message
    addMessage('Welcome to Dark Realms! Use arrow keys to move, SPACE to attack.', 'system');
    addMessage('Defeat monsters to gain experience and loot!', 'system');
    
    // Start game loop
    requestAnimationFrame(gameLoop);
}

// Start the game
init();
