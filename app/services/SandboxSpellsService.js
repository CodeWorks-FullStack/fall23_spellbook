import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js"

class SandboxSpellsService {
  async updateSpell(spellId) {
    const spellIndex = AppState.mySpells.findIndex(spell => spell.id == spellId)
    if (spellIndex == -1) { return }
    const foundSpell = AppState.mySpells[spellIndex]
    // NOTE this would change the data in the AppState before the request to the API is succesful, which can be bad
    // foundSpell.prepared = true
    // NOTE we create a new object here so that reference is broken to our original object
    const spellData = {
      // NOTE if(founSspell.prepared == true){found.prepared = false}else{foundSpell.prepared = true}
      prepared: !foundSpell.prepared
    }
    // NOTE for a put request, we must specify the id of the item that we want to update on the API, and we must send a request body with the properties that we want to change
    const res = await api.put(`api/spells/${spellId}`, spellData)
    console.log('UPDATED SPELL', res.data);
    const newSpell = new Spell(res.data)

    // NOTE splice can take items out of arrays, but it can also replace items in arrays by supplying a 3rd argument
    AppState.mySpells.splice(spellIndex, 1, newSpell) // start splicing at spellIndex, take one item out, and replace it with newSpell
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