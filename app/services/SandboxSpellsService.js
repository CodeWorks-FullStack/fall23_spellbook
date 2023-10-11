import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async updateSpell(spellId) {
    const spellIndex = AppState.mySpells.findIndex(spell => spell.id == spellId)
    if (spellIndex == -1) { return }
    const foundSpell = AppState.mySpells[spellIndex]
    // foundSpell.prepared = true
    const spellData = {
      prepared: !foundSpell.prepared
    }
    const res = await api.put(`api/spells/${spellId}`, spellData)
    console.log('UPDATED SPELL', res.data);
    const newSpell = new Spell(res.data)

    AppState.mySpells.splice(spellIndex, 1, newSpell)
    AppState.emit('mySpells')
  }

  setActiveSpell(spellId) {
    const foundSpell = AppState.mySpells.find(spell => spell.id == spellId)
    AppState.activeSpell = foundSpell
  }

  async createSpell() {
    const spell = AppState.activeSpell
    const res = await api.post('api/spells', spell)
    console.log('CREATED SPELL', res.data);
    const newSpell = new Spell(res.data)
    AppState.mySpells.push(newSpell)
    AppState.emit('mySpells')
  }

  async getMySpells() {
    const res = await api.get('api/spells')
    console.log('GOT MY SPELLS', res.data);
    const newSpells = res.data.map(spellPOJO => new Spell(spellPOJO))
    AppState.mySpells = newSpells
  }
}

export const sandboxSpellsService = new SandboxSpellsService()