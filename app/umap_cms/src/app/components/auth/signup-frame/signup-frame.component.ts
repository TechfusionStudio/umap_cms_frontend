import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-frame',
  templateUrl: './signup-frame.component.html',
  styleUrls: ['./signup-frame.component.scss'],
})
export class SignupFrameComponent  implements OnInit {
  email: string = '';
  password: string = '';
  verificationCode: string = '';
  errorMessage: string = '';
  showConfirmationForm: boolean = false; // 確認フォームの表示制御用フラグ

  constructor(
    private authService: AuthService, 
    private router: Router,
  ) {}

  ngOnInit() {}

  signUp() {
    this.authService.signUp(this.email, this.password)
      .then(result => {
        console.log('Signup successful', result);
        // サインアップ成功後に確認コード入力フォームを表示
        this.showConfirmationForm = true;
      })
      .catch(error => {
        console.error('Signup failed', error);
        if (error.code === 'UsernameExistsException') {
          // ユーザーが既に存在する場合、確認コード入力フォームを表示
          this.errorMessage = 'すでに登録されているメールアドレスです。確認コードを入力してください。ただし、パスワードは初回登録時の値となっているため、ログイン時に注意してください。';
          this.showConfirmationForm = true;
        } else {
          // その他のエラーの場合、エラーメッセージを表示
          this.errorMessage = error.message || 'Signup failed. Please try again.';
        }
      });
  }

  confirmAccount(code: string) {
    this.authService.confirmSignUp(this.email, code)
      .then(result => {
        console.log('Account confirmed', result);
        this.router.navigate(['/login']); // アカウント確認後にログインページへリダイレクト
      })
      .catch(error => {
        console.error('Account confirmation failed', error);
        this.errorMessage = error.message || 'Account confirmation failed. Please try again.';
      });
  }
}
