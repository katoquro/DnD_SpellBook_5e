import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import SearchField from './SearchField'
import CustomSelect from './CustomSelect'
import Hiddenitem from './Hiddenitem'
import CheckButton from './CheckButton'
import Combobox from './Combobox'
import FaIcon from './FaIcon'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faCompressArrowsAlt, faExpand, faExpandArrowsAlt, faPrint } from '@fortawesome/free-solid-svg-icons'
import { Store } from './App/App'

export default component({
  name: 'FilterBar',
  render (h): VNode {
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
            <div class='mediaWidth'>
                <SearchField
                    id="NameInput"
                    title="Название"
                    value={vue.state.sSearch}
                    ios={vue.state.bIos}
                    v-on:input={vue.onSearchName.bind(vue)}
                    v-on:searchrndom={vue.getRandomItem.bind(vue)}
                />
            </div>

            <div class='mediaWidth'>
                <CustomSelect
                    id="ClassSelect"
                    ref="ClassSelect"
                    title="Класс"
                    selected={vue.sClassSelected()}
                    items={vue.aClassList()}
                    v-on:iclick={vue.onClassChange.bind(vue)}
                />
            </div>
            {vue.aSubClassList().length > 1
              ? (<div class='mediaWidth'>
                        <CustomSelect
                            id="SubClassSelect"
                            ref="SubClassSelect"
                            selected={vue.sSubClassSelected()}
                            items={vue.aSubClassList()}
                            v-on:iclick={vue.onSubClassChange.bind(vue)}
                        />
                    </div>
                )
              : (<div />)}

            {vue.aSubSubClassList().length > 1
              ? (<div class='mediaWidth'>
                    <CustomSelect
                        id="SubSubClassSelect"
                        ref="SubSubClassSelect"
                        selected={vue.sSubSubClassSelected()}
                        items={vue.aSubSubClassList()}
                        v-on:iclick={vue.onSubSubClassChange.bind(vue)}
                    />
                </div>)
              : (<div />)}

            {vue.aSubClassList().length > 1
              ? (<div class='mediaWidth'>
                        <CheckButton
                            id="AllSubClassCastsCheckbox"
                            title="Все заклинания класса"
                            tooltip="Все заклинания из этого справочника, которые могут применять представители класса, включая все архетипы"
                            checked={vue.state.bAllClassSpells}
                            v-on:press={vue.onAllClassSpellsPress.bind(vue)}
                        />
                    </div>
                )
              : (<div />)}

            <div class='mediaWidth'>
                <label class='filterLabel'>Уровень с/по</label>
                <div class="row">
                    <div class="cell">
                        <CustomSelect
                            id="LevelSelectStart"
                            ref="LevelSelectStart"
                            selected={vue.state.sLevelStartSelected}
                            items={vue.aLevelList()}
                            v-on:iclick={vue.onLevelStartChange.bind(vue)}
                        />
                    </div>
                    <div class="cell">
                        <CustomSelect
                            id="LevelSelectEnd"
                            ref="LevelSelectEnd"
                            selected={vue.state.sLevelEndSelected}
                            items={vue.aLevelList()}
                            v-on:iclick={vue.onLevelEndChange.bind(vue)}
                        >
                        </CustomSelect>
                    </div>
                </div>
            </div>

            <div class='mediaWidth'>
                <Combobox
                    id="SchoolCombobox"
                    ref="SchoolCombobox"
                    title="Школы"
                    items={vue.aSchoolList()}
                    opened={vue.state.bSchoolsOpend}
                    v-on:iclick={vue.onSchoolChange.bind(vue)}
                    v-on:opened={vue.onSchoolsToggled.bind(vue)}
                />
            </div>
            <div class='mediaWidth'>
                <Combobox
                    id="SourceCombobox"
                    ref="SourceCombobox"
                    title="Источники"
                    items={vue.aSrcList()}
                    opened={vue.state.bSourcesOpend}
                    v-on:iclick={vue.onSourceChange.bind(vue)}
                    v-on:opened={vue.onSourcesToggled.bind(vue)}
                />
            </div>
            <div class='mediaWidth'>
                <Combobox
                    id="CastingTimeCombobox"
                    ref="CastingTimeCombobox"
                    title="Время накладывания"
                    items={vue.aCastingTimeList()}
                    opened={vue.state.bCastingTimeOpend}
                    v-on:iclick={vue.onCastingTimeChange.bind(vue)}
                    v-on:opened={vue.onCastingTimeToggled.bind(vue)}
                />
            </div>
            <div class='mediaWidth'>
                <CheckButton
                    id="RitualCheckbox"
                    title="Ритуальные заклинания"
                    tooltip='Заклинания для совершения которых можно использовать ритуал (особые действия) и не тратить ячейку магии'
                    checked={vue.state.bRitualOnly}
                    v-on:press={vue.onRitualsPress.bind(vue)}
                />
            </div>

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

            <div class='mediaWidth'>
                <div class="flexParent">
                    <button
                        class="bt flexChild"
                        style="padding: 0.6em; margin: 0;"
                        onClick={() => vue.autosizeAllText.bind(vue)(this)}>
                        Подстроить текст
                    </button>
                </div>
            </div>

            <div class='mediaWidth'>
                <CustomSelect
                    id="SortSelect"
                    ref="SortSelect"
                    title="Сортировка"
                    selected={vue.sSortSelected()}
                    items={vue.aSortList()}
                    v-on:iclick={vue.onSortChange.bind(vue)}
                />
            </div>

            <div class='mediaWidth'>
                <CustomSelect
                    id="LangSelect"
                    ref="LangSelect"
                    title="Язык"
                    selected={vue.sLangSelected()}
                    items={vue.aLanguageList()}
                    v-on:iclick={vue.onLanguageChange.bind(vue)}
                />
            </div>
            <div class='mediaWidth'>
                <CustomSelect
                    id="ViewSelect"
                    ref="ViewSelect"
                    title="Вид"
                    selected={vue.sViewSelected()}
                    items={vue.aViewList()}
                    v-on:iclick={vue.onViewChange.bind(vue)}
                />
            </div>
            <hr />
            <div class='mediaWidth'>
                <button class="btn"
                    title="Скачать базу данных в формате JSON"
                    onClick={vue.downloadDB}
                >Скачать
                </button>
            </div>
            <div class='mediaWidth'>
                <input type="file" style="display: none;" ref="fileUploader"
                    id="fileUploader" onChange={vue.fileSelected.bind(vue)} />
                <button class="btn"
                    title="Загрузить базу данных в формате JSON"
                    onClick={vue.uploadDB.bind(vue)}>
                    Загрузить
                </button>
            </div>
            <div class='mediaWidth'>
                <CheckButton
                    id="EditorCheckbox"
                    title="Редактирование"
                    tooltip="Переход в режим редактирования"
                    checked={vue.state.bEditMode}
                    v-on:press={vue.onEditModePress.bind(vue)} />
            </div>

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
