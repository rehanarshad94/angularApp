import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit{

  user: any={}

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };//Decorator

  /**
   * fetches data, shows snackbar and connects the router
   * @param fetchApiDataService 
   * @param snackBar 
   * @param router 
   */
  constructor(
    public fetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Make API call to get user info, change the format of 'Birthday' property of localDateString
   * and set the uer variable to the user object
   * @returns object with user information
   */
  getUserInfo(): void {
    this.fetchApiDataService.getUser().subscribe((res: any)=>{
      this.user={
        ...res,
        Birthday: new Date(res.Birthday).toLocaleDateString()
      };
      //console.log('getUserInfo():', this.user);
      return this.user;
    })
  }

  /**
   * Log out the user
   * 
   * @remarks
   * Make API call to delete the user, navigate of welcome-page and remove user info from localStorage
   */
  onDeleteAccount(username: string): void {
    if (confirm('Are you sure you want to delete your account? This action cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 3000
        });
      });
    }

    this.fetchApiDataService.deleteUser().subscribe(res=>{
      console.log('deleteAccountRes:', res);
    })
  }

  /**
   * Update user info
   * 
   * @remarks
   * Make API call to update the user, reset the localstorage and reload the profile-page
   */
  onUserUpdate(): void {
    this.fetchApiDataService.editUser().subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      localStorage.setItem('username', response.Username);
      this.snackBar.open('Your profile is updated successfully!', 'OK', {
        duration: 4000
      });
      window.location.reload();
    }, (response) => {
      //Error response
      //console.log('onUserUpdate() response2:', response);
      this.snackBar.open(response.errors[0].msg, 'OK', {
        duration: 6000
      });
    });
  }
}