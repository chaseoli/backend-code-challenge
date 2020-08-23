import {
  Component,
  ElementRef,
  Input,
  ViewEncapsulation,
  ContentChild
} from '@angular/core'
import { I18n } from 'carbon-components-angular/i18n'
import { OverflowMenuDirective } from 'carbon-components-angular/dialog'

/**
 * The OverFlow menu component encapsulates the OverFlowMenu directive, and the menu iconography into one convienent component
 *
 * [See demo](../../?path=/story/overflow-menu--basic)
 *
 * html:
 * ```
 * <ibm-overflow-menu>
 *	<ibm-overflow-menu-option>Option 1</ibm-overflow-menu-option>
 *	<ibm-overflow-menu-option>Option 2</ibm-overflow-menu-option>
 * </ibm-overflow-menu>
 * ```
 *
 * <example-url>../../iframe.html?id=overflow-menu--basic</example-url>
 */
@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styles: [
    `
      .bx--overflow-menu--open {
        opacity: 1;
      }

      /*
		Rotate the overflow menu container as well as the icon, since
		we calculate our menu position based on the container, not the icon.
		*/
      .bx--data-table-v2 .bx--overflow-menu {
        transform: rotate(90deg);
      }

      .bx--data-table-v2 .bx--overflow-menu__icon {
        transform: rotate(180deg);
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class SwitcherComponent {
  @Input() buttonLabel = this.i18n.get().OVERFLOW_MENU.OVERFLOW

  @Input() flip = false

  @Input() placement: 'bottom' | 'top' = 'bottom'

  @ContentChild(OverflowMenuDirective, { read: null })
  overflowMenuDirective: OverflowMenuDirective

  open = false

  constructor(protected elementRef: ElementRef, protected i18n: I18n) {}
}
