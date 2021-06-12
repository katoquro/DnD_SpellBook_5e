import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import SearchField from '@app/components/SideBar/SearchFiled/SearchField'
import SelectOneDropDown from '@app/components/SideBar/SelectOneDropDown/SelectOneDropDown'
import Hiddenitem from '@app/components/Hiddenitem'
import CheckButton from '@app/components/CheckButton'
import Combobox from '@app/components/Combobox'
import FaIcon from '@app/components/FaIcon'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faCompressArrowsAlt, faExpand, faExpandArrowsAlt, faPrint } from '@fortawesome/free-solid-svg-icons'
import { Store } from './App/App'

export default component({
  name: 'FilterBar',
  render(h): VNode {
    const vue: any = Store
    return <div class='p_side'>
      <div class="mediaWidth flexParent">
        <a href="https://github.com/katoquro/DnD_SpellBook_5e" class="bt flexChild" title="Проект на Github">
          <FaIcon icon={faGithub} />
        </a>
        <a href="#" class="bt flexChild" id="bInfo" title="Справка" onClick={vue.showInfo.bind(vue)}>
          <FaIcon icon={faQuestionCircle} />
        </a>
        <a href="#" class="bt flexChild" id="bPrint" title="Распечатать" onClick={vue.print}>
          <FaIcon icon={faPrint} aria-hidden="true" />
        </a>
      </div>
      <SearchField />

      <SelectOneDropDown
        title="Класс"
        selected={vue.sClassSelected()}
        items={vue.aClassList()}
        selectHandler={vue.onClassChange.bind(vue)}
      />

      <SelectOneDropDown
        selected={vue.sSubClassSelected()}
        items={vue.aSubClassList()}
        selectHandler={vue.onSubClassChange.bind(vue)}
      />

      <SelectOneDropDown
        selected={vue.sSubSubClassSelected()}
        items={vue.aSubSubClassList()}
        selectHandler={vue.onSubSubClassChange.bind(vue)}
      />

      {vue.aSubClassList().length > 1
        ? <CheckButton
          id="AllSubClassCastsCheckbox"
          title="Все заклинания класса"
          tooltip="Все заклинания из этого справочника, которые могут применять представители класса, включая все архетипы"
          checked={vue.state.bAllClassSpells}
          v-on:press={vue.onAllClassSpellsPress.bind(vue)}
        />
        : null}

      <div class='mediaWidth'>
        <label class='filterLabel'>Уровень с/по</label>
        <div class="row">
          <div class="cell">
            <SelectOneDropDown
              selected={vue.state.sLevelStartSelected}
              items={vue.aLevelList()}
              selectHandler={vue.onLevelStartChange.bind(vue)}
            />
          </div>
          <div class="cell">
            <SelectOneDropDown
              selected={vue.state.sLevelEndSelected}
              items={vue.aLevelList()}
              selectHandler={vue.onLevelEndChange.bind(vue)}
            />
          </div>
        </div>
      </div>

      <Combobox
        id="SchoolCombobox"
        ref="SchoolCombobox"
        title="Школы"
        items={vue.aSchoolList()}
        opened={vue.state.bSchoolsOpend}
        v-on:iclick={vue.onSchoolChange.bind(vue)}
        v-on:opened={vue.onSchoolsToggled.bind(vue)}
      />

      <Combobox
        id="SourceCombobox"
        ref="SourceCombobox"
        title="Источники"
        items={vue.aSrcList()}
        opened={vue.state.bSourcesOpend}
        v-on:iclick={vue.onSourceChange.bind(vue)}
        v-on:opened={vue.onSourcesToggled.bind(vue)}
      />

      <Combobox
        id="CastingTimeCombobox"
        ref="CastingTimeCombobox"
        title="Время накладывания"
        items={vue.aCastingTimeList()}
        opened={vue.state.bCastingTimeOpend}
        v-on:iclick={vue.onCastingTimeChange.bind(vue)}
        v-on:opened={vue.onCastingTimeToggled.bind(vue)}
      />

      <CheckButton
        id="RitualCheckbox"
        title="Ритуальные заклинания"
        tooltip='Заклинания для совершения которых можно использовать ритуал (особые действия) и не тратить ячейку магии'
        checked={vue.state.bRitualOnly}
        v-on:press={vue.onRitualsPress.bind(vue)}
      />

      <div class='mediaWidth'>
        <label class='filterLabel'>Ширина карточек</label>
        <div class="flexParent">

          <button
            class='bt flexChild'
            title='Уменьшить ширину карточек'
            onClick={() => vue.makeCardWidthLess.bind(vue)(this)}>
            <FaIcon icon={faCompressArrowsAlt} />
          </button>

          <button
            class='bt flexChild'
            title='Сбросить ширину карточек'
            onClick={() => vue.makeCardWidthNorm.bind(vue)(this)}>
            <FaIcon icon={faExpand} />
          </button>

          <button
            class='bt flexChild'
            title='Увеличить ширину карточек'
            onClick={() => vue.makeCardWidthMore.bind(vue)(this)}>
            <FaIcon icon={faExpandArrowsAlt} />
          </button>

        </div>
      </div>

      <div class="flexParent">
        <button
          class="bt flexChild"
          style="padding: 0.6em; margin: 0;"
          onClick={() => vue.autosizeAllText.bind(vue)(this)}>
          Подстроить текст
        </button>
      </div>

      <SelectOneDropDown
        title="Сортировка"
        selected={vue.sSortSelected()}
        items={vue.aSortList()}
        selectHandler={vue.onSortChange.bind(vue)}
      />

      <SelectOneDropDown
        title="Язык"
        selected={vue.sLangSelected()}
        items={vue.aLanguageList()}
        selectHandler={vue.onLanguageChange.bind(vue)}
      />
      <SelectOneDropDown
        title="Вид"
        selected={vue.sViewSelected()}
        items={vue.aViewList()}
        selectHandler={vue.onViewChange.bind(vue)}
      />
      <button class="btn"
        title="Скачать базу данных в формате JSON"
        onClick={vue.downloadDB}
      >Скачать
      </button>
      <input type="file" style="display: none;" ref="fileUploader"
        id="fileUploader" onChange={vue.fileSelected.bind(vue)} />
      <button class="btn"
        title="Загрузить базу данных в формате JSON"
        onClick={vue.uploadDB.bind(vue)}>
        Загрузить
      </button>
      <CheckButton
        id="EditorCheckbox"
        title="(В разработке) Редактирование"
        tooltip="Переход в режим редактирования"
        checked={vue.state.bEditMode}
        v-on:press={vue.onEditModePress.bind(vue)} />

      {vue.aHiddenItemsList().length > 0
        ? (
          <div class='mediaWidth'>
            <label class="filterLabel">Скрытые заклинания ({vue.aHiddenItemsList().length})</label>
            <div id="HiddenItems">
              <a href='#' class='bReturnUnvisible' onClick={m.stop(vue.unhideAll.bind(vue))}>
                Вернуть все обратно
              </a>

              {vue.aHiddenItemsList().map((item: any) => {
                return <Hiddenitem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  tooltip={item.tooltip}
                  v-on:unhide={() => vue.unhideCard(item.id)}
                />
              })}

            </div>
          </div>)
        : (<div />)}

    </div>
  }
})
