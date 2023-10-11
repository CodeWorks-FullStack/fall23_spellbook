import { AppState } from "../AppState.js";
import { dndApi } from "./AxiosService.js"

class DNDSpellsService {
  async getDNDSpells() {
    const res = await dndApi.get('api/spells')
    console.log('GOT SPELLS', res.data);
    AppState.dndSpells = res.data.results
  }

}

export const dndSpellsService = new DNDSpellsService()