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
    this.authService.angularFire.auth.subscribe((auth) => {
      this.ownerKey = auth.uid;
    });
  }

  save() {
    console.log('save', this.ownerKey);
  }

}
