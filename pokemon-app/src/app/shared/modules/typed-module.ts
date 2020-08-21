import { NgModule } from '@angular/core';
import { NgTypedDirective } from '../directives/typed.directive';
import {CommonModule} from '@angular/common';

// see https://github.com/VladimirAntin/ng-typed
@NgModule({
    imports: [CommonModule],
    declarations: [
        NgTypedDirective
    ],
    exports: [
        NgTypedDirective
    ]
})
export class NgTypedModule { }