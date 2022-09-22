// angular
import { ChangeDetectorRef, Component, forwardRef, HostBinding, Input } from '@angular/core';

// reactive forms
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// rxjs
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


// wml-components
import { WMLField } from '../wml-fields/wml-fields.component';
import { WmlDropdownOptionsMeta } from './wml-dropdown-option/wml-dropdown-option.component';
import { WmlDropdownSampleComponent } from './wml-dropdown-sample/wml-dropdown-sample.component';
import { WmlDropdownService } from './wml-dropdown-service/wml-dropdown.service';

@Component({
  selector: 'wml-dropdown',
  templateUrl: './wml-dropdown.component.html',
  styleUrls: ['./wml-dropdown.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WmlDropdownComponent),
      multi: true
    }
  ]
})
export class WmlDropdownComponent implements ControlValueAccessor {

  @Input('meta') meta: WmlDropdownMeta = new WmlDropdownMeta();
  constructor(
    private cdref: ChangeDetectorRef,
    private wmlDropdownService: WmlDropdownService,
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub = new Subject<void>()
  communicateWithParentSubj = new Subject<WmlDropdownParentSubjParams>()
  communicateWithRootOptionSubj = new Subject<WmlDropdownParentSubjParams>();
  communicateWithRootDropdownSubj = new Subject<WmlDropdownOptionsMeta | null>();

  ngOnInit(){
    this.updateRootDropdownStyle();
  }


  ngAfterViewInit() {

    this.showInitalOptionAndSetAsRoot();
    this.attachRootInformationToChildren();
    this.attachParentInformationToChildren();
    this.subscribeToCommunicateWithParentSubj().subscribe();
    this.setCommunicateWithParentSubj();
    this.subscribeToCommunicateWithRootDropdownSubj()?.subscribe();
  }

  showInitalOptionAndSetAsRoot() {


    if (this.meta._root) {
      if (this.meta.options.length === 0) {
        this.meta.options = [new WmlDropdownOptionsMeta({
          display: {
            cpnt: WmlDropdownSampleComponent,
            meta: {}
          }
        })]
      }
      this.meta.options[0].class = "Pod0Item0";
      this.meta.options[0]._root = true
    }
    this.cdref.detectChanges();

  }
  updateRootDropdownStyle() {
    if (this.meta._root) {
      this.meta.options[0].dropdownChild.dropdownStyle = { width: "100%" };
      this.meta.dropdownStyle = {position:"relative"}
    }
  }

  attachRootInformationToChildren() {
    if (this.meta._root) {
      let allOptions = this.wmlDropdownService.pullAllDropdownOptionsViaDropdown(this.meta);

      allOptions.forEach((option) => {
        option.rootDropdown = this.meta;
        option.rootOption = this.meta.options[0];
        option.communicateWithRootOptionSubj = this.communicateWithRootOptionSubj
        option.communicateWithRootDropdownSubj = this.communicateWithRootDropdownSubj
      })

      

      let allDropdowns = this.wmlDropdownService.pullAllDropdowns(this.meta,false)
      allDropdowns.forEach((dropdown) => {
        dropdown.wmlField = this.meta.wmlField;
      })
    }
  }


  attachParentInformationToChildren() {
    if (this.meta._root) {
      let allOptions = this.wmlDropdownService.pullAllDropdownOptionsViaDropdown(
        this.meta,
        (parentDropdown, parentOption, child) => {

          child.options.forEach((option) => {
            option.parentDropdown = parentDropdown;
            option.parentOption = parentOption;

          })
        }
      );
      allOptions.forEach((option) => {
        option._rootIsReadySubj.next();
      })
    }
  }

  subscribeToCommunicateWithParentSubj() {
    return this.communicateWithParentSubj
      .pipe(
        takeUntil(this.ngUnsub),
        tap((resp) => {

          if (resp.type === "showDropdown") {
            this.showDropdown(resp);
          }
          else if (resp.type === "hideDropdown") {
            this.hideDropdown(resp);
          }


        })
      )
  }

  subscribeToCommunicateWithRootDropdownSubj() {
    if (this.meta._root) {
      return this.communicateWithRootDropdownSubj
        .pipe(
          takeUntil(this.ngUnsub),
          tap((resp) => {
            this.writeValue(resp)
            let {parentForm,formControlName} = this.meta.wmlField.field
            parentForm.patchValue({
              [formControlName]: resp
            })
            parentForm.controls[formControlName].markAsDirty()
          })
        )
    }
    else {
      return null
    }
  }


  onChange: Function = () => { }
  onTouch: Function = () => { }


  writeValue(val: WmlDropdownOptionsMeta | null) {
    this.onChange(val)
    this.onTouch(val)
  }

  registerOnChange(fn: Function) {
    this.onChange = fn
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn
  }


  /**@TODO refactor to attachParentInformationToChildren */
  setCommunicateWithParentSubj() {
    this.meta.options.forEach((option) => {
      option.communicateWithParentSubj = this.communicateWithParentSubj;
    });
  }

  showDropdown(resp: WmlDropdownParentSubjParams) {

    resp.option.dropdownChild.options.forEach((option) => {
      option.class = "Pod0Item0";

    });

    this.cdref.detectChanges();

  }

  hideDropdown(resp: WmlDropdownParentSubjParams) {
    this.meta.options.forEach((option) => {
      option.dropdownChild.options.forEach((option1) => {
        option1.class = "Pod0Item1";
      })
    })
  }

  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}

export class WmlDropdownParentSubjParams {
  constructor(params: Partial<WmlDropdownParentSubjParams> = {}) {
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  type!: "showDropdown" | "hideDropdown" | "selectOption"
  option!: WmlDropdownOptionsMeta
}

export class WmlDropdownMeta {
  constructor(params: Partial<WmlDropdownMeta> = {}) {
    Object.assign(
      this,
      {
        ...params
      }
    )


  }
  _root = true
  wmlField: WMLField = new WMLField();
  options: Array<WmlDropdownOptionsMeta> = []
  dropdownStyle: any = {}

}