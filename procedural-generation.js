// ============================================
// PROCEDURAL GENERATION SYSTEM
// Dark Fantasy / Diablo-Inspired Content Generator
// ============================================

// ============================================
// CORE RANDOM TABLE UTILITIES
// ============================================

class RandomTableEngine {
    constructor(seed = null) {
        this.seed = seed || Date.now();
        this.rng = this.createSeededRNG(this.seed);
    }

    // Seeded random number generator for reproducible results
    createSeededRNG(seed) {
        return {
            value: seed,
            next: function() {
                this.value = (this.value * 9301 + 49297) % 233280;
                return this.value / 233280;
            }
        };
    }

    // Roll on a table and return random result
    roll(table) {
        if (!table || table.length === 0) return null;
        const index = Math.floor(Math.random() * table.length);
        return table[index];
    }

    // Roll multiple times and return array
    rollMultiple(table, count) {
        const results = [];
        for (let i = 0; i < count; i++) {
            results.push(this.roll(table));
        }
        return results;
    }

    // Weighted roll - table items have {value, weight}
    rollWeighted(table) {
        const totalWeight = table.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const item of table) {
            random -= item.weight;
            if (random <= 0) return item.value;
        }
        return table[table.length - 1].value;
    }

    // Roll dice notation (e.g., "2d6", "1d20+5")
    rollDice(notation) {
        const match = notation.match(/(\d+)d(\d+)([+-]\d+)?/);
        if (!match) return 0;
        
        const [, count, sides, modifier] = match;
        let total = 0;
        
        for (let i = 0; i < parseInt(count); i++) {
            total += Math.floor(Math.random() * parseInt(sides)) + 1;
        }
        
        if (modifier) {
            total += parseInt(modifier);
        }
        
        return total;
    }
}

// ============================================
// DARK FANTASY NAME GENERATION TABLES
// ============================================

