import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOptionModel } from './radioOption.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>RadioComponent),
      multi: true
    
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {


  @Input() options: RadioOptionModel[];
  value: any;
  onChange: any;

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any){
    this.value = value;
    this.onChange(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
    //Chamado quando a diretiva quer passar um valor
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    //Chamado sempre que o valor interno do componente muda
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }




}
