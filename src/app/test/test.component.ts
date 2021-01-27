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

      {
        que: "What is your language?",
        choices: [ "Kannada", "Hindi", "English"]
        
        },
    
        {
        que: "What is your city?",
        choices: ["Dharwad", "Hubli", "belgaum", "question1"]
        },      

  ]

  index=0
  ans: any
  answers: Array<any> = new Array(this.question.length).fill(null);
  tempanswers: Array<any> = new Array(this.question.length).fill(null);
  not_visited: Array<any> = new Array(this.question.length).fill(1);
  sum_not_visited = this.not_visited.reduce((a, b) => a + b, 0) - 1;
  not_answered: Array<any> = new Array(this.question.length).fill(0);
  sum_not_answered = 0
  answered: Array<any> = new Array(this.question.length).fill(0);
  sum_answered = 0
  save_mark_rev: Array<any> = new Array(this.question.length).fill(0);
  sum_save_mark_rev = 0
  mark_rev: Array<any> = new Array(this.question.length).fill(0);
  sum_mark_rev = 0
  radiostatus: false
  status: Array<any> = new Array(this.question.length).fill("");
  constructor() { }

  ngOnInit(): void {
  }

  change(event : any, index: any): void {
    this.ans = event.target.value
  }

  reset() {
    this.ans = null
    this.answers[this.index] = null
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
    if (this.answers[this.index - 1] != null) {
      this.answered[this.index - 1] = 1
      this.status[this.index-1] = "savenext"
    }
    this.sum_answered = this.answered.reduce((a, b) => a + b, 0)
    if (this.answers[this.index - 1] == null) {
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
    if (this.answers[this.index] != null) {
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
    if (this.answers[this.index+1] == null)  {
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
    if (this.answers[this.index] != null) {
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
    if (this.answers[this.index-1] == null)  {
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
    this.index = queno - 1
    if (this.answers[this.index] != null) {
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
    if (this.answers[this.index - 1] != null) {
      this.save_mark_rev[this.index - 1] = 1
      this.status[this.index-1] = "save_mark_rev"
    } else {
      alert("Please choose and option to proceed")
      this.index -= 1
    }
    this.sum_save_mark_rev = this.save_mark_rev.reduce((a, b) => a + b, 0)

    if (this.answers[this.index - 1] == null) {
      this.not_answered[this.index - 1] = 1
      this.status[this.index-1] = "notanswered"
    } else {
      this.not_answered[this.index - 1] = 0
    }
    this.sum_not_answered = this.not_answered.reduce((a, b) => a + b, 0)

    if (this.answers[this.index - 1] == null) {
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
      this.answers[this.index] = null
    }
    this.mark_rev[this.index-1] = 1
    this.status[this.index-1] = "mark_rev"
    this.sum_mark_rev = this.mark_rev.reduce((a, b) => a + b, 0)
    this.sum_save_mark_rev = this.save_mark_rev.reduce((a, b) => a + b, 0)
  }
  
  
  }
