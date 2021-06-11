import { allSpells } from './allSpells'
import { sourceList } from './sourceList'
import { classSpells } from './ClassSpells'
import { oDict, oLanguages, oLevelsText, oSort, oView, schoolList } from './schoolList'
import { uiL10n, UiLang } from './UiL10n'

export { allSpells, sourceList, classSpells, oDict, oLanguages, oLevelsText, oSort, oView, schoolList }

export type Lang = UiLang | 'ru_of'

class L7dString {
  static logDebounce = 5

  /**
   * @param localization if value is null or undefined default lang 'en' will be used
   */
  constructor (readonly localization: Record<Lang, string | undefined>) {
  }

  /**
   * @param lang requested lang
   * @return localized string or default in 'en'
   */
  getL7d = (lang: Lang): string => {
    const l7dString = this.localization[lang]

    if (undefined === l7dString || null === l7dString) {
      if (undefined === this.localization.en) {
        throw new Error('No default translation, current state: ' + JSON.stringify(this.localization))
      }

      return this.localization.en
    }

    return l7dString
  }

  toString = (): string => {
    if (L7dString.logDebounce > 0) {
      console.warn('Usage of L7dString without lang was detected. Fallback to EN: ' + JSON.stringify(this.localization))
      L7dString.logDebounce--
    } else {
      console.warn('Too many usages of L7dString without lang were detected. See logs above')
    }

    return this.getL7d('en')
  }
}

class Spell {
  constructor (
    readonly id: string,
    readonly ritual: boolean,
    readonly level: string, // TODO katoquro: 29/05/2021 transform to number
    readonly name: L7dString,
    readonly text: L7dString,
    readonly school: L7dString,
    readonly castTime: L7dString,
    readonly range: L7dString,
    readonly materials: L7dString,
    readonly components: L7dString,
    readonly duration: L7dString,
    readonly source: string, // TODO katoquro: 29/05/2021 replace with array
  ) {
  }
}

class SpellDb {
  private readonly spellIdx: Map<string, Spell>
  private readonly uiL10n: Map<string, L7dString>

  constructor () {
    this.spellIdx = this.buildSpellIdx()
    this.uiL10n = this.buildUiL10n()
  }

  findSpell = (id: string): Spell => {
    if (!this.spellIdx.has(id)) {
      throw new Error('No Spell with id: ' + id)
    }

    return this.spellIdx.get(id)!
  }

  getUiString = (key: string, lang: Lang): string => {
    if (!this.uiL10n.has(key)) {
      throw new Error('No Ui Strings with key: ' + key)
    }

    return this.uiL10n.get(key)!.getL7d(lang)
  }

  private buildSpellIdx (): Map<string, Spell> {
    return new Map(allSpells.map((s) => {
      const enSpell = s.en
      const ruSpell = s.ru
      const ruOfSpell = s.ru_of as any

      return [enSpell.name, new Spell(
        enSpell.name,
        !!enSpell.ritual,
        enSpell.level as string,
        new L7dString({ en: enSpell.name, ru: ruSpell.name, ru_of: ruOfSpell?.name }),
        new L7dString({ en: enSpell.text, ru: ruSpell.text, ru_of: ruOfSpell?.text }),
        new L7dString({ en: enSpell.school, ru: ruSpell.school, ru_of: ruOfSpell?.school }),
        new L7dString({ en: enSpell.castingTime, ru: ruSpell.castingTime, ru_of: ruOfSpell?.castingTime }),
        new L7dString({ en: enSpell.range, ru: ruSpell.range, ru_of: ruOfSpell?.range }),
        new L7dString({ en: enSpell.materials, ru: ruSpell.materials, ru_of: ruOfSpell?.materials }),
        new L7dString({ en: enSpell.components, ru: ruSpell.components, ru_of: ruOfSpell?.components }),
        new L7dString({ en: enSpell.duration, ru: ruSpell.duration, ru_of: ruOfSpell?.duration }),
        enSpell.source
      )]
    }))
  }

  private buildUiL10n (): Map<string, L7dString> {
    const l7dStrings: [string, L7dString][] = []
    const typeLessDict = (oDict as Record<string, any>)
    for (const key in typeLessDict) {
      const en = typeLessDict[key].en.title
      const ru = typeLessDict[key].ru.title

      const l7dString = new L7dString({ en: en, ru: ru, ru_of: ru })
      l7dStrings.push([key, l7dString])
    }

    for (const key in uiL10n) {
      const en = uiL10n[key].en
      const ru = uiL10n[key].ru

      const l7dString = new L7dString({ en: en, ru: ru, ru_of: ru })
      l7dStrings.push([key, l7dString])
    }

    const typeLessClasses = (classSpells as Record<string, any>)
    for (const key in classSpells) {
      const en = typeLessClasses[key].title.en
      const ru = typeLessClasses[key].title.ru

      const l7dString = new L7dString({ en: en, ru: ru, ru_of: ru })
      l7dStrings.push([key.toLowerCase(), l7dString])
    }

    const typeLessSources = (sourceList as Record<string, any>)
    for (const key in sourceList) {
      const en = typeLessSources[key].text.en.title
      const ru = typeLessSources[key].text.ru.title

      const l7dString = new L7dString({ en: en, ru: ru, ru_of: ru })
      l7dStrings.push([key.toLowerCase(), l7dString])
    }

    return new Map(l7dStrings)
  }
}

export const spellDb = new SpellDb()
