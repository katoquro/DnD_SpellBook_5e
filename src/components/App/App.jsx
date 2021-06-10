import { component } from 'vue-tsx-support'
import { allSpells, sourceList, classSpells, oDict, oLanguages, oLevelsText, oSort, oView, schoolList } from '../../data/SpellDb'
import FilterBar from '@app/components/FilterBar'
import SpellLayout from '@app/layouts/SpellLayout/SpellLayout'
import Modal from '@app/components/Modal'

import saveAs from 'file-saver'
import { GLOBAL_LISTENER } from '@app/GlobalListener'
import { AppStyled } from './styled'
import AppInfoModalContent from '@app/components/AppInfoModalContent'

function randd (min, max) {
  return Math.floor(arguments.length > 1 ? (max - min + 1) * Math.random() + min : (min + 1) * Math.random())
}

function isDebug () {
  return window.location.href.toLowerCase().indexOf('debug=true') > -1
}

function isIos () {
  if (window.location.href.toLowerCase().indexOf('ios=true') > -1) {
    return true
  }

  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    return true
  }

  const iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ]

  if (navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) {
        return true
      }
    }
  }

  return false
}

export const Store = {
  state: {
    aSources: sourceList,
    aSchools: schoolList,
    aCastingTime: {
      '1 action': {
        checked: false,
        visible: true,
        text: {
          en: { title: '1 action' },
          ru: { title: '1 действие' }
        }
      },
      '1 minute': {
        checked: false,
        visible: true,
        text: {
          en: { title: '1 minute' },
          ru: { title: '1 минута' }
        }
      },
      '1 bonus action': {
        checked: false,
        visible: true,
        text: {
          en: { title: '1 bonus action' },
          ru: { title: '1 бонусное действие' }
        }
      },
      '1 reaction': {
        checked: false,
        visible: true,
        text: {
          en: { title: '1 reaction' },
          ru: { title: '1 реакция' }
        }
      },
      '1 hour': {
        checked: false,
        visible: true,
        text: {
          en: { title: '1 hour' },
          ru: { title: '1 час' }
        }
      },
      '10 minutes': {
        checked: false,
        visible: true,
        text: {
          en: { title: '10 minutes' },
          ru: { title: '10 минут' }
        }
      },
      '12 hours': {
        checked: false,
        visible: true,
        text: {
          en: { title: '12 hours' },
          ru: { title: '12 hours' }
        }
      },
      '1 action or 8 hours': {
        checked: false,
        visible: true,
        text: {
          en: { title: '1 action or 8 hours' },
          ru: { title: '1 действие или 8 часов' }
        }
      },
      '8 hours': {
        checked: false,
        visible: true,
        text: {
          en: { title: '8 hours' },
          ru: { title: '8 часов' }
        }
      },
      '24 hours': {
        checked: false,
        visible: true,
        text: {
          en: { title: '24 hours' },
          ru: { title: '24 часа' }
        }
      },
      '1 reaction, which you take when a humanoid you can see within 60 feet of you dies': {
        checked: false,
        visible: true,
        text: {
          en: { title: '1 reaction, which you take when a humanoid you can see within 60 feet of you dies' },
          ru: { title: '1 реакция' }
        }
      }
    },
    aLanguages: oLanguages,
    aViews: oView,
    aSort: oSort,
    aItems: allSpells,
    oClassSpells: classSpells,
    sLang: 'ru', // reused in new components
    sView: 'card', // reused in new components
    sSort: 'levelAlpha',
    sClass: '', // reused in new components
    sSubClass: '',
    sSubSubClass: '',
    sSearch: '',
    aLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    sLevelStartSelected: '0',
    sLevelEndSelected: '9',
    nLevelStart: 0,
    nLevelEnd: 9,

    aHiddenItems: [],
    aLockedItems: [],
    aSelectedItems: [],
    aSelectedLockedItems: [],

    oConfig: {},
    bSchoolsOpend: false,
    bSourcesOpend: false,
    bCastingTimeOpend: false,
    bAppIsReady: false,
    bRitualOnly: false,
    bAllClassSpells: false,
    bEditMode: false, // reused in new components

    bModalWinShow: false,

    bDebug: false,

    bIos: false,

    // new components State bellow
    spellCardWidth: 250,
  },

  hideCard (id) {
    if (this.state.aSelectedItems.length > 0) {
      this.state.aSelectedItems.forEach((sId) => {
        if (this.state.aSelectedItems.indexOf(sId) > -1) {
          this.state.aHiddenItems.push(sId)
        }
      })
      this.selectAll(false)
    } else {
      if (this.state.aHiddenItems.indexOf(id) < 0) {
        this.state.aHiddenItems.push(id)
      }
    }
  },

  lockCard (id) {
    if (this.state.aSelectedItems.length > 0) {
      this.state.aSelectedItems.forEach((sId) => {
        if (this.state.aSelectedItems.indexOf(sId) > -1) {
          this.state.aLockedItems.push(sId)
        }
      })
      this.selectAll(false)
    } else {
      if (this.state.aLockedItems.indexOf(id) < 0) {
        this.state.aLockedItems.push(id)
      }
    }
    this.setConfig('locked', this.state.aLockedItems)
  },

  unlockCard (id) {
    if (this.state.aSelectedLockedItems.length > 0) {
      this.state.aSelectedLockedItems.forEach((sId) => {
        const nInd = this.state.aLockedItems.indexOf(sId)
        if (nInd > -1) {
          this.state.aLockedItems.splice(nInd, 1)
        }
      })
    } else {
      const nInd = this.state.aLockedItems.indexOf(id)
      if (nInd > -1) {
        this.state.aLockedItems.splice(nInd, 1)
      }
    }
    this.setConfig('locked', this.state.aLockedItems)
  },

  // new components methods above
  collectCastingTime () {
    const oTmp = {}
    this.state.aItems.forEach(el => {
      oTmp[el.en.castingTime] = el.ru.castingTime
    })

    for (const key in oTmp) {
      this.state.aCastingTime[key] = {
        checked: false,
        visible: true,
        text: {
          en: {
            title: key
          },
          ru: {
            title: oTmp[key]
          }
        }
      }
    }
  },
  onClassChange (sKey) {
    this.showAllItems()

    this.state.sClass = sKey
    this.setConfig('class', sKey)
    this.onSubClassChange('')
    this.updateHash()
  },
  onSubClassChange (sKey) {
    this.showAllItems()

    this.state.sSubClass = sKey
    this.setConfig('subclass', sKey)
    this.onSubSubClassChange('')

    this.updateHash()
  },
  onSubSubClassChange (sKey) {
    this.showAllItems()

    this.state.sSubSubClass = sKey
    this.setConfig('subsubclass', sKey)

    this.updateHash()
  },
  onLevelStartChange (sKey) {
    this.showAllItems()

    this.state.sLevelStartSelected = String(this.state.nLevelStart = sKey)
    this.setConfig('ls', sKey)

    this.updateHash()
  },
  onLevelEndChange (sKey) {
    this.showAllItems()

    this.state.sLevelEndSelected = String(this.state.nLevelEnd = sKey)
    this.setConfig('le', sKey)

    this.updateHash()
  },
  onSourceChange (sKey) {
    this.showAllItems()

    this.state.aSources[sKey].checked = !this.state.aSources[sKey].checked
    this.updateHash()
  },
  onCastingTimeChange (sKey) {
    this.showAllItems()

    this.state.aCastingTime[sKey].checked = !this.state.aCastingTime[sKey].checked
    // this.$recompute('aCastingTimeSelected');
    // this.$forceUpdate();
    this.updateHash()
  },
  onSchoolChange (sKey) {
    this.showAllItems()

    this.state.aSchools[sKey].checked = !this.state.aSchools[sKey].checked
    this.updateHash()
  },
  onLanguageChange (sKey) {
    this.showAllItems()

    this.state.sLang = sKey
    this.setConfig('lang', sKey)

    this.updateHash()
  },
  onViewChange (sKey) {
    this.showAllItems()

    this.state.sView = sKey
    this.setConfig('view', sKey)

    this.updateHash()
  },
  onSortChange (sKey) {
    this.showAllItems()

    this.state.sSort = sKey
    this.updateHash()
    this.setConfig('sort', sKey)
  },

  onSearchName (sValue) {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
    }

    this.state.timeout = setTimeout(() => {
      if (this.state.bDebug) {
        alert('Введенное значение: \r\n' + sValue)
      }
      this.showAllItems()

      this.state.sSearch = sValue.trim()
      this.updateHash()
    }, 500)
  },

  getRandomItem () {
    this.showAllItems()

    this.state.sSearch = ''
    this.state.sSearch = this.aItemsList()[randd(0, this.aItemsList().length - 1)].name
    this.updateHash()
  },
  onAllClassSpellsPress () {
    this.showAllItems()

    this.state.bAllClassSpells = !this.state.bAllClassSpells
    this.updateHash()
  },
  onRitualsPress () {
    this.showAllItems()

    this.state.bRitualOnly = !this.state.bRitualOnly
    this.updateHash()
  },

  autosizeAllText (component) {
    const aCards = component.$root.$refs.App.$refs.CenterContent.$data.cache.map((it) => it.componentInstance)
    const oTimer = setInterval(function () {
      if (aCards.length > 0) {
        for (let i = 0; i < aCards.length; i++) {
          const bResult = aCards[i].autosizeText()
          if (!bResult) {
            aCards.splice(i, 1)
          }
        }
      } else {
        clearInterval(oTimer)
      }
    }, 1)
  },

  onSchoolsToggled (bStat) {
    this.setConfig('schoolsOpend', bStat)
  },
  onSourcesToggled (bStat) {
    this.setConfig('sourcesOpend', bStat)
  },
  onCastingTimeToggled (bStat) {
    this.setConfig('castingTimeOpend', bStat)
  },

  unhideCard (sId) {
    const nInd = this.state.aHiddenItems.indexOf(sId)
    if (nInd > -1) {
      this.state.aHiddenItems.splice(nInd, 1)
    }
  },
  unlockAll () {
    this.state.aLockedItems = []
    this.setConfig('locked', this.state.aLockedItems)
  },
  unhideAll () {
    this.state.aHiddenItems = []
  },

  selectCard (oCard) {
    const id = oCard.id
    const nInd = this.state.aSelectedItems.indexOf(id)
    if (nInd > -1) {
      this.state.aSelectedItems.splice(nInd, 1)
    } else {
      this.state.aSelectedItems.push(id)
    }
  },
  selectLockedCard (oCard) {
    const id = oCard.id
    const nInd = this.state.aSelectedLockedItems.indexOf(id)
    if (nInd > -1) {
      this.state.aSelectedLockedItems.splice(nInd, 1)
    } else {
      this.state.aSelectedLockedItems.push(id)
    }
  },
  selectAll: function (bStat) {
    if (this.state.aSelectedItems.length > 0 || false === bStat) {
      this.state.aSelectedItems = []
      this.state.aSelectedLockedItems = []
    } else {
      this.state.aSelectedItems = this.aItemsList().map(item => item.id)
    }
  },

  makeCardWidthLess (component) {
    let aCards = component.$root.$refs.App.$refs.CenterContent.$data.cache.map((it) => it.componentInstance)

    if (this.state.aSelectedLockedItems.length > 0 || this.state.aSelectedItems.length > 0) {
      aCards = aCards.filter(el => this.state.aSelectedLockedItems.indexOf(el.id) > -1 || this.state.aSelectedItems.indexOf(el.id) > -1)
    }
    aCards.forEach(function (oCard) {
      oCard.onCardWidthMin()
    })
  },
  makeCardWidthMore (component) {
    let aCards = component.$root.$refs.App.$refs.CenterContent.$data.cache.map((it) => it.componentInstance)

    if (this.state.aSelectedLockedItems.length > 0 || this.state.aSelectedItems.length > 0) {
      aCards = aCards.filter(el => this.state.aSelectedLockedItems.indexOf(el.id) > -1 || this.state.aSelectedItems.indexOf(el.id) > -1)
    }
    aCards.forEach(function (oCard) {
      oCard.onCardWidthMax()
    })
  },
  makeCardWidthNorm (component) {
    let aCards = component.$root.$refs.App.$refs.CenterContent.$data.cache.map((it) => it.componentInstance)

    if (this.state.aSelectedLockedItems.length > 0 || this.state.aSelectedItems.length > 0) {
      aCards = aCards.filter(el => this.state.aSelectedLockedItems.indexOf(el.id) > -1 || this.state.aSelectedItems.indexOf(el.id) > -1)
    }
    aCards.forEach(function (oCard) {
      oCard.setCardWidth(240)
    })
  },

  updateHash () {
    const aHash = []
    if (this.state.sSearch.length > 0) {
      aHash.push('q=' + this.state.sSearch.trim())
    }

    if (this.aSrcSelected().length !== this.aSrcList().length) {
      aHash.push('src=' + this.aSrcSelected().join(','))
    }
    if (this.aSchoolSelected().length !== this.aSchoolList().length) {
      aHash.push('school=' + this.aSchoolSelected().join(','))
    }
    if (this.aCastingTimeSelected().length !== this.state.aCastingTime.length && this.aCastingTimeSelected().length) {
      aHash.push('castTime=' + this.aCastingTimeSelected().join(','))
    }
    if (this.state.sLang !== 'ru') {
      aHash.push('lang=' + this.state.sLang)
    }
    if (this.state.sClass !== '') {
      aHash.push('class=' + this.state.sClass)
    }
    if (this.state.nLevelStart > 0) {
      aHash.push('ls=' + this.state.nLevelStart)
    }
    if (this.state.nLevelEnd < 9) {
      aHash.push('le=' + this.state.nLevelEnd)
    }
    if (this.state.sView !== 'card') {
      aHash.push('view=' + this.state.sView)
    }
    if (this.state.sSort !== 'levelAlpha') {
      aHash.push('sort=' + this.state.sSort)
    }

    if (this.state.bRitualOnly) {
      aHash.push('ritual=1')
    }
    if (this.state.bAllClassSpells) {
      aHash.push('fullclass=1')
    }

    if (aHash.length > 0) {
      window.location.hash = aHash.join('&').replace(/\s+/g, '_')
    } else {
      this.removeHash()
    }
  },
  removeHash () {
    history.pushState('', document.title, window.location.pathname + window.location.search)
    return false
  },
  getHash () {
    let sHash = window.location.hash.slice(1) // /archive#q=Item_name
    sHash = decodeURIComponent(sHash).replace(/_/g, ' ')
    const oHash = {}
    sHash.split('&').forEach(function (sPair) {
      const aPair = sPair.split('=')
      if (aPair[1]) {
        oHash[aPair[0]] = aPair[1].split(',')
      }
    })

    if (oHash.src) {
      for (const key in this.state.aSources) {
        if (oHash.src.indexOf(key) > -1) {
          this.state.aSources[key].checked = true
        } else {
          this.state.aSources[key].checked = false
        }
      }
    }
    if (oHash.school) {
      for (const key in this.state.aSchools) {
        if (oHash.school.indexOf(key) > -1) {
          this.state.aSchools[key].checked = true
        } else {
          this.state.aSchools[key].checked = false
        }
      }
    }
    if (oHash.castTime) {
      for (const key in this.state.aCastingTime) {
        if (oHash.castTime.indexOf(key) > -1) {
          this.state.aCastingTime[key].checked = true
        } else {
          this.state.aCastingTime[key].checked = false
        }
      }
    }
    if (oHash.lang) {
      this.state.sLang = oHash.lang[0]
    }
    if (oHash.class) {
      this.state.sClass = oHash.class[0]
    }
    if (oHash.le) {
      this.state.nLevelEnd = oHash.le[0]
    }
    if (oHash.ls) {
      this.state.nLevelStart = oHash.ls[0]
    }
    if (oHash.view) {
      this.state.sView = oHash.view[0]
    }
    if (oHash.sort) {
      this.state.sSort = oHash.sort[0]
    }
    if (oHash.q) {
      this.state.sSearch = oHash.q[0]
    }
    if (oHash.ritual) {
      this.state.bRitualOnly = true
    }
    if (oHash.fullclass) {
      this.state.bAllClassSpells = true
    }
  },

  showInfo () {
    this.state.bModalWinShow = true
  },
  closeModWin () {
    this.state.bModalWinShow = false
  },
  print () {
    window.print()
    return false
  },

  showAllItems () {
    this.closeModWin()
  },

  setConfig (prop, val) {
    if (prop && val !== undefined && this.state.oConfig) {
      this.state.oConfig[prop] = val
      localStorage.setItem('feat_config', JSON.stringify(this.state.oConfig))
    }
  },
  getConfig (prop) {
    this.state.oConfig = JSON.parse(localStorage.getItem('feat_config')) || {}
    if (prop !== undefined) {
      return localStorage.getItem('feat_config') ? this.state.oConfig[prop] : null
    }
    return ''
  },

  loadConfigData () {
    const sTmpLang = this.getConfig('lang')
    if (sTmpLang) {
      this.state.sLang = sTmpLang
    }

    const sTmpSort = this.getConfig('sort')
    if (sTmpSort) {
      this.state.sSort = sTmpSort
    }

    const aTmpLocked = this.getConfig('locked')
    if (aTmpLocked) {
      this.state.aLockedItems = aTmpLocked
    }

    const bTmpSchoolsOpend = this.getConfig('schoolsOpend')
    if (bTmpSchoolsOpend !== undefined) {
      this.state.bSchoolsOpend = bTmpSchoolsOpend
    }

    const bTMPSourcesOpend = this.getConfig('sourcesOpend')
    if (bTMPSourcesOpend !== undefined) {
      this.state.bSourcesOpend = bTMPSourcesOpend
    }
  },

  downloadDB () {
    const oDB = {}
    oDB.sourceList = this.state.aSources
    oDB.schoolList = this.state.aSchools
    oDB.oLanguages = this.state.aLanguages
    oDB.allSpells = this.state.aItems
    oDB.lockedItems = this.state.aLockedItems

    const sData = JSON.stringify(oDB, null, 2)
    const filename = 'DnD5e_spells_BD'
    const blob = new Blob([sData], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, filename + '.dtn')
  },
  uploadDB () {
    document.getElementById('fileUploader').click()
  },
  fileSelected (oEvent) {
    this.handleLocalBDSelect(oEvent)
  },

  handleLocalBDSelect (evt) {
    const files = evt.target.files // FileList object

    const reader = new FileReader()
    reader.onload = (function (theFile) {
      return function (e) {
        const sText = e.target.result
        this.parseLocalFile(sText)
      }.bind(this)
    }.bind(this))(files[0])

    // Read in the image file as a data URL.
    reader.readAsText(files[0])
  },
  _completeDB (oMainDB, oFileDB) {
    for (const key in oFileDB) {
      oMainDB[key] = oFileDB[key]
    }
  },
  parseLocalFile (sText) {
    try {
      const oDB = JSON.parse(sText)

      this._completeDB(this.state.aSources, oDB.sourceList)
      this._completeDB(this.state.aSchools, oDB.schoolList)
      this._completeDB(this.state.aLanguages, oDB.oLanguages)
      this._completeDB(this.state.aLockedItems, oDB.lockedItems)
      // this._completeDB(this.state.aItems = oDB.allSpells);

      this.state.aItems = oDB.allSpells

      document.getElementById('fileUploader').value = ''
      alert('Вроде как загружено')
    } catch (err) {
      document.getElementById('fileUploader').value = ''
      alert('Ошибка в структуре файла файла. Воспользуйтесь валидатором JSON.\n\n' + err)
    }
  },

  onEditModePress () {
    this.state.bEditMode = !this.state.bEditMode
  },
  cancelCard (oData) {
    const sId = oData.id
    const oItem = this.state.aItems.find(el => el.en.name.toLowerCase().replace(/\s+/, '') === sId.toLowerCase()
      .replace(/\s+/, ''))
    if (oItem) {
      const sText = oItem[this.state.sLang].text + '  '

      oItem[this.state.sLang].text = sText
    }

    return false
  },
  saveCard (oData) {
    const sId = oData.id
    const sText = oData.text

    const oItem = this.state.aItems.find(el => el.en.name.toLowerCase().replace(/\s+/, '') === sId.toLowerCase()
      .replace(/\s+/, ''))
    if (oItem) {
      oItem[this.state.sLang].text = sText
    }

    return false
  },

  sOtherLang () {
    return ('ru' === this.state.sLang) ? 'en' : 'ru'
  },
  aSrcList () {
    const a = []
    for (const key in this.state.aSources) {
      if (this.state.aSources[key].visible !== false) {
        a.push({
          key: key,
          title: this.state.aSources[key].text.en.title + '<br>' + this.state.aSources[key].text.ru.title,
          subtitle: true === this.state.aSources[key].official ? '' : 'Homebrew /Самопал',
          official: this.state.aSources[key].official,
          checked: this.state.aSources[key].checked
        })
      }
    }
    return a.sort((a, b) => a.official ? -1 : 1)
  },
  aCastingTimeList () {
    const a = []
    for (const key in this.state.aCastingTime) {
      if (this.state.aCastingTime[key].visible !== false) {
        a.push({
          key: key,
          title: this.state.aCastingTime[key].text.en.title + '<br>' + this.state.aCastingTime[key].text.ru.title,
          checked: this.state.aCastingTime[key].checked
        })
      }
    }
    return a
  },

  aSrcSelected () {
    const aFiltered = this.aSrcList().filter(item => item.checked)
    return (aFiltered.length > 0) ? aFiltered.map(item => item.key) : this.aSrcList().map(item => item.key)
  },

  aSchoolList () {
    const a = []
    let i = 0
    for (const key in this.state.aSchools) {
      if (this.state.aSchools[key].visible !== false) {
        this.state.aSchools[key].i = i++
        a.push({
          key: key,
          title: this.state.aSchools[key].text.en.title + '<br>' + this.state.aSchools[key].text.ru.title,
          checked: this.state.aSchools[key].checked
        })
      }
    }
    return a
  },

  aSchoolSelected () {
    const aFiltered = this.aSchoolList().filter(item => item.checked)
    return (aFiltered.length > 0) ? aFiltered.map(item => item.key.toLowerCase()) : this.aSchoolList().map(item => item.key.toLowerCase())
  },

  aCastingTimeSelected () {
    const aFiltered = this.aCastingTimeList().filter(item => item.checked)
    return (aFiltered.length > 0) ? aFiltered.map(item => item.key.toLowerCase()) : []
  },

  aLanguageList () {
    const a = []
    for (const key in this.state.aLanguages) {
      if (this.state.aLanguages[key].visible !== false) {
        a.push({
          key: key,
          title: this.state.aLanguages[key].text[this.state.sLang].title
        })
      }
    }
    return a
  },

  sLangSelected () {
    return this.state.aLanguages[this.state.sLang].text[this.state.sLang].title
  },

  aViewList () {
    const a = []
    for (const key in this.state.aViews) {
      if (this.state.aViews[key].visible !== false) {
        a.push({
          key: key,
          title: this.state.aViews[key].text[this.state.sLang].title
        })
      }
    }
    return a
  },

  sViewSelected () {
    return this.state.aViews[this.state.sView].text[this.state.sLang].title
  },
  /**/
  aSortList () {
    const a = []
    for (const key in this.state.aSort) {
      if (this.state.aSort[key].visible !== false) {
        a.push({
          key: key,
          title: this.state.aSort[key].text[this.state.sLang].title
        })
      }
    }
    return a
  },

  sSortSelected () {
    if (!(this.state.aSort[this.state.sSort])) {
      this.state.sSort = Object.keys(this.state.aSort)[0]
    }
    return this.state.aSort[this.state.sSort].text[this.state.sLang].title
  },
  /**/

  aClassList () {
    const aSclasses = [{
      key: '',
      title: '[ВСЕ]'
    }]
    for (const key in this.state.oClassSpells) {
      const sTitle = (this.state.oClassSpells[key].title.en.text || this.state.oClassSpells[key].title.en) + '<br>' + (this.state.oClassSpells[key].title.ru.text || this.state.oClassSpells[key].title.ru)
      aSclasses.push({
        key: key,
        title: sTitle
      })
    }

    return aSclasses
  },
  aSubClassList () {
    const aSclasses = [{
      key: '',
      title: '[ПОДКЛАСС]'
    }]
    if (this.state.sClass && this.state.oClassSpells[this.state.sClass].subclasses) {
      for (const key in this.state.oClassSpells[this.state.sClass].subclasses) {
        let sTitle = ''
        if (this.state.oClassSpells[this.state.sClass].subclasses[key].title.en.text) {
          sTitle += this.state.oClassSpells[this.state.sClass].subclasses[key].title.en.text
        } else {
          sTitle += this.state.oClassSpells[this.state.sClass].subclasses[key].title.en
        }
        if (this.state.oClassSpells[this.state.sClass].subclasses[key].title.en.source) {
          sTitle += ' (' + this.state.oClassSpells[this.state.sClass].subclasses[key].title.en.source + ')'
        }
        sTitle += '<br>'

        if (this.state.oClassSpells[this.state.sClass].subclasses[key].title.ru.text) {
          sTitle += this.state.oClassSpells[this.state.sClass].subclasses[key].title.ru.text
        } else {
          sTitle += this.state.oClassSpells[this.state.sClass].subclasses[key].title.ru
        }

        aSclasses.push({
          key: key,
          title: sTitle// this.state.oClassSpells[this.state.sClass].subclasses[key].title.en + "<br>" + this.state.oClassSpells[this.state.sClass].subclasses[key].title.ru
        })
      }
    }

    return aSclasses
  },

  aSubSubClassList () {
    const aSclasses = [{
      key: '',
      title: '[ПОДПОДКЛАСС]'
    }]
    if (this.state.sClass && this.state.oClassSpells[this.state.sClass].subclasses && this.state.sSubClass && this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses) {
      for (const key in this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses) {
        const sTitle = (this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses[key].title.en.text || this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses[key].title.en) + '<br>' + (this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses[key].title.ru.text || this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses[key].title.ru)

        aSclasses.push({
          key: key,
          title: sTitle// this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses[key].title.en + "<br>" + this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses[key].title.ru
        })
      }
    }

    return aSclasses
  },

  sClassSelected () {
    return this.state.sClass ? this.state.oClassSpells[this.state.sClass].title[this.state.sLang] : '[ВСЕ]'
  },
  sSubClassSelected () {
    return this.state.sSubClass ? this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].title[this.state.sLang] : '[ПОДКЛАСС]'
  },
  sSubSubClassSelected () {
    return (this.state.sSubClass && this.state.sSubSubClass) ? this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses[this.state.sSubSubClass].title[this.state.sLang] : '[ПОДПОДКЛАСС]'
  },

  aLevelList () {
    return this.state.aLevels.map(item => ({
      key: item,
      title: item
    }))
  },

  sNameInput () {
    return this.state.sSearch.toLowerCase()
  },

  sClassTitle () {
    return this.state.sClass ? this.state.oClassSpells[this.state.sClass].title[this.state.sLang] : ''
  },

  aClassSpells () {
    let aSpells = []
    if (this.state.sClass !== '') {
      if (this.state.bAllClassSpells) {
        aSpells = aSpells.concat(this.state.oClassSpells[this.state.sClass].spells)

        for (const subclass in this.state.oClassSpells[this.state.sClass].subclasses) {
          if (this.state.oClassSpells[this.state.sClass].subclasses[subclass].spells) {
            aSpells = aSpells.concat(this.state.oClassSpells[this.state.sClass].subclasses[subclass].spells)
          }

          for (const subsubclass in this.state.oClassSpells[this.state.sClass].subclasses[subclass].subclasses) {
            if (this.state.oClassSpells[this.state.sClass].subclasses[subclass].subclasses[subsubclass].spells) {
              aSpells = aSpells.concat(this.state.oClassSpells[this.state.sClass].subclasses[subclass].subclasses[subsubclass].spells)
            }
          }
        }
      } else {
        // aClassSpellList = this.state.oClassSpells.sClass
        aSpells = aSpells.concat(this.state.oClassSpells[this.state.sClass].spells)
        if (this.state.oClassSpells[this.state.sClass].subclasses && this.state.sSubClass && this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass]) {
          if (this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].spells) {
            aSpells = aSpells.concat(this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].spells)
          }
          if (this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses && this.state.sSubSubClass && this.state.oClassSpells[this.state.sClass].subclasses[this.state.sSubClass].subclasses[this.state.sSubSubClass]) {
            aSpells = aSpells.concat(this.state.oClassSpeflls[this.state.sClass].subclasses[this.state.sSubClass].subclasses[this.state.sSubSubClass].spells)
          }
        }
      }
      aSpells = this.state.aItems.filter(el => (aSpells.map(el => el.toLowerCase().replace(/\s+/g, ''))
        .indexOf(el.en.name.toLowerCase().replace(/\s+/g, '')) > -1))
    } else {
      aSpells = this.state.aItems
    }

    return aSpells
  },

  aItemsList () {
    const aFiltered = this.aClassSpells().filter((oItem) => {
      return (
        this.aSrcSelected().filter(value => oItem.en.source.split(',').map(item => item.trim())
          .indexOf(value) !== -1).length &&
          // this.aSrcSelected.indexOf(oItem.en.source)>-1 && // old filter for sources
          this.aSchoolSelected().indexOf(oItem.en.school.toLowerCase().trim()) > -1 /**/ &&
          (
            0 === this.aCastingTimeSelected().length ||
              this.aCastingTimeSelected().indexOf(oItem.en.castingTime.toLowerCase().trim()) > -1
          ) &&
          (
            oItem.en.name.toLowerCase().indexOf(this.sNameInput()) > -1 ||
              oItem.ru.name.toLowerCase().indexOf(this.sNameInput()) > -1 ||
              (oItem.ru.nic && oItem.ru.nic.toLowerCase().indexOf(this.sNameInput()) > -1)
          ) &&
          ((this.state.bRitualOnly && oItem.en.ritual) || !this.state.bRitualOnly) &&
          this.state.aHiddenItems.indexOf(oItem.en.name) < 0/**/ &&
          this.state.nLevelStart <= this.state.nLevelEnd &&
          this.state.nLevelStart <= Number(oItem.en.level) &&
          this.state.nLevelEnd >= Number(oItem.en.level)
      )
    })

    return aFiltered.map(function (oItem) {
      try {
        const sSrc = oItem.en.source.split(',')
          .map(item => this.state.aSources[item.trim()].text[this.state.sLang].title)
          .join(', ')
        const o = {
          id: oItem.en.name,
          name: oItem[this.state.sLang].name || oItem.en.name,
          tooltip: oItem[this.sOtherLang()].name || oItem.en.name,
          text: oItem[this.state.sLang].text || oItem.en.text,
          src: oItem[this.state.sLang].source || oItem.en.source,
          className: this.sClassTitle(),
          source: sSrc,
          school: this.state.aSchools[oItem.en.school.trim()].text[this.state.sLang].title,
          level: oLevelsText[oItem.en.level] ? oLevelsText[oItem.en.level].text[this.state.sLang].title : oItem.en.level + ' ' + oLevelsText.units[this.state.sLang].title,
          castingTime: oItem[this.state.sLang].castingTime || oItem.en.castingTime,
          range: oItem[this.state.sLang].range || oItem.en.range,
          components: oItem[this.state.sLang].components || oItem.en.components,
          materials: oItem[this.state.sLang].materials || oItem.en.materials,
          duration: oItem[this.state.sLang].duration || oItem.en.duration,
          ritual: oItem.en.ritual ? oDict.ritual[this.state.sLang].title : '',

          castingTimeTitle: oDict.castingTime[this.state.sLang].title,
          durationTitle: oDict.duration[this.state.sLang].title,
          rangeTitle: oDict.range[this.state.sLang].title,
          componentsTitle: oDict.components[this.state.sLang].title,

          levelNum: oItem.en.level,
          color: this.state.sClass,
          view: this.state.sView,
          locked: this.state.aLockedItems.indexOf(oItem.en.name) > -1,
          selected: this.state.aSelectedItems.indexOf(oItem.en.name) > -1,

          editable: this.state.bEditMode
        }
        if (oItem[this.state.sLang].pre || oItem.en.pre) {
          o.pre = oItem[this.state.sLang].pre || oItem.en.pre
        }
        return o
      } catch (err) {
        console.log(err)
      }
    }.bind(this)).sort(function (a, b) {
      if ('alpha' === this.state.sSort) {
        if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim()) {
          return -1
        }
        if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim()) {
          return 1
        }
        return 0
      } else {
        if (a.levelNum + a.name.toLowerCase().trim() < b.levelNum + b.name.toLowerCase().trim()) {
          return -1
        }
        if (a.levelNum + a.name.toLowerCase().trim() > b.levelNum + b.name.toLowerCase().trim()) {
          return 1
        }
        return 0
      }
    }.bind(this))
  },

  aLockedItemsList () {
    const aFiltered = this.state.aItems.filter(function (oItem) {
      return this.state.aLockedItems.indexOf(oItem.en.name) > -1
    }.bind(this))
    return aFiltered.map(function (oItem) {
      const sSrc = oItem.en.source.split(',').map(item => this.state.aSources[item.trim()].text[this.state.sLang].title)
        .join(', ')
      const o = {
        id: oItem.en.name,
        name: oItem[this.state.sLang].name || oItem.en.name,
        tooltip: oItem[this.sOtherLang()].name || oItem.en.name,
        text: oItem[this.state.sLang].text || oItem.en.text,
        src: oItem[this.state.sLang].source || oItem.en.source,
        className: this.sClassTitle(),
        source: sSrc /* this.state.aSources[oItem.en.source].text[this.state.sLang].title */,
        school: this.state.aSchools[oItem.en.school.trim()].text[this.state.sLang].title,
        level: oLevelsText[oItem.en.level] ? oLevelsText[oItem.en.level].text[this.state.sLang].title : oItem.en.level + ' ' + oLevelsText.units[this.state.sLang].title,
        castingTime: oItem[this.state.sLang].castingTime || oItem.en.castingTime,
        range: oItem[this.state.sLang].range || oItem.en.range,
        components: oItem[this.state.sLang].components || oItem.en.components,
        materials: oItem[this.state.sLang].materials || oItem.en.materials,
        duration: oItem[this.state.sLang].duration || oItem.en.duration,
        ritual: oItem.en.ritual ? oDict.ritual[this.state.sLang].title : '',

        castingTimeTitle: oDict.castingTime[this.state.sLang].title,
        durationTitle: oDict.duration[this.state.sLang].title,
        rangeTitle: oDict.range[this.state.sLang].title,
        componentsTitle: oDict.components[this.state.sLang].title,

        levelNum: oItem.en.level,
        color: this.state.sClass,
        view: this.state.sView,
        locked: this.state.aLockedItems.indexOf(oItem.en.name) > -1,
        selected: this.state.aSelectedLockedItems.indexOf(oItem.en.name) > -1
      }
      if (oItem[this.state.sLang].pre || oItem.en.pre) {
        o.pre = oItem[this.state.sLang].pre || oItem.en.pre
      }
      return o
    }.bind(this)).sort(function (a, b) {
      if ('alpha' === this.state.sSort) {
        if (a.name.toLowerCase().trim() < b.name.toLowerCase().trim()) {
          return -1
        }
        if (a.name.toLowerCase().trim() > b.name.toLowerCase().trim()) {
          return 1
        }
        return 0
      } else {
        if (a.levelNum + a.name.toLowerCase().trim() < b.levelNum + b.name.toLowerCase().trim()) {
          return -1
        }
        if (a.levelNum + a.name.toLowerCase().trim() > b.levelNum + b.name.toLowerCase().trim()) {
          return 1
        }
        return 0
      }
    }.bind(this))
  },

  aHiddenItemsList () {
    const aFiltered = this.state.aItems.filter(function (oItem) {
      return this.state.aHiddenItems.indexOf(oItem.en.name) > -1
    }.bind(this))
    return aFiltered.map(function (oItem) {
      const o = {
        id: oItem.en.name,
        title: oItem[this.state.sLang].name || oItem.en.name,
        tooltip: oItem[this.sOtherLang()].name || oItem.en.name
      }
      return o
    }.bind(this))
  }
}

export default component({
  name: 'App',

  mounted () {
    Store.loadConfigData()
    Store.collectCastingTime()

    Store.getHash()

    Store.updateHash()

    Store.state.bAppIsReady = true

    Store.state.bDebug = isDebug()
    Store.state.bIos = isIos()
  },
  render (h) {
    GLOBAL_LISTENER.CtrlA(Store.selectAll.bind(Store))

    return <AppStyled>
      <FilterBar />
      <SpellLayout ref="CenterContent" />
      <Modal
          closeFunc={Store.closeModWin.bind(Store)}
          show={Store.state.bModalWinShow}>
        <AppInfoModalContent/>
      </Modal>
    </AppStyled>
  }
})
