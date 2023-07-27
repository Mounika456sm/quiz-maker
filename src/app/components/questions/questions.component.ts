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
  color: string ='';
  showResults : boolean = false;
  totalQuestions = QuizMakerConstants.AMOUNT;
  
  constructor(private quizService: QuizService,
              private router: Router) { }

  ngOnInit(){
    this.showResults = this.quizService.getResults();
  }

  selectAnswer(questionIndex: number, answerIndex: number,  selectedOption: string){
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
    this.quizService.showResults(true);
    this.quizService.saveQuizResult(this.results);
    this.router.navigate(['/','quiz-result']);
  }

}
