import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  question =
  [
    {
    que: "What is your language?",
    choices: [ "Kannada", "Hindi", "English"]
    
    },

    {
    que: "What is your city?",
    choices: ["Dharwad", "Hubli", "belgaum", "question1"]
    },

    {
      que: "What is your language?",
      choices: [ "Kannada", "Hindi", "English", "question2" ]
    },

    {
      que: "What is your city?",
      choices: ["Dharwad", "Hubli", "belgaum", "question3" ]
    },
      

  ]

  index=0
  not_visited = 89
  ans: any
  answers: Array<any> = new Array(this.question.length).fill(null);
  tempanswers: Array<any> = new Array(this.question.length).fill(null);
  radiostatus: false

  constructor() { }

  ngOnInit(): void {
  }

  change(event : any, index: any): void {
    this.ans = event.target.value
  }

  reset() {
    this.ans = null
    this.answers[this.index] = null
    this.radiostatus = false
    return this.radiostatus
  }

  savenext(index: any): void {
    this.answers[this.index] = this.ans
    this.index += 1;
    this.ans = this.answers[this.index]
    this.not_visited -= 1
    this.radiostatus = false
  }

  prev() : void {
    this.tempanswers[this.index] = this.ans 
    this.index -= 1;
    if (this.answers[this.index] != null) {
      this.ans = this.answers[this.index]
    }
    else {
      this.ans = this.tempanswers[this.index]
    }
  }

  next() : void {
    this.tempanswers[this.index] = this.ans 
    this.index += 1;
    if (this.answers[this.index] != null) {
    this.ans = this.answers[this.index]
    }
    else {
      this.ans = this.tempanswers[this.index]
    }
    this.not_visited -= 1
  }

  navigate(queno: any) {
    this.index = queno - 1
    if (this.answers[this.index] != null) {
      this.ans = this.answers[this.index]
      }
      else {
        this.ans = this.tempanswers[this.index]
      }
  }

}
