import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewQuizComponent } from './components/create-new-quiz/create-new-quiz.component';
import { QuestionsComponent }  from './components/questions/questions.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'create-quiz', 
    pathMatch: 'full'
  },
  {
    path: 'create-quiz',
    component: CreateNewQuizComponent
  },
  {
    path: 'quiz-result',
    component: QuizResultComponent
  },
  {
    path:'**',
    component: CreateNewQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
