import { Component, Input } from '@angular/core';
import { questionsList} from '../../models/questions';
import { decode } from 'html-entities';
import { QuizMakerConstants } from '../../constants/quiz-maker.constant';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {
  @Input() results: questionsList[] = [];
  noOfQuestions = QuizMakerConstants.AMOUNT;
  showSubmitButton : boolean = false;
  quizResult: questionsList[] = [];
  correctAnswerCount = 0;
  color:string ='';
  // showResults : boolean = false;

  constructor(private quizService: QuizService,
              private router: Router) { }

// create new questions-options on every click
  ngOnChanges(): void {
    // this.showResults = false;
    for (let option of this.results){
      option.question = decode(option.question);
      option.correct_answer = decode(option.correct_answer);
      option.selectedAnswer = '';

      //generate random inex
      let insertrandomIndex = Math.floor(Math.random() * 4);

      //insert correct answer into array 
      option.incorrect_answers.splice(insertrandomIndex, 0, option.correct_answer)
      
      for (const [key, value] of option.incorrect_answers.entries()) {
        option.incorrect_answers[key] = decode(value);
      }

    }
  }

  selectAnswer(questionIndex: number, answerIndex: number,  selectedOption: string){
    console.log(this.results[questionIndex].answeredIndex);

    if(this.results[questionIndex].answeredIndex !== answerIndex){
      this.results[questionIndex].answeredIndex = answerIndex;
      this.results[questionIndex].selectedAnswer = selectedOption;
    }
    else{
      this.results[questionIndex].answeredIndex = -1;
      this.results[questionIndex].selectedAnswer = '';
    }
    
    // to check length of results array
    let checkAllAnswered = this.results.filter(ele => ele.selectedAnswer && ele.selectedAnswer !== '');

    if (checkAllAnswered.length == this.noOfQuestions){
      this.showSubmitButton = true;
    }
    else {
      this.showSubmitButton = false;
    }

  }

  submitQuiz(): void{
    this.quizService.saveQuizResult(this.results);
    this.router.navigate(['/','quiz-result']);
  }


  // showResult(): void{
  //   this.showResults = true;
  //   for (let answer of this.results){
  //     console.log(answer.correct_answer, answer.selectedAnswer)
  //     if (answer.correct_answer === answer.selectedAnswer)
  //       this.correctAnswerCount = this.correctAnswerCount + 1;
  //   }
  //   console.log(this.correctAnswerCount);

  //   if(this.correctAnswerCount >=0 && this.correctAnswerCount <=1){
  //     this.color = 'red';
  //   }
  //   else if(this.correctAnswerCount >=2 && this.correctAnswerCount <=3){
  //     this.color = 'yellow';
  //   }
  //   else if(this.correctAnswerCount >=4 && this.correctAnswerCount <=5 ){
  //     this.color = 'green';
  //   }


  // }

  // navigateToCreateQuiz(){
  //   this.showResults = false;

  //   this.router.navigate(['create-quiz'])
  // }

}
