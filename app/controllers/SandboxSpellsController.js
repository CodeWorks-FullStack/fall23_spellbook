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

    // NOTE we can't do this, since we have to be logged in to make this request
    // this.getMySpells()
    // NOTE waits for the account object to be set in the appstate from the sandbox api, then makes the request with our bearer token attached
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

  // NOTE we don't have to talk to API for this request, so this is not asynchronous
  setActiveSpell(spellId) {
    sandboxSpellsService.setActiveSpell(spellId)
    // @ts-ignore
    bootstrap.Offcanvas.getOrCreateInstance('#offcanvasRight').hide()
  }

}