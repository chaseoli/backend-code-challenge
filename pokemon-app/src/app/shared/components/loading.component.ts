import { Component, Input, HostBinding } from "@angular/core";
import { I18n } from 'carbon-components-angular/i18n';

// Usage:
//  <custom-loading isActive="true" size="normal" overlay="true" message="Wait one sec. Hold my beer..."></custom-loading>
@Component({
	selector: "custom-loading",
    template: `
    <div fxLayout="column" fxLayoutAlign="center center">
		<div
			[ngClass]="{
				'bx--loading--small': size === 'sm',
				'bx--loading--stop': !isActive && !overlay,
				'bx--loading-overlay--stop': !isActive && overlay
			}"
			class="bx--loading">
			<svg class="bx--loading__svg" viewBox="-75 -75 150 150">
				<title>{{title}}</title>
				<circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
            </svg>
        </div>
        <div>
            <p>
                > <span [ng-typed]="{speed: 40, cursor:'_', timeout: 1000, text: message}"> </span>
            </p>
            <p style="color: transparent;">
                > {{message}}_
            </p>
        </div>
    </div>
	`
})
export class CustomLoadingComponent {
	/**
	 * Accessible title for the loading circle.
	 * Defaults to the `LOADING.TITLE` value from the i18n service.
	 */
	@Input() title = this.i18n.get().LOADING.TITLE;

	/**
	 * set to `false` to stop the loading animation
	 */
	@Input() isActive = true;

	/**
	 * Specify the size of the button
	 */
	@Input() size: "normal" | "sm" = "normal";

	/**
	 * Set to `true` to make loader with an overlay.
	 */
    @Input() @HostBinding("class.bx--loading-overlay") overlay = false;
    
    @Input() message: string

	constructor(protected i18n: I18n) {}
}