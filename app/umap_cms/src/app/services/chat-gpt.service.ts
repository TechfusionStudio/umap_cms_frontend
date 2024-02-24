import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${environment.chatGptApiKey}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  constructor(
    private _http: HttpClient
  ) { }

  public fetchChatGpt = (messages: {
    role: string,
    content: string,
  }[]): Observable<any> => {

    const body = {
      model: 'gpt-4',
      // response_format: {type: 'json_object'},
      messages: messages,
      temperature: 1.2,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }

    let ret: Observable<any>;
    const Url: string = "https://api.openai.com/v1/chat/completions";
    ret = this._http.post(Url, body, HTTP_OPTIONS)
    .pipe(
      timeout(200000),
      catchError(this.handleError())
    );
    return ret;
  }

  // Observable のエラーを返却します
  // @param 無し
  // @return {Observable<any>}
  private handleError(): any {
    return (error: any): Observable<any> => {
      const ret = {
        'status': error.status
        , 'data': error.statusText + '/' + error.url
      };
      return throwError(ret);
    };
  }
}
