import { VNode } from 'vue'
import { component } from 'vue-tsx-support'
import { InfoTextStyled } from './styled'
import FaIcon from './FaIcon'
import { faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'

export default component({
  render (h):VNode {
    return <InfoTextStyled class="appInfo">
          <h1>Заклинания D&D 5 редакция</h1>
          <h2>
              Что есть
          </h2>
          <p>
              Список заклинаний из Players Handbook D&D5 на русском и английском языках. Заклинания Барда (Bard),
              Клерика (Cleric), Друида (Druid), Рейнджера (Ranger), Паладина (Paladin), Чародея (Sorcerer),
              Колдуна (Warlock), Волшебника (Wizard) из Players Handbook, Dungeon Master Manual, Temple of
              Elemental Evil и Sword Coast Adventurers Guide с заклинаниями разных архетипов классов.
          </p>
          <p>
              Заклинания можно фильтровать по:
          </p>
          <ul>
              <li>названию</li>
              <li>классам</li>
              <li>уровням</li>
              <li>школам</li>
              <li>языкам</li>
          </ul>
          <h2>
              Скрытие заклинаний
          </h2>
          <p>
              Карточку заклинаний можно скрыть из общего списка, если нажать на <FaIcon icon={faEyeSlash}
              aria-hidden="true" /> в правом верхнем углу карточки.
              В таком случае заклинание исчезнет из общего списка и его название будет отображаться в самом низу панели фильтров.
              Если нажать на название, заклинание вернется в общий список.
          </p>
          <h2>
              Закрепление заклинаний
          </h2>
          <p>
              Карточки заклинаний можно закреплять - в таком случае они будут отображаться в самом верху списка
              заклинаний. Для закрепления нужно нажать на <FaIcon icon={faLock} aria-hidden="true" /> в левом
              верхнем углу карточки заклинаний. Можно закреплять карточки заклинаний разных классов. При
              закреплении заклинания, оно не исчезает из общего списка. Если нажать на заголовок "Закрепленные
              заклинания", закрепленные карточки скроются (чтобы не мешать). На закрепленные заклинания не
              действуют никакие фильтры.
          </p>

          <h2>
              Выделение заклинаний
          </h2>
          <p>
              Чтобы сотворить что-нибудь жуткое сразу с несколькими карточками заклинаний, их можно выделить,
              кликая по ним с зажатой клавишей [CTRL]. Кроме того, сочетание клавиш [CTRL]+[A] выделит все
              карточки, или уберет выделение со всех карточек, если они и так уже выделены.
          </p>
          <p>
              Когда карточки выделены, массово можно делать следующее:
          </p>
          <ul>
              <li>Менять размер шрифта текста заклинаний. Размер шрифта у всех будет такой, как на карточке, на
                  которой нажимается Плюс или Минус, для изменения размера шрифта.
              </li>
              <li>Менять ширину карточек. Кнопки в меню будут менять размер только у выделенных карточек, либо у
                  всех, если выделенных нет.
              </li>
              <li>Закреплять/Откреплять карточки. При клике на иконке замка <FaIcon icon={faLock} /> на любой из карточек будут закреплены все выделенные.
                  Аналогично при откреплении закрепленных карточек.
              </li>
              <li>Прятать карточки. При клике на иконке глаза  <FaIcon icon={faLock} aria-hidden="true"
                  /> на любой из карточек будут скрыты все выделенные.
              </li>
          </ul>

          <h2>Печать заклинаний</h2>
          <p>
              Если есть закрепленные заклинания, то печататься будут только они.<br />
              Если вы хотите распечатать заклинания, лучше всего делать это через Chrome (удобные настройки
              печати). Для этого надо:
          </p>
          <ul>
              <li>нажать сочетание клавиш [Ctrl]+[P]</li>
          </ul>
          <p>И, если все устраивает, нажать кнопку "Печать", либо:</p>
          <ul>
              <li>в появившемся окне нажать "Дополнительные настройки"</li>
              <li>выбрать поля "Персонализированные"</li>
              <li>перетянуть мышкой поля так, чтобы карточки нормально распределились по листу <small>(помните,
                  что обычно принтер печатает с полями, если сделать поля слишком маленькие, при печати часть
                  карточек может обрезаться)</small></li>

          </ul>

          <p>
              Если есть вопросы или предложения, начните <a style="color: #0288d1;"
              href="https://github.com/katoquro/DnD_SpellBook_5e/discussions">Discussion</a> на GitHub.
          </p>
          <p>
              <a style="color: #0288d1;" href="https://github.com/Etignis/DnD_SpellList_eng_rus" target="_blanc">Исходный
                  код проекта</a>
          </p>
      </InfoTextStyled>
  }
})
