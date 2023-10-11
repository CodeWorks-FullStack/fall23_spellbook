export class Spell {
  constructor (data) {
    this.name = data.name
    this.description = data.desc.join('<br>')
    this.damage = data.damage?.damage_at_slot_level[data.level] || 'No damage'
    this.level = data.level
    this.range = data.range
    this.material = data.material || 'None'
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.casting_time
    this.duration = data.duration
    this.components = data.components
    // TODO explain this when we get to it
    // this.prepared = data.prepared || false
  }

  get ActiveTemplate() {
    return `
    <div>
      <h1>${this.name}</h1>
      <h2>${this.level} ${this.damage}</h2>
      <h3>
        <i class="mdi mdi-candelabra"></i>
        <i class="mdi mdi-brain"></i>
        ${this.castingTime} ${this.duration}
      </h3>
      <p>
      Range: ${this.range}
      Material: ${this.material}
      Components: ${this.components.join(', ')}
      </p>
      <p>${this.description}</p>
    </div>
    `
  }
}


const spellData = {
  "level": 4,
  "damage": {
    "damage_type": {
      "index": "bludgeoning",
      "name": "Bludgeoning",
      "url": "/api/damage-types/bludgeoning"
    },
    "damage_at_slot_level": {
      "4": "3d6"
    }
  },
  "higher_level": [],
  "index": "black-tentacles",
  "name": "Black Tentacles",
  "desc": [
    "Squirming, ebony tentacles fill a 20-foot square on ground that you can see within range. For the duration, these tentacles turn the ground in the area into difficult terrain.",
    "When a creature enters the affected area for the first time on a turn or starts its turn there, the creature must succeed on a Dexterity saving throw or take 3d6 bludgeoning damage and be restrained by the tentacles until the spell ends. A creature that starts its turn in the area and is already restrained by the tentacles takes 3d6 bludgeoning damage.",
    "A creature restrained by the tentacles can use its action to make a Strength or Dexterity check (its choice) against your spell save DC. On a success, it frees itself."
  ],
  "range": "90 feet",
  "components": [
    "V",
    "S",
    "M"
  ],
  "material": "A piece of tentacle from a giant octopus or a giant squid",
  "ritual": false,
  "duration": "Up to 1 minute",
  "concentration": true,
  "casting_time": "1 action",
  "dc": {
    "dc_type": {
      "index": "dex",
      "name": "DEX",
      "url": "/api/ability-scores/dex"
    },
    "dc_success": "none",
    "desc": "A creature restrained by the tentacles can use its action to make a Strength or Dexterity check (its choice) against your spell save DC. On a success, it frees itself."
  },
  "area_of_effect": {
    "type": "cube",
    "size": 20
  },
  "school": {
    "index": "conjuration",
    "name": "Conjuration",
    "url": "/api/magic-schools/conjuration"
  },
  "classes": [
    {
      "index": "wizard",
      "name": "Wizard",
      "url": "/api/classes/wizard"
    }
  ],
  "subclasses": [],
  "url": "/api/spells/black-tentacles"
}