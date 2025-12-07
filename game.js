// Dark Realms RPG - Main Game Engine
// Top-down RPG inspired by Diablo and Runescape
console.log('✅ GAME.JS V4.5 LOADED - Tooltip Click Fix!');

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
    corridorWidth: 3, // Wider corridors (in tiles)
    // Diablo-inspired feature configuration
    championSpawnChance: 0.2, // 20% chance for affixed enemies
    healthGlobeDropChance: 0.5, // 50% chance on enemy death
    healthGlobeLifetimeMs: 30000, // 30 seconds before despawn
    corpseFadeTimeMs: 10000, // 10 seconds to fade
    deathAnimationDurationMs: 300, // 300ms fade out
    ambientParticleSpawnChance: 0.3, // 30% chance per frame
    potionDropReduction: 0.5 // Reduce potion drops by 50% since we have health globes
};

// Speed bonus ranges for item generation
const SPEED_BONUS_CONFIG = {
    rareMin: 0.5,
    rareMax: 2.5,
    epicMin: 2.5,
    epicMax: 5
};

// ============================================
// ITEM DEFINITIONS
// ============================================

const RARITIES = {
    common: { name: 'Common', color: '#808080', dropChance: 0.595, statMultiplier: 1.0 },
    uncommon: { name: 'Uncommon', color: '#1eff00', dropChance: 0.30, statMultiplier: 1.3 },
    rare: { name: 'Rare', color: '#0070dd', dropChance: 0.095, statMultiplier: 1.6 },
    epic: { name: 'Epic', color: '#a335ee', dropChance: 0.01, statMultiplier: 2.0 },
    legendary: { name: 'Legendary', color: '#ff8000', dropChance: 0.0025, statMultiplier: 2.5 },
    mythic: { name: 'Mythic', color: '#e6cc80', dropChance: 0.001, statMultiplier: 3.5 },
    radiant: { name: 'Radiant', color: '#ff1493', dropChance: 0, statMultiplier: 5.0 } // Crafted only
};

// ============================================
// BOSS CRAFTING MATERIALS
// ============================================

const BOSS_MATERIALS = {
    'Zombie King': {
        name: 'Putrid Heart',
        icon: '💚',
        description: 'A rotting heart that still beats with unholy energy',
        dropChance: 0.01
    },
    'Wraith Lord': {
        name: 'Spectral Essence',
        icon: '👻',
        description: 'Condensed soul energy from the ethereal plane',
        dropChance: 0.01
    },
    'Demon Overlord': {
        name: 'Infernal Core',
        icon: '🔴',
        description: 'A burning core fragment from the depths of hell',
        dropChance: 0.01
    },
    'Ancient Dragon': {
        name: 'Dragon Scale',
        icon: '🐉',
        description: 'An ancient scale harder than any mortal metal',
        dropChance: 0.01
    },
    'Lich King': {
        name: 'Phylactery Shard',
        icon: '💎',
        description: 'A fragment of eternal unlife and dark magic',
        dropChance: 0.01
    },
    'Vampire Lord': {
        name: 'Blood Crystal',
        icon: '🩸',
        description: 'Crystalized blood of a thousand victims',
        dropChance: 0.01
    },
    'Fallen Angel': {
        name: 'Corrupted Halo',
        icon: '⭕',
        description: 'A twisted remnant of divine grace turned dark',
        dropChance: 0.01
    },
    'Abyssal Horror': {
        name: 'Void Stone',
        icon: '⚫',
        description: 'A stone that consumes light and sanity alike',
        dropChance: 0.01
    },
    'Infernal Titan': {
        name: 'Titan Ember',
        icon: '🔥',
        description: 'An eternal flame from the forge of creation',
        dropChance: 0.01
    },
    'Chaos Wyrm': {
        name: 'Chaos Fang',
        icon: '🦷',
        description: 'A fang that warps reality with each touch',
        dropChance: 0.01
    },
    'Void Reaver': {
        name: 'Void Shard',
        icon: '🌑',
        description: 'A fragment of pure nothingness given form',
        dropChance: 0.01
    }
};

// ============================================
// RADIANT CRAFTING RECIPES
// ============================================

const RADIANT_RECIPES = [
    {
        id: 'undying_blade',
        name: 'Undying Blade',
        type: 'weapon',
        icon: '⚔️',
        materials: {
            'Putrid Heart': 3,
            'Spectral Essence': 3,
            'Phylactery Shard': 2
        },
        stats: { attack: 150, maxHp: 100, lifeSteal: 0.30 },
        description: 'A blade forged from undeath itself'
    },
    {
        id: 'infernal_destroyer',
        name: 'Infernal Destroyer',
        type: 'weapon',
        icon: '⚔️',
        materials: {
            'Infernal Core': 5,
            'Titan Ember': 3,
            'Dragon Scale': 2
        },
        stats: { attack: 200, fireDamage: 0.50, maxHp: 80 },
        description: 'A weapon of pure elemental destruction'
    },
    {
        id: 'voidforged_armor',
        name: 'Voidforged Armor',
        type: 'armor',
        icon: '🛡️',
        materials: {
            'Void Stone': 4,
            'Void Shard': 3,
            'Chaos Fang': 2
        },
        stats: { defense: 120, maxHp: 300, speed: 2.0 },
        description: 'Armor woven from the fabric of the void'
    },
    {
        id: 'crown_of_dominion',
        name: 'Crown of Dominion',
        type: 'helmet',
        icon: '👑',
        materials: {
            'Corrupted Halo': 3,
            'Phylactery Shard': 2,
            'Blood Crystal': 2
        },
        stats: { defense: 80, maxHp: 150, maxMana: 200, attack: 50 },
        description: 'A crown that commands both the living and the dead'
    },
    {
        id: 'dragonscale_shield',
        name: 'Dragonscale Aegis',
        type: 'shield',
        icon: '🛡️',
        materials: {
            'Dragon Scale': 5,
            'Titan Ember': 2,
            'Infernal Core': 2
        },
        stats: { defense: 150, maxHp: 250 },
        description: 'An impenetrable shield forged from dragon scales'
    },
    {
        id: 'bloodbound_amulet',
        name: 'Bloodbound Amulet',
        type: 'amulet',
        icon: '📿',
        materials: {
            'Blood Crystal': 4,
            'Putrid Heart': 2,
            'Spectral Essence': 2
        },
        stats: { maxHp: 200, attack: 60, lifeSteal: 0.25 },
        description: 'An amulet that binds life and death'
    }
];

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
        baseStats: { defense: 3, speed: 0.75 }, // Base speed reduced to 0.75 to work with reduced speed bonus system (max 5)
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

// ============================================
// ITEM SET SYSTEM
// ============================================

const ITEM_SETS = {
    shadowsReaper: {
        name: "Shadow's Reaper",
        theme: 'dark',
        rarity: 'legendary',
        pieces: ['weapon', 'helmet', 'armor', 'gloves', 'boots'],
        bonuses: {
            2: { description: '+15% Attack Speed', stats: { speed: 1.5 } },
            3: { description: '+50 Max HP, +20 Attack', stats: { maxHp: 50, attack: 20 } },
            5: { description: '+100 Max HP, Life Steal on Hit', stats: { maxHp: 100, lifeSteal: 0.15 } }
        },
        itemStats: {
            weapon: { attack: 45, speed: 1.0 },
            helmet: { defense: 25, maxHp: 40 },
            armor: { defense: 50, maxHp: 80 },
            gloves: { attack: 15, defense: 10 },
            boots: { defense: 15, speed: 2.0 }
        }
    },
    bloodlordsBane: {
        name: "Bloodlord's Bane",
        theme: 'vampiric',
        rarity: 'legendary',
        pieces: ['weapon', 'helmet', 'armor', 'amulet', 'ring'],
        bonuses: {
            2: { description: '+25 Max HP, +10% Life Steal', stats: { maxHp: 25, lifeSteal: 0.10 } },
            3: { description: '+30 Attack, +25 Defense', stats: { attack: 30, defense: 25 } },
            5: { description: '+150 Max HP, Vampiric Aura', stats: { maxHp: 150, lifeSteal: 0.25 } }
        },
        itemStats: {
            weapon: { attack: 50, maxHp: 30 },
            helmet: { defense: 30, maxHp: 50 },
            armor: { defense: 55, maxHp: 100 },
            amulet: { maxHp: 60, attack: 15 },
            ring: { attack: 20, maxHp: 40 }
        }
    },
    frostwardenPlate: {
        name: "Frostwarden Plate",
        theme: 'ice',
        rarity: 'epic',
        pieces: ['helmet', 'armor', 'shield', 'gloves', 'boots'],
        bonuses: {
            2: { description: '+40 Defense', stats: { defense: 40 } },
            3: { description: '+75 Max HP, +30 Defense', stats: { maxHp: 75, defense: 30 } },
            5: { description: '+150 Max HP, Frozen Aura', stats: { maxHp: 150, defense: 50 } }
        },
        itemStats: {
            helmet: { defense: 35, maxHp: 45 },
            armor: { defense: 60, maxHp: 90 },
            shield: { defense: 45, maxHp: 50 },
            gloves: { defense: 20, maxHp: 30 },
            boots: { defense: 25, speed: 1.0 }
        }
    },
    infernoWrath: {
        name: "Inferno's Wrath",
        theme: 'fire',
        rarity: 'mythic',
        pieces: ['weapon', 'helmet', 'armor', 'gloves', 'amulet'],
        bonuses: {
            2: { description: '+35 Attack', stats: { attack: 35 } },
            3: { description: '+50 Attack, +40 Max HP', stats: { attack: 50, maxHp: 40 } },
            5: { description: '+100 Attack, Burning Aura', stats: { attack: 100, fireDamage: 0.30 } }
        },
        itemStats: {
            weapon: { attack: 60, maxHp: 20 },
            helmet: { defense: 25, maxHp: 45, attack: 10 },
            armor: { defense: 45, maxHp: 85, attack: 15 },
            gloves: { attack: 25, defense: 15 },
            amulet: { maxHp: 70, attack: 30 }
        }
    },
    voidwalkerGarb: {
        name: "Voidwalker Garb",
        theme: 'void',
        rarity: 'mythic',
        pieces: ['helmet', 'armor', 'boots', 'ring', 'amulet'],
        bonuses: {
            2: { description: '+50 Max Mana, +1.5 Speed', stats: { maxMana: 50, speed: 1.5 } },
            3: { description: '+100 Max Mana, +50 Max HP', stats: { maxMana: 100, maxHp: 50 } },
            5: { description: '+200 Max Mana, Void Step', stats: { maxMana: 200, speed: 3.0 } }
        },
        itemStats: {
            helmet: { defense: 30, maxMana: 40, maxHp: 40 },
            armor: { defense: 50, maxMana: 60, maxHp: 80 },
            boots: { defense: 20, speed: 2.5, maxMana: 30 },
            ring: { maxMana: 50, attack: 15 },
            amulet: { maxMana: 80, maxHp: 60 }
        }
    },
    dragonslayerRegalia: {
        name: "Dragonslayer Regalia",
        theme: 'dragon',
        rarity: 'mythic',
        pieces: ['weapon', 'helmet', 'armor', 'shield', 'gloves'],
        bonuses: {
            2: { description: '+40 Attack, +40 Defense', stats: { attack: 40, defense: 40 } },
            3: { description: '+80 Max HP, +50 Attack', stats: { maxHp: 80, attack: 50 } },
            5: { description: '+200 Max HP, Dragon Might', stats: { maxHp: 200, attack: 75, defense: 50 } }
        },
        itemStats: {
            weapon: { attack: 65, defense: 10 },
            helmet: { defense: 35, maxHp: 55, attack: 10 },
            armor: { defense: 65, maxHp: 110 },
            shield: { defense: 50, maxHp: 60 },
            gloves: { attack: 30, defense: 20 }
        }
    }
};

