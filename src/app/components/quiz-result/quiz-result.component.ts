import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { questionsList }  from '../../models/questions';
import { QuizMakerConstants } from '../../constants/quiz-maker.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent {
  quizResult: questionsList[] = [];
  correctAnswerCount = 0;
  color:string = '';
  totalQuestions = QuizMakerConstants.AMOUNT;

  constructor(private quizService: QuizService,
              private router: Router) { }

  ngOnInit(): void{
    this.quizResult = this.quizService.getQuizResult();
    this.showResult();
  }

  showResult(): void{
    for (let answer of this.quizResult){
      if (answer.correct_answer === answer.selectedAnswer)
        this.correctAnswerCount = this.correctAnswerCount + 1;
    }
  }

  navigateToCreateQuiz(){
    this.quizService.showResults(false);
    this.router.navigate(['/','create-quiz'])
  }
}


