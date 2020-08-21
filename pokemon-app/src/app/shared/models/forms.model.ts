export interface ICarbonInput {
    theme?: string // 'dark', // select('Theme', ['dark', 'light'], 'dark'),
    disabled?: boolean, // boolean('Disabled', false),
    invalid?: boolean, // boolean('Show form validation', false),
    invalidText?: string // 'validation message here', // text('Form validation content', 'Validation message here'),
    label?: string // 'Text Input label', // text('Label', 'Text Input label'),
    helperText?: string // 'Optional helper text.', // text('Helper text', 'Optional helper text.'),
    placeholder?: string // 'Placeholder text', // text('Placeholder text', 'Placeholder text'),
    autocomplete?: string // 'on', // text('autocomplete', 'on'),
}

export class CarbonInput {

    public model: ICarbonInput;

    constructor(
        label: string,
        placeholderText?: string,
        optional?: boolean,
        helperText?: string
    ) {

        // call public model properties directly to override
        this.model = {

            theme: 'light', // select('Theme', ['dark', 'light'], 'dark'),

            // IMPORTANT: for 'disabled' see https://stackoverflow.com/questions/44469592/disabled-not-working-with-formcontrolname-into-model-driven-form-in-angular-2
            // see usage at pay.component.ts
            disabled: false, // boolean('Disabled', false), 

            invalid: false, // boolean('Show form validation', false),

            invalidText: 'validation message here', // text('Form validation content', 'Validation message here'),

            label: label, // text('Label', 'Text Input label'),

            // for required - see 'Optional vs. mandatory' at https://www.carbondesignsystem.com/patterns/forms-pattern
            helperText: '', // text('Helper text', 'Optional helper text.'),

            placeholder: '', // text('Placeholder text', 'Placeholder text'),

            autocomplete: 'on', // text('autocomplete', 'on'),

        }

        if (helperText) {
            this.model.helperText = helperText
        }

        if (placeholderText) {
            this.model.placeholder = placeholderText
        }

        if (optional) {
            this.model.label = label + '(optional)'
        }

    }

}