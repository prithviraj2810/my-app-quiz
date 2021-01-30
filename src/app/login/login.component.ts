import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    institution:''
 };



  errmessage: string;

  

  constructor(private authService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('bg-img');
    
  }


  login() {    
    
     this.authService.login(this.user.email, this.user.password).then((res) => {
       if (res.code==="success"){
         console.log(this.authService.getUsername());
         window.localStorage.setItem("college", this.user.institution)
         window.localStorage.setItem("username", this.user.name)
         console.log(res.message);
         console.log("college")
        this.router.navigate(['/profile']);

       }
       else{
         this.errmessage=res.message
         this.user.email=this.user.password='';
       }

     });
     }
    
}

