import { component } from 'vue-tsx-support'
import { sourceList } from '../../data/sourceList'
import { oDict, oLanguages, oLevelsText, oSort, oView, schoolList } from '../../data/schoolList'
import { allSpells } from '../../data/allSpells'
import { classSpells } from '../../data/ClassSpells'
import FilterBar from '../FilterBar'
import CenterContent from '../CenterContent'
import Modal from '../Modal'

import saveAs from 'file-saver'
import { GLOBAL_LISTENER } from '../../GlobalListener'
import { AppStyled } from './styled'
import AppInfoModalContent from '../AppInfoModalContent'

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

export default component({
  data: function () {
    return {
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
      sLang: 'ru',
      sView: 'card',
      sSort: 'levelAlpha',
      sClass: '',
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
      sTextSizeDefault: '',
      sCardwidth: '',
      sCardWidthDefault: '2.5in',

      oConfig: {},
      bSchoolsOpend: false,
      bSourcesOpend: false,
      bCastingTimeOpend: false,
      bCardsAreVisible: false,
      bAppIsReady: false,
      bRitualOnly: false,
      bAllClassSpells: false,
      bEditMode: false,

      bModalWinShow: false,

      bDebug: false,

      bIos: false
    }
  },

  computed: {
    sOtherLang: function () {
      return (this.sLang === 'ru') ? 'en' : 'ru'
    },
    aSrcList: function () {
      const a = []
      for (const key in this.aSources) {
        if (this.aSources[key].visible !== false) {
          a.push({
            key: key,
            title: this.aSources[key].text.en.title + '<br>' + this.aSources[key].text.ru.title,
            subtitle: this.aSources[key].official === true ? '' : 'Homebrew /Самопал',
            official: this.aSources[key].official,
            checked: this.aSources[key].checked
          })
        }
      }
      return a.sort((a, b) => a.official ? -1 : 1)
    },
    aCastingTimeList: function () {
      // collect Casting Time
      // if(!this.aCastingTime){
      // if(Object.entries(this.aCastingTime).length === 0){
      // this.collectCastingTime();
      // }

      const a = []
      for (const key in this.aCastingTime) {
        if (this.aCastingTime[key].visible !== false) {
          a.push({
            key: key,
            title: this.aCastingTime[key].text.en.title + '<br>' + this.aCastingTime[key].text.ru.title,
            checked: this.aCastingTime[key].checked
          })
        }
      }
      return a
    },

    aSrcSelected: function () {
      const aFiltered = this.aSrcList.filter(item => item.checked)
      return (aFiltered.length > 0) ? aFiltered.map(item => item.key) : this.aSrcList.map(item => item.key)
    },

    aSchoolList () {
      const a = []
      let i = 0
      for (const key in this.aSchools) {
        if (this.aSchools[key].visible !== false) {
          this.aSchools[key].i = i++
          a.push({
            key: key,
            title: this.aSchools[key].text.en.title + '<br>' + this.aSchools[key].text.ru.title,
            checked: this.aSchools[key].checked
          })
        }
      }
      return a
    },

    aSchoolSelected: function () {
      const aFiltered = this.aSchoolList.filter(item => item.checked)
      return (aFiltered.length > 0) ? aFiltered.map(item => item.key.toLowerCase()) : this.aSchoolList.map(item => item.key.toLowerCase())
    },

    aCastingTimeSelected: function () {
      const aFiltered = this.aCastingTimeList.filter(item => item.checked)
      return (aFiltered.length > 0) ? aFiltered.map(item => item.key.toLowerCase()) : []/* this.aCastingTimeList.map(item => item.key.toLowerCase()); */
    },

    aLanguageList: function () {
      const a = []
      for (const key in this.aLanguages) {
        if (this.aLanguages[key].visible !== false) {
          a.push({
            key: key,
            title: this.aLanguages[key].text[this.sLang].title
          })
        }
      }
      return a
    },

    sLangSelected: function () {
      return this.aLanguages[this.sLang].text[this.sLang].title
    },

    aViewList: function () {
      const a = []
      for (const key in this.aViews) {
        if (this.aViews[key].visible !== false) {
          a.push({
            key: key,
            title: this.aViews[key].text[this.sLang].title
          })
        }
      }
      return a
    },

    sViewSelected: function () {
      return this.aViews[this.sView].text[this.sLang].title
    },
    /**/
    aSortList: function () {
      const a = []
      for (const key in this.aSort) {
        if (this.aSort[key].visible !== false) {
          a.push({
            key: key,
            title: this.aSort[key].text[this.sLang].title
          })
        }
      }
      return a
    },

    sSortSelected: function () {
      if (!(this.aSort[this.sSort])) {
        this.sSort = Object.keys(this.aSort)[0]
      }
      return this.aSort[this.sSort].text[this.sLang].title
    },
    /**/

    aClassList: function () {
      const aSclasses = [{
        key: '',
        title: '[ВСЕ]'
      }]
      for (const key in this.oClassSpells) {
        const sTitle = (this.oClassSpells[key].title.en.text || this.oClassSpells[key].title.en) + '<br>' + (this.oClassSpells[key].title.ru.text || this.oClassSpells[key].title.ru)
        aSclasses.push({
          key: key,
          title: sTitle
        })
      }

      return aSclasses
    },
    aSubClassList: function () {
      const aSclasses = [{
        key: '',
        title: '[ПОДКЛАСС]'
      }]
      if (this.sClass && this.oClassSpells[this.sClass].subclasses) {
        for (const key in this.oClassSpells[this.sClass].subclasses) {
          let sTitle = ''
          if (this.oClassSpells[this.sClass].subclasses[key].title.en.text) {
            sTitle += this.oClassSpells[this.sClass].subclasses[key].title.en.text
          } else {
            sTitle += this.oClassSpells[this.sClass].subclasses[key].title.en
          }
          if (this.oClassSpells[this.sClass].subclasses[key].title.en.source) {
            sTitle += ' (' + this.oClassSpells[this.sClass].subclasses[key].title.en.source + ')'
          }
          sTitle += '<br>'

          if (this.oClassSpells[this.sClass].subclasses[key].title.ru.text) {
            sTitle += this.oClassSpells[this.sClass].subclasses[key].title.ru.text
          } else {
            sTitle += this.oClassSpells[this.sClass].subclasses[key].title.ru
          }

          aSclasses.push({
            key: key,
            title: sTitle// this.oClassSpells[this.sClass].subclasses[key].title.en + "<br>" + this.oClassSpells[this.sClass].subclasses[key].title.ru
          })
        }
      }

      return aSclasses
    },

    aSubSubClassList: function () {
      const aSclasses = [{
        key: '',
        title: '[ПОДПОДКЛАСС]'
      }]
      if (this.sClass && this.oClassSpells[this.sClass].subclasses && this.sSubClass && this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses) {
        for (const key in this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses) {
          const sTitle = (this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses[key].title.en.text || this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses[key].title.en) + '<br>' + (this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses[key].title.ru.text || this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses[key].title.ru)

          aSclasses.push({
            key: key,
            title: sTitle// this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses[key].title.en + "<br>" + this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses[key].title.ru
          })
        }
      }

      return aSclasses
    },

    sClassSelected: function () {
      return this.sClass ? this.oClassSpells[this.sClass].title[this.sLang] : '[ВСЕ]'
    },
    sSubClassSelected: function () {
      return this.sSubClass ? this.oClassSpells[this.sClass].subclasses[this.sSubClass].title[this.sLang] : '[ПОДКЛАСС]'
    },
    sSubSubClassSelected: function () {
      return (this.sSubClass && this.sSubSubClass) ? this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses[this.sSubSubClass].title[this.sLang] : '[ПОДПОДКЛАСС]'
    },

    aLevelList: function () {
      return this.aLevels.map(item => ({
        key: item,
        title: item
      }))
    },

    sNameInput: function () {
      return this.sSearch.toLowerCase()
    },

    sClassTitle: function () {
      return this.sClass ? this.oClassSpells[this.sClass].title[this.sLang] : ''
    },

    aClassSpells: function () {
      let aSpells = []
      if (this.sClass !== '') {
        if (this.bAllClassSpells) {
          aSpells = aSpells.concat(this.oClassSpells[this.sClass].spells)

          for (const subclass in this.oClassSpells[this.sClass].subclasses) {
            if (this.oClassSpells[this.sClass].subclasses[subclass].spells) {
              aSpells = aSpells.concat(this.oClassSpells[this.sClass].subclasses[subclass].spells)
            }

            for (const subsubclass in this.oClassSpells[this.sClass].subclasses[subclass].subclasses) {
              if (this.oClassSpells[this.sClass].subclasses[subclass].subclasses[subsubclass].spells) {
                aSpells = aSpells.concat(this.oClassSpells[this.sClass].subclasses[subclass].subclasses[subsubclass].spells)
              }
            }
          }
        } else {
          // aClassSpellList = this.oClassSpells.sClass
          aSpells = aSpells.concat(this.oClassSpells[this.sClass].spells)
          if (this.oClassSpells[this.sClass].subclasses && this.sSubClass && this.oClassSpells[this.sClass].subclasses[this.sSubClass]) {
            if (this.oClassSpells[this.sClass].subclasses[this.sSubClass].spells) {
              aSpells = aSpells.concat(this.oClassSpells[this.sClass].subclasses[this.sSubClass].spells)
            }
            if (this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses && this.sSubSubClass && this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses[this.sSubSubClass]) {
              aSpells = aSpells.concat(this.oClassSpells[this.sClass].subclasses[this.sSubClass].subclasses[this.sSubSubClass].spells)
            }
          }
        }
        aSpells = this.aItems.filter(el => (aSpells.map(el => el.toLowerCase().replace(/\s+/g, ''))
          .indexOf(el.en.name.toLowerCase().replace(/\s+/g, '')) > -1))
      } else {
        aSpells = this.aItems
      }

      return aSpells
    },

    aItemsList: function () {
      const aFiltered = /* /this.aItems/**/ this.aClassSpells.filter(function (oItem) {
        return (
          this.aSrcSelected.filter(value => oItem.en.source.split(',').map(item => item.trim())
            .indexOf(value) !== -1).length &&
                    // this.aSrcSelected.indexOf(oItem.en.source)>-1 && // old filter for sources
                    this.aSchoolSelected.indexOf(oItem.en.school.toLowerCase().trim()) > -1 /**/ &&
                    (
                      this.aCastingTimeSelected.length === 0 ||
                        this.aCastingTimeSelected.indexOf(oItem.en.castingTime.toLowerCase().trim()) > -1
                    ) &&
                    (
                      oItem.en.name.toLowerCase().indexOf(this.sNameInput) > -1 ||
                        oItem.ru.name.toLowerCase().indexOf(this.sNameInput) > -1 ||
                        (oItem.ru.nic && oItem.ru.nic.toLowerCase().indexOf(this.sNameInput) > -1)
                    ) &&
                    ((this.bRitualOnly && oItem.en.ritual) || !this.bRitualOnly) &&
                    this.aHiddenItems.indexOf(oItem.en.name) < 0/**/ &&
                    this.nLevelStart <= this.nLevelEnd &&
                    this.nLevelStart <= Number(oItem.en.level) &&
                    this.nLevelEnd >= Number(oItem.en.level)
        )
      }.bind(this))

      return aFiltered.map(function (oItem) {
        try {
          const sSrc = oItem.en.source.split(',')
            .map(item => this.aSources[item.trim()].text[this.sLang].title)
            .join(', ')
          const o = {
            id: oItem.en.name,
            name: oItem[this.sLang].name || oItem.en.name,
            tooltip: oItem[this.sOtherLang].name || oItem.en.name,
            text: oItem[this.sLang].text || oItem.en.text,
            src: oItem[this.sLang].source || oItem.en.source,
            className: this.sClassTitle,
            source: sSrc /* this.aSources[oItem.en.source].text[this.sLang].title */,
            school: this.aSchools[oItem.en.school.trim()].text[this.sLang].title,
            level: oLevelsText[oItem.en.level] ? oLevelsText[oItem.en.level].text[this.sLang].title : oItem.en.level + ' ' + oLevelsText.units[this.sLang].title,
            castingTime: oItem[this.sLang].castingTime || oItem.en.castingTime,
            range: oItem[this.sLang].range || oItem.en.range,
            components: oItem[this.sLang].components || oItem.en.components,
            materials: oItem[this.sLang].materials || oItem.en.materials,
            duration: oItem[this.sLang].duration || oItem.en.duration,
            ritual: oItem.en.ritual ? oDict.ritual[this.sLang].title : '',

            castingTimeTitle: oDict.castingTime[this.sLang].title,
            durationTitle: oDict.duration[this.sLang].title,
            rangeTitle: oDict.range[this.sLang].title,
            componentsTitle: oDict.components[this.sLang].title,

            levelNum: oItem.en.level,
            color: this.sClass,
            view: this.sView,
            locked: this.aLockedItems.indexOf(oItem.en.name) > -1,
            selected: this.aSelectedItems.indexOf(oItem.en.name) > -1,

            editable: this.bEditMode
          }
          if (oItem[this.sLang].pre || oItem.en.pre) {
            o.pre = oItem[this.sLang].pre || oItem.en.pre
          }
          return o
        } catch (err) {
          console.log(err)
        }
      }.bind(this)).sort(function (a, b) {
        if (this.sSort === 'alpha') {
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

    aLockedItemsList: function () {
      const aFiltered = this.aItems.filter(function (oItem) {
        return this.aLockedItems.indexOf(oItem.en.name) > -1
      }.bind(this))
      return aFiltered.map(function (oItem) {
        const sSrc = oItem.en.source.split(',').map(item => this.aSources[item.trim()].text[this.sLang].title)
          .join(', ')
        const o = {
          id: oItem.en.name,
          name: oItem[this.sLang].name || oItem.en.name,
          tooltip: oItem[this.sOtherLang].name || oItem.en.name,
          text: oItem[this.sLang].text || oItem.en.text,
          src: oItem[this.sLang].source || oItem.en.source,
          className: this.sClassTitle,
          source: sSrc /* this.aSources[oItem.en.source].text[this.sLang].title */,
          school: this.aSchools[oItem.en.school.trim()].text[this.sLang].title,
          level: oLevelsText[oItem.en.level] ? oLevelsText[oItem.en.level].text[this.sLang].title : oItem.en.level + ' ' + oLevelsText.units[this.sLang].title,
          castingTime: oItem[this.sLang].castingTime || oItem.en.castingTime,
          range: oItem[this.sLang].range || oItem.en.range,
          components: oItem[this.sLang].components || oItem.en.components,
          materials: oItem[this.sLang].materials || oItem.en.materials,
          duration: oItem[this.sLang].duration || oItem.en.duration,
          ritual: oItem.en.ritual ? oDict.ritual[this.sLang].title : '',

          castingTimeTitle: oDict.castingTime[this.sLang].title,
          durationTitle: oDict.duration[this.sLang].title,
          rangeTitle: oDict.range[this.sLang].title,
          componentsTitle: oDict.components[this.sLang].title,

          levelNum: oItem.en.level,
          color: this.sClass,
          view: this.sView,
          locked: this.aLockedItems.indexOf(oItem.en.name) > -1,
          selected: this.aSelectedLockedItems.indexOf(oItem.en.name) > -1
        }
        if (oItem[this.sLang].pre || oItem.en.pre) {
          o.pre = oItem[this.sLang].pre || oItem.en.pre
        }
        return o
      }.bind(this)).sort(function (a, b) {
        if (this.sSort === 'alpha') {
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

    aHiddenItemsList: function () {
      const aFiltered = this.aItems.filter(function (oItem) {
        return this.aHiddenItems.indexOf(oItem.en.name) > -1
      }.bind(this))
      return aFiltered.map(function (oItem) {
        const o = {
          id: oItem.en.name,
          title: oItem[this.sLang].name || oItem.en.name,
          tooltip: oItem[this.sOtherLang].name || oItem.en.name
        }
        return o
      }.bind(this))
    }

  },
  mounted: function () {
    this.loadConfigData()
    this.collectCastingTime()

    const bInfoIsRead = this.getConfig('infoIsRead')
    if (bInfoIsRead) {
      this.showCards()
    }

    this.getHash()

    this.updateHash()

    this.bAppIsReady = true

    this.bDebug = isDebug()
    this.bIos = isIos()
  },
  methods: {
    collectCastingTime: function () {
      const oTmp = {}
      // this.aCastingTime={};
      this.aItems.forEach(el => {
        oTmp[el.en.castingTime] = el.ru.castingTime
      })

      for (const key in oTmp) {
        this.aCastingTime[key] = {
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
    onClassChange: function (sKey) {
      this.showAllItems()

      this.sClass = sKey
      this.setConfig('class', sKey)
      this.onSubClassChange('')
      this.updateHash()
    },
    onSubClassChange: function (sKey) {
      this.showAllItems()

      this.sSubClass = sKey
      this.setConfig('subclass', sKey)
      this.onSubSubClassChange('')

      this.updateHash()
    },
    onSubSubClassChange: function (sKey) {
      this.showAllItems()

      this.sSubSubClass = sKey
      this.setConfig('subsubclass', sKey)

      this.updateHash()
    },
    onLevelStartChange: function (sKey) {
      this.showAllItems()

      this.sLevelStartSelected = String(this.nLevelStart = sKey)
      this.setConfig('ls', sKey)

      this.updateHash()
    },
    onLevelEndChange: function (sKey) {
      this.showAllItems()

      this.sLevelEndSelected = String(this.nLevelEnd = sKey)
      this.setConfig('le', sKey)

      this.updateHash()
    },
    onSourceChange: function (sKey) {
      this.showAllItems()

      this.aSources[sKey].checked = !this.aSources[sKey].checked
      this.updateHash()
    },
    onCastingTimeChange: function (sKey) {
      this.showAllItems()

      this.aCastingTime[sKey].checked = !this.aCastingTime[sKey].checked
      // this.$recompute('aCastingTimeSelected');
      // this.$forceUpdate();
      this.updateHash()
    },
    onSchoolChange: function (sKey) {
      this.showAllItems()

      this.aSchools[sKey].checked = !this.aSchools[sKey].checked
      this.updateHash()
    },
    onLanguageChange: function (sKey) {
      this.showAllItems()

      this.sLang = sKey
      this.setConfig('lang', sKey)

      this.updateHash()
    },
    onViewChange: function (sKey) {
      this.showAllItems()

      this.sView = sKey
      this.setConfig('view', sKey)

      this.updateHash()
    },
    onSortChange: function (sKey) {
      this.showAllItems()

      this.sSort = sKey
      this.updateHash()
      this.setConfig('sort', sKey)
    },

    onSearchName: function (sValue) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => {
        if (this.bDebug) {
          alert('Введенное значение: \r\n' + sValue)
        }
        this.showAllItems()

        this.sSearch = sValue.trim()
        this.updateHash()
      }, 500)
    },

    getRandomItem: function () {
      this.showAllItems()

      this.sSearch = ''
      this.sSearch = this.aItemsList[randd(0, this.aItemsList.length - 1)].name
      this.updateHash()
    },
    onAllClassSpellsPress: function () {
      this.showAllItems()

      this.bAllClassSpells = !this.bAllClassSpells
      this.updateHash()
    },
    onRitualsPress: function () {
      this.showAllItems()

      this.bRitualOnly = !this.bRitualOnly
      this.updateHash()
    },

    autosizeAllText: function () {
      const aCards = this.$refs.itemCard
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

    onSchoolsToggled: function (bStat) {
      this.setConfig('schoolsOpend', bStat)
    },
    onSourcesToggled: function (bStat) {
      this.setConfig('sourcesOpend', bStat)
    },
    onCastingTimeToggled: function (bStat) {
      this.setConfig('castingTimeOpend', bStat)
    },

    lockCard: function (oCard) {
      if (this.aSelectedItems.length > 0) {
        this.aSelectedItems.forEach(function (sId) {
          if (this.aSelectedItems.indexOf(sId) > -1) {
            this.aLockedItems.push(sId)
          }
        }.bind(this))
        this.selectAll(false)
      } else {
        const id = oCard.id
        if (this.aLockedItems.indexOf(id) < 0) {
          this.aLockedItems.push(id)
        }
      }
      this.setConfig('locked', this.aLockedItems)
    },
    unlockCard: function (oCard) {
      if (this.aSelectedLockedItems.length > 0) {
        this.aSelectedLockedItems.forEach(function (sId) {
          const nInd = this.aLockedItems.indexOf(sId)
          if (nInd > -1) {
            this.aLockedItems.splice(nInd, 1)
          }
        }.bind(this))
      } else {
        const id = oCard.id
        const nInd = this.aLockedItems.indexOf(id)
        if (nInd > -1) {
          this.aLockedItems.splice(nInd, 1)
        }
      }
      this.setConfig('locked', this.aLockedItems)
    },
    hideCard: function (oCard) {
      if (this.aSelectedItems.length > 0) {
        this.aSelectedItems.forEach(function (sId) {
          if (this.aSelectedItems.indexOf(sId) > -1) {
            this.aHiddenItems.push(sId)
          }
        }.bind(this))
        this.selectAll(false)
      } else {
        const id = oCard.id
        if (this.aHiddenItems.indexOf(id) < 0) {
          this.aHiddenItems.push(id)
        }
      }
    },
    unhideCard: function (sId) {
      const nInd = this.aHiddenItems.indexOf(sId)
      if (nInd > -1) {
        this.aHiddenItems.splice(nInd, 1)
      }
    },
    unlockAll: function () {
      this.aLockedItems = []
      this.setConfig('locked', this.aLockedItems)
    },
    unhideAll: function () {
      this.aHiddenItems = []
    },

    selectCard: function (oCard) {
      const id = oCard.id
      const nInd = this.aSelectedItems.indexOf(id)
      if (nInd > -1) {
        this.aSelectedItems.splice(nInd, 1)
      } else {
        this.aSelectedItems.push(id)
      }
    },
    selectLockedCard: function (oCard) {
      const id = oCard.id
      const nInd = this.aSelectedLockedItems.indexOf(id)
      if (nInd > -1) {
        this.aSelectedLockedItems.splice(nInd, 1)
      } else {
        this.aSelectedLockedItems.push(id)
      }
    },
    selectAll: function (bStat) {
      if (this.aSelectedItems.length > 0 || bStat === false) {
        this.aSelectedItems = []
        this.aSelectedLockedItems = []
      } else {
        this.aSelectedItems = this.aItemsList.map(item => item.id)
      }
    },

    makeCardWidthLess: function () {
      let aCards = this.$refs.CenterContent.$data.cache.map((it) => it.componentInstance)
      if (this.aSelectedLockedItems.length > 0 || this.aSelectedItems.length > 0) {
        aCards = aCards.filter(el => this.aSelectedLockedItems.indexOf(el.id) > -1 || this.aSelectedItems.indexOf(el.id) > -1)
      }
      aCards.forEach(function (oCard) {
        oCard.onCardWidthMin()
      })
    },
    makeCardWidthMore: function () {
      let aCards = this.$refs.CenterContent.$data.cache.map((it) => it.componentInstance)

      if (this.aSelectedLockedItems.length > 0 || this.aSelectedItems.length > 0) {
        aCards = aCards.filter(el => this.aSelectedLockedItems.indexOf(el.id) > -1 || this.aSelectedItems.indexOf(el.id) > -1)
      }
      aCards.forEach(function (oCard) {
        oCard.onCardWidthMax()
      })
    },
    makeCardWidthNorm: function () {
      let aCards = this.$refs.CenterContent.$data.cache.map((it) => it.componentInstance)
      if (this.aSelectedLockedItems.length > 0 || this.aSelectedItems.length > 0) {
        aCards = aCards.filter(el => this.aSelectedLockedItems.indexOf(el.id) > -1 || this.aSelectedItems.indexOf(el.id) > -1)
      }
      aCards.forEach(function (oCard) {
        oCard.setCardWidth(240)
      })
    },

    updateHash: function () {
      const aHash = []
      if (this.sSearch.length > 0) {
        aHash.push('q=' + this.sSearch.trim())
      }

      if (this.aSrcSelected.length !== this.aSrcList.length) {
        aHash.push('src=' + this.aSrcSelected.join(','))
      }
      if (this.aSchoolSelected.length !== this.aSchoolList.length) {
        aHash.push('school=' + this.aSchoolSelected.join(','))
      }
      // let aCastingTimeSelected = this.aCastingTimeSelected();
      if (this.aCastingTimeSelected.length !== this.aCastingTime.length && this.aCastingTimeSelected.length) {
        aHash.push('castTime=' + this.aCastingTimeSelected.join(','))
      }
      if (this.sLang !== 'ru') {
        aHash.push('lang=' + this.sLang)
      }
      if (this.sClass !== '') {
        aHash.push('class=' + this.sClass)
      }
      if (this.nLevelStart > 0) {
        aHash.push('ls=' + this.nLevelStart)
      }
      if (this.nLevelEnd < 9) {
        aHash.push('le=' + this.nLevelEnd)
      }
      if (this.sView !== 'card') {
        aHash.push('view=' + this.sView)
      }
      if (this.sSort !== 'levelAlpha') {
        aHash.push('sort=' + this.sSort)
      }

      if (this.bRitualOnly) {
        aHash.push('ritual=1')
      }
      if (this.bAllClassSpells) {
        aHash.push('fullclass=1')
      }

      if (aHash.length > 0) {
        window.location.hash = aHash.join('&').replace(/\s+/g, '_')
      } else {
        this.removeHash()
      }
    },
    removeHash: function () {
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
        for (const key in this.aSources) {
          if (oHash.src.indexOf(key) > -1) {
            this.aSources[key].checked = true
          } else {
            this.aSources[key].checked = false
          }
        }
      }
      if (oHash.school) {
        for (const key in this.aSchools) {
          if (oHash.school.indexOf(key) > -1) {
            this.aSchools[key].checked = true
          } else {
            this.aSchools[key].checked = false
          }
        }
      }
      if (oHash.castTime) {
        for (const key in this.aCastingTime) {
          if (oHash.castTime.indexOf(key) > -1) {
            this.aCastingTime[key].checked = true
          } else {
            this.aCastingTime[key].checked = false
          }
        }
      }
      if (oHash.lang) {
        this.sLang = oHash.lang[0]
      }
      if (oHash.class) {
        this.sClass = oHash.class[0]
      }
      if (oHash.le) {
        this.nLevelEnd = oHash.le[0]
      }
      if (oHash.ls) {
        this.nLevelStart = oHash.ls[0]
      }
      if (oHash.view) {
        this.sView = oHash.view[0]
      }
      if (oHash.sort) {
        this.sSort = oHash.sort[0]
      }
      if (oHash.q) {
        this.sSearch = oHash.q[0]
      }
      if (oHash.ritual) {
        this.bRitualOnly = true
      }
      if (oHash.fullclass) {
        this.bAllClassSpells = true
      }
    },

    showInfo: function () {
      this.bModalWinShow = true
    },
    closeModWin () {
      this.bModalWinShow = false
    },
    print: function () {
      window.print()
      return false
    },

    showCards: function () {
      this.bCardsAreVisible = true
    },

    showAllItems: function () {
      this.closeModWin()
      this.showCards()
      this.setConfig('infoIsRead', true)
    },

    setConfig: function (prop, val) {
      if (prop && val !== undefined && this.oConfig) {
        this.oConfig[prop] = val
        localStorage.setItem('feat_config', JSON.stringify(this.oConfig))
      }
    },
    getConfig: function (prop) {
      this.oConfig = JSON.parse(localStorage.getItem('feat_config')) || {}
      if (prop !== undefined) {
        return localStorage.getItem('feat_config') ? this.oConfig[prop] : null
      }
      return ''
    },

    loadConfigData: function () {
      const sTmpLang = this.getConfig('lang')
      if (sTmpLang) {
        this.sLang = sTmpLang
      }

      const sTmpSort = this.getConfig('sort')
      if (sTmpSort) {
        this.sSort = sTmpSort
      }

      const aTmpLocked = this.getConfig('locked')
      if (aTmpLocked) {
        this.aLockedItems = aTmpLocked
      }

      const bTmpSchoolsOpend = this.getConfig('schoolsOpend')
      if (bTmpSchoolsOpend !== undefined) {
        this.bSchoolsOpend = bTmpSchoolsOpend
      }

      const bTMPSourcesOpend = this.getConfig('sourcesOpend')
      if (bTMPSourcesOpend !== undefined) {
        this.bSourcesOpend = bTMPSourcesOpend
      }
    },

    downloadDB: function () {
      const oDB = {}
      oDB.sourceList = this.aSources
      oDB.schoolList = this.aSchools
      oDB.oLanguages = this.aLanguages
      oDB.allSpells = this.aItems
      oDB.lockedItems = this.aLockedItems

      const sData = JSON.stringify(oDB, null, 2)
      const filename = 'DnD5e_spells_BD'
      const blob = new Blob([sData], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, filename + '.dtn')
    },
    uploadDB: function () {
      document.getElementById('fileUploader').click()
    },
    fileSelected: function (oEvent) {
      this.handleLocalBDSelect(oEvent)
    },

    handleLocalBDSelect: function (evt) {
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
    _completeDB: function (oMainDB, oFileDB) {
      for (const key in oFileDB) {
        oMainDB[key] = oFileDB[key]
      }
    },
    parseLocalFile: function (sText) {
      try {
        const oDB = JSON.parse(sText)

        this._completeDB(this.aSources, oDB.sourceList)
        this._completeDB(this.aSchools, oDB.schoolList)
        this._completeDB(this.aLanguages, oDB.oLanguages)
        this._completeDB(this.aLockedItems, oDB.lockedItems)
        // this._completeDB(this.aItems = oDB.allSpells);

        this.aItems = oDB.allSpells

        document.getElementById('fileUploader').value = ''
        alert('Вроде как загружено')
      } catch (err) {
        document.getElementById('fileUploader').value = ''
        alert('Ошибка в структуре файла файла. Воспользуйтесь валидатором JSON.\n\n' + err)
      }
    },

    onEditModePress: function () {
      this.bEditMode = !this.bEditMode
    },
    cancelCard: function (oData) {
      const sId = oData.id
      const oItem = this.aItems.find(el => el.en.name.toLowerCase().replace(/\s+/, '') === sId.toLowerCase()
        .replace(/\s+/, ''))
      if (oItem) {
        const sText = oItem[this.sLang].text + '  '

        oItem[this.sLang].text = sText
      }

      return false
    },
    saveCard: function (oData) {
      const sId = oData.id
      const sText = oData.text

      const oItem = this.aItems.find(el => el.en.name.toLowerCase().replace(/\s+/, '') === sId.toLowerCase()
        .replace(/\s+/, ''))
      if (oItem) {
        oItem[this.sLang].text = sText
      }

      return false
    },
  },
  render (h) {
    GLOBAL_LISTENER.CtrlA(this.selectAll)

    return <AppStyled>
      <FilterBar />
      <CenterContent ref="CenterContent" />
      <Modal
          closeFunc={this.closeModWin}
          show={this.bModalWinShow}
          onClick={this.showInfo}>
        <AppInfoModalContent/>
      </Modal>
    </AppStyled>
  }
})
