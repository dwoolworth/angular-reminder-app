import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

export function valueAccessor(type: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}

@Component({ template: '' })
export abstract class AbstractFormComponent<TValue = any> implements ControlValueAccessor {
    #changeFn = Function.prototype;
    #touchedFn = Function.prototype;
    #value: TValue | null = null;

    disabled = false;

    @Input() id = '';
    @Input() name = '';
    @Output() valueChange = new EventEmitter();

    @Input()
    set value(value: any) {
        if (this.#value !== value) {
            this.#value = value;
            this.notifyValueChange(this.#value);
        }
    }

    get value(): TValue | null {
        return this.#value;
    }

    writeValue(obj: any): void {
        this.#value = obj;
    }

    notifyValueChange(value: any) {
        this.valueChange.emit(this.#value);
        this.#changeFn(value);
    }

    notifyTouched() {
        this.#touchedFn();
    }

    registerOnChange(fn: any): void {
        this.#changeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.#touchedFn = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    setName(control: NgControl): void {
        if (control && typeof control.name == 'string' && !this.name) {
            this.name = control.name;
        }
    }
}
