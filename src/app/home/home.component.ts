import { Component } from '@angular/core';
import { first } from 'rxjs';
import { User } from '../model';
import { AuthenticationService, UserService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loading = false;
  user: User;
  userFromApi?: User;

  constructor(
      private userService: UserService,
      private authenticationService: AuthenticationService
  ) {
      this.user = <User>this.authenticationService.userValue;
  }

  ngOnInit() {
      this.loading = true;
      this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
          this.loading = false;
          this.userFromApi = user;
      });
  }

}
