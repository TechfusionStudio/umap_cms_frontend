import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.scss'],
})
export class LoginFrameComponent  implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // エラーメッセージを格納するためのプロパティ

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}

  ngOnInit() {}

  login() {
    this.authService.signIn(this.email, this.password)
      .then(result => {
        console.log('Login successful', result)
        this.router.navigate(['/']); // ログイン成功後にホームページへリダイレクト
      }).catch(error => {
        console.error('Login failed', error);
        this.errorMessage = error.message || 'Login failed. Please try again.'; // エラーメッセージの設定
      });
  }

}
