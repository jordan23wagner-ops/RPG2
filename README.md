# Dark Realms RPG

A dark fantasy top-down RPG inspired by Diablo and Runescape, featuring procedurally generated content and intense dungeon crawling action.

## 🎮 Features

### Core Gameplay
- **Top-down combat** with real-time action
- **Procedurally generated dungeons** with unique layouts each playthrough
- **Dark Diablo aesthetic** with atmospheric visuals and storytelling
- **Loot system** with 6 rarity tiers and dynamic stat scaling
- **Equipment system** with 8 item slots
- **Progressive difficulty** with scaling enemies and boss encounters

### 🎲 Procedural Generation System (NEW!)

The game features a comprehensive procedural generation system inspired by AutoRollTables methodology:

#### Enemy Generation
- **Procedural Names**: Over 500+ unique enemy name combinations
  - Regular enemies: Base types (Zombie, Demon, Dragon, etc.)
  - Champions: Prefixed names (Corrupted Zombie, Ancient Wraith)
  - Bosses: Full titles (Blighted Demon of the Abyss)
- **Dynamic Descriptions**: Atmospheric descriptions with physical traits, behaviors, and origins
- **Themed Affixes**: Corrupted, Ancient, Elemental, Dark, Death, Power themes

#### Item Generation
- **80,000+ Item Combinations**: Procedural naming with rarity-based prefixes and contextual suffixes
  - Common: "Rusty Sword"
  - Rare: "Enchanted Blade of Power"
  - Legendary: "Divine Hammer of the Titan"
  - Mythic: "Primordial Scimitar of the Dragon"
- **Flavor Text**: Discovery descriptions for immersion
- **Six Suffix Categories**: Power, Protection, Speed, Life, Elements, Unique

#### Dungeon Features
- **8 Unique Dungeon Themes**: Cycling themes with atmospheric descriptions
  - The Catacombs, Halls of Torment, Arcane Sanctum, Demon Pit, etc.
- **10 Room Types**: Crypts, torture chambers, ritual rooms, libraries, and more
- **Room Exploration System**: First-time room discovery with unique descriptions
- **Environmental Storytelling**: Procedural sights, sounds, and smells

#### Content Tables
- 48 enemy prefix variations across 8 categories
- 28 enemy suffix variations across 3 categories  
- 40 item prefix variations across 6 rarity tiers
- 34 item suffix variations across 6 categories
- 120+ unique room description combinations
- 24 atmospheric environmental details

See [PROCEDURAL_GENERATION.md](PROCEDURAL_GENERATION.md) for complete documentation.

### Equipment & Progression
- **8 Equipment Slots**: Weapon, Helmet, Armor, Shield, Boots, Gloves, Ring, Amulet
- **6 Rarity Tiers**: Common, Uncommon, Rare, Epic, Legendary, Mythic
- **Dynamic Stat Scaling**: Items scale with dungeon level
- **Shop Upgrades**: Permanent stat improvements purchasable in town
- **🆕 Set Items System**: 6 themed equipment sets with powerful bonuses
  - Shadow's Reaper Set (Rogue/Assassin theme)
  - Bloodlord's Bane Set (Vampire Hunter theme)
  - Frostwarden Plate Set (Ice Warrior theme)
  - Inferno's Wrath Set (Fire Mage theme)
  - Voidwalker Garb Set (Shadow Caster theme)
  - Dragonslayer Regalia Set (Dragon Hunter theme)
- **Set Bonuses**: 2/3/5-piece bonuses with unique effects
- **Special Stats**: Life steal, fire damage, poison damage, and more

### Combat System
- **Real-time combat** with attack cooldowns
- **Champion enemies** with random affixes (20% spawn chance)
- **🆕 11 Boss Types** including Lich King, Vampire Lord, Fallen Angel, and more
- **Boss encounters** every 3 levels with guaranteed high-tier loot
- **Health globe system** (Diablo-inspired) - 50% drop chance on enemy death
- **Potion system** with instant healing
- **🆕 Life Steal Mechanic**: Restore health on hit
- **🆕 Fire Damage**: Additional elemental damage

### 🗺️ Points of Interest (NEW!)
Discover interactive locations throughout the dungeon:
- **Shrines**: Restore HP and Mana
- **Fountains**: Gain XP and stat bonuses
- **Chests**: Find guaranteed loot
- **Altars**: Sacrifice gold for powerful blessings
- **Portals**: Skip levels or discover secret areas
- **Set Forges**: Craft and discover set items

### 💾 Save System (NEW!)
- **Quick Save**: Press F5 to save your progress
- **Quick Load**: Press F9 to restore your save
- **Full State Preservation**: Saves character, inventory, dungeon progress, and set bonuses
- **Local Storage**: Automatic persistence across sessions