// Simplified potion system - only healing potions, instant pickup
const POTION_TYPES = {
    health: { name: 'Health Potion', icon: '❤️', effect: 'hp', amount: 50, color: '#dc3545' }
};

// ============================================
// POINTS OF INTEREST
// ============================================

const POI_TYPES = {
    shrine: {
        name: 'Mysterious Shrine',
        icon: '⛩️',
        color: '#9370db',
        description: 'A shrine radiating ancient power',
        effect: 'buff',
        buffs: [
            { name: 'Blessing of Strength', stat: 'attack', amount: 20, duration: 300000 },
            { name: 'Blessing of Fortitude', stat: 'defense', amount: 15, duration: 300000 },
            { name: 'Blessing of Speed', stat: 'speed', amount: 2, duration: 300000 },
            { name: 'Blessing of Vitality', stat: 'maxHp', amount: 100, duration: 300000 }
        ],
        cooldown: 0,
        oneTimeUse: false
    },
    fountain: {
        name: 'Blood Fountain',
        icon: '⛲',
        color: '#8b0000',
        description: 'A fountain of crimson liquid pulses with dark energy',
        effect: 'heal',
        healAmount: 1.0, // Full heal
        cooldown: 0,
        oneTimeUse: false
    },
    chest: {
        name: 'Treasure Chest',
        icon: '📦',
        color: '#ffd700',
        description: 'A locked chest filled with riches',
        effect: 'loot',
        lootTable: {
            gold: [100, 500],
            itemCount: [2, 4],
            guaranteedRarity: 'rare'
        },
        cooldown: 0,
        oneTimeUse: true
    },
    altar: {
        name: 'Dark Altar',
        icon: '🗿',
        color: '#4a1a1a',
        description: 'An altar of sacrifice offers power for a price',
        effect: 'sacrifice',
        costHpPercent: 0.25, // Costs 25% HP
        reward: {
            gold: [200, 400],
            exp: 500,
            buff: { stat: 'attack', amount: 30, duration: 600000 }
        },
        cooldown: 0,
        oneTimeUse: false
    },
    portal: {
        name: 'Mystic Portal',
        icon: '🌀',
        color: '#00ffff',
        description: 'A swirling portal to unknown places',
        effect: 'transport',
        destination: 'random', // Teleports to random room
        cooldown: 60000, // 1 minute cooldown
        oneTimeUse: false
    },
    setForge: {
        name: 'Ancient Forge',
        icon: '🔨',
        color: '#ff6600',
        description: 'An ancient forge capable of creating legendary sets',
        effect: 'setItem',
        cooldown: 0,
        oneTimeUse: true,
        guaranteedSet: true
    }
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
    },
    {
        name: 'Lich King',
        icon: '💀',
        color: '#1a001a',  // Dark purple necromancy
        baseHp: 1500,
        baseDamage: 70,
        baseExp: 1200,
        baseGold: [600, 1200],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 1.8,
        size: 65,
        minLevel: 15,
        isBoss: true,
        guaranteedRarity: 'mythic'
    },
    {
        name: 'Vampire Lord',
        icon: '🦇',
        color: '#2a0000',  // Blood red
        baseHp: 1800,
        baseDamage: 75,
        baseExp: 1500,
        baseGold: [800, 1500],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 3.0,
        size: 60,
        minLevel: 18,
        isBoss: true,
        guaranteedRarity: 'mythic'
    },
    {
        name: 'Fallen Angel',
        icon: '😇',
        color: '#1a1a00',  // Dark corrupted gold
        baseHp: 2000,
        baseDamage: 80,
        baseExp: 1800,
        baseGold: [1000, 2000],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 2.8,
        size: 68,
        minLevel: 21,
        isBoss: true,
        guaranteedRarity: 'mythic'
    },
    {
        name: 'Abyssal Horror',
        icon: '👁️',
        color: '#000a1a',  // Deep void blue
        baseHp: 2500,
        baseDamage: 90,
        baseExp: 2200,
        baseGold: [1500, 2500],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 2.0,
        size: 75,
        minLevel: 24,
        isBoss: true,
        guaranteedRarity: 'mythic'
    },
    {
        name: 'Infernal Titan',
        icon: '🔥',
        color: '#3a0a00',  // Dark flame
        baseHp: 3000,
        baseDamage: 100,
        baseExp: 2800,
        baseGold: [2000, 3000],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 1.5,
        size: 80,
        minLevel: 27,
        isBoss: true,
        guaranteedRarity: 'mythic'
    },
    {
        name: 'Chaos Wyrm',
        icon: '🐉',
        color: '#2a0a2a',  // Dark chaos purple
        baseHp: 3200,
        baseDamage: 105,
        baseExp: 3200,
        baseGold: [2200, 3500],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 2.2,
        size: 75,
        minLevel: 28,
        isBoss: true,
        guaranteedRarity: 'mythic'
    },
    {
        name: 'Void Reaver',
        icon: '🌀',
        color: '#0a0a0a',  // Pure darkness
        baseHp: 3500,
        baseDamage: 110,
        baseExp: 3500,
        baseGold: [2500, 4000],
        lootChance: 1.0,
        potionDropChance: 1.0,
        speed: 2.5,
        size: 70,
        minLevel: 30,
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
    craftingMaterials: {}, // Boss materials for crafting
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
    inventory: Array(28).fill(null),
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
        highestLevelReached: 1,
        pointsOfInterest: [], // POIs in current dungeon
        exploredRooms: new Set(), // Track visited rooms
        roomDescriptions: [], // Room descriptions
        theme: null, // Current dungeon theme
        environmentalStory: null // Environmental storytelling
    },
    sets: {
        equipped: {}, // Track equipped set pieces by set name
        bonusesActive: [] // Currently active set bonuses
    },
    town: {
        shopOpen: false,
        dungeonEntranceX: 700,
        dungeonEntranceY: 300,
        forgeX: 220,
        forgeY: 150
    },
    camera: {
        x: 0,
        y: 0
    },
    // UI toggles (for QA/dev)
    showTooltips: false,
    gameTime: 0,
    regenTimer: 0,
    isPaused: false,
    showShop: false,
    showMinimap: true, // Toggle minimap visibility with 'M' key
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

