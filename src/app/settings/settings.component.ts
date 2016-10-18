import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  ownerKey: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.getOwnerKey()) {
      this.ownerKey = this.authService.getOwnerKey();
    } else {
      this.authService.angularFire.auth.subscribe((auth) => {
        this.ownerKey = auth.uid;
      });
    }

  }

  save() {
    console.log('save', this.ownerKey);
    this.authService.setOwnerKey(this.ownerKey);
  }

}
