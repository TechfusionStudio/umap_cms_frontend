import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { ChatGptService } from 'src/app/services/chat-gpt.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  questionId: string | null = '';
  question: any = {};
  answers: any[] = [];
  customPrompt: string = ''; // プロンプトのカスタマイズ用入力
  notificationText: string = '';
  generatedUrl: string = ''; // 生成されたURL
  emotionScores: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private clipboard: Clipboard,
    private chatGptService: ChatGptService,
  ) {
    this.questionId = this.activatedRoute.snapshot.paramMap.get('question_id');
  }

  ngOnInit() {
    this.loadQuestionDetail();
  }

  loadQuestionDetail() {
    const path = `question_prime/${this.questionId}`;
    const url = environment.apiEndpoint + path;
    this.httpService.httpGet(url).subscribe({
      next: (response) => {
        this.question = {
          question_title: response.question_title,
          question_text: response.question_text,
        };
        this.answers = response.answers;
        console.log(this.question);
        console.log(this.answers);
      },
      error: (error) => console.error('GET error:', error),
    });
  }

  generateNotificationText() {
    const messages: {
      role: string,
      content: string,
    }[] = [
      {
        role: "system",
        content: "これからあなたは保護者向けQ&Aサイトで回答がつかない人のために，他の人たちにその質問の存在を知らせるための通知文を考える素晴らしいアシスタントです．またあなたはJSONでのみ返信を行い，keyが `notify_message` で valueが `通知文` としてください．また，通知文は共感できる困りごとであると認識されると，反応がいいことが一般に知られています．"
      },
      {
        role: "user",
        content: "今回あなたが30文字程度の通知文を考える質問のタイトルは「"
          + this.question.question_title
          + "」で，質問の本文は「"
          + this.question.question_text
          + "」です．JSONでのみ返信を行い，keyが `notify_message` で valueが `通知文` としてください．"
          + this.customPrompt
      }
    ]

    console.log(messages);

    this.chatGptService.fetchChatGpt(messages).subscribe({
      next: (response) => {
        this.notificationText = JSON.parse(response.choices[0].message.content)["notify_message"];
        this.generatedUrl = environment.userSiteUrl + "/question/" + this.questionId + "?message=" + encodeURIComponent(this.notificationText);
      },
      error: (error) => console.error('GET error:', error),
    });
  }

  copyNotificationText() {
    this.clipboard.copy(this.notificationText);
  }
  copyUrl() {
    this.clipboard.copy(this.generatedUrl);
  }

  analyzeEmotion() {
    const path = "multi_emotion?message=" + this.notificationText;
    const url = environment.apiEndpoint + path;
    this.httpService.httpGet(url).subscribe({
      next: response => {
        this.emotionScores = Object.entries(response.emotions).map(([key, value]) => ({
          label: key,
          value: value,
        }));
      },
      error: error => console.error('GET error:', error),
    });
  }
}
