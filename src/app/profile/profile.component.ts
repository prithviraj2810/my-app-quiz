import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  errmessage: string;
  username : string;
  examobject: any;
  exams: any[];
  passcode : any;
  password : any;
  pass1 = "abcdef";
  pass2 = "ghijkl";
  pass3 = "mnopqr";


  

  


  constructor(private authService: FirebaseService, private router: Router) {
    this.username=this.authService.getUsername();
    //authService.getexams();
    this.examobject=authService.examsRef;
    this.examobject.valueChanges().subscribe((exams) => { 
    this.exams = exams;
  });
    }

  ngOnInit(): void {
    
  }
   
  submit(password: any): void {
    this.passcode = prompt("Please type the passcode for the exam")
    if (this.passcode == null || this.passcode == "") {
      location.href = "/profile"
    } else if ( this.passcode == password ) {
      localStorage.setItem('exam_pin', this.passcode)
      location.href = "/instructions"
    } 
  }

  onRightClick() {
    return false;
  }

  disable(event: any) {
    if (event.ctrlKey && event.shiftKey && event.keyCode == 67) {
    return false;
  } else if (event.keyCode == 123) {
    return false; //Disable F12
  } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    return false; //Disable ctrl+shift+i
}
}
}
