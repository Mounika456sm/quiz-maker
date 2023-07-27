import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, MainCategory } from '../models/category';
import { questionAnswers, questionsList } from '../models/questions';
import {QuizMakerConstants} from '../constants/quiz-maker.constant';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl: string = QuizMakerConstants.APIURL;
  quizResult: questionsList[];
  showresults : boolean = false;
  
  constructor(private http: HttpClient) { }

  getCategories(): Observable<MainCategory<Category[]>>{
    const url = this.baseUrl+`api_category.php`;
    return this.http.get<MainCategory<Category[]>>(url)
  }

  getQuestionsList(amount:number , category:string, difficulty: string, type: string) : Observable<questionAnswers>{
    const url = this.baseUrl+`api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    return this.http.get<questionAnswers>(url)
  }

  saveQuizResult(result: questionsList[]){
    this.quizResult = result;
  }

  getQuizResult() : questionsList[] {
    return this.quizResult;
  }

  
  showResults(showResults :boolean){
    this.showresults = showResults;
  }

  getResults()  {
    return this.showresults;
  }
}



