import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit{

  isLoading: boolean = true;
  item$: FirebaseObjectObservable<any[]>;
  item: any;

  constructor(private angularFire: AngularFire,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.item$ = this.angularFire.database.object(`/items/${id}`);
      this.item$.subscribe((item) => {
        console.log('on', item);
        this.item = item;
        this.isLoading = false;
      });
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


  updateItem(key: string, title: string, sum: number) {
    this.item$.update({ title, sum });
  }
  deleteItem(key: string) {
    this.item$.remove();
  }

  onClickItem(item) {
    this.router.navigate(['/items', item.$key]);
  }

}
