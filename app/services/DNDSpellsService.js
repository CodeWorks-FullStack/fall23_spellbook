import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { dndApi } from "./AxiosService.js"

class DNDSpellsService {
  async getSpellByIndex(spellIndex) {
    // console.log('index?', spellIndex);
    const res = await dndApi.get(`api/spells/${spellIndex}`)
    console.log('GOT SPELL', res.data);
    const newSpell = new Spell(res.data)
    AppState.activeSpell = newSpell
  }
  async getDNDSpells() {
    const res = await dndApi.get('api/spells')
    console.log('GOT SPELLS', res.data);
    AppState.dndSpells = res.data.results
  }

}

export const dndSpellsService = new DNDSpellsService()