# Dark Realms RPG - Feature Demonstration Guide

## Quick Start Testing Guide

This guide helps you quickly experience all the new features added in Version 2.0.

---

## 🏆 Testing Boss Variety

### Quick Test
1. Enter the dungeon
2. Use the developer console trick to reach a boss level:
   ```javascript
   gameState.dungeonLevel = 5;
   ```
3. Clear the level to fight a boss
4. Repeat with different levels to see different bosses

### Boss Level Recommendations
- **Level 5**: Classic bosses (Skeleton King, Demon Lord, etc.)
- **Level 20**: Lich King appears
- **Level 30**: Fallen Angel appears
- **Level 40**: Infernal Titan appears
- **Level 50**: Void Reaver (ultimate boss)

### What to Look For
- Unique boss names with procedural prefixes
- Different stat distributions (HP, attack, defense)
- Guaranteed high-tier loot drops
- Boss visual scaling and presentation

---

## ⚔️ Testing Set Items

### Finding Your First Set Item

**Method 1: Natural Discovery (Slow)**
- Play through dungeons normally
- ~5-25% chance per item drop
- Higher dungeon levels = better chance

**Method 2: POI Forge (Faster)**
1. Enter dungeon
2. Look for orange ⚒️ Set Forge POI
3. Press F to interact
4. Receive guaranteed set item

**Method 3: Boss Farming (Consistent)**
- Boss fights have higher set item drop rates
- Every 3rd level has a boss
- Guaranteed rare+ loot includes set items

### Testing Set Bonuses

**2-Piece Bonus Test:**
1. Equip 2 pieces from the same set
2. Check the "Set Bonuses" panel (should appear)
3. Verify stats increase (hover over your stats)

**3-Piece Bonus Test:**
1. Add a 3rd piece from the same set
2. Watch for additional bonus activation
3. Example: Bloodlord's Bane gives 15% life steal

**5-Piece Bonus Test:**
1. Complete a full 5-piece set
2. Maximum power unlocked
3. Example: Shadow's Reaper gives invisibility on kill

### Set Overview

**For Speed/DPS Players:**
- Shadow's Reaper Set (speed + crit)
- Voidwalker Garb (mobility + mana)

**For Tank Players:**
- Frostwarden Plate (defense + CC)
- Dragonslayer Regalia (balanced stats)

**For Sustain Players:**
- Bloodlord's Bane (life steal + HP)

**For Magic Users:**
- Inferno's Wrath (fire damage + mana)

---

## 🗺️ Testing Points of Interest

### Finding POIs

POIs spawn 2-4 per dungeon level in random rooms.

**Visual Indicators:**
- 🕯️ **Gold glow** = Shrine
- ⛲ **Blue shimmer** = Fountain  
- 📦 **Colored glow** = Treasure Chest
- 🔮 **Purple emanation** = Dark Altar
- 🌀 **Cyan swirl** = Mystical Portal
- ⚒️ **Orange flicker** = Set Forge

**Interaction:**
1. Move close to the POI (within ~50 pixels)
2. Press **F** to interact
3. Observe the effect
4. POI disappears after use

### POI Testing Checklist

- [ ] **Shrine**: Heals HP and Mana (good when low health)
- [ ] **Fountain**: Grants XP and stat bonus (check stats panel)
- [ ] **Chest**: Opens for rare+ loot (check inventory)
- [ ] **Altar**: Costs 100 gold, gives stat blessing (verify gold spent)
- [ ] **Portal**: Choice of skip levels or treasure (choose wisely)
- [ ] **Forge**: Guaranteed set item (check for set item in inventory)

### Best POI Strategies

**Early Game (Levels 1-10):**
- Prioritize Fountains (XP boost)
- Use Shrines when low on potions
- Open every Chest you find

**Mid Game (Levels 10-30):**
- Save Altars for tough boss levels
- Use Portals to skip difficult levels
- Hunt for Set Forges to complete sets

**Late Game (Levels 30+):**
- Forges for completing high-tier sets
- Altars before boss fights
- Portals for efficient farming

---

## 💾 Testing Save/Load System

### Quick Save Test
1. Play for a few minutes (gain XP, loot, gold)
2. Press **F5** (or click "Save Game" button)
3. Note your current stats
4. Close the browser tab completely
5. Reopen the game
6. Press **F9** (or click "Load Game" button)
7. Verify all stats, items, and progress restored

### What Gets Saved
- [x] Character level and XP
- [x] HP and Mana (current and max)
- [x] Gold and potion count
- [x] All inventory items
- [x] All equipped items
- [x] Shop upgrade purchases
- [x] Current dungeon level
- [x] Active set bonuses

### Edge Case Testing

