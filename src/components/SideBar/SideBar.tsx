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
    return (
      <SideBarStyled>
        <FlexWrap wrap={false}>
          <FilterBtnStyled href="https://github.com/katoquro/DnD_SpellBook_5e" target="_blank" title="Проект на Github">
            <FaIcon icon={faGithub} />
          </FilterBtnStyled>
          <FilterBtnStyled title="Справка" onClick={Store.showInfo.bind(Store)}>
            <FaIcon icon={faQuestionCircle} />
          </FilterBtnStyled>
          <FilterBtnStyled title="Распечатать" onClick={Store.print}>
            <FaIcon icon={faPrint} />
          </FilterBtnStyled>
        </FlexWrap>
        <SearchField />

        <SelectOneDropDown
          title="Класс"
          selected={Store.sClassSelected()}
          items={Store.aClassList()}
          selectHandler={Store.onClassChange.bind(Store)}
        />

        <SelectOneDropDown
          selected={Store.sSubClassSelected()}
          items={Store.aSubClassList()}
          selectHandler={Store.onSubClassChange.bind(Store)}
        />

        <SelectOneDropDown
          selected={Store.sSubSubClassSelected()}
          items={Store.aSubSubClassList()}
          selectHandler={Store.onSubSubClassChange.bind(Store)}
        />

        <CheckButton
          title="Все заклинания класса"
          tooltip="Все заклинания из этого справочника, которые могут применять представители класса, включая все архетипы"
          show={Store.aSubClassList().length > 1}
          checked={Store.state.bAllClassSpells}
          changeHandler={Store.onAllClassSpellsPress.bind(Store)}
        />

        <FilterItemStyled column={true}>
          <FilterLabelStyled>Уровень с/по</FilterLabelStyled>
          <FlexWrap wrap={false} grow={1}>
            <SelectOneDropDown
              selected={Store.state.sLevelStartSelected}
              items={Store.aLevelList()}
              selectHandler={Store.onLevelStartChange.bind(Store)}
            />
            <div style={{ minWidth: '5px' }} />
            <SelectOneDropDown
              selected={Store.state.sLevelEndSelected}
              items={Store.aLevelList()}
              selectHandler={Store.onLevelEndChange.bind(Store)}
            />
          </FlexWrap>
        </FilterItemStyled>

        <MultiSelectDropDown
          title="Школы"
          items={Store.aSchoolList()}
          selectHandler={Store.onSchoolChange.bind(Store)}
        />

        <MultiSelectDropDown
          title="Источники"
          items={Store.aSrcList()}
          selectHandler={Store.onSourceChange.bind(Store)}
        />

        <MultiSelectDropDown
          title="Время накладывания"
          items={Store.aCastingTimeList()}
          selectHandler={Store.onCastingTimeChange.bind(Store)}
        />

        <CheckButton
          title="Ритуальные заклинания"
          tooltip='Заклинания для совершения которых можно использовать ритуал (особые действия) и не тратить ячейку магии'
          checked={Store.state.bRitualOnly}
          changeHandler={Store.onRitualsPress.bind(Store)}
        />

        <FilterLabelStyled>Ширина карточек:</FilterLabelStyled>
        <FlexWrap>
          <FilterBtnStyled
            title='Уменьшить ширину карточек'
            onClick={Store.makeCardWidthLess.bind(Store)}>
            <FaIcon icon={faCompressArrowsAlt} />
          </FilterBtnStyled>

          <FilterBtnStyled
            title='Сбросить ширину карточек'
            onClick={Store.makeCardWidthNorm.bind(Store)}>
            <FaIcon icon={faExpand} />
          </FilterBtnStyled>

          <FilterBtnStyled
            title='Увеличить ширину карточек'
            onClick={Store.makeCardWidthMore.bind(Store)}>
            <FaIcon icon={faExpandArrowsAlt} />
          </FilterBtnStyled>
        </FlexWrap>

        <FilterBtnStyled onClick={Store.autosizeAllText.bind(Store)}>
          Подстроить текст
        </FilterBtnStyled>

        <SelectOneDropDown
          title="Сортировка"
          selected={Store.sSortSelected()}
          items={Store.aSortList()}
          selectHandler={Store.onSortChange.bind(Store)}
        />

        <SelectOneDropDown
          title="Язык"
          selected={Store.sLangSelected()}
          items={Store.aLanguageList()}
          selectHandler={Store.onLanguageChange.bind(Store)}
        />
        <SelectOneDropDown
          title="Вид"
          selected={Store.sViewSelected()}
          items={Store.aViewList()}
          selectHandler={Store.onViewChange.bind(Store)}
        />

        <FlexWrap>
          <FilterBtnStyled
            title="Скачать базу данных в формате JSON"
            onClick={Store.downloadDB.bind(Store)}>
            Скачать
          </FilterBtnStyled>
          <FilterBtnStyled
            title="Загрузить базу данных в формате JSON"
            onClick={Store.uploadDB.bind(Store)}>
            Загрузить
          </FilterBtnStyled>
        </FlexWrap>

        <input type="file" style="display: none;" ref="fileUploader"
          id="fileUploader" onChange={Store.fileSelected.bind(Store)} />

        <CheckButton
          title="Редактирование (soon)"
          tooltip="Переход в режим редактирования"
          checked={Store.state.bEditMode}
          changeHandler={Store.onEditModePress.bind(Store)} />

        <HiddenSpellsArea/>
      </SideBarStyled>
    )
  }
})
