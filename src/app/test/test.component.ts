import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
import { storage } from 'firebase';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  questions: any
  index=0
  ans: any
  answers:Array<any>
  tempanswers: Array<any>
  not_visited: Array<any>
  sum_not_visited: any
  not_answered: Array<any>
  sum_not_answered = 0
  answered: Array<any>
  sum_answered = 0
  save_mark_rev: Array<any>
  sum_save_mark_rev = 0
  mark_rev: Array<any>
  sum_mark_rev = 0
  radiostatus: false
  status: Array<any>
  errmessage: string
  
  constructor(private router: Router, private authService: FirebaseService) { 
    this.authService.getquestions().then((res) => {
      if (res.code==="success"){
        this.questions = res.message//res.message will give you questions list
        console.log(res.message);
      }
      else{
        console.log(res.message);
        //res.message will give you error here
      }

    });

    this.answers = new Array(this.questions.length).fill("")
    this.tempanswers = new Array(this.questions.length).fill(null);
    this.not_visited = new Array(this.questions.length).fill(1);
    this.sum_not_visited = this.not_visited.reduce((a, b) => a + b, 0) - 1;
    this.not_answered = new Array(this.questions.length).fill(0);
    this.answered = new Array(this.questions.length).fill(0);
    this.save_mark_rev = new Array(this.questions.length).fill(0);
    this.mark_rev = new Array(this.questions.length).fill(0);
    this.status= new Array(this.questions.length).fill("");
  }

  ngOnInit() {

  }
  

  change(event : any, index: any): void {
    this.ans = event.target.value
  }

  reset() {
    this.ans = ""
    this.answers[this.index] = ""
    this.answered[this.index] = 0
    this.radiostatus = false
    return this.radiostatus
  }

  savenext(index: any): void {
    this.answers[this.index] = this.ans
    this.index += 1;
    this.ans = this.answers[this.index]
    this.radiostatus = false
    this.not_visited[0] = 0
    if (this.not_visited[this.index] == 1) {
      this.not_visited[this.index] = 0
    }
    this.sum_not_visited = this.not_visited.reduce((a, b) => a + b, 0);
    if (this.answers[this.index - 1] != "") {
      this.answered[this.index - 1] = 1
      this.status[this.index-1] = "savenext"
    }
    this.sum_answered = this.answered.reduce((a, b) => a + b, 0)
    if (this.answers[this.index - 1] == "") {
      this.not_answered[this.index - 1] = 1
      this.status[this.index-1] = "notanswered"
    } else {
      this.not_answered[this.index - 1] = 0
    }
    this.sum_not_answered = this.not_answered.reduce((a, b) => a + b, 0)
    if (this.save_mark_rev[this.index - 1] == 1) {
      this.save_mark_rev[this.index - 1] = 0
    }
    this.sum_save_mark_rev = this.save_mark_rev.reduce((a, b) => a + b, 0)
    if (this.mark_rev[this.index - 1] == 1) {
      this.mark_rev[this.index - 1] = 0
    }
    this.sum_mark_rev = this.mark_rev.reduce((a, b) => a + b, 0)
    
  
  }

  prev() : void {
    this.tempanswers[this.index] = this.ans 
    this.index -= 1;
    if (this.answers[this.index] != "") {
      this.ans = this.answers[this.index]
    }
    else {
      this.ans = this.tempanswers[this.index]
    }
    this.not_visited[0] = 0
    if (this.not_visited[this.index] == 1) {
      this.not_visited[this.index] = 0
    }
    this.sum_not_visited = this.not_visited.reduce((a, b) => a + b, 0);
    if (this.answers[this.index+1] == "")  {
      if (this.mark_rev[this.index + 1] != 1) {
        this.not_answered[this.index + 1] = 1
      this.status[this.index+1] = "notanswered"
      this.answered[this.index + 1] = 0
      }
    }
    this.sum_mark_rev = this.mark_rev.reduce((a, b) => a + b, 0)
    this.sum_answered = this.answered.reduce((a, b) => a + b, 0)
    this.sum_not_answered = this.not_answered.reduce((a, b) => a + b, 0)
  }

  next() : void {
    this.tempanswers[this.index] = this.ans 
    this.index += 1;
    if (this.answers[this.index] != "") {
    this.ans = this.answers[this.index]
    }
    else {
      this.ans = this.tempanswers[this.index]
    }
    this.not_visited[0] = 0
    if (this.not_visited[this.index] == 1) {
      this.not_visited[this.index] = 0
    }
    this.sum_not_visited = this.not_visited.reduce((a, b) => a + b, 0)
    if (this.answers[this.index-1] == "")  {
      if (this.mark_rev[this.index - 1] != 1) {
        this.not_answered[this.index - 1] = 1
      this.status[this.index-1] = "notanswered"
      this.answered[this.index - 1] = 0
      }
    }
    this.sum_mark_rev = this.mark_rev.reduce((a, b) => a + b, 0)
    this.sum_answered = this.answered.reduce((a, b) => a + b, 0)
    this.sum_not_answered = this.not_answered.reduce((a, b) => a + b, 0)
    
  }

  navigate(queno: any) {
    this.tempanswers[this.index] = this.ans 
    if (this.answers[this.index] == "")  {
      if (this.mark_rev[this.index] != 1) {
        this.not_answered[this.index] = 1
      this.status[this.index] = "notanswered"
      }
    }
    this.sum_not_answered = this.not_answered.reduce((a, b) => a + b, 0)
    this.index = queno - 1
    if (this.answers[this.index] != "") {
      this.ans = this.answers[this.index]
      }
      else {
        this.ans = this.tempanswers[this.index]
      }
      this.not_visited[0] = 0
      if (this.not_visited[this.index] == 1) {
      this.not_visited[this.index] = 0
      }
      this.sum_not_visited = this.not_visited.reduce((a, b) => a + b, 0);
  }

  save_mark_review(index: any) {
    this.answers[this.index] = this.ans
    this.index += 1;
    this.ans = this.answers[this.index]
    this.radiostatus = false
    this.not_visited[0] = 0
    if (this.not_visited[this.index] == 1) {
      this.not_visited[this.index] = 0
    }
    this.sum_not_visited = this.not_visited.reduce((a, b) => a + b, 0);
    if (this.answers[this.index - 1] != "") {
      this.save_mark_rev[this.index - 1] = 1
      this.status[this.index-1] = "save_mark_rev"
    } else {
      alert("Please choose and option to proceed")
      this.index -= 1
    }
    this.sum_save_mark_rev = this.save_mark_rev.reduce((a, b) => a + b, 0)

    if (this.answers[this.index - 1] == "") {
      this.not_answered[this.index - 1] = 1
      this.status[this.index-1] = "notanswered"
    } else {
      this.not_answered[this.index - 1] = 0
    }
    this.sum_not_answered = this.not_answered.reduce((a, b) => a + b, 0)

    if (this.answers[this.index - 1] == "") {
      this.answered[this.index - 1] = 1
      this.status[this.index - 1] = "answered"
    } else {
      this.answered[this.index - 1] = 0
    }
    this.sum_answered = this.answered.reduce((a, b) => a + b, 0)

    if (this.mark_rev[this.index - 1] == 1) {
      this.mark_rev[this.index - 1] = 0
    }
    this.sum_mark_rev = this.mark_rev.reduce((a, b) => a + b, 0)
  
  }

  mark_review(index: any) {
    if (this.answers[this.index] != "") {
      this.answers[this.index] = ""
      this.answered[this.index] = 0
    }
    this.sum_answered = this.answered.reduce((a, b) => a + b, 0)
    this.tempanswers[this.index] = this.ans 
    this.index += 1;
    this.ans = this.tempanswers[this.index]
    this.not_visited[0] = 0
    if (this.not_visited[this.index] == 1) {
      this.not_visited[this.index] = 0
    }
    this.sum_not_visited = this.not_visited.reduce((a, b) => a + b, 0)
    if (this.tempanswers[this.index -1 ] == null && this.status[this.index - 1] == "savenext" ) {
      this.answered[this.index - 1] == 0
    }
    this.sum_answered = this.answered.reduce((a, b) => a + b, 0)
    if (this.tempanswers[this.index - 1] == null || this.tempanswers[this.index -1] != null) {
      this.not_answered[this.index - 1] = 0
    }
    this.sum_not_answered = this.not_answered.reduce((a, b) => a + b, 0)
    if (this.save_mark_rev[this.index - 1] == 1) {
      this.save_mark_rev[this.index - 1] = 0
      this.answers[this.index] = ""
    }
    this.mark_rev[this.index-1] = 1
    this.status[this.index-1] = "mark_rev"
    this.sum_mark_rev = this.mark_rev.reduce((a, b) => a + b, 0)
    this.sum_save_mark_rev = this.save_mark_rev.reduce((a, b) => a + b, 0)
  }
  
  
testsubmit() {
  var response = confirm("Are you sure you want to submit your answers before the time?")
  if (response) {
    var exam_id = "Test1";
    var inst_id = "DPS";
    this.authService.submit(exam_id, inst_id, this.answers).then((res) => {
     if (res.code === "success") {
       this.authService.logout()
       this.router.navigate(["/"])
      }
      else {
        this.errmessage = res.message
      }
    });
    
  }
 }



  }