**Test 1: Save in Combat**
1. Enter dungeon
2. Engage an enemy (don't kill it)
3. Press F5 while fighting
4. Reload (F9)
5. Result: Should spawn at level start safely

**Test 2: Save After Boss**
1. Defeat a boss
2. Collect loot
3. Save immediately
4. Load - verify loot is in inventory

**Test 3: Multiple Saves**
1. Save at level 5
2. Progress to level 10
3. Save again
4. Load - should be at level 10 (newest save)

---

## ⚔️ Testing Combat Enhancements

### Life Steal Test

**Requirements:**
- Equip 3+ pieces of Bloodlord's Bane set
- OR find an item with life steal stat

**Test Process:**
1. Note current HP
2. Attack an enemy
3. Watch for green +HP numbers
4. Verify HP increases on hit

### Fire Damage Test

**Requirements:**
- Equip 3+ pieces of Inferno's Wrath set
- OR find an item with fire damage stat

**Test Process:**
1. Attack an enemy
2. Look for orange fire damage numbers
3. Verify extra damage dealt

---

## 🎮 Full Playthrough Test

A comprehensive test session covering all features:

### Session Plan (30-45 minutes)

**Phase 1: Early Game (10 min)**
1. Start new character
2. Buy 5 health potions
3. Enter dungeon
4. Explore and find first POI
5. Kill 10 enemies
6. Save game (F5)

**Phase 2: Set Hunting (15 min)**
7. Progress to level 5
8. Defeat first boss
9. Collect loot and check for set items
10. Find and use a Set Forge
11. Equip 2 set pieces
12. Verify set bonuses appear

**Phase 3: POI Tour (10 min)**
13. Visit at least 3 different POI types
14. Use Shrine when damaged
15. Use Fountain for XP
16. Use Altar before boss fight

**Phase 4: Boss Marathon (10 min)**
17. Progress to level 20 (Lich King spawn level)
18. Fight and defeat the new boss
19. Save after victory
20. Continue to level 30+ if desired

**Phase 5: Save Test (5 min)**
21. Note all current stats and items
22. Close browser completely
23. Reopen and load save (F9)
24. Verify everything restored

---

## 🐛 Bug Testing Checklist

Common issues to watch for:

### Set System
- [ ] Set bonuses calculate correctly
- [ ] Set panel shows/hides properly
- [ ] Set items have correct stats
- [ ] Mixing sets doesn't grant wrong bonuses
- [ ] Un-equipping set pieces removes bonuses

### POI System
- [ ] POIs spawn in every dungeon level
- [ ] Interaction prompt appears at correct distance
- [ ] POIs disappear after use
- [ ] POI effects apply correctly
- [ ] No POI spawns overlap

### Save/Load
- [ ] Save creates localStorage entry
- [ ] Load restores all game state
- [ ] Multiple saves overwrite correctly
- [ ] Corrupted save shows error message
- [ ] Save works in dungeon and town

### Boss System
- [ ] Correct boss appears for level
- [ ] Boss stats scale properly
- [ ] Boss loot drops at right rarity
- [ ] New bosses have proper names
- [ ] Boss fights don't crash game

### Combat
- [ ] Life steal heals correctly
- [ ] Fire damage applies
- [ ] Damage numbers show right colors
- [ ] Stats update in UI
- [ ] Set bonus effects work in combat

---

## 🎯 Achievement Test Goals

Try to accomplish these in your test session:

### Basic Goals
- [ ] Find your first set item
- [ ] Complete a 2-piece set bonus
- [ ] Interact with all 6 POI types
- [ ] Defeat a new boss (Lich King or higher)
- [ ] Successfully save and load your game

### Advanced Goals
- [ ] Complete a full 5-piece set
- [ ] Reach dungeon level 25+
- [ ] Defeat 3 different new boss types
- [ ] Collect 10,000 gold
- [ ] Find a mythic rarity item

### Expert Goals
- [ ] Complete 2 different sets
- [ ] Defeat Void Reaver (level 50+ boss)
- [ ] Reach dungeon level 50+
- [ ] Max out all shop upgrades
- [ ] Find all 6 POI types in one dungeon run

---

## 📊 Data Collection

While testing, note:

### Performance
- Frame rate (should be 60 FPS)
- Load times (saves/loads)
- UI responsiveness

### Balance
- Set item drop frequency
- POI spawn rates
- Boss difficulty
- Set bonus power level

### User Experience
- Are controls intuitive?
- Is UI informative?
- Are effects satisfying?
- Is progression rewarding?

---

## 🔧 Developer Console Tricks

For faster testing, use these console commands:

```javascript
// Jump to specific level
gameState.dungeonLevel = 30;

// Add gold
gameState.gold += 10000;

// Add XP
addExperience(5000);

// Give set item (example)
const shadowBoots = generateSetItem('shadowReaper', 'boots', gameState.dungeonLevel);
gameState.inventory.push(shadowBoots);
updateInventoryUI();

// Spawn boss early
// (Go to a level divisible by 3, or modify GAME_CONFIG.bossEveryNLevels)

// Test specific POI
// Use enterDungeon() and check gameState.dungeon.pointsOfInterest

// Heal to full
gameState.currentHp = gameState.maxHp;
gameState.currentMana = gameState.maxMana;
updateUI();

// Clear inventory
gameState.inventory = [];
updateInventoryUI();

// Max level character
for(let i = 0; i < 50; i++) {
    levelUp();
}
```

---

## 📝 Feedback Template

After testing, consider these questions:

**Set System:**
- Is finding set items fun/rewarding?
- Are set bonuses balanced?
- Is the UI clear about active bonuses?

**POI System:**
- Are POIs visually distinctive?
- Are the rewards appropriate?
- Is interaction smooth?

**Boss Variety:**
- Do new bosses feel unique?
- Is difficulty scaling appropriate?
- Are loot rewards satisfying?

**Save/Load:**
- Is saving/loading fast?
- Are keyboard shortcuts convenient?
- Does save state feel reliable?

**Overall:**
- What's the most fun new feature?
- What needs improvement?
- Any bugs or issues encountered?

---

**Happy Testing!** 🎮⚔️

*Report issues or suggestions for future updates.*
