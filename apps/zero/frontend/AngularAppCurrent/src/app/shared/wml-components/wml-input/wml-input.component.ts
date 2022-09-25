// angular
import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';

// reactive forms
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// wml-components
import { WMLField } from '../wml-fields/wml-fields.component';


@Component({
  selector: 'wml-input',
  templateUrl: './wml-input.component.html',
  styleUrls: ['./wml-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WmlInputComponent),
      multi: true
    }
  ]
})
export class WmlInputComponent implements OnInit, ControlValueAccessor {

  @Input('meta') meta: WmlInputMeta = new WmlInputMeta();
  constructor() { }

  ngOnInit(): void {
    // console.log(this.meta)
  }

  triggerChange(evt: any) {
    this.writeValue(evt.target.value)
  }

  onChange: Function = () => { }
  onTouch: Function = () => { }


  writeValue(val: any) {
    if(val === ""){
      val = null
    }
    this.onChange(val)
    this.onTouch(val)    
  }

  registerOnChange(fn: Function) {
    this.onChange = fn
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn
  }
}

export class WmlInputMeta {
  constructor(params: Partial<WmlInputMeta> = {}) {
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

  type: "range"| "input" | "number" | "password" | "email" | "tel" | "textarea" = "input";
  wmlField: WMLField = new WMLField()
}
