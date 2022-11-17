import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { User, UsersService } from '@eshop/products';
import { MessageService } from 'primeng/api';
 
 

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  
  constructor(
    private usersService: UsersService,
    private router: Router,
    private messageService : MessageService,


 
    



  ) { }

  ngOnInit(): void {
    this._getUsers();

  }
  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  updateUser(userid: string) {
    this.router.navigateByUrl(`users/form/${userid}`);
  }

  deleteUser(userId: string) {
  
    this.usersService.deleteUser(userId).subscribe( () => { 
      this._getUsers();
      this.messageService.add({severity:'success', summary:' success', detail:'User deleted'});
    });

  
  }
}