### Visual Features
- **Minimap** with real-time enemy tracking
- **Particle effects** for combat and ambiance
- **Damage numbers** with color-coded feedback
- **Animated sprites** for player and monsters
- **Dark color palette** with atmospheric lighting

## 🎯 Game Loop

1. **Town Hub**: Safe zone with shop for upgrades and potion purchases
2. **Enter Dungeon**: Procedurally generated levels with unique themes
3. **Explore Rooms**: Discover atmospheric locations with descriptions
4. **Combat Enemies**: Fight through 30+ enemies per level
5. **Collect Loot**: Find procedurally named items with themed descriptions
6. **Boss Fight**: Face powerful bosses every 3 levels
7. **Progress Deeper**: Descend to harder levels with better rewards
8. **Return to Town**: Sell loot, upgrade stats, and prepare for the next dive

## 🎨 Aesthetic

Dark fantasy inspired by Diablo, featuring:
- Gothic and demonic imagery
- Blood and shadow themes
- Corrupted and cursed elements
- Bone, flesh, and sacrifice motifs
- Atmospheric storytelling through procedural text

## 🗺️ Dungeon Themes

Each level features a rotating theme:
1. **The Catacombs** - Ancient burial grounds
2. **The Halls of Torment** - Torture chambers
3. **The Arcane Sanctum** - Dark magic sanctum
4. **The Demon Pit** - Infernal realm
5. **The Frozen Depths** - Frozen wastes
6. **The Blood Citadel** - Sacrificial fortress
7. **The Bone Palace** - Skeletal throne room
8. **The Void Chambers** - Reality-warping space

## 🎮 Controls

- **Arrow Keys / WASD**: Move character
- **Space**: Attack
- **Q**: Use health potion
- **E**: Pick up all nearby loot
- **F**: Interact with Points of Interest
- **M**: Toggle minimap
- **F5**: Quick Save
- **F9**: Quick Load
- **ESC**: Return to town (from dungeon)
- **Mouse**: Click items/buttons in UI

## 📁 Project Structure

```
RPG2/
├── game.js                      # Main game engine (3,979 lines)
├── procedural-generation.js     # Procedural content system (600+ lines)
├── index.html                   # Game UI
├── styles.css                   # Dark fantasy styling
├── test-procedural.html         # Test suite for procedural generation
├── PROCEDURAL_GENERATION.md     # Complete documentation
└── README.md                    # This file
```

## 🚀 Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Click "Enter Dungeon" to start your adventure
4. Test procedural generation at `test-procedural.html`

No build process or dependencies required - pure vanilla JavaScript!

## 🧪 Testing

**Test Suite**: Open `test-procedural.html` to see:
- Enemy name generation examples
- Item name variations by rarity
- Dungeon theme previews
- Room descriptions
- Environmental storytelling
- Content statistics

## 🔧 Technical Details

- **Performance**: All procedural generation happens during dungeon creation, not per-frame
- **Balance**: Maintains original game balance - procedural content is cosmetic
- **Compatibility**: No save system currently, but designed for future compatibility
- **Extensibility**: Easy to add new content tables and generation rules

## 📊 Game Statistics

- **Enemy Types**: 11 base types with 10+ variations each
- **🆕 Boss Types**: 11 unique boss variants (Skeleton King, Demon Lord, Ancient Dragon, Shadow Assassin, Lich King, Vampire Lord, Fallen Angel, Abyssal Horror, Infernal Titan, Chaos Wyrm, Void Reaver)
- **Item Types**: 8 equipment types with 50+ base items
- **🆕 Set Items**: 6 complete themed sets with 2/3/5-piece bonuses
- **Rarity Tiers**: 6 levels from Common to Mythic
- **Dungeon Levels**: Infinite progression with scaling difficulty
- **🆕 Points of Interest**: 6 interactive location types
- **Procedural Combinations**: 80,000+ unique item/enemy combinations

## 🎯 Future Enhancements

- [ ] Additional dungeon layout patterns (caves, mazes, hybrid)
- [x] ✅ Points of interest (shrines, fountains, altars, chests, portals, forges)
- [x] ✅ Save/Load system with local storage
- [x] ✅ More boss variations (11 unique boss types)
- [x] ✅ Set item system with bonuses
- [ ] Achievement system
- [ ] Leaderboards
- [ ] Sound effects and music
- [ ] Mobile controls
- [ ] Cloud save sync
- [ ] More set items and unique items
- [ ] Skill system and talent trees

## 📝 Credits

- **Inspiration**: Diablo series (Blizzard), Runescape (Jagex)
- **Procedural System**: Inspired by [AutoRollTables](https://autorolltables.github.io/)
- **Development**: Custom vanilla JavaScript implementation

## 📜 License

This is a portfolio project for educational purposes.

---

**Enjoy your descent into the Dark Realms!** ⚔️🏰💀
