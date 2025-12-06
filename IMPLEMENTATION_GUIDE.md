# Procedural Generation Implementation Guide

## Quick Start for Developers

This guide explains how to use and extend the procedural generation system in Dark Realms RPG.

## Basic Usage

### 1. Enemy Name Generation

```javascript
// Regular enemy (uses base name)
const regularName = proceduralGen.generateEnemyName("Zombie", false, false);
// Output: "Zombie"

// Champion enemy (adds prefix)
const championName = proceduralGen.generateEnemyName("Zombie", true, false);
// Output: "Corrupted Zombie", "Ancient Zombie", etc.

// Boss enemy (adds prefix + suffix)
const bossName = proceduralGen.generateEnemyName("Demon", false, true);
// Output: "Blighted Demon of the Abyss", "Shadow Demon the Destroyer", etc.
```

### 2. Enemy Description Generation

```javascript
const description = proceduralGen.generateEnemyDescription("Zombie");
// Output: "A Zombie covered in festering wounds, hungers for mortal flesh. Risen from the grave."
```

### 3. Item Name Generation

```javascript
const itemType = ITEM_TYPES['weapon'];
const proceduralItem = proceduralGen.generateProceduralItem('weapon', itemType, 'Legendary');

console.log(proceduralItem.proceduralName); // "Divine Sword of the Titan"
console.log(proceduralItem.baseName);       // "Sword"
console.log(proceduralItem.flavorText);     // "discovered among scattered bones"
```

### 4. Dungeon Theme Generation

```javascript
const theme = proceduralGen.generateDungeonTheme(5);
console.log(theme.name);  // "The Blood Citadel"
console.log(theme.desc);  // "Sacrifice fuels dark rituals"
console.log(theme.color); // "#3a0a0a"
```

### 5. Room Description Generation

```javascript
const room = proceduralGen.generateRoomDescription();
console.log(room.type);        // "crypt"
console.log(room.description); // "Ancient burial chamber"
console.log(room.flavor);      // "Skeletal remains line the walls. Blood stains mar the floor."
```

### 6. Environmental Storytelling

```javascript
const env = proceduralGen.generateEnvironmentalStory();
console.log(env.sight); // "Blood-soaked altars line the walls"
console.log(env.sound); // "Distant screaming echoes through the halls"
console.log(env.smell); // "The coppery scent of fresh blood"
console.log(env.combined); // Full atmospheric description
```

## Integration Points

### Where Procedural Generation is Used

1. **spawnDungeonEnemies()** - Lines 718-783
   - Generates enemy names and descriptions
   - Applied to both regular and champion enemies
   - Applied to boss enemies

2. **generateItem()** - Lines 960-1027
   - Generates item names with rarity-based prefixes
   - Adds contextual suffixes for rare+ items
   - Includes flavor text for item discovery

3. **enterDungeon()** - Lines 803-836
   - Generates dungeon theme for the level
   - Creates environmental storytelling
   - Displays atmospheric messages

4. **generateDungeon()** - Lines 593-694
   - Creates room descriptions for each dungeon room
   - Initializes room exploration tracking

5. **update()** - Lines 3115-3130
   - Checks for room exploration
   - Displays room descriptions on first entry

## Adding New Content

### Adding Enemy Prefixes

Edit `PROCEDURAL_TABLES.enemyPrefixes` in `procedural-generation.js`:

```javascript
const PROCEDURAL_TABLES = {
    enemyPrefixes: {
        // Existing categories...
        
        // Add new category
        necromantic: ['Undead', 'Necromantic', 'Death-touched', 'Grave-bound'],
    },
    // ...
};
```

### Adding Item Suffixes

Edit `PROCEDURAL_TABLES.itemSuffixes`:

```javascript
itemSuffixes: {
    // Existing categories...
    
    // Add new category
    summoning: ['of the Conjurer', 'of Binding', 'of the Summoner'],
},
```

### Adding Room Types

Edit `PROCEDURAL_TABLES.dungeonRoomTypes`:

```javascript
dungeonRoomTypes: [
    // Existing rooms...
    
    { 
        type: 'nursery', 
        description: 'Abandoned nursery', 
        flavor: 'Broken toys litter the floor, covered in dust and blood' 
    },
],
```

### Adding Environmental Details

Edit `PROCEDURAL_TABLES.environmentalDetails`:

```javascript
environmentalDetails: {
    corpses: [
        // Existing details...
        'A mass grave fills the corner',
    ],
    sounds: [
        // Existing details...
        'Guttural chanting echoes from below',
    ],
    // ...
},
```

## Creating Custom Generators

### Example: Unique Enemy Abilities

```javascript
// Add to procedural-generation.js
generateEnemyAbility(enemyType, isChampion) {
    const abilities = {
        fire: ['Flame Burst', 'Inferno Strike', 'Molten Rage'],
        ice: ['Frost Nova', 'Ice Shard', 'Frozen Touch'],
        poison: ['Toxic Cloud', 'Venom Strike', 'Plague Aura'],
        lightning: ['Chain Lightning', 'Thunder Clap', 'Storm Fury']
    };
    
    if (isChampion) {
        const element = this.engine.roll(['fire', 'ice', 'poison', 'lightning']);
        return this.engine.roll(abilities[element]);
    }
    
    return null;
}

// Usage in game.js
if (affix && Math.random() < 0.3) {
    monster.ability = proceduralGen.generateEnemyAbility(monsterType.name, true);
}
```

