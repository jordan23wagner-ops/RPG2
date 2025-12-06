# Procedural Generation System - Dark Realms RPG

## Overview

This document describes the procedural generation system implemented in Dark Realms RPG, inspired by AutoRollTables methodology and tailored for a dark Diablo aesthetic.

## System Architecture

### Core Components

1. **RandomTableEngine** - Core random table rolling system
2. **ProceduralGenerator** - Main content generation class
3. **ProceduralDungeonGenerator** - Dungeon layout variations
4. **PROCEDURAL_TABLES** - Dark fantasy themed content tables

## Features Implemented

### 1. Enemy Name Generation

**System**: `generateEnemyName(baseType, isChampion, isBoss)`

- **Regular Enemies**: Uses base monster name (e.g., "Zombie")
- **Champions**: Prefix + Base (e.g., "Corrupted Zombie", "Ancient Wraith")
- **Bosses**: Prefix + Base + Suffix (e.g., "Blighted Demon of the Abyss")

**Prefix Categories**:
- Corrupted: Blighted, Cursed, Damned, Defiled, etc.
- Ancient: Elder, Primeval, Forgotten, Eternal, etc.
- Elemental: Burning, Frozen, Molten, Chilling, etc.
- Dark: Shadow, Night, Void, Abyssal, etc.
- Death: Grave, Tomb, Crypt, Bone, etc.
- Power: Mighty, Greater, Supreme, Grand, etc.

**Suffix Categories**:
- Titles: "the Devourer", "the Destroyer", "the Corruptor"
- Realms: "of the Abyss", "of Shadows", "of Flames"
- Descriptors: "Fleshrender", "Bonecrusher", "Soulreaver"

### 2. Enemy Descriptions

**System**: `generateEnemyDescription(baseType)`

Generates atmospheric descriptions using three components:
- **Physical traits**: "covered in festering wounds", "dripping with corrupted ichor"
- **Behavioral traits**: "hungers for mortal flesh", "radiates palpable malice"
- **Origin**: "risen from the grave", "twisted by dark magic"

Example: "A Demon covered in festering wounds, feeds on fear itself. Summoned from the abyss."

### 3. Item Name Generation

**System**: `generateProceduralItem(itemType, itemData, rarity)`

Creates Diablo-style item names with:
- Rarity-appropriate prefixes (Rusty, Enchanted, Godly, etc.)
- Base item names from existing tables
- Contextual suffixes for rare+ items (50% chance)

**Suffix Types**:
- Power: "of Might", "of the Titan"
- Protection: "of the Guardian", "of Warding"
- Speed: "of Swiftness", "of the Zephyr"
- Life: "of Vitality", "of the Phoenix"
- Elements: "of Flames", "of Frost"
- Unique: "of the Vampire", "of the Dragon"

**Examples**:
- Common: "Rusty Sword"
- Rare: "Enchanted Blade of Power"
- Legendary: "Divine Hammer of the Titan"
- Mythic: "Primordial Scimitar of the Dragon"

### 4. Item Flavor Text

**System**: `generateLootFlavor(itemType)`

Adds atmospheric discovery text:
- "discovered among scattered bones"
- "pulled from a dark corner"
- "found clutched in a skeletal hand"
- "salvaged from ancient remains"

### 5. Dungeon Themes

**System**: `generateDungeonTheme(level)`

Cycles through 8 distinct dungeon themes:
1. **The Catacombs** - Ancient burial grounds crawl with undead
2. **The Halls of Torment** - Screams echo through torture chambers
3. **The Arcane Sanctum** - Dark magic permeates the air
4. **The Demon Pit** - Infernal creatures roam freely
5. **The Frozen Depths** - Ice and death reign supreme
6. **The Blood Citadel** - Sacrifice fuels dark rituals
7. **The Bone Palace** - Skulls adorn every surface
8. **The Void Chambers** - Reality itself seems to warp

Each theme includes:
- Thematic name
- Atmospheric description
- Associated color scheme

### 6. Room Descriptions

**System**: `generateRoomDescription()`

Creates unique descriptions for each dungeon room:

**Room Types**:
- Crypt: "Ancient burial chamber - Skeletal remains line the walls"
- Torture Chamber: "Rusted instruments of pain hang from chains"
- Ritual Chamber: "Arcane symbols glow with eldritch energy"
- Forbidden Library: "Tomes of dark knowledge gather dust"
- Throne Room: "A throne of bone sits in shadow"
- Prison: "Desperate scratches mark the walls"
- Armory: "Weapons of ages past rust on racks"

**Features**: Additional atmospheric details from a table of 12+ environmental elements

### 7. Environmental Storytelling

**System**: `generateEnvironmentalStory()`

Creates immersive atmosphere through:
- **Sights**: "Blood-soaked altars", "Cages hanging from ceiling"
- **Sounds**: "Distant screaming", "Chains rattling in darkness"
- **Smells**: "Coppery scent of blood", "Sulfur and brimstone"

Displayed when entering new dungeon levels to enhance immersion.

### 8. Room Exploration System

**Implementation**: Tracks which rooms players have visited

When entering a new room for the first time:
1. System checks player position against room boundaries
2. Displays room type and description
3. Shows atmospheric flavor text
4. Only triggers once per room per dungeon level

### 9. Dungeon Layout Variations

**System**: `ProceduralDungeonGenerator`

