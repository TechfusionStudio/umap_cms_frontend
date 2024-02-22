import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menu!: string;
  private activatedRoute = inject(ActivatedRoute);
  public appPages = [
    { title: 'Inbox', url: '/menu/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/menu/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/menu/favorites', icon: 'heart' },
    { title: 'Archived', url: '/menu/archived', icon: 'archive' },
    { title: 'Trash', url: '/menu/trash', icon: 'trash' },
    { title: 'Spam', url: '/menu/spam', icon: 'warning' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService,
  ) {}

  ngOnInit() {
    this.authService.checkSession();
    this.menu = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  postRequest = () => {
    // Pythonサーバ側の処理
    // body = json.loads(event['body'])
    // id = body['id']
    // json_data = body['json_data']

    // リクエストボディの作成
    const body = {
      id: "nakano222322",
      json_data: {
        position: 12,
        small: "Yes"
      }
    };

    // POSTリクエストの送信
    this.httpService.http(environment.apiEndpoint + "id", body).subscribe(
      (response) => {
        console.log('POSTリクエストの送信に成功しました', response);
      },
      (error) => {
        console.error('POSTリクエストの送信に失敗しました', error);
      }
    );
  }

  logout = () => {
    // localStorageに保存された認証情報をクリア
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
  
    // ログアウト後の処理をここに記述
    // 例: ログインページへのリダイレクト
    this.router.navigate(['/login']);
  }
}
