import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  exam_id : "demotest";
  errmessage : string;
  passcode : string;
  questions : any;
  constructor(private authService: FirebaseService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

   
  submit(): void {
    this.passcode = prompt("Please type the passcode for the exam")
    this.authService.verifypasscode(this.exam_id,this.passcode).then((res) => {
      if (res.code==="success"){
        this.questions=res.message;

        console.log(res.message);
       
  
      }
      else {
        this.errmessage=res.message 
      }
  
    });

  }
}