Supports multiple layout patterns:
- **Rooms**: Chamber-based dungeons with corridors (current)
- **Caves**: Organic cavern systems (framework ready)
- **Maze**: Dense labyrinthine corridors (framework ready)
- **Hybrid**: Mixed architecture styles (framework ready)

Pattern auto-cycles based on dungeon level for variety.

## Technical Details

### Performance Considerations

✅ **Optimized**:
- Procedural generation happens during dungeon creation (not per frame)
- Room exploration checks only in dungeon context
- Minimal memory overhead (descriptive strings only)
- No impact on combat calculations or rendering

✅ **Balanced**:
- All procedural content uses existing stat systems
- No changes to damage calculations, item stats, or drop rates
- Maintains original game balance

### Save Compatibility

✅ **Compatible**:
- No save/load system currently implemented
- When implemented, procedural fields are optional
- Base names preserved for backward compatibility
- New fields (description, flavorText) don't affect gameplay

### Integration Points

**Files Modified**:
1. `index.html` - Added script tag for procedural-generation.js
2. `game.js` - Integrated at key points:
   - `spawnDungeonEnemies()` - Enemy name/description generation
   - `generateItem()` - Item name/flavor generation
   - `enterDungeon()` - Theme and environmental story
   - `generateDungeon()` - Room descriptions
   - `update()` - Room exploration tracking

**New File**:
- `procedural-generation.js` - Complete procedural system (~600 lines)

## Usage Examples

### Generate Enemy Name
```javascript
// Regular enemy
const name = proceduralGen.generateEnemyName("Zombie", false, false);
// Result: "Zombie"

// Champion
const championName = proceduralGen.generateEnemyName("Zombie", true, false);
// Result: "Corrupted Zombie" or "Ancient Zombie"

// Boss
const bossName = proceduralGen.generateEnemyName("Demon", false, true);
// Result: "Blighted Demon of the Abyss"
```

### Generate Item Name
```javascript
const itemType = ITEM_TYPES['weapon'];
const proceduralItem = proceduralGen.generateProceduralItem('weapon', itemType, 'Legendary');
console.log(proceduralItem.proceduralName);
// Result: "Divine Sword of the Titan"
console.log(proceduralItem.flavorText);
// Result: "discovered among scattered bones"
```

### Generate Dungeon Theme
```javascript
const theme = proceduralGen.generateDungeonTheme(5);
console.log(theme.name); // "The Blood Citadel"
console.log(theme.desc); // "Sacrifice fuels dark rituals"
console.log(theme.color); // "#3a0a0a"
```

## Content Tables

### Table Statistics

- **Enemy Prefixes**: 48 variations across 8 categories
- **Enemy Suffixes**: 28 variations across 3 categories
- **Item Prefixes**: 40 variations across 6 rarity tiers
- **Item Suffixes**: 34 variations across 6 categories
- **Room Types**: 10 distinct room types
- **Environmental Features**: 12 dungeon features
- **Environmental Details**: 24 atmospheric elements (6 per category)
- **Monster Traits**: 24 descriptive traits (8 per category)

### Total Combinations

**Enemy Names**:
- Champions: 48 prefixes × base types = ~500+ unique names
- Bosses: 48 prefixes × 28 suffixes × base types = ~13,000+ combinations

**Item Names**:
- Rare+: 40 prefixes × 34 suffixes × 50+ base items = ~68,000+ combinations
- Common/Uncommon: 40 prefixes × 50+ base items = ~2,000+ combinations

**Room Descriptions**: 10 types × 12 features = 120+ unique room descriptions

## Dark Fantasy Aesthetic

All content maintains the Diablo-inspired dark aesthetic:

✅ **Themes**: Death, corruption, demons, sacrifice, darkness
✅ **Tone**: Ominous, foreboding, visceral
✅ **Language**: Medieval fantasy with dark undertones
✅ **Color Scheme**: Dark reds, blacks, purples, shadows

**Examples**:
- "Blighted" instead of "Diseased"
- "of the Abyss" instead of "of Darkness"  
- "Soulreaver" instead of "Soul Stealer"
- "Primordial" instead of "Very Old"

## Future Enhancements

### Ready to Implement

1. **Dungeon Layout Variations**: Cave, maze, and hybrid patterns (framework exists)
2. **Points of Interest**: Shrines, fountains, altars (system ready)
3. **Unique Enemy Abilities**: Based on procedural affixes
4. **Item Set Generation**: Themed item collections
5. **Quest Generation**: Procedural objectives and rewards

### Expansion Opportunities

1. **NPC Generation**: Merchant names, dialogue
2. **Lore Generation**: World-building snippets
3. **Event Generation**: Random encounters
4. **Trap Generation**: Hazards in rooms
5. **Puzzle Generation**: Dungeon challenges

## Testing Checklist

✅ Enemy names generate correctly (regular/champion/boss)
✅ Item names follow rarity rules
✅ Room descriptions display on entry
✅ Dungeon themes cycle properly
✅ Environmental stories add atmosphere
✅ No performance impact on gameplay
✅ Game balance maintained
✅ No JavaScript errors
✅ Dark aesthetic preserved

## Credits

- Inspired by: [AutoRollTables](https://autorolltables.github.io/)
- Theme: Diablo series (Blizzard Entertainment)
- Implementation: Custom system for Dark Realms RPG
