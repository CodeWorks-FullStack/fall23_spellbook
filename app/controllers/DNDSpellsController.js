import { AppState } from "../AppState.js";
import { dndSpellsService } from "../services/DNDSpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawDNDSpells() {
  const spells = AppState.dndSpells
  let content = ''
  spells.forEach(spell => content += `
  <div class="text-center mb-2">
    <button onclick="app.DNDSpellsController.getSpellByIndex('${spell.index}')" class="btn btn-info w-100">${spell.name}</button>
  </div>
  `)

  setHTML('dndSpells', content)
}

function _drawActiveSpell() {
  setHTML('activeSpell', AppState.activeSpell.ActiveTemplate)
}


export class DNDSpellsController {
  constructor () {
    console.log('LOADED');
    this.getDNDSpells()

    AppState.on('dndSpells', _drawDNDSpells)
    AppState.on('activeSpell', _drawActiveSpell)
  }
  async getDNDSpells() {
    try {
      await dndSpellsService.getDNDSpells()
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  async getSpellByIndex(spellIndex) {
    try {
      await dndSpellsService.getSpellByIndex(spellIndex)
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

}