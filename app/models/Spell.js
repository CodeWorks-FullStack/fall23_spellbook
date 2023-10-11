export class Spell {
  constructor (data) {
    this.id = data.id || null
    this.name = data.name

    // NOTE join is useful taking an array of strings and joining them together into one single string, you can supply an optional argument to put in beteween each string
    this.description = data.description || data.desc.join('<br>')

    // NOTE this won't be on your checkpoint, this is crazy person code
    this.damage = typeof data.damage == 'string' ?
      data.damage
      :
      data.damage?.damage_at_slot_level[data.level] || 'No damage'

    this.level = data.level
    this.range = data.range
    this.material = data.material || 'None'
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.casting_time || data.castingTime
    this.duration = data.duration
    this.components = data.components
    this.prepared = data.prepared || false
  }

  get ActiveTemplate() {
    return `
    <div>
      <h1>${this.name}</h1>
      <h2>${this.level} ${this.damage}</h2>
      <h3>
       ${this.ComputeRitualIcon}
        ${this.ComputeConcentrationIcon}
        ${this.castingTime} ${this.duration}
      </h3>
      <p>
      Range: ${this.range}
      Material: ${this.material}
      Components: ${this.components.join(', ')}
      </p>
      <p>${this.description}</p>
      <div>
        <button onclick="app.SandboxSpellsController.createSpell()" class="btn btn-success">Save Spell 📔</button>
      </div>
    </div>
    `
  }

  get ComputeConcentrationIcon() {
    return this.concentration ? '<i class="mdi mdi-brain"></i>' : ''
  }
  get ComputeRitualIcon() {
    return this.ritual ? '<i class="mdi mdi-candelabra"></i>' : ''
  }

  get MySpellListTemplate() {
    // NOTE onchange will run code every time the value of the checkbox input changes
    // NOTE there is a ternary on the checkbox input to conditionally add the checked attribute if the spell's prepared boolean is true
    return `
    <div class="text-center mb-2">
      <input ${this.prepared ? 'checked' : ''} onchange="app.SandboxSpellsController.prepareSpell('${this.id}')" type="checkbox">
      <button onclick="app.SandboxSpellsController.setActiveSpell('${this.id}')" class="btn btn-info w-75">${this.name}</button>
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