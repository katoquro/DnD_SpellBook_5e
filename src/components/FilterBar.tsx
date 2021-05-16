import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import SearchField from './SearchField'
import CustomSelect from './CustomSelect'
import Hiddenitem from './Hiddenitem'
import CheckButton from './CheckButton'
import Combobox from './Combobox'

export default component({
  render (h): VNode {
    const vue: any = this.$parent
    return <div class='p_side'>
            <div class="mediaWidth flexParent">
                <a href="https://github.com/katoquro/DnD_SpellBook_5e"
                    class="bt flexChild" title="Проект на Github"><i class="fa fa-github" /></a>
                <a href="#" class="bt flexChild" id="bInfo" title="Справка" onClick={vue.showInfo}><i
                    class="fa fa-question-circle" /></a>
                <a href="#" class="bt flexChild" id="bPrint" title="Распечатать" onClick={vue.print}><i
                    class="fa fa-print"
                    aria-hidden="true" /></a>
            </div>
            <div class='mediaWidth'>
                <SearchField
                    id="NameInput"
                    title="Название"
                    value={vue.sSearch}
                    ios={vue.bIos}
                    v-on:input={vue.onSearchName}
                    v-on:searchrndom={vue.getRandomItem}
                />
            </div>

            <div class='mediaWidth'>
                <CustomSelect
                    id="ClassSelect"
                    ref="ClassSelect"
                    title="Класс"
                    selected={vue.sClassSelected}
                    items={vue.aClassList}
                    v-on:iclick={vue.onClassChange}
                />
            </div>
            {vue.aSubClassList.length > 1
              ? (<div class='mediaWidth'>
                    <CustomSelect
                        id="SubClassSelect"
                        ref="SubClassSelect"
                        selected={vue.sSubClassSelected}
                        items={vue.aSubClassList}
                        v-on:iclick={vue.onSubClassChange}
                    />
                </div>
                )
              : (<div />)}

            {vue.aSubSubClassList.length > 1
              ? (<div class='mediaWidth'>
                    <CustomSelect
                        id="SubSubClassSelect"
                        ref="SubSubClassSelect"
                        selected={vue.sSubSubClassSelected}
                        items={vue.aSubSubClassList}
                        v-on:iclick={vue.onSubSubClassChange}
                    />
                </div>)
              : (<div />)}

            {vue.aSubClassList.length > 1
              ? (<div class='mediaWidth'>
                        <CheckButton
                            id="AllSubClassCastsCheckbox"
                            title="Все заклинания класса"
                            tooltip="Все заклинания из этого справочника, которые могут применять представители класса, включая все архетипы"
                            checked={vue.bAllClassSpells}
                            v-on:press={vue.onAllClassSpellsPress}
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
                            selected={vue.sLevelStartSelected}
                            items={vue.aLevelList}
                            v-on:iclick={vue.onLevelStartChange}
                        />
                    </div>
                    <div class="cell">
                        <CustomSelect
                            id="LevelSelectEnd"
                            ref="LevelSelectEnd"
                            selected={vue.sLevelEndSelected}
                            items={vue.aLevelList}
                            v-on:iclick={vue.onLevelEndChange}
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
                    items={vue.aSchoolList}
                    opened={vue.bSchoolsOpend}
                    v-on:iclick={vue.onSchoolChange}
                    v-on:opened={vue.onSchoolsToggled}
                />
            </div>
            <div class='mediaWidth'>
                <Combobox
                    id="SourceCombobox"
                    ref="SourceCombobox"
                    title="Источники"
                    items={vue.aSrcList}
                    opened={vue.bSourcesOpend}
                    v-on:iclick={vue.onSourceChange}
                    v-on:opened={vue.onSourcesToggled}
                />
            </div>
            <div class='mediaWidth'>
                <Combobox
                    id="CastingTimeCombobox"
                    ref="CastingTimeCombobox"
                    title="Время накладывания"
                    items={vue.aCastingTimeList}
                    opened={vue.bCastingTimeOpend}
                    v-on:iclick={vue.onCastingTimeChange}
                    v-on:opened={vue.onCastingTimeToggled}
                />
            </div>
            <div class='mediaWidth'>
                <CheckButton
                    id="RitualCheckbox"
                    title="Ритуальные заклинания"
                    tooltip='Заклинания для совершения которых можно использовать ритуал (особые действия) и не тратить ячейку магии'
                    checked={vue.bRitualOnly}
                    v-on:press={vue.onRitualsPress}
                />
            </div>

            <div class='mediaWidth'>
                <label class='filterLabel'>Ширина карточек</label>
                <div class="flexParent">

                    <button
                        class='bt flexChild'
                        title='Уменьшить ширину карточек'
                        onClick={vue.makeCardWidthLess}>
                        <i class="fa fa-caret-right" aria-hidden="true" />
                        &nbsp;
                        <i class="fa fa-caret-left" aria-hidden="true" />
                    </button>

                    <button
                        class='bt flexChild'
                        title='Сбросить ширину карточек'
                        onClick={vue.makeCardWidthNorm}>
                        <i class="fa fa-square-o" aria-hidden="true" />
                    </button>

                    <button
                        class='bt flexChild'
                        title='Увеличить ширину карточек'
                        onClick={vue.makeCardWidthMore}>
                        <i class="fa fa-caret-left" aria-hidden="true" />
                        &nbsp;
                        <i class="fa fa-caret-right" aria-hidden="true" />
                    </button>

                </div>
            </div>

            <div class='mediaWidth'>
                <div class="flexParent">
                    <button
                        class="bt flexChild"
                        style="    padding: 0.6em; margin: 0;"
                        onClick={vue.autosizeAllText}
                    >
                        Подстроить текст
                    </button>
                </div>
            </div>

            <div class='mediaWidth'>
                <CustomSelect
                    id="SortSelect"
                    ref="SortSelect"
                    title="Сортировка"
                    selected={vue.sSortSelected}
                    items={vue.aSortList}
                    v-on:iclick={vue.onSortChange}
                />
            </div>

            <div class='mediaWidth'>
                <CustomSelect
                    id="LangSelect"
                    ref="LangSelect"
                    title="Язык"
                    selected={vue.sLangSelected}
                    items={vue.aLanguageList}
                    v-on:iclick={vue.onLanguageChange}
                />
            </div>
            <div class='mediaWidth'>
                <CustomSelect
                    id="ViewSelect"
                    ref="ViewSelect"
                    title="Вид"
                    selected={vue.sViewSelected}
                    items={vue.aViewList}
                    v-on:iclick={vue.onViewChange}
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
                    id="fileUploader" onChange={vue.fileSelected} />
                <button class="btn"
                    title="Загрузить базу данных в формате JSON"
                    onClick={vue.uploadDB}>
                    Загрузить
                </button>
            </div>
            <div class='mediaWidth'>
                <CheckButton
                    id="EditorCheckbox"
                    title="Редактирование"
                    tooltip="Переход в режим редактирования"
                    checked={vue.bEditMode}
                    v-on:press={vue.onEditModePress} />
            </div>

            {vue.aHiddenItemsList.length > 0
              ? (
                    <div class='mediaWidth'>
                        <label class="filterLabel">Скрытые заклинания ({vue.aHiddenItemsList.length})</label>
                        <div id="HiddenItems">
                            <a href='#' class='bReturnUnvisible' onClick={m.stop(vue.unhideAll)}>Вернуть все обратно</a>

                            {vue.aHiddenItemsList.map((item: any) => {
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
