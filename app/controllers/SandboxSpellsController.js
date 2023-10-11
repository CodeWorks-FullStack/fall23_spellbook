import { AppState } from "../AppState.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawMySpells() {
  const spells = AppState.mySpells
  let content = ''
  spells.forEach(spell => content += spell.MySpellListTemplate)
  setHTML('mySpellOffcanvas', content)

  const preparedSpells = spells.filter(spell => spell.prepared)

  setHTML('spellCount', preparedSpells.length)
}


export class SandboxSpellsController {
  constructor () {
    console.log('LOADED');
    // this.getMySpells()

    AppState.on('account', this.getMySpells)
    AppState.on('mySpells', _drawMySpells)
  }

  async createSpell() {
    try {
      await sandboxSpellsService.createSpell()
    } catch (error) {
      console.error(error);
      Pop.error(error)
    }
  }
  async getMySpells() {
    try {
      await sandboxSpellsService.getMySpells()
    } catch (error) {
      console.error(error);
      Pop.error(error)
    }
  }

  async prepareSpell(spellId) {
    try {
      console.log('CHANGED', spellId);
      await sandboxSpellsService.updateSpell(spellId)
    } catch (error) {
      console.error(error);
      Pop.error(error)

    }
  }

  setActiveSpell(spellId) {
    sandboxSpellsService.setActiveSpell(spellId)
    // @ts-ignore
    bootstrap.Offcanvas.getOrCreateInstance('#offcanvasRight').hide()
  }

}