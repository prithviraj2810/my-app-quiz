import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase,AngularFireList,AngularFireObject } from '@angular/fire/database';
import { AngularFireFunctions } from '@angular/fire/functions';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  exam_id: any
  passcode: any
  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  public college:string;
  
  public examsRef:any;
  
 

  constructor(private firebaseAuth: AngularFireAuth, private database: AngularFireDatabase,private fns: AngularFireFunctions) {
    // this.college = 'ABCPUcollege'
    this.user = firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          
        }
        else {
          this.userDetails = null;
        }
      }
    );
      this.examsRef=database.list('/Institution-ID/'+this.college);
    

     }
  
  login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => { 
        
        this.userDetails=value.user;
        return { message:this.userDetails, code : 'success' };
            }).catch(err => { 
                return { message : err.message , code:'error'};});
              
    
     }


  logout() {
      this.firebaseAuth.signOut();
      this.userDetails=null;
      
  }

  isAuthenticated(){
    if (this.userDetails == null ) {
      return false; }
    else {
      return true;
    }

  }




  getUsername() {
      if (this.userDetails != null ) {
        var name = this.userDetails.email.split("@");
        if(name[0]!=""){
          return name[0];
        }
        else{
        return this.userDetails.email; }
      }
        else{
          return null;
        }
  }


  submitAnswers(exam_id, answers){
    const callable = this.fns.httpsCallable('submitAnswers');
    const data={ examid : exam_id, answers: answers, college_id : this.college};
    return callable(data).toPromise().then((res)=>{
      return res;
    }).catch(err => { 
      return { message : "server error" , code:'error'}});
    
    
  }


  submit(exam_id, institution_id, answers){
    /*
    submit(){
    //this.authService.logout()
    const exam_id = 'exam_123x';
    const institution_id = 'DPS';
    const answers = [1,2,4,3,4,4,32]
    this.authService.submit(exam_id, institution_id, answers).then((res) => {
      if (res.code==="success"){
        console.log(res.message);
        // what you want to do after submission successfully
      }
      else{
        console.log(res.message);
        // what you want to do if submission fails
      }

    });
  }
    */

    const email_id = this.getUsername();
    var updates = {};
    updates['results/'+institution_id+'/'+exam_id+'/'+email_id] = answers;
    return this.database.database.ref().update(
      updates).then((res)=>
      {
        return { message : "Submission Succcessfull" , code: 'success'};
    }).catch(error => { 
      return { message : error.message , code: 'error'};});
  }

  
  // getexams(){
  //   this.database.list('/mockexams').valueChanges().subscribe((exams) => { 
      
  //     this.exams = exams });
  // }
  // return this.callable(data).subscribe((res)=>{
  //   if(res){
  //     console.log(res);
  //     return res;
  //   }
    
  // })
  
   getquestions() {
    /*
    getquestions() {    
    
      this.authService.getquestions().then((res) => {
        if (res.code==="success"){
          //res.message will give you questions list
          console.log(res.message);
        }
        else{
          console.log(res.message);
          //res.message will give you error here
        }
 
      });
      }
      */
    this.exam_id = localStorage.getItem('exam_name')
    this.college = localStorage.getItem('college')
    return this.database.database.ref('/Institutions/'+this.college+'/'+this.exam_id).once('value').then((snapshot) => {
      return { message : snapshot.val().questions , code: 'success'};}).catch(error => { 
        return { message : error.message , code: 'error'};});
    
}
/*
      Sample how questions are stored in database
******* Format *******
"Institutions": {
  "<college1>": {
    "<exam_id>": {
      questions : [q1,q2,q3]
    }
  },
  "<college2>": {
    "<exam_id>": {
      questions : [q1,q2,q3]
    }
  }
}
******* example ********
"Institutions":{
    "DPS": {
      "exam_123": {
        "questions": [
          {
          "que": "What is your language?",
          "choices": [ "Kannada", "Hindi", "English"]
          
          },
      
          {
          "que": "What is your city?",
          "choices": ["Dharwad", "Hubli", "belgaum", "question1"]
          },
      
          {
            "que": "What is your language?",
            "choices": [ "Kannada", "Hindi", "English", "question2" ]
          },
      
          {
            "que": "What is your city?",
            "choices": ["Dharwad", "Hubli", "belgaum", "question3" ]
          },
      
          {
            "que": "What is your language?",
            "choices": [ "Kannada", "Hindi", "English"]
            
            },
        
            {
            "que": "What is your city?",
            "choices": ["Dharwad", "Hubli", "belgaum", "question1"]
            },
        
            {
              "que": "What is your language?",
              "choices": [ "Kannada", "Hindi", "English", "question2" ]
            },
        
            {
              "que": "What is your city?",
              "choices": ["Dharwad", "Hubli", "belgaum", "question3" ]
            },
      
            {
              "que": "What is your language?",
              "choices": [ "Kannada", "Hindi", "English"]
              
              },
          
              {
              "que": "What is your city?",
              "choices": ["Dharwad", "Hubli", "belgaum", "question1"]
              }     
        ]
      }
    }
  }

*/
}