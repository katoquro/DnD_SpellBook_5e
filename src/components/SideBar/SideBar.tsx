import { VNode } from 'vue'
import { component, modifiers as m } from 'vue-tsx-support'
import SearchField from '@app/components/SideBar/SearchFiled/SearchField'
import SelectOneDropDown from '@app/components/SideBar/SelectOneDropDown/SelectOneDropDown'
import CheckButton from '@app/components/SideBar/CheckButton/CheckButton'
import MultiSelectDropDown from '@app/components/SideBar/MultiSelectDropDown/MultiSelectDropDown'
import FaIcon from '@app/components/FaIcon'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faCompressArrowsAlt, faExpand, faExpandArrowsAlt, faPrint } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@app/components/App/App'
import { FilterBtnStyled, FilterItemStyled, FilterLabelStyled, SideBarStyled } from '@app/components/SideBar/styled'
import { FlexWrap } from '@app/components/common-styled'
import HiddenSpellsArea from '@app/components/SideBar/HiddenSpellsArea/HiddenSpellsArea'

export default component({
  name: 'SideBar',
  render(h): VNode {
    const vue: any = Store
    return (
      <SideBarStyled>
        <FlexWrap wrap={false}>
          <FilterBtnStyled href="https://github.com/katoquro/DnD_SpellBook_5e" target="_blank" title="Проект на Github">
            <FaIcon icon={faGithub} />
          </FilterBtnStyled>
          <FilterBtnStyled title="Справка" onClick={vue.showInfo.bind(vue)}>
            <FaIcon icon={faQuestionCircle} />
          </FilterBtnStyled>
          <FilterBtnStyled title="Распечатать" onClick={vue.print}>
            <FaIcon icon={faPrint} />
          </FilterBtnStyled>
        </FlexWrap>
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

        <CheckButton
          title="Все заклинания класса"
          tooltip="Все заклинания из этого справочника, которые могут применять представители класса, включая все архетипы"
          show={vue.aSubClassList().length > 1}
          checked={vue.state.bAllClassSpells}
          changeHandler={vue.onAllClassSpellsPress.bind(vue)}
        />

        <FilterItemStyled column={true}>
          <FilterLabelStyled>Уровень с/по</FilterLabelStyled>
          <FlexWrap wrap={false} grow={1}>
            <SelectOneDropDown
              selected={vue.state.sLevelStartSelected}
              items={vue.aLevelList()}
              selectHandler={vue.onLevelStartChange.bind(vue)}
            />
            <div style={{ minWidth: '5px' }} />
            <SelectOneDropDown
              selected={vue.state.sLevelEndSelected}
              items={vue.aLevelList()}
              selectHandler={vue.onLevelEndChange.bind(vue)}
            />
          </FlexWrap>
        </FilterItemStyled>

        <MultiSelectDropDown
          title="Школы"
          items={vue.aSchoolList()}
          selectHandler={vue.onSchoolChange.bind(vue)}
        />

        <MultiSelectDropDown
          title="Источники"
          items={vue.aSrcList()}
          selectHandler={vue.onSourceChange.bind(vue)}
        />

        <MultiSelectDropDown
          title="Время накладывания"
          items={vue.aCastingTimeList()}
          selectHandler={vue.onCastingTimeChange.bind(vue)}
        />

        <CheckButton
          title="Ритуальные заклинания"
          tooltip='Заклинания для совершения которых можно использовать ритуал (особые действия) и не тратить ячейку магии'
          checked={vue.state.bRitualOnly}
          changeHandler={vue.onRitualsPress.bind(vue)}
        />

        <FilterLabelStyled>Ширина карточек:</FilterLabelStyled>
        <FlexWrap>
          <FilterBtnStyled
            title='Уменьшить ширину карточек'
            onClick={() => vue.makeCardWidthLess.bind(vue)(this)}>
            <FaIcon icon={faCompressArrowsAlt} />
          </FilterBtnStyled>

          <FilterBtnStyled
            title='Сбросить ширину карточек'
            onClick={() => vue.makeCardWidthNorm.bind(vue)(this)}>
            <FaIcon icon={faExpand} />
          </FilterBtnStyled>

          <FilterBtnStyled
            title='Увеличить ширину карточек'
            onClick={() => vue.makeCardWidthMore.bind(vue)(this)}>
            <FaIcon icon={faExpandArrowsAlt} />
          </FilterBtnStyled>
        </FlexWrap>

        <FilterBtnStyled onClick={() => vue.autosizeAllText.bind(vue)(this)}>
          Подстроить текст
        </FilterBtnStyled>

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

        <FlexWrap>
          <FilterBtnStyled
            title="Скачать базу данных в формате JSON"
            onClick={vue.downloadDB.bind(vue)}>
            Скачать
          </FilterBtnStyled>
          <FilterBtnStyled
            title="Загрузить базу данных в формате JSON"
            onClick={vue.uploadDB.bind(vue)}>
            Загрузить
          </FilterBtnStyled>
        </FlexWrap>

        <input type="file" style="display: none;" ref="fileUploader"
          id="fileUploader" onChange={vue.fileSelected.bind(vue)} />

        <CheckButton
          title="Редактирование (soon)"
          tooltip="Переход в режим редактирования"
          checked={vue.state.bEditMode}
          changeHandler={vue.onEditModePress.bind(vue)} />

        <HiddenSpellsArea/>
      </SideBarStyled>
    )
  }
})
