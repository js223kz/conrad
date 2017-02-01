import { Component, EventEmitter, Output } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ConstantService } from '../providers/constant.service';

@Component({
  selector: 'form-dropdown',
  template: `<div id="system-dropdown-wrapper">
              <ion-label id="dropdown-label">Välj värmesystem</ion-label>
              <ion-select id="dropdown-select" (ionChange)=onChange($event) required>
                <ion-option  *ngFor="let i of heatSystems"
                  [value]="i.dbName"
                  [selected]="i.dbName == this.defaultSelected">
                  {{i.displayName}}
                </ion-option>
              </ion-select>
            </div>`,
            styles: [`
                      #system-dropdown-wrapper{
                        overflow: hidden;
                        border-top: 1px solid #ccc;
                        border-bottom: 1px solid #ccc;
                        margin-bottom: 20px;

                      }
                      #dropdown-label{
                        float: left;
                        width: 50%;
                      }
                      #dropdown-select{
                        float: left;
                        width: 50%;
                      }`
                    ]

})

export class FormDropDown {
  heatSystems: Object[];
  defaultSelected: string;
  @Output() selectedHeatSystem = new EventEmitter<String>();

  constructor(platform: Platform, public constantService: ConstantService) {

    this.heatSystems = constantService.HEATSYSTEMS;
    this.defaultSelected = this.heatSystems[0]["dbName"];

    platform.ready().then(() => {
      this.onChange(this.defaultSelected);
    });
  }

  onChange(selected){
    this.selectedHeatSystem.emit(selected);
  }
}
