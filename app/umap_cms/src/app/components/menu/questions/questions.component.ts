import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent  implements OnInit {
  questions: any[] = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    const path = "questions?item_id=";
    const url = environment.apiEndpoint + path;
    this.httpService.httpGet(url).subscribe({
      next: response => {
        this.questions = response.questions;
        console.log(this.questions)
      },
      error: error => console.error('GET error:', error),
    });
  }
  navigateToQuestion(questionId: string) {
    // 質問詳細ページへのナビゲーション
    this.router.navigateByUrl(`/question/${questionId}`);
  }

}
