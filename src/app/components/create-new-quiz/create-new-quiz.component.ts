import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Category, MainCategory } from '../../models/category';
import { questionAnswers} from '../../models/questions';
import { QuizMakerConstants } from '../../constants/quiz-maker.constant';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-create-new-quiz',
  templateUrl: './create-new-quiz.component.html',
  styleUrls: ['./create-new-quiz.component.scss']
})
export class CreateNewQuizComponent implements OnInit,OnDestroy{
  categoryList: MainCategory<Category[]>;
  questionResult: questionAnswers;
  amount = QuizMakerConstants.AMOUNT;
  type = QuizMakerConstants.TYPE;
  subscription: Subscription = new Subscription();

  CreateQuizForm = new FormGroup({
    category: new FormControl(''),
    difficulty: new FormControl(''),
  });

  difficultyLevels =[
    { name: 'Select Difficulty', level: ''},
    { name: 'Easy', level: 'easy'},
    { name: 'Medium', level: 'medium'},
    { name: 'Hard', level: 'hard'}
  ]

  constructor(private quizService: QuizService,
    private spinner: NgxSpinnerService){ }

  ngOnInit(): void{
    //to get categories 
    this.spinner.show();
    this.subscription = this.quizService.getCategories().subscribe((res:MainCategory<Category[]>)=>{
      this.categoryList = res;
     })
    this.spinner.hide();
  }

  createQuiz(): void{
    const category: string = this.CreateQuizForm.value.category as string;
    const difficulty : string= this.CreateQuizForm.value.difficulty as string;
    this.spinner.show();
    if (category !== '' && difficulty !== '') {
      //to get list of questions based on category, difficulty level
    this.subscription = this.quizService.getQuestionsList(this.amount, category,difficulty, this.type)
    .subscribe((res:questionAnswers) => {
      this.questionResult = res;
      this.spinner.hide();
    })
  }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}



