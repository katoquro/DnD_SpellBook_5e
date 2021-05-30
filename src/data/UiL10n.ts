export type UiLang = 'en'| 'ru'

export const uiL10n: Record<string, Record<UiLang, string>> = {
  reduce_text_size_btn: {
    en: 'Reduce text size',
    ru: 'Уменьшить размер текста'
  },
  increase_text_size_btn: {
    en: 'Increase text size',
    ru: 'Увеличить размер текста'
  },
  cancel: {
    en: 'Cancel',
    ru: 'Отменить'
  },
  save: {
    en: 'Save',
    ru: 'Сохранить'
  },
  cantrip: {
    en: 'Cantrip',
    ru: 'Фокус'
  },
  spell_level: {
    en: 'Level',
    ru: 'Круг'
  },
  data_source: {
    en: 'Source',
    ru: 'Источник'
  },
  spell__hide_btn: {
    en: 'Hide Spell (can be found at the bottom of filter panel)',
    ru: 'Спрятать Заклинание (спрятанные заклинания находятся внизу панели фильтров)'
  },
  spell__lock_btn: {
    en: 'Lock the Spell (this spell ignores filters)',
    ru: 'Закрепить заклинание (игнорирует фильтры)'
  },
  spell__unlock_btn: {
    en: 'Unlock the Spell',
    ru: 'Открепить заклинание'
  }
}