const PROCEDURAL_TABLES = {
    // Enemy name components
    enemyPrefixes: {
        corrupted: ['Blighted', 'Corrupted', 'Cursed', 'Damned', 'Defiled', 'Tainted', 'Profaned', 'Vile'],
        ancient: ['Ancient', 'Elder', 'Primeval', 'Forgotten', 'Eternal', 'Timeless', 'Archaic'],
        elemental: ['Burning', 'Frozen', 'Molten', 'Chilling', 'Scorched', 'Glacial', 'Infernal'],
        dark: ['Shadow', 'Night', 'Dark', 'Void', 'Abyssal', 'Stygian', 'Tenebrous'],
        death: ['Death', 'Grave', 'Tomb', 'Crypt', 'Bone', 'Corpse', 'Flesh'],
        power: ['Mighty', 'Greater', 'Supreme', 'Grand', 'Exalted', 'Dominant', 'Sovereign'],
        chaos: ['Frenzied', 'Mad', 'Chaotic', 'Wild', 'Savage', 'Rabid', 'Berserk'],
        blood: ['Blood', 'Gore', 'Crimson', 'Scarlet', 'Sanguine', 'Carmine']
    },

    enemySuffixes: {
        titles: ['the Devourer', 'the Destroyer', 'the Defiler', 'the Corruptor', 'the Slayer', 
                'the Unholy', 'the Forsaken', 'the Damned', 'the Eternal', 'the Undying'],
        realms: ['of the Abyss', 'of the Void', 'of Shadows', 'of Flames', 'of Frost', 
                'of Torment', 'of Despair', 'of Anguish', 'of Ruin', 'of Chaos'],
        descriptors: ['Fleshrender', 'Bonecrusher', 'Soulreaver', 'Bloodletter', 'Skullsplitter',
                     'Heartseeker', 'Spinesnapper', 'Eyegouger', 'Marrowgnawer']
    },

    // Item name components (Diablo-style)
    itemPrefixes: {
        common: ['Rusty', 'Worn', 'Crude', 'Simple', 'Basic', 'Old', 'Dented', 'Cracked'],
        uncommon: ['Fine', 'Sharp', 'Sturdy', 'Hardened', 'Reinforced', 'Tempered', 'Balanced'],
        rare: ['Gleaming', 'Enchanted', 'Mystical', 'Arcane', 'Blessed', 'Hallowed', 'Sacred'],
        epic: ['Legendary', 'Heroic', 'Valiant', 'Glorious', 'Radiant', 'Brilliant', 'Resplendent'],
        legendary: ['Godly', 'Divine', 'Celestial', 'Transcendent', 'Immortal', 'Eternal', 'Supreme'],
        mythic: ['Primordial', 'Cosmic', 'Omnipotent', 'Infinite', 'Absolute', 'Perfect']
    },

    itemSuffixes: {
        power: ['of Power', 'of Might', 'of Strength', 'of the Titan', 'of the Colossus', 'of the Giant'],
        protection: ['of Defense', 'of Protection', 'of the Guardian', 'of Warding', 'of Shielding', 'of Fortitude'],
        speed: ['of Speed', 'of Haste', 'of Swiftness', 'of the Zephyr', 'of the Wind', 'of Alacrity'],
        life: ['of Vitality', 'of Life', 'of the Whale', 'of Vigor', 'of Regeneration', 'of the Phoenix'],
        elements: ['of Flames', 'of Frost', 'of Lightning', 'of Storms', 'of Inferno', 'of the Blizzard'],
        unique: ['of the Vampire', 'of the Dragon', 'of the Lich', 'of the Demon', 'of the Angel', 'of the Void']
    },

    // Dungeon room descriptions
    dungeonRoomTypes: [
        { type: 'crypt', description: 'Ancient burial chamber', flavor: 'Skeletal remains line the walls' },
        { type: 'torture', description: 'Torture chamber', flavor: 'Rusted instruments of pain hang from chains' },
        { type: 'ritual', description: 'Dark ritual chamber', flavor: 'Arcane symbols glow with eldritch energy' },
        { type: 'library', description: 'Forbidden library', flavor: 'Tomes of dark knowledge gather dust' },
        { type: 'throne', description: 'Throne room', flavor: 'A throne of bone sits in shadow' },
        { type: 'treasure', description: 'Treasure vault', flavor: 'Gold glints in the darkness' },
        { type: 'prison', description: 'Prison cells', flavor: 'Desperate scratches mark the walls' },
        { type: 'armory', description: 'Ancient armory', flavor: 'Weapons of ages past rust on racks' },
        { type: 'laboratory', description: 'Alchemical laboratory', flavor: 'Vials bubble with unknown substances' },
        { type: 'cathedral', description: 'Desecrated cathedral', flavor: 'Broken pews face a defiled altar' }
    ],

    dungeonFeatures: [
        'Blood stains mar the floor',
        'Chains hang from the ceiling',
        'A foul stench fills the air',
        'Strange glyphs cover the walls',
        'Skulls are piled in the corner',
        'Candles flicker with green flame',
        'Webs stretch across the space',
        'Water drips from cracks above',
        'Bones crunch underfoot',
        'Shadows seem to move on their own',
        'A cold draft chills your bones',
        'Strange whispers echo faintly'
    ],

    // Character flavor text
    characterBackgrounds: [
        { background: 'Survivor of the Plague', flavor: 'You lost everything to the darkness' },
        { background: 'Former Crusader', flavor: 'Your faith was shattered by what you witnessed' },
        { background: 'Demon Hunter', flavor: 'Vengeance drives you forward' },
        { background: 'Corrupted Scholar', flavor: 'Forbidden knowledge has marked your soul' },
        { background: 'Last of Your Order', flavor: 'You carry the legacy of fallen brothers' },
        { background: 'Cursed Wanderer', flavor: 'A dark fate pursues you' }
    ],

    // Environmental storytelling
    environmentalDetails: {
        corpses: [
            'A fresh corpse, still warm',
            'Skeletal remains clutching a broken sword',
            'A body torn asunder by claws',
            'Mummified remains in ancient armor',
            'A pile of charred bones',
            'The husk of something once human'
        ],
        sounds: [
            'Distant screaming echoes through the halls',
            'Chains rattle in the darkness',
            'Something large shifts in the shadows',
            'Wet, tearing sounds from ahead',
            'Chittering fills the air',
            'A mournful wail pierces the silence'
        ],
        sights: [
            'Blood-soaked altars line the walls',
            'Cages hang from the ceiling, some still occupied',
            'Arcane circles glow with unholy light',
            'Statues of forgotten gods watch silently',
            'Murals depict scenes of sacrifice and torment',
            'The walls pulse with unnatural life'
        ],
        smells: [
            'The coppery scent of fresh blood',
            'Decay and putrefaction',
            'Sulfur and brimstone',
            'Sweet, sickly incense',
            'Wet earth and mold',
            'Something burning in the distance'
        ]
    },

    // Monster descriptive traits
    monsterTraits: {
        physical: [
            'covered in festering wounds',
            'wrapped in tattered burial shrouds',
            'dripping with corrupted ichor',
            'bearing wicked scars',
            'wreathed in dark flames',
            'emanating a sickly aura',
            'crowned with twisted horns',
            'wielding cursed weapons'
        ],
        behavioral: [
            'hungers for mortal flesh',
            'whispers dark incantations',
            'moves with unnatural grace',
            'radiates palpable malice',
            'feeds on fear itself',
            'seeks to corrupt the living',
            'guards ancient secrets',
            'serves a darker master'
        ],
        origin: [
            'risen from the grave',
            'summoned from the abyss',
            'twisted by dark magic',
            'bound to this cursed place',
            'corrupted by demonic power',
            'spawned from nightmares',
            'escaped from the void',
            'born of blood sacrifice'
        ]
    }
};

