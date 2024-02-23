import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UploadService } from 'src/app/services/upload.service';

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
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService,
    private uploadService: UploadService,
  ) {}

  ngOnInit() {
    this.authService.checkSession();
    this.menu = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  postRequest = () => {
    // リクエストボディの作成
    const body = {
      id: "nakano22733",
      json_data: {
        position: 12,
        small: "Yes"
      }
    };

    // POSTリクエストの送信
    this.httpService.http(environment.apiEndpoint + "ids", body).subscribe({
      next: response => {
        console.log('POST success:', response)
      },
      error: error => console.error('POST error:', error),
    });
  }

  ApiTest = () => {
    // const path = "recommend_items?organization_id=nakano_test&latitude=35.7241365631318&longitude=139.650478981592&spacious=1&facility=1&equipment=1";
    // const url = environment.apiEndpoint + path;
    // const path = "data_structure"
    // const url = environment.apiEndpoint + path;
    // const path = "question_prime/1"
    // const url = environment.apiEndpoint + path;
    // const path = "questions?item_id=1"
    // const url = environment.apiEndpoint + path;
    const path = "question_prime/1"
    const url = environment.apiEndpoint + path;

    // const body = {
    //   "email": "test@gmail.com",
    //   "organization_id": "nakano_test"
    // }
    // const body = {
    //   "organization_id": "nakano_test",
    //   "data_attributes": {
    //     "公園名": "str",
    //     "公園所在地": "str",
    //     "公園面積_m2": "float",
    //     "主な施設": "str",
    //     "主な遊具": "str",
    //     "閉鎖管理施設": "str",
    //     "トイレ": "str",
    //     "その他情報": "str",
    //     "備考1": "str",
    //     "備考2": "str",
    //     "経度": "float",
    //     "緯度": "float",
    //   },
    //   "is_abstract_data": {
    //     "公園名": true,
    //     "公園所在地": true,
    //     "公園面積_m2": true,
    //     "主な施設": false,
    //     "主な遊具": true,
    //     "閉鎖管理施設": false,
    //     "トイレ": false,
    //     "その他情報": false,
    //     "備考1": false,
    //     "備考2": false,
    //     "経度": false,
    //     "緯度": false,
    //   }
    // }
    // const body = {
    //   "question_user": "kawakami",
    //   "question_title": "フリスビー使えますか？",
    //   "question_text": "この公園ってフリスビー使えますか？教えてください！",
    // }

    // this.httpService.http(url, body).subscribe({
    //   next: response => {
    //     console.log('POST success:', response)
    //   },
    //   error: error => console.error('POST error:', error),
    //   complete: () => console.log('POST completed.')
    // });
    this.httpService.httpGet(url).subscribe({
      next: response => {
        console.log('GET success:', response)
      },
      error: error => console.error('GET error:', error),
      complete: () => console.log('GET completed.')
    });
  }

  fileChanged = (event: any) => {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1]; // プレフィックスを削除
        this.uploadCsvFileAsBase64(base64Data);
      };

      reader.readAsDataURL(this.selectedFile);
    }

  }
  // ファイルの内容をサーバーに送信するための関数
  uploadCsvFileAsBase64(fileContentBase64: string) {
    // const url = environment.apiEndpoint + "csv"; // API Gateway の URL に置き換えてください
    const path = "data/" + "nakano_test";
    const url = environment.apiEndpoint + path; // API Gateway の URL に置き換えてください
    const body = {
      csvData: fileContentBase64 
    };

    this.httpService.http(url, body).subscribe({
      next: response => {
        console.log('Upload success:', response)
      },
      error: error => console.error('Upload error:', error),
      complete: () => console.log('Upload completed.')
    });
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
