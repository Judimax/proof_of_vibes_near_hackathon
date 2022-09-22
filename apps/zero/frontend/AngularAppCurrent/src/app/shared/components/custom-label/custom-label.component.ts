import { ChangeDetectionStrategy, Component } from "@angular/core";
import { WmlLabelComponent } from "@shared/wml-components/wml-fields/wml-label/wml-label.component";

@Component({
  selector: 'wml-label',
  templateUrl: './custom-label.component.html',
  styleUrls: ['../../wml-components/wml-fields/wml-label/wml-label.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class CustomLabelComponent extends WmlLabelComponent  {}