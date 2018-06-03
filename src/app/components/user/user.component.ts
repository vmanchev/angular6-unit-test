import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();
  users: User[] = [];

  constructor(
    public userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.getData(params));
  }

  getData(params: any) {
    params.id ? this.getUserById(params.id) : this.getAllUsers();
  }

  getUserById(id: number) {
    this.userService.getById(id).subscribe((response: User) => {
      this.user = response;
    });
  }

  getAllUsers() {
    this.userService.getAll().subscribe((response: User[]) => {
      this.users = response;
    });
  }

}
