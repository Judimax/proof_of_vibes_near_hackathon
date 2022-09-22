import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'wml-dropdown-sample',
  templateUrl: './wml-dropdown-sample.component.html',
  styleUrls: ['./wml-dropdown-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WmlDropdownSampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