// Hide tooltip when clicking anywhere
document.addEventListener('click', (e) => {
    const tooltip = document.getElementById('item-tooltip');
    if (tooltip && !tooltip.contains(e.target)) {
        hideTooltip();
    }
});

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
    gameState.dungeon.exploredRooms = new Set(); // Track which rooms have been explored
    
    // PROCEDURAL: Generate room descriptions for each room
    gameState.dungeon.roomDescriptions = rooms.map(() => proceduralGen.generateRoomDescription());
    
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
            const levelScale = 1 + (level - 1) * 0.3; // Increased from 0.15 to 0.3 for stronger monsters
            
            const x = (room.x + randomRange(1, room.w - 2)) * GAME_CONFIG.tileSize;
            const y = (room.y + randomRange(1, room.h - 2)) * GAME_CONFIG.tileSize;
            
            const goldMin = Math.floor(monsterType.baseGold[0] * levelScale);
            const goldMax = Math.floor(monsterType.baseGold[1] * levelScale);
            
            // DIABLO FEATURE 9: Random affix chance (20% for champions)
            let affix = null;
            let affixMultiplier = 1.0;
            let isChampion = false;
            if (Math.random() < GAME_CONFIG.championSpawnChance && level >= 2) {
                affix = randomChoice(ENEMY_AFFIXES);
                affixMultiplier = affix.hpMultiplier;
                isChampion = true;
            }
            
            // PROCEDURAL: Generate enemy name and description
            const proceduralName = proceduralGen.generateEnemyName(monsterType.name, isChampion, false);
            const proceduralDesc = proceduralGen.generateEnemyDescription(monsterType.name);
            
            // Generate visual variation seed from name
            const spriteSeed = proceduralName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            
            gameState.monsters.push({
                id: Date.now() + Math.random(),
                ...monsterType,
                name: proceduralName, // Use procedural name
                description: proceduralDesc, // Add description
                baseName: monsterType.name, // Keep original for reference
                spriteSeed: spriteSeed, // For procedural sprite variations
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
        const levelScale = 1 + (level - 1) * 0.3; // Increased from 0.15 to 0.3 for stronger bosses
        
        // Spawn boss in last room (exit room)
        const lastRoom = rooms[rooms.length - 1];
        const bossX = (lastRoom.x + Math.floor(lastRoom.w / 2)) * GAME_CONFIG.tileSize;
        const bossY = (lastRoom.y + Math.floor(lastRoom.h / 2) + 1) * GAME_CONFIG.tileSize;
        
        const goldMin = Math.floor(bossType.baseGold[0] * levelScale);
        const goldMax = Math.floor(bossType.baseGold[1] * levelScale);
        
        // PROCEDURAL: Generate boss name and description
        const proceduralBossName = proceduralGen.generateEnemyName(bossType.name, false, true);
        const proceduralBossDesc = proceduralGen.generateEnemyDescription(bossType.name);
        
        // Generate visual variation seed from name
        const bossSeed = proceduralBossName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        gameState.monsters.push({
            id: Date.now() + Math.random(),
            ...bossType,
            name: proceduralBossName, // Use procedural name
            description: proceduralBossDesc, // Add description
            baseName: bossType.name, // Keep original for reference
            spriteSeed: bossSeed, // For procedural sprite variations
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
    
    // PROCEDURAL: Generate dungeon theme
    const dungeonTheme = proceduralGen.generateDungeonTheme(level);
    gameState.dungeon.theme = dungeonTheme;
    
    // Generate new dungeon
    const dungeonInfo = generateDungeon(level);
    
    // Place player at entrance
    gameState.player.worldX = dungeonInfo.entranceX * GAME_CONFIG.tileSize;
    gameState.player.worldY = dungeonInfo.entranceY * GAME_CONFIG.tileSize;
    
    // Spawn enemies
    spawnDungeonEnemies();
    
    // Spawn POIs
    spawnPointsOfInterest();
    
    // Generate room descriptions
    gameState.dungeon.roomDescriptions = [];
    gameState.dungeon.exploredRooms = new Set();
    for (let i = 0; i < dungeonInfo.rooms.length; i++) {
        gameState.dungeon.roomDescriptions.push(proceduralGen.generateRoomDescription());
    }
    
    // PROCEDURAL: Add environmental storytelling
    const envStory = proceduralGen.generateEnvironmentalStory();
    gameState.dungeon.environmentalStory = envStory;
    
    addMessage(`Entering ${dungeonTheme.name} - Level ${level}...`, 'system');
    addMessage(dungeonTheme.desc, 'system');
    addMessage(envStory.sight, 'system');
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
        if (shopBackdrop) {
            shopBackdrop.style.display = 'block';
            shopBackdrop.style.pointerEvents = 'auto';
        }
        
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
        if (shopBackdrop) {
            shopBackdrop.style.display = 'none';
            shopBackdrop.style.pointerEvents = 'none';
        }
    }
}

// ============================================
// CRAFTING SYSTEM
// ============================================

function toggleCrafting() {
    const craftingPanel = document.getElementById('crafting-panel');
    const craftingBackdrop = document.getElementById('crafting-backdrop');
    const isVisible = craftingPanel.style.display === 'block';
    
    craftingPanel.style.display = isVisible ? 'none' : 'block';
    if (craftingBackdrop) {
        craftingBackdrop.style.display = isVisible ? 'none' : 'block';
        craftingBackdrop.style.pointerEvents = isVisible ? 'none' : 'auto';
    }
    
    if (!isVisible) {
        updateCraftingUI();
    }
}

function updateCraftingUI() {
    const materialsGrid = document.getElementById('materials-grid');
    const recipesGrid = document.getElementById('recipes-grid');
    
    // Display materials
    materialsGrid.innerHTML = '';
    const materialEntries = Object.entries(gameState.craftingMaterials);
    if (materialEntries.length === 0) {
        materialsGrid.innerHTML = '<div class="no-materials">No materials yet. Defeat bosses to collect!</div>';
    } else {
        for (const [name, count] of materialEntries) {
            const materialInfo = Object.values(BOSS_MATERIALS).find(m => m.name === name);
            if (materialInfo) {
                const div = document.createElement('div');
                div.className = 'material-item';
                div.innerHTML = `
                    <div class="material-icon">${materialInfo.icon}</div>
                    <div class="material-name">${name}</div>
                    <div class="material-count">×${count}</div>
                `;
                div.title = materialInfo.description;
                materialsGrid.appendChild(div);
            }
        }
    }
    
    // Display recipes
    recipesGrid.innerHTML = '';
    for (const recipe of RADIANT_RECIPES) {
        const div = document.createElement('div');
        div.className = 'recipe-item';
        
        // Check if player has enough materials
        let canCraft = true;
        let materialsHTML = '';
        for (const [matName, matCount] of Object.entries(recipe.materials)) {
            const hasCount = gameState.craftingMaterials[matName] || 0;
            const hasEnough = hasCount >= matCount;
            canCraft = canCraft && hasEnough;
            const materialInfo = Object.values(BOSS_MATERIALS).find(m => m.name === matName);
            const color = hasEnough ? '#4caf50' : '#ff4444';
            materialsHTML += `<div style="color: ${color};">${materialInfo?.icon || '?'} ${matName}: ${hasCount}/${matCount}</div>`;
        }
        
        div.innerHTML = `
            <div class="recipe-header">
                <div class="recipe-icon">${recipe.icon}</div>
                <div class="recipe-name rarity-radiant">${recipe.name}</div>
            </div>
            <div class="recipe-description">${recipe.description}</div>
            <div class="recipe-stats">
                ${Object.entries(recipe.stats).map(([stat, val]) => {
                    const statName = stat === 'attack' ? 'Attack' : 
                                   stat === 'defense' ? 'Defense' : 
                                   stat === 'maxHp' ? 'Max HP' : 
                                   stat === 'maxMana' ? 'Max Mana' : 
                                   stat === 'speed' ? 'Speed' : 
                                   stat === 'lifeSteal' ? 'Life Steal' : 
                                   stat === 'fireDamage' ? 'Fire Damage' : stat;
                    const value = stat === 'lifeSteal' || stat === 'fireDamage' ? `${(val * 100).toFixed(0)}%` : val;
                    return `+${value} ${statName}`;
                }).join(', ')}
            </div>
            <div class="recipe-materials">${materialsHTML}</div>
            <button class="craft-item-btn" ${!canCraft ? 'disabled' : ''} onclick="craftItem('${recipe.id}')">${canCraft ? '🔨 Craft' : '❌ Insufficient Materials'}</button>
        `;
        
        recipesGrid.appendChild(div);
    }
}

function craftItem(recipeId) {
    const recipe = RADIANT_RECIPES.find(r => r.id === recipeId);
    if (!recipe) return;
    
    // Check materials
    for (const [matName, matCount] of Object.entries(recipe.materials)) {
        const hasCount = gameState.craftingMaterials[matName] || 0;
        if (hasCount < matCount) {
            addMessage('Insufficient materials!', 'system');
            return;
        }
    }
    
    // Check inventory space
    const itemCount = gameState.inventory.filter(i => i !== null).length;
    if (itemCount >= 28) {
        addMessage('Inventory full!', 'system');
        return;
    }
    
    // Consume materials
    for (const [matName, matCount] of Object.entries(recipe.materials)) {
        gameState.craftingMaterials[matName] -= matCount;
        if (gameState.craftingMaterials[matName] <= 0) {
            delete gameState.craftingMaterials[matName];
        }
    }
    
    // Create radiant item
    const item = {
        id: Date.now() + Math.random(),
        name: recipe.name,
        type: recipe.type,
        slot: recipe.type === 'weapon' ? 'weapon' : 
              recipe.type === 'helmet' ? 'helmet' : 
              recipe.type === 'armor' ? 'armor' : 
              recipe.type === 'shield' ? 'shield' : 
              recipe.type === 'amulet' ? 'amulet' : recipe.type,
        rarity: 'radiant',
        icon: recipe.icon,
        stats: { ...recipe.stats },
        sellPrice: 10000,
        level: gameState.dungeonLevel
    };
    
    // Add to inventory
    const emptySlot = gameState.inventory.findIndex(i => i === null);
    if (emptySlot !== -1) {
        gameState.inventory[emptySlot] = item;
    }
    
    addMessage(`✨ Crafted ${recipe.name}!`, 'legendary');
    createParticles(400, 300, '#ff1493', 30);
    updateCraftingUI();
    updateInventoryUI();
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
    // Chance for set items (5% base, increases with dungeon level)
    const setChance = Math.min(0.05 + (dungeonLevel * 0.005), 0.25); // Max 25% at high levels
    
    if (!forcedRarity && Math.random() < setChance) {
        // Try to generate a set item
        const setKeys = Object.keys(ITEM_SETS);
        const randomSet = randomChoice(setKeys);
        const set = ITEM_SETS[randomSet];
        
        // Choose a random piece from the set
        const randomPiece = randomChoice(set.pieces);
        
        // Check if forced type matches or if no type is forced
        if (!forcedType || forcedType === randomPiece) {
            const setItem = generateSetItem(randomSet, randomPiece, dungeonLevel);
            if (setItem) {
                return setItem;
            }
        }
    }
    
    const typeKeys = Object.keys(ITEM_TYPES);
    const type = forcedType || randomChoice(typeKeys);
    const itemType = ITEM_TYPES[type];
    const rarity = forcedRarity || generateRarity(dungeonLevel);
    const rarityData = RARITIES[rarity];
    
    // PROCEDURAL: Generate item name
    const proceduralItem = proceduralGen.generateProceduralItem(type, itemType, rarityData.name);
    const itemName = proceduralItem.proceduralName;
    const baseName = proceduralItem.baseName;
    const flavorText = proceduralItem.flavorText;
    
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
        name: itemName, // Use procedural name
        baseName: baseName, // Keep base name for reference
        flavorText: flavorText, // Add flavor text
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
// SET ITEM SYSTEM
// ============================================

function generateSetItem(setName, itemType, dungeonLevel = 1) {
    const set = ITEM_SETS[setName];
    if (!set || !set.pieces.includes(itemType)) {
        return null;
    }
    
    const rarityData = RARITIES[set.rarity];
    const itemTypeData = ITEM_TYPES[itemType];
    const setStats = set.itemStats[itemType];
    
    // Level scaling
    const levelScale = 1 + (dungeonLevel - 1) * 0.1;
    
    const stats = {};
    for (const [stat, value] of Object.entries(setStats)) {
        if (stat === 'speed') {
            stats[stat] = value;
        } else {
            stats[stat] = Math.floor(value * levelScale);
        }
    }
    
    return {
        id: Date.now() + Math.random(),
        name: `${set.name} - ${itemTypeData.names[0]}`,
        type: itemType,
        slot: itemTypeData.slot,
        icon: itemTypeData.icon,
        rarity: set.rarity,
        stats: stats,
        sellPrice: Math.floor(500 * rarityData.statMultiplier * levelScale),
        isSetItem: true,
        setName: setName,
        setInfo: set.name,
        flavorText: `Part of the ${set.name} set`
    };
}

function calculateSetBonuses() {
    // Reset set tracking
    gameState.sets.equipped = {};
    gameState.sets.bonusesActive = [];
    
    // Count equipped set pieces
    for (const slot in gameState.player.equipment) {
        const item = gameState.player.equipment[slot];
        if (item && item.isSetItem) {
            if (!gameState.sets.equipped[item.setName]) {
                gameState.sets.equipped[item.setName] = [];
            }
            gameState.sets.equipped[item.setName].push(item);
        }
    }
    
    // Apply set bonuses
    for (const setName in gameState.sets.equipped) {
        const equippedPieces = gameState.sets.equipped[setName];
        const set = ITEM_SETS[setName];
        const pieceCount = equippedPieces.length;
        
        // Check each bonus tier
        for (const [requiredPieces, bonus] of Object.entries(set.bonuses)) {
            if (pieceCount >= parseInt(requiredPieces)) {
                gameState.sets.bonusesActive.push({
                    setName: set.name,
                    description: bonus.description,
                    stats: bonus.stats,
                    requiredPieces: requiredPieces
                });
            }
        }
    }
}

function getActiveSets() {
    const activeSets = [];
    for (const setName in gameState.sets.equipped) {
        const equippedPieces = gameState.sets.equipped[setName];
        const set = ITEM_SETS[setName];
        activeSets.push({
            name: set.name,
            pieces: equippedPieces.length,
            total: set.pieces.length
        });
    }
    return activeSets;
}

// ============================================
// POINTS OF INTEREST
// ============================================

function spawnPointsOfInterest() {
    gameState.dungeon.pointsOfInterest = [];
    const level = gameState.dungeonLevel;
    const rooms = gameState.dungeon.rooms;
    
    // Spawn 1-3 POIs per dungeon
    const poiCount = randomRange(1, Math.min(3, Math.floor(level / 3) + 1));
    const poiTypes = Object.keys(POI_TYPES);
    
    for (let i = 0; i < poiCount && i < rooms.length - 2; i++) {
        // Don't spawn in first or last room
        const roomIndex = randomRange(1, rooms.length - 2);
        const room = rooms[roomIndex];
        const poiType = randomChoice(poiTypes);
        const poiData = POI_TYPES[poiType];
        
        const x = (room.x + Math.floor(room.w / 2)) * GAME_CONFIG.tileSize;
        const y = (room.y + Math.floor(room.h / 2)) * GAME_CONFIG.tileSize;
        
        gameState.dungeon.pointsOfInterest.push({
            id: Date.now() + Math.random(),
            type: poiType,
            ...poiData,
            x: x,
            y: y,
            used: false,
            lastUseTime: 0
        });
    }
}

function interactWithPOI(poi) {
    const now = Date.now();
    
    // Check cooldown
    if (poi.cooldown > 0 && now - poi.lastUseTime < poi.cooldown) {
        const remainingTime = Math.ceil((poi.cooldown - (now - poi.lastUseTime)) / 1000);
        addMessage(`${poi.name} is recharging (${remainingTime}s remaining)`, 'system');
        return;
    }
    
    // Check one-time use
    if (poi.oneTimeUse && poi.used) {
        addMessage(`${poi.name} has already been used`, 'system');
        return;
    }
    
    // Apply POI effect
    switch (poi.effect) {
        case 'buff':
            const buff = randomChoice(poi.buffs);
            gameState.player.buffs.push({
                ...buff,
                startTime: now,
                endTime: now + buff.duration
            });
            addMessage(`${poi.name}: ${buff.name} activated!`, 'loot');
            recalculateStats();
            break;
            
        case 'heal':
            const healAmount = Math.floor(gameState.player.maxHp * poi.healAmount);
            gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healAmount);
            addMessage(`${poi.name}: Restored ${healAmount} HP!`, 'loot');
            createParticles(poi.x, poi.y, '#00ff00', 15);
            break;
            
        case 'loot':
            const goldAmount = randomRange(poi.lootTable.gold[0], poi.lootTable.gold[1]);
            gameState.player.gold += goldAmount;
            const itemCount = randomRange(poi.lootTable.itemCount[0], poi.lootTable.itemCount[1]);
            for (let i = 0; i < itemCount; i++) {
                const item = generateItem(null, poi.lootTable.guaranteedRarity, gameState.dungeonLevel);
                gameState.loot.push({
                    ...item,
                    x: poi.x + randomRange(-30, 30),
                    y: poi.y + randomRange(-30, 30)
                });
            }
            addMessage(`${poi.name}: Found ${goldAmount} gold and ${itemCount} items!`, 'loot');
            break;
            
        case 'sacrifice':
            const hpCost = Math.floor(gameState.player.maxHp * poi.costHpPercent);
            if (gameState.player.hp <= hpCost) {
                addMessage(`Not enough HP to use ${poi.name}!`, 'system');
                return;
            }
            gameState.player.hp -= hpCost;
            const sacrificeGold = randomRange(poi.reward.gold[0], poi.reward.gold[1]);
            gameState.player.gold += sacrificeGold;
            gameState.player.exp += poi.reward.exp;
            gameState.player.buffs.push({
                ...poi.reward.buff,
                startTime: now,
                endTime: now + poi.reward.buff.duration
            });
            addMessage(`${poi.name}: Sacrificed ${hpCost} HP for power!`, 'combat');
            createParticles(poi.x, poi.y, '#8b0000', 20);
            recalculateStats();
            break;
            
        case 'transport':
            const randomRoom = randomChoice(gameState.dungeon.rooms);
            gameState.player.worldX = (randomRoom.x + Math.floor(randomRoom.w / 2)) * GAME_CONFIG.tileSize;
            gameState.player.worldY = (randomRoom.y + Math.floor(randomRoom.h / 2)) * GAME_CONFIG.tileSize;
            addMessage(`${poi.name}: Teleported to a distant chamber!`, 'system');
            createParticles(poi.x, poi.y, '#00ffff', 25);
            break;
            
        case 'setItem':
            const setKeys = Object.keys(ITEM_SETS);
            const randomSet = randomChoice(setKeys);
            const set = ITEM_SETS[randomSet];
            const randomPiece = randomChoice(set.pieces);
            const setItem = generateSetItem(randomSet, randomPiece, gameState.dungeonLevel);
            if (setItem) {
                gameState.loot.push({
                    ...setItem,
                    x: poi.x,
                    y: poi.y
                });
                addMessage(`${poi.name}: Forged ${setItem.name}!`, 'loot');
                createParticles(poi.x, poi.y, '#ff6600', 30);
            }
            break;
    }
    
    // Mark as used
    poi.used = true;
    poi.lastUseTime = now;
    updateUI();
}

// ============================================
// SAVE / LOAD SYSTEM
// ============================================

function saveGame() {
    const saveData = {
        version: '2.0',
        timestamp: Date.now(),
        player: {
            level: gameState.player.level,
            exp: gameState.player.exp,
            expToLevel: gameState.player.expToLevel,
            gold: gameState.player.gold,
            maxHp: gameState.player.maxHp,
            maxMana: gameState.player.maxMana,
            baseAttack: gameState.player.baseAttack,
            baseDefense: gameState.player.baseDefense,
            baseSpeed: gameState.player.baseSpeed,
            equipment: gameState.player.equipment,
            upgrades: gameState.player.upgrades
        },
        inventory: gameState.inventory,
        potions: gameState.potions,
        dungeonLevel: gameState.dungeonLevel,
        highestLevelReached: gameState.dungeon.highestLevelReached,
        sets: gameState.sets,
        craftingMaterials: gameState.craftingMaterials
    };
    
    try {
        localStorage.setItem('darkRealmsRPG_save', JSON.stringify(saveData));
        addMessage('Game saved successfully!', 'system');
        return true;
    } catch (error) {
        console.error('Save failed:', error);
        addMessage('Failed to save game!', 'system');
        return false;
    }
}

function loadGame() {
    try {
        const saveDataStr = localStorage.getItem('darkRealmsRPG_save');
        if (!saveDataStr) {
            addMessage('No save data found!', 'system');
            return false;
        }
        
        const saveData = JSON.parse(saveDataStr);
        
        // Restore player data
        gameState.player.level = saveData.player.level;
        gameState.player.exp = saveData.player.exp;
        gameState.player.expToLevel = saveData.player.expToLevel;
        gameState.player.gold = saveData.player.gold;
        gameState.player.maxHp = saveData.player.maxHp;
        gameState.player.maxMana = saveData.player.maxMana;
        gameState.player.baseAttack = saveData.player.baseAttack;
        gameState.player.baseDefense = saveData.player.baseDefense;
        gameState.player.baseSpeed = saveData.player.baseSpeed;
        gameState.player.equipment = saveData.player.equipment || {};
        gameState.player.upgrades = saveData.player.upgrades || {};
        
        // Restore inventory and potions
        gameState.inventory = saveData.inventory || [];
        gameState.potions = saveData.potions || { health: 5, maxHealth: 10 };
        
        // Restore dungeon progress
        gameState.dungeonLevel = saveData.dungeonLevel || 1;
        gameState.dungeon.highestLevelReached = saveData.highestLevelReached || 1;
        
        // Restore sets
        gameState.sets = saveData.sets || { equipped: {}, bonusesActive: [] };
        
        // Restore crafting materials
        gameState.craftingMaterials = saveData.craftingMaterials || {};
        
        // Recalculate stats
        recalculateStats();
        calculateSetBonuses();
        
        // Make sure we're in town
        enterTown();
        
        addMessage('Game loaded successfully!', 'system');
        updateUI();
        return true;
    } catch (error) {
        console.error('Load failed:', error);
        addMessage('Failed to load game!', 'system');
        return false;
    }
}

function deleteSave() {
    if (confirm('Are you sure you want to delete your save? This cannot be undone!')) {
        localStorage.removeItem('darkRealmsRPG_save');
        addMessage('Save deleted!', 'system');
        // Reload page to reset game
        location.reload();
    }
}

function hasSaveData() {
    return localStorage.getItem('darkRealmsRPG_save') !== null;
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
            let damage = Math.max(1, gameState.player.attack - Math.floor(monster.baseDamage * 0.1));
            
            // Apply fire damage bonus if present
            if (gameState.player.fireDamage) {
                damage = Math.floor(damage * (1 + gameState.player.fireDamage));
            }
            
            const finalDamage = Math.floor(damage * randomFloat(0.8, 1.2));
            monster.hp -= finalDamage;
            
            // Life steal
            if (gameState.player.lifeSteal && gameState.player.lifeSteal > 0) {
                const lifeStealAmount = Math.floor(finalDamage * gameState.player.lifeSteal);
                gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + lifeStealAmount);
                if (lifeStealAmount > 0) {
                    createDamageNumber(gameState.player.worldX, gameState.player.worldY, `+${lifeStealAmount}`, '#00ff00');
                }
            }
            
            // Show damage number
            createDamageNumber(monster.x, monster.y, finalDamage, gameState.player.fireDamage ? '#ff6600' : '#ff6b6b');
            
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
    
    // Drop boss crafting materials (1% chance)
    if (isBoss && BOSS_MATERIALS[monster.baseName]) {
        const material = BOSS_MATERIALS[monster.baseName];
        if (Math.random() < material.dropChance) {
            // Add to crafting materials inventory
            if (!gameState.craftingMaterials[material.name]) {
                gameState.craftingMaterials[material.name] = 0;
            }
            gameState.craftingMaterials[material.name]++;
            addMessage(`${material.icon} Obtained ${material.name}!`, 'rare');
            createParticles(monster.x, monster.y, '#ff1493', 20);
            
            // Visual notification
            gameState.floatingTexts.push({
                x: monster.x,
                y: monster.y - 30,
                text: material.icon + ' ' + material.name,
                color: '#ff1493',
                life: 2.0,
                vy: -1.5
            });
        }
    }
    
    // DIABLO FEATURE 6: Health globe drops (50% chance)
    if (Math.random() < GAME_CONFIG.healthGlobeDropChance) {
        gameState.healthGlobes.push({
            x: monster.x + randomRange(-15, 15),
            y: monster.y + randomRange(-15, 15),
            healAmount: 30,
            createdTime: Date.now()
        });
    }
    
    // Drop health potion (instant pickup) - reduced chance since we have health globes
    if (Math.random() < (monster.potionDropChance || 0.3) * GAME_CONFIG.potionDropReduction) {
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
    // Store the monster ID to safely remove it later
    const monsterId = monster.id;
    setTimeout(() => {
        const index = gameState.monsters.findIndex(m => m.id === monsterId);
        if (index > -1) {
            gameState.monsters.splice(index, 1);
            gameState.dungeon.enemiesRemaining = gameState.monsters.length;
            updateUI();
        }
    }, GAME_CONFIG.deathAnimationDurationMs);
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
    // Find first empty slot
    for (let i = 0; i < gameState.maxInventory; i++) {
        if (!gameState.inventory[i]) {
            gameState.inventory[i] = item;
            updateInventoryUI();
            return true;
        }
    }
    addMessage('Inventory full!', 'system');
    return false;
}

function removeFromInventory(index) {
    if (index >= 0 && index < gameState.maxInventory) {
        gameState.inventory[index] = null;
        updateInventoryUI();
    }
}

function equipItem(item, inventoryIndex) {
    const slot = item.slot;

    if (!slot) {
        addMessage('Cannot equip this item - no slot defined', 'system');
        return;
    }

    const currentEquipped = gameState.player.equipment[slot];

    // Swap: put currently equipped item back into the inventory slot, or clear if none
    if (currentEquipped) {
        gameState.inventory[inventoryIndex] = currentEquipped;
    } else {
        gameState.inventory[inventoryIndex] = null;
    }

    // Equip new item
    gameState.player.equipment[slot] = item;
    
    recalculateStats();
    calculateSetBonuses();
    updateEquipmentUI();
    updateInventoryUI();
    
    addMessage(`Equipped ${item.name}`, 'system');
    console.log('Item equipped successfully');
}

function unequipItem(slot) {
    const item = gameState.player.equipment[slot];
    if (!item) return;
    
    // Find first empty inventory slot
    let emptySlot = -1;
    for (let i = 0; i < gameState.maxInventory; i++) {
        if (!gameState.inventory[i]) {
            emptySlot = i;
            break;
        }
    }
    
    if (emptySlot === -1) {
        addMessage('Inventory full!', 'system');
        return;
    }
    
    gameState.inventory[emptySlot] = item;
    gameState.player.equipment[slot] = null;
    
    recalculateStats();
    calculateSetBonuses();
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
    let lifeSteal = 0;
    let fireDamage = 0;
    
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
    
    // Calculate set bonuses
    calculateSetBonuses();
    
    // Add set bonuses
    for (const setBonus of gameState.sets.bonusesActive) {
        if (setBonus.stats) {
            p.attack += setBonus.stats.attack || 0;
            p.defense += setBonus.stats.defense || 0;
            p.speed += setBonus.stats.speed || 0;
            bonusHp += setBonus.stats.maxHp || 0;
            bonusMana += setBonus.stats.maxMana || 0;
            lifeSteal += setBonus.stats.lifeSteal || 0;
            fireDamage += setBonus.stats.fireDamage || 0;
        }
    }
    
    // Store special bonuses
    p.lifeSteal = lifeSteal;
    p.fireDamage = fireDamage;
    
    // Add buff bonuses
    for (const buff of p.buffs) {
        if (buff.stat === 'attack') p.attack += buff.amount;
        if (buff.stat === 'defense') p.defense += buff.amount;
        if (buff.stat === 'speed') p.speed += buff.amount;
        if (buff.stat === 'maxHp') bonusHp += buff.amount;
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
    const seed = monster.spriteSeed || 0;
    
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
    
    // Draw different sprites based on monster baseName (not procedural name)
    const baseName = monster.baseName || monster.name;
    switch (baseName) {
        case 'Rat':
            drawRatSprite(ctx, size, color, seed);
            break;
        case 'Slime':
            drawSlimeSprite(ctx, size, color, monster.animFrame, seed);
            break;
        case 'Goblin':
        case 'Goblin King':
            drawGoblinSprite(ctx, size, color, isBoss, seed);
            break;
        case 'Skeleton':
        case 'Skeleton Lord':
            drawSkeletonSprite(ctx, size, color, isBoss, seed);
            break;
        case 'Orc':
            drawOrcSprite(ctx, size, color, seed);
            break;
        case 'Dark Mage':
            drawMageSprite(ctx, size, color, seed);
            break;
        case 'Troll':
            drawTrollSprite(ctx, size, color, seed);
            break;
        case 'Demon':
        case 'Demon Lord':
            drawDemonSprite(ctx, size, color, isBoss, seed);
            break;
        case 'Dragon Whelp':
        case 'Elder Dragon':
        case 'Ancient Dragon':
            drawDragonSprite(ctx, size, color, isBoss, seed);
            break;
        default:
            drawGenericMonsterSprite(ctx, size, color, seed);
    }
    
    ctx.shadowBlur = 0;
    ctx.restore();
}

function drawRatSprite(ctx, size, color, seed = 0) {
    // Procedural variations based on seed
    const earSize = 0.15 + (seed % 5) * 0.01;
    const tailCurve = 0.3 + (seed % 7) * 0.05;
    const bodyWidth = 0.8 + (seed % 4) * 0.05;
    
    // Body - oval shape
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * bodyWidth, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head
    ctx.beginPath();
    ctx.ellipse(size * 0.5, -size * 0.1, size * 0.4, size * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Ears with variation
    ctx.beginPath();
    ctx.arc(size * 0.4, -size * 0.4, size * earSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.6, -size * 0.35, size * earSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner ears - dark
    ctx.fillStyle = '#1a0010';
    ctx.beginPath();
    ctx.arc(size * 0.4, -size * 0.4, size * (earSize - 0.07), 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.6, -size * 0.35, size * (earSize - 0.07), 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing red eyes
    drawGlowingEyes(ctx, size, size * 0.45, size * 0.65, -size * 0.15, 0.06);
    
    // Scary smile with teeth
    ctx.save();
    ctx.translate(size * 0.55, 0);
    drawScarySmile(ctx, size, size * 0.05, 0.15, '#ff3333');
    ctx.restore();
    
    // Tail with procedural curve
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-size * 0.6, 0);
    ctx.quadraticCurveTo(-size * 0.9, -size * tailCurve, -size, size * 0.2);
    ctx.stroke();
    
    // Legs
    ctx.fillStyle = color;
    ctx.fillRect(-size * 0.4, size * 0.3, size * 0.15, size * 0.2);
    ctx.fillRect(-size * 0.1, size * 0.3, size * 0.15, size * 0.2);
    ctx.fillRect(size * 0.15, size * 0.3, size * 0.15, size * 0.2);
    ctx.fillRect(size * 0.35, size * 0.3, size * 0.15, size * 0.2);
}

function drawSlimeSprite(ctx, size, color, animFrame, seed = 0) {
    // Procedural variations
    const blobiness = 1 + (seed % 6) * 0.1;
    const eyeSpacing = 0.25 + (seed % 8) * 0.03;
    
    // Slime body - bouncy blob shape
    const squish = animFrame === 1 ? 0.15 : 0;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, size * 0.1, size * (blobiness + squish), size * (0.8 - squish), 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Dark highlight/shine with variation
    const shinePos = -0.3 + (seed % 5) * 0.1;
    ctx.fillStyle = 'rgba(0, 50, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(size * shinePos, -size * 0.2, size * 0.25, size * 0.15, -0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing red eyes with varied spacing
    drawGlowingEyes(ctx, size, -size * eyeSpacing, size * eyeSpacing, -size * 0.1, 0.1);
    
    // Scary smile
    drawScarySmile(ctx, size, size * 0.25, 0.25, '#ff0000');
}

function drawGoblinSprite(ctx, size, color, isBoss, seed = 0) {
    const scale = isBoss ? 1.3 : 1;
    // Procedural variations
    const earAngle = 0.5 + (seed % 6) * 0.1;
    const noseSize = 0.08 + (seed % 4) * 0.02;
    
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

function drawSkeletonSprite(ctx, size, color, isBoss, seed = 0) {
    const boneColor = isBoss ? '#4a3a10' : color;
    // Procedural variations
    const ribCount = 3 + (seed % 3);
    const skullSize = 0.35 + (seed % 5) * 0.02;
    
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

function drawOrcSprite(ctx, size, color, seed = 0) {
    // Procedural variations
    const tuskLength = 0.3 + (seed % 6) * 0.05;
    const bodyBulk = 1.0 + (seed % 4) * 0.1;
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

function drawMageSprite(ctx, size, color, seed = 0) {
    // Procedural variations
    const hatHeight = 0.8 + (seed % 7) * 0.1;
    const orbGlow = 0.3 + (seed % 5) * 0.05;
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

function drawTrollSprite(ctx, size, color, seed = 0) {
    // Procedural variations
    const hunchAmount = 0.2 + (seed % 5) * 0.05;
    const armLength = 0.6 + (seed % 6) * 0.05;
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

function drawDemonSprite(ctx, size, color, isBoss, seed = 0) {
    const scale = isBoss ? 1.2 : 1;
    // Procedural variations
    const hornCurve = 0.4 + (seed % 7) * 0.05;
    const wingSpan = 0.8 + (seed % 5) * 0.1;
    
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

function drawDragonSprite(ctx, size, color, isBoss, seed = 0) {
    const scale = isBoss ? 1.3 : 1;
    // Procedural variations
    const neckLength = 0.7 + (seed % 6) * 0.1;
    const spikeCount = 3 + (seed % 4);
    
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

function drawGenericMonsterSprite(ctx, size, color, seed = 0) {
    // Procedural variations for generic monsters
    const bodyShape = seed % 4;
    const eyeGlow = 0.05 + (seed % 6) * 0.01;
    const tentacles = seed % 2 === 0;
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
            // Interact - enter dungeon, go to next level, open shop, use POI
            handleInteraction();
            break;
        case 'KeyF':
            // Interact with POI
            checkPOIInteraction();
            break;
        case 'KeyM':
            // Toggle minimap
            gameState.showMinimap = !gameState.showMinimap;
            addMessage(gameState.showMinimap ? 'Minimap enabled' : 'Minimap disabled', 'system');
            break;
        case 'F5':
            // Save game
            e.preventDefault();
            saveGame();
            break;
        case 'F9':
            // Load game
            e.preventDefault();
            loadGame();
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
        
        // Check if near forge
        const distToForge = distance(p.worldX, p.worldY, gameState.town.forgeX, gameState.town.forgeY);
        if (distToForge < 80) {
            toggleCrafting();
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

function checkPOIInteraction() {
    if (gameState.currentLocation !== 'dungeon') return;
    
    const p = gameState.player;
    for (const poi of gameState.dungeon.pointsOfInterest) {
        const dist = distance(p.worldX, p.worldY, poi.x, poi.y);
        if (dist < 60) {
            interactWithPOI(poi);
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
    
    // Update set bonuses display
    // Set bonuses UI removed - info now shown in item tooltips
    
    // Update inventory and equipment UI
    updateInventoryUI();
    updateEquipmentUI();
}

function updateInventoryUI() {
    const grid = document.getElementById('inventory-grid');
    if (!grid) {
        console.error('inventory-grid element not found!');
        return;
    }
    
    grid.innerHTML = '';

    for (let i = 0; i < gameState.maxInventory; i++) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';
        slot.dataset.index = i;

        const item = gameState.inventory[i];
        if (item) {
            slot.classList.add('has-item', `rarity-${item.rarity}`);
            // Use innerHTML instead of textContent to ensure click target is always the slot div
            slot.innerHTML = `<span class="item-icon-text">${item.icon}</span>`;
            // NOTE: click handling uses delegation registered in window.load listener
            // Tooltips disabled for QA - no event listeners added to individual slots
        }

        grid.appendChild(slot);
    }
    
    console.log('[INVENTORY] Updated inventory UI - grid children count:', grid.children.length);
    console.log('[INVENTORY] First slot element:', grid.children[0]);

    const itemCount = gameState.inventory.filter(item => item !== null).length;
    const countEl = document.getElementById('inventory-count');
    if (countEl) countEl.textContent = `(${itemCount}/${gameState.maxInventory})`;

    // materials UI removed temporarily
}

// NOTE: Event delegation is registered in init() once the DOM is ready in order
// to ensure elements exist and avoid duplicate listeners on re-renders.

function updateMaterialsUI() {
    const grid = document.getElementById('materials-backpack-grid');
    const countEl = document.getElementById('materials-count');
    const materialCount = Object.keys(gameState.craftingMaterials || {}).length;
    if (countEl) countEl.textContent = `(${materialCount})`;
    if (!grid) return; // no UI present, nothing to render
    
    grid.innerHTML = '';
    const materialEntries = Object.entries(gameState.craftingMaterials);
    
    if (materialEntries.length === 0) {
        grid.innerHTML = '<div class="no-materials-backpack">No materials collected yet.<br>Defeat bosses to obtain crafting materials!</div>';
    } else {
        for (const [name, count] of materialEntries) {
            const materialInfo = Object.values(BOSS_MATERIALS).find(m => m.name === name);
            if (materialInfo) {
                const div = document.createElement('div');
                div.className = 'material-backpack-item';
                div.innerHTML = `
                    <div class="material-backpack-icon">${materialInfo.icon}</div>
                    <div class="material-backpack-name">${name}</div>
                    <div class="material-backpack-count">×${count}</div>
                `;
                div.title = materialInfo.description;
                grid.appendChild(div);
            }
        }
    }
}

function switchInventoryTab(tab) {
    // Materials tab removed; default to items only. No-op for tab switching.
    const itemsTab = document.getElementById('inventory-items-tab');
    if (itemsTab) itemsTab.style.display = 'block';
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
        if (gameState.potions.health < gameState.potions.maxHealth) {
            gameState.potions.health++;
            removeFromInventory(index);
            addMessage(`Added ${item.name} to potion inventory`, 'system');
            updateUI();
        } else {
            addMessage('Potion inventory full!', 'system');
        }
    } else {
        console.log('handleInventoryClick triggered for slot', index, 'item', item && item.name);
        equipItem(item, index);
    }
}

// Equipment slot clicks are handled via event delegation (registered on load)

// ============================================
// TOOLTIP SYSTEM
// ============================================

function showTooltip(item, event) {
    // Respect the QA/dev toggle for tooltips
    if (gameState && gameState.showTooltips === false) return;
    const tooltip = document.getElementById('item-tooltip');
    const nameEl = document.getElementById('tooltip-name');
    const typeEl = document.getElementById('tooltip-type');
    const rarityEl = document.getElementById('tooltip-rarity');
    const statsEl = document.getElementById('tooltip-stats');
    const descEl = document.getElementById('tooltip-description');
    const actionsEl = document.getElementById('tooltip-actions');
    
    nameEl.textContent = item.name;
    nameEl.className = `tooltip-name rarity-${item.rarity}`;
    
    // Add set item indicator
    const setIndicator = item.setName ? ' (Set Item)' : '';
    typeEl.textContent = item.type.charAt(0).toUpperCase() + item.type.slice(1) + setIndicator;
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
        // Get currently equipped item in the same slot for comparison
        const equippedItem = item.slot ? gameState.player.equipment[item.slot] : null;
        
        // Helper to format stat values with appropriate precision
        const formatStatValue = (val, statName) => statName === 'speed' ? val.toFixed(1) : Math.floor(val);
        
        // Collect all unique stats from both items
        const allStats = new Set([...Object.keys(item.stats)]);
        if (equippedItem && equippedItem.stats) {
            Object.keys(equippedItem.stats).forEach(stat => allStats.add(stat));
        }
        
        for (const stat of allStats) {
            const statEl = document.createElement('div');
            const statName = statDisplayNames[stat] || stat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            
            const newValue = item.stats[stat] || 0;
            const equippedValue = (equippedItem && equippedItem.stats && equippedItem.stats[stat]) || 0;
            
            // Calculate stat difference if there's an equipped item
            let comparisonText = '';
            let statClass = 'tooltip-stat';
            let displayText = '';
            
            if (equippedItem && equippedItem.stats) {
                const difference = newValue - equippedValue;
                
                if (newValue > 0) {
                    // New item has this stat
                    if (difference > 0) {
                        comparisonText = ` (+${formatStatValue(difference, stat)})`;
                        statClass = 'tooltip-stat positive';
                    } else if (difference < 0) {
                        comparisonText = ` (${formatStatValue(difference, stat)})`;
                        statClass = 'tooltip-stat negative';
                    } else {
                        comparisonText = ' (=)';
                    }
                    displayText = `+${formatStatValue(newValue, stat)} ${statName}${comparisonText}`;
                } else {
                    // New item doesn't have this stat, but equipped does (you're losing it)
                    comparisonText = ` (-${formatStatValue(equippedValue, stat)})`;
                    statClass = 'tooltip-stat negative';
                    displayText = `${statName}${comparisonText}`;
                }
            } else {
                // No equipped item, just show the stat
                statClass = 'tooltip-stat positive';
                displayText = `+${formatStatValue(newValue, stat)} ${statName}`;
            }
            
            statEl.className = statClass;
            statEl.textContent = displayText;
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
    
    // Show set bonuses if this is a set item
    if (item.setName && ITEM_SETS[item.setName]) {
        const setInfo = ITEM_SETS[item.setName];
        
        // Count equipped pieces from this set
        let equippedCount = 0;
        for (const slot in gameState.player.equipment) {
            const equipped = gameState.player.equipment[slot];
            if (equipped && equipped.setName === item.setName) {
                equippedCount++;
            }
        }
        
        // If hovering over an unequipped item, assume it would be equipped
        const isEquipped = item.slot && gameState.player.equipment[item.slot] === item;
        const projectedCount = isEquipped ? equippedCount : equippedCount + 1;
        
        // Build set bonus display
        let setBonusHTML = `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #555;">`;
        setBonusHTML += `<div style="color: #ffd700; font-weight: bold;">${setInfo.name} (${projectedCount}/5 pieces)</div>`;
        
        // Show bonuses at 2, 3, and 5 pieces
        const milestones = [2, 3, 5];
        for (const milestone of milestones) {
            const bonus = setInfo.bonuses[milestone];
            if (bonus) {
                const isActive = projectedCount >= milestone;
                const color = isActive ? '#4caf50' : '#666';
                const checkmark = isActive ? '✓ ' : '  ';
                setBonusHTML += `<div style="color: ${color}; margin-top: 4px;">${checkmark}(${milestone}) ${bonus.description}</div>`;
            }
        }
        
        setBonusHTML += `</div>`;
        descEl.innerHTML = flavorTexts[item.rarity] + setBonusHTML;
    } else {
        descEl.textContent = flavorTexts[item.rarity];
    }
    
    if (item.type !== 'potion') {
        actionsEl.textContent = `Click to equip | Sell: ${item.sellPrice} gold`;
    } else {
        actionsEl.textContent = 'Click to add to quick slots';
    }
    
    tooltip.style.display = 'block';
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
    
    // Position tooltip
    const x = event.clientX + 15;
    const y = event.clientY + 15;
    tooltip.style.left = `${Math.min(x, window.innerWidth - tooltip.offsetWidth - 10)}px`;
    tooltip.style.top = `${Math.min(y, window.innerHeight - tooltip.offsetHeight - 10)}px`;
}

function hideTooltip() {
    const tooltip = document.getElementById('item-tooltip');
    if (tooltip) tooltip.style.display = 'none';
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
        // PROCEDURAL: Check for room exploration
        const playerTileX = Math.floor(p.worldX / GAME_CONFIG.tileSize);
        const playerTileY = Math.floor(p.worldY / GAME_CONFIG.tileSize);
        
        for (let i = 0; i < gameState.dungeon.rooms.length; i++) {
            const room = gameState.dungeon.rooms[i];
            if (playerTileX >= room.x && playerTileX < room.x + room.w &&
                playerTileY >= room.y && playerTileY < room.y + room.h) {
                // Player is in this room
                if (!gameState.dungeon.exploredRooms.has(i)) {
                    gameState.dungeon.exploredRooms.add(i);
                    const roomDesc = gameState.dungeon.roomDescriptions[i];
                    addMessage(`You enter ${roomDesc.description}...`, 'system');
                    addMessage(roomDesc.flavor, 'system');
                }
                break;
            }
        }
        
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
            } else if (Date.now() - globe.createdTime > GAME_CONFIG.healthGlobeLifetimeMs) {
                // Remove old globes after configured lifetime
                gameState.healthGlobes.splice(i, 1);
            }
        }
        
        // DIABLO FEATURE 3: Ambient dark particles (fog/embers)
        if (Math.random() < GAME_CONFIG.ambientParticleSpawnChance) {
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
        
        // Clean up old corpses (fade after configured time)
        gameState.corpses = gameState.corpses.filter(corpse => {
            const age = Date.now() - corpse.fadeTime;
            if (age > GAME_CONFIG.corpseFadeTimeMs) return false;
            corpse.alpha = 0.6 * (1 - age / GAME_CONFIG.corpseFadeTimeMs);
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
    
    // Draw minimap
    if (gameState.currentLocation === 'dungeon' && gameState.showMinimap) {
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
    
    // Radiant Forge building - mystical pink/purple theme
    ctx.fillStyle = '#2a1030';
    ctx.fillRect(140, 80, 160, 100);
    ctx.fillStyle = '#3a1545';
    ctx.fillRect(200, 140, 40, 40); // door
    
    // Glowing forge anvil symbol
    ctx.fillStyle = '#ff1493';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff1493';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('🔨', 220, 120);
    ctx.shadowBlur = 0;
    
    ctx.fillStyle = '#ff1493';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('⚒️ FORGE', 220, 60);
    ctx.fillStyle = '#888';
    ctx.font = '12px Arial';
    ctx.fillText('Press E to open', 220, 200);
    
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
    
    const distToForge = distance(p.worldX, p.worldY, gameState.town.forgeX, gameState.town.forgeY);
    if (distToForge < 80) {
        ctx.fillStyle = 'rgba(255, 20, 147, 0.8)';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press E to open Radiant Forge', gameState.town.forgeX, 220);
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
    
    // Draw Points of Interest
    for (const poi of gameState.dungeon.pointsOfInterest) {
        const screenX = poi.x - camX;
        const screenY = poi.y - camY;
        
        // Skip if off screen
        if (screenX < -50 || screenX > canvas.width + 50 || 
            screenY < -50 || screenY > canvas.height + 50) continue;
        
        // Draw POI with pulsing glow
        const pulseSize = 35 + Math.sin(Date.now() / 300) * 5;
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = poi.color;
        
        // Background glow
        ctx.beginPath();
        ctx.arc(screenX, screenY, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = poi.color + '30';
        ctx.fill();
        
        // Icon
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = poi.color;
        ctx.fillText(poi.icon, screenX, screenY);
        
        // Dim if used
        if (poi.used && poi.oneTimeUse) {
            ctx.globalAlpha = 0.3;
        }
        
        ctx.restore();
        
        // Name label
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeText(poi.name, screenX, screenY - 40);
        ctx.fillText(poi.name, screenX, screenY - 40);
        
        // Interaction prompt if player is nearby
        const dist = distance(gameState.player.worldX, gameState.player.worldY, poi.x, poi.y);
        if (dist < 60) {
            ctx.font = '10px Arial';
            ctx.fillStyle = '#ffd700';
            ctx.strokeText('[F] to interact', screenX, screenY - 55);
            ctx.fillText('[F] to interact', screenX, screenY - 55);
        }
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
            monster.deathAlpha = Math.max(0, 1 - elapsed / GAME_CONFIG.deathAnimationDurationMs);
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
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fill();
    
    // Animation bounce and walking animation
    const animBounce = p.isMoving ? Math.sin(p.animFrame * Math.PI / 2) * 2 : 0;
    const legSwing = p.isMoving ? Math.sin(p.animFrame * Math.PI) * 6 : 0;
    const armSwing = p.isMoving ? Math.sin(p.animFrame * Math.PI) * 10 : 0;
    
    // Drawing offsets based on direction
    const facingRight = p.direction === 'right';
    const facingLeft = p.direction === 'left';
    const facingUp = p.direction === 'up';
    const facingDown = p.direction === 'down';
    
    ctx.save();
    ctx.translate(screenX, screenY - animBounce);
    
    // Realistic warrior colors
    const skinColor = '#d4a58a';
    const hairColor = '#2d1f1a';
    const armorColor = '#3a3845';
    const metalColor = '#5a5568';
    const beltColor = '#4a3020';
    const capeColor = '#1a1a28';
    
    // Cape (behind character)
    if (!facingDown) {
        ctx.fillStyle = capeColor;
        ctx.beginPath();
        ctx.moveTo(-12, -8);
        ctx.lineTo(-10, 14);
        ctx.lineTo(10, 14);
        ctx.lineTo(12, -8);
        ctx.closePath();
        ctx.fill();
        
        // Cape border
        ctx.strokeStyle = '#2a2a38';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Legs with armor plates
    ctx.fillStyle = armorColor;
    if (facingUp) {
        // Left leg
        ctx.fillRect(-8 + legSwing * 0.3, 4, 7, 18);
        // Right leg  
        ctx.fillRect(1 - legSwing * 0.3, 4, 7, 18);
    } else {
        // Left leg
        ctx.fillRect(-7 + legSwing * 0.3, 4, 7, 18);
        // Right leg
        ctx.fillRect(0 - legSwing * 0.3, 4, 7, 18);
    }
    
    // Boots - metal greaves
    ctx.fillStyle = metalColor;
    ctx.fillRect(-8 + (facingUp ? legSwing * 0.3 : legSwing * 0.3), 18, 7, 7);
    ctx.fillRect((facingUp ? 1 : 0) - (facingUp ? legSwing * 0.3 : legSwing * 0.3), 18, 7, 7);
    
    // Body - armored torso
    ctx.fillStyle = armorColor;
    ctx.fillRect(-11, -14, 22, 20);
    
    // Chest plate detail
    ctx.fillStyle = metalColor;
    ctx.fillRect(-10, -13, 20, 3);
    ctx.fillRect(-9, -9, 18, 2);
    
    // Belt with buckle
    ctx.fillStyle = beltColor;
    ctx.fillRect(-11, 2, 22, 5);
    ctx.fillStyle = '#8a7050';
    ctx.fillRect(-3, 2, 6, 5);
    
    // Pauldrons (shoulder armor)
    ctx.fillStyle = metalColor;
    ctx.beginPath();
    ctx.arc(-10, -10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(10, -10, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Arms with gauntlets
    ctx.fillStyle = armorColor;
    if (facingLeft) {
        // Left arm (front)
        ctx.save();
        ctx.translate(-10, -6);
        ctx.rotate(armSwing * Math.PI / 180);
        ctx.fillRect(-4, 0, 5, 15);
        // Gauntlet
        ctx.fillStyle = metalColor;
        ctx.fillRect(-4, 11, 5, 6);
        ctx.restore();
        
        // Right arm (back)
        ctx.fillStyle = armorColor;
        ctx.save();
        ctx.translate(10, -6);
        ctx.rotate(-armSwing * Math.PI / 180);
        ctx.fillRect(-1, 0, 4, 13);
        ctx.restore();
    } else if (facingRight) {
        // Right arm (front)
        ctx.fillStyle = armorColor;
        ctx.save();
        ctx.translate(10, -6);
        ctx.rotate(-armSwing * Math.PI / 180);
        ctx.fillRect(-1, 0, 5, 15);
        // Gauntlet
        ctx.fillStyle = metalColor;
        ctx.fillRect(-1, 11, 5, 6);
        ctx.restore();
        
        // Left arm (back)
        ctx.fillStyle = armorColor;
        ctx.save();
        ctx.translate(-10, -6);
        ctx.rotate(armSwing * Math.PI / 180);
        ctx.fillRect(0, 0, 4, 13);
        ctx.restore();
    } else {
        // Arms at sides or front
        ctx.fillStyle = armorColor;
        ctx.fillRect(-13, -4, 5, 15);
        ctx.fillRect(8, -4, 5, 15);
        // Gauntlets
        ctx.fillStyle = metalColor;
        ctx.fillRect(-13, 9, 5, 6);
        ctx.fillRect(8, 9, 5, 6);
    }
    
    // Head with helmet
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(0, -20, 9, 0, Math.PI * 2);
    ctx.fill();
    
    // Helmet - dark iron
    ctx.fillStyle = metalColor;
    ctx.beginPath();
    ctx.arc(0, -23, 9, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-9, -23, 18, 6);
    
    // Helmet ridge/crest
    ctx.fillStyle = '#4a4458';
    ctx.fillRect(-1, -28, 2, 6);
    
    // Face guard/visor slit
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(-7, -19, 14, 3);
    
    // Eyes (glowing through visor)
    ctx.save();
    ctx.shadowColor = '#4af';
    ctx.shadowBlur = 4;
    ctx.fillStyle = '#6cf';
    if (facingLeft) {
        ctx.fillRect(-6, -18, 2, 1);
    } else if (facingRight) {
        ctx.fillRect(4, -18, 2, 1);
    } else {
        ctx.fillRect(-6, -18, 2, 1);
        ctx.fillRect(4, -18, 2, 1);
    }
    ctx.restore();
    
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
    
    // Show/hide minimap based on state
    minimapContainer.style.display = gameState.showMinimap ? 'block' : 'none';
    if (!gameState.showMinimap) return;
    
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
            
            minimapCtx.fillRect(minimapX, minimapY, scaleX, scaleY);
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
    // HUD elements removed - now handled by HTML UI panels
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
    
    // Check for existing save data
    if (hasSaveData()) {
        // Show load prompt
        if (confirm('Save data found! Would you like to load your previous game?')) {
            loadGame();
            requestAnimationFrame(gameLoop);
            return;
        }
    }
    
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
    addMessage('Press F to interact with Points of Interest', 'system');
    addMessage('Press F5 to SAVE, F9 to LOAD your game', 'system');
    addMessage('Visit the SHOP to buy upgrades, enter the DUNGEON for adventure!', 'system');
    
    // Start game loop
    requestAnimationFrame(gameLoop);

    // Developer QA: log if tooltips are disabled
    if (gameState && gameState.showTooltips === false) {
        console.log('QA: Tooltips disabled');
        addMessage('Tooltips disabled for QA', 'system');
        // Ensure any visible tooltip is hidden immediately
        const tooltip = document.getElementById('item-tooltip');
        if (tooltip) tooltip.style.display = 'none';
    }
}

// Start the game
init();

// Attach delegated click handlers after init() has created the UI
window.addEventListener('load', () => {
    console.log('[INIT] Registering delegated click handlers for inventory and equipment');
    
    const inventoryGridEl = document.getElementById('inventory-grid');
    if (inventoryGridEl) {
        console.log('[INIT] inventory-grid found, attaching delegated click handler');
        inventoryGridEl.addEventListener('click', (e) => {
            console.log('[CLICK] inventory-grid clicked, target:', e.target);
            console.log('[CLICK] target tagName:', e.target.tagName);
            console.log('[CLICK] target className:', e.target.className);
            console.log('[CLICK] target parentElement:', e.target.parentElement);
            
            // Try to find the slot - either the target itself or a parent
            let slotEl = null;
            if (e.target.classList.contains('inventory-slot')) {
                slotEl = e.target;
            } else if (e.target.parentElement && e.target.parentElement.classList.contains('inventory-slot')) {
                slotEl = e.target.parentElement;
            } else {
                slotEl = e.target.closest('.inventory-slot');
            }
            
            console.log('[CLICK] found .inventory-slot:', slotEl);
            if (!slotEl) {
                console.warn('[CLICK] No inventory slot found - click may be on grid padding/gap');
                return;
            }
            const index = parseInt(slotEl.dataset.index);
            console.log('[CLICK] Inventory slot index:', index);
            if (!Number.isNaN(index)) {
                console.log('[CLICK] Calling handleInventoryClick for index:', index);
                handleInventoryClick(index);
            } else {
                console.error('[CLICK] Slot found but no valid data-index:', slotEl);
            }
        });
    } else {
        console.error('[INIT] inventory-grid NOT found in DOM!');
    }

    const equipmentGridEl = document.querySelector('.equipment-grid');
    if (equipmentGridEl) {
        console.log('[INIT] equipment-grid found, attaching delegated click handler');
        equipmentGridEl.addEventListener('click', (e) => {
            const slotEl = e.target.closest('.equipment-slot');
            if (!slotEl) return;
            const slotName = slotEl.dataset.slot;
            if (slotName) {
                console.log('[CLICK] Equipment slot clicked:', slotName);
                if (gameState.player.equipment[slotName]) {
                    unequipItem(slotName);
                }
            }
        });
    } else {
        console.error('[INIT] equipment-grid NOT found in DOM!');
    }
});