// ============================================
// PROCEDURAL GENERATION FUNCTIONS
// ============================================

class ProceduralGenerator {
    constructor() {
        this.engine = new RandomTableEngine();
    }

    // Generate a procedural enemy name with title
    generateEnemyName(baseType, isChampion = false, isBoss = false) {
        let name = baseType;
        
        if (isBoss) {
            // Boss: Prefix + Base + Suffix
            const prefixCategory = this.engine.roll(Object.keys(PROCEDURAL_TABLES.enemyPrefixes));
            const prefix = this.engine.roll(PROCEDURAL_TABLES.enemyPrefixes[prefixCategory]);
            const suffixCategory = this.engine.roll(Object.keys(PROCEDURAL_TABLES.enemySuffixes));
            const suffix = this.engine.roll(PROCEDURAL_TABLES.enemySuffixes[suffixCategory]);
            name = `${prefix} ${baseType} ${suffix}`;
        } else if (isChampion) {
            // Champion: Prefix + Base
            const prefixCategory = this.engine.roll(Object.keys(PROCEDURAL_TABLES.enemyPrefixes));
            const prefix = this.engine.roll(PROCEDURAL_TABLES.enemyPrefixes[prefixCategory]);
            name = `${prefix} ${baseType}`;
        }
        
        return name;
    }

    // Generate enemy description
    generateEnemyDescription(baseType) {
        const physical = this.engine.roll(PROCEDURAL_TABLES.monsterTraits.physical);
        const behavioral = this.engine.roll(PROCEDURAL_TABLES.monsterTraits.behavioral);
        const origin = this.engine.roll(PROCEDURAL_TABLES.monsterTraits.origin);
        
        return `A ${baseType} ${physical}, ${behavioral}. ${this.capitalize(origin)}.`;
    }

    // Generate procedural item name
    generateItemName(baseType, rarity) {
        const rarityKey = rarity.toLowerCase();
        const prefix = this.engine.roll(PROCEDURAL_TABLES.itemPrefixes[rarityKey] || PROCEDURAL_TABLES.itemPrefixes.common);
        
        // 50% chance to add a suffix for rare+ items
        const addSuffix = Math.random() > 0.5 && (rarityKey === 'rare' || rarityKey === 'epic' || rarityKey === 'legendary' || rarityKey === 'mythic');
        
        if (addSuffix) {
            const suffixCategory = this.engine.roll(Object.keys(PROCEDURAL_TABLES.itemSuffixes));
            const suffix = this.engine.roll(PROCEDURAL_TABLES.itemSuffixes[suffixCategory]);
            return `${prefix} ${baseType} ${suffix}`;
        }
        
        return `${prefix} ${baseType}`;
    }

    // Generate dungeon room description
    generateRoomDescription() {
        const room = this.engine.roll(PROCEDURAL_TABLES.dungeonRoomTypes);
        const feature = this.engine.roll(PROCEDURAL_TABLES.dungeonFeatures);
        
        return {
            type: room.type,
            description: room.description,
            flavor: `${room.flavor}. ${feature}.`
        };
    }

    // Generate environmental storytelling
    generateEnvironmentalStory() {
        const sight = this.engine.roll(PROCEDURAL_TABLES.environmentalDetails.sights);
        const sound = this.engine.roll(PROCEDURAL_TABLES.environmentalDetails.sounds);
        const smell = this.engine.roll(PROCEDURAL_TABLES.environmentalDetails.smells);
        
        return {
            sight,
            sound,
            smell,
            combined: `${sight}. ${sound}. ${smell}.`
        };
    }

    // Generate character background flavor
    generateCharacterFlavor() {
        return this.engine.roll(PROCEDURAL_TABLES.characterBackgrounds);
    }

    // Generate loot flavor text
    generateLootFlavor(itemType) {
        const discoveries = [
            `discovered among scattered bones`,
            `pulled from a dark corner`,
            `found clutched in a skeletal hand`,
            `salvaged from ancient remains`,
            `unearthed from beneath rubble`,
            `recovered from a defeated foe`,
            `plucked from a pile of refuse`,
            `claimed from a forgotten cache`
        ];
        
        return this.engine.roll(discoveries);
    }