### Example: Quest Generation

```javascript
// Add to procedural-generation.js
generateQuest(dungeonLevel) {
    const objectives = [
        'Slay {count} {enemy} in {location}',
        'Retrieve the {artifact} from {location}',
        'Survive {duration} in {location}',
        'Destroy the {object} in {location}'
    ];
    
    const enemies = ['Zombies', 'Demons', 'Wraiths'];
    const artifacts = ['Cursed Tome', 'Blood Orb', 'Shadow Crystal'];
    const locations = ['The Catacombs', 'The Blood Citadel', 'The Void Chambers'];
    
    let quest = this.engine.roll(objectives);
    quest = quest.replace('{count}', Math.floor(5 + dungeonLevel * 2));
    quest = quest.replace('{enemy}', this.engine.roll(enemies));
    quest = quest.replace('{artifact}', this.engine.roll(artifacts));
    quest = quest.replace('{location}', this.engine.roll(locations));
    quest = quest.replace('{duration}', '5 minutes');
    quest = quest.replace('{object}', 'Ritual Altar');
    
    return {
        description: quest,
        reward: 100 + dungeonLevel * 50
    };
}
```

## Performance Optimization

### Best Practices

1. **Generate During Loading**: Call generation functions during dungeon creation, not per-frame
2. **Cache Results**: Store generated names/descriptions in monster/item objects
3. **Limit Complexity**: Keep table sizes reasonable (< 50 items per category)
4. **Avoid Nested Loops**: Use single pass generation when possible

### Example: Batch Generation

```javascript
// GOOD: Generate once during dungeon creation
function spawnDungeonEnemies() {
    for (let i = 0; i < enemyCount; i++) {
        const name = proceduralGen.generateEnemyName(type, isChampion, false);
        const desc = proceduralGen.generateEnemyDescription(type);
        monsters.push({ name, description: desc, ...stats });
    }
}

// BAD: Don't generate per frame
function renderMonster(monster) {
    // DON'T DO THIS - too expensive!
    const name = proceduralGen.generateEnemyName(monster.type);
    ctx.fillText(name, x, y);
}
```

## Testing Your Changes

### Manual Testing

1. Open `test-procedural.html`
2. Click generation buttons
3. Verify output matches theme
4. Check for typos/formatting

### In-Game Testing

1. Enter dungeon
2. Check enemy names appear correctly
3. Verify room descriptions display
4. Check item names in inventory
5. Test multiple dungeon levels

### Console Testing

```javascript
// Open browser console
const gen = new ProceduralGenerator();

// Test 10 boss names
for(let i = 0; i < 10; i++) {
    console.log(gen.generateEnemyName('Demon', false, true));
}

// Test item generation
const item = gen.generateProceduralItem('weapon', {names: ['Sword']}, 'Legendary');
console.log(item);

// Test theme cycling
for(let i = 1; i <= 16; i++) {
    const theme = gen.generateDungeonTheme(i);
    console.log(`Level ${i}: ${theme.name}`);
}
```

## Debugging Tips

### Common Issues

**Issue**: Names are too long or awkward
```javascript
// Solution: Limit combinations or add filters
if (name.length > 50) {
    // Use shorter suffix or no suffix
}
```

**Issue**: Too many similar names
```javascript
// Solution: Add more variety to tables
// Expand prefix/suffix lists
// Add more categories
```

**Issue**: Performance drops
```javascript
// Solution: Profile and optimize
console.time('Generation');
const name = proceduralGen.generateEnemyName('Demon', true, true);
console.timeEnd('Generation');
// Should be < 1ms
```

## Advanced Patterns

### Weighted Random Selection

```javascript
// Use rollWeighted for unequal probabilities
const rarities = [
    { value: 'common', weight: 50 },
    { value: 'rare', weight: 30 },
    { value: 'legendary', weight: 15 },
    { value: 'mythic', weight: 5 }
];

const rarity = engine.rollWeighted(rarities);
```

### Seeded Generation

```javascript
// For reproducible dungeons
const engine = new RandomTableEngine(12345); // Fixed seed
const gen = new ProceduralGenerator();
gen.engine = engine;

// Will always generate same results with same seed
```

### Conditional Generation

```javascript
generateContextualSuffix(itemType, rarity) {
    if (itemType === 'weapon') {
        return this.engine.roll(PROCEDURAL_TABLES.itemSuffixes.power);
    } else if (itemType === 'armor') {
        return this.engine.roll(PROCEDURAL_TABLES.itemSuffixes.protection);
    }
    // ...
}
```

## Resources

- **Main Documentation**: [PROCEDURAL_GENERATION.md](PROCEDURAL_GENERATION.md)
- **Test Suite**: `test-procedural.html`
- **Source Code**: `procedural-generation.js` (600+ lines)
- **Game Integration**: `game.js` (search for "PROCEDURAL:")

## Support

For questions or issues:
1. Check the documentation
2. Review code comments
3. Test in `test-procedural.html`
4. Verify integration points in `game.js`

---

**Happy Generating!** 🎲⚔️
