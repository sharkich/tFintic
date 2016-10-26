import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  ownerKey: string = '';
  currentMonth: string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.currentMonth = this.authService.getCurrentMonth();
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
    this.authService.setCurrentMonth(this.currentMonth);
    this.router.navigate(['/']);
  }

}