    // Generate dungeon level theme
    generateDungeonTheme(level) {
        const themes = [
            { name: 'The Catacombs', desc: 'Ancient burial grounds crawl with undead', color: '#2a3a2a' },
            { name: 'The Halls of Torment', desc: 'Screams echo through torture chambers', color: '#3a0000' },
            { name: 'The Arcane Sanctum', desc: 'Dark magic permeates the air', color: '#2a1a3a' },
            { name: 'The Demon Pit', desc: 'Infernal creatures roam freely', color: '#3a1a00' },
            { name: 'The Frozen Depths', desc: 'Ice and death reign supreme', color: '#1a2a3a' },
            { name: 'The Blood Citadel', desc: 'Sacrifice fuels dark rituals', color: '#3a0a0a' },
            { name: 'The Bone Palace', desc: 'Skulls adorn every surface', color: '#2a2a2a' },
            { name: 'The Void Chambers', desc: 'Reality itself seems to warp', color: '#0a0a2a' }
        ];
        
        // Cycle through themes based on level
        return themes[level % themes.length];
    }

    // Utility function
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Generate complete monster with procedural elements
    generateProceduralMonster(baseMonster, level, isChampion = false, isBoss = false) {
        const name = this.generateEnemyName(baseMonster.name, isChampion, isBoss);
        const description = this.generateEnemyDescription(baseMonster.name);
        
        return {
            ...baseMonster,
            name: name,
            description: description,
            flavorText: `Level ${level} - ${description}`
        };
    }

    // Generate item with procedural name
    generateProceduralItem(itemType, itemData, rarity) {
        const baseName = this.engine.roll(itemData.names);
        const proceduralName = this.generateItemName(baseName, rarity);
        const flavorText = this.generateLootFlavor(itemType);
        
        return {
            proceduralName,
            baseName,
            flavorText
        };
    }
}

// ============================================
// DUNGEON LAYOUT VARIATIONS
// ============================================

class ProceduralDungeonGenerator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.engine = new RandomTableEngine();
    }

    // Generate dungeon with different layout patterns
    generateLayout(level, pattern = 'auto') {
        // Auto-select pattern based on level
        if (pattern === 'auto') {
            const patterns = ['rooms', 'caves', 'maze', 'hybrid'];
            const index = level % patterns.length;
            pattern = patterns[index];
        }

        switch (pattern) {
            case 'rooms':
                return this.generateRoomLayout();
            case 'caves':
                return this.generateCaveLayout();
            case 'maze':
                return this.generateMazeLayout();
            case 'hybrid':
                return this.generateHybridLayout();
            default:
                return this.generateRoomLayout();
        }
    }

    generateRoomLayout() {
        // Room-based dungeon (current system)
        return { pattern: 'rooms', description: 'Chamber-based dungeon with corridors' };
    }

    generateCaveLayout() {
        // Organic cave system
        return { pattern: 'caves', description: 'Natural caverns and winding passages' };
    }

    generateMazeLayout() {
        // Dense maze structure
        return { pattern: 'maze', description: 'Labyrinthine corridors and dead ends' };
    }

    generateHybridLayout() {
        // Mix of patterns
        return { pattern: 'hybrid', description: 'Varied architecture and passages' };
    }

    // Generate points of interest for dungeon
    generatePointsOfInterest(count) {
        const pois = [];
        const types = [
            { type: 'shrine', desc: 'A mysterious shrine offers power', benefit: 'buff' },
            { type: 'fountain', desc: 'A blood fountain pulses with energy', benefit: 'heal' },
            { type: 'chest', desc: 'A treasure chest beckons', benefit: 'loot' },
            { type: 'altar', desc: 'An dark altar radiates menace', benefit: 'challenge' },
            { type: 'portal', desc: 'A swirling portal hums with magic', benefit: 'transport' }
        ];

        for (let i = 0; i < count; i++) {
            pois.push(this.engine.roll(types));
        }

        return pois;
    }
}

// ============================================
// GLOBAL INSTANCE
// ============================================

// Create global procedural generator instance
const proceduralGen = new ProceduralGenerator();
const dungeonGen = new ProceduralDungeonGenerator(100, 80);

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProceduralGenerator,
        ProceduralDungeonGenerator,
        RandomTableEngine,
        PROCEDURAL_TABLES,
        proceduralGen,
        dungeonGen
    };
}
