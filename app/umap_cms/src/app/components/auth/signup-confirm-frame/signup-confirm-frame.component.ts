import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-confirm-frame',
  templateUrl: './signup-confirm-frame.component.html',
  styleUrls: ['./signup-confirm-frame.component.scss'],
})
export class SignupConfirmFrameComponent  implements OnInit {
  code: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    // URLからemailパラメータを取得する場合（オプション）
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  ngOnInit() {}

  confirmAccount() {
    this.authService.confirmSignUp(this.email, this.code)
      .then(result => {
        console.log('Account confirmed', result);
        this.router.navigate(['/login']); // 確認後、ログインページへリダイレクト
      })
      .catch(error => {
        console.error('Confirmation failed', error);
        this.errorMessage = error.message || 'Failed to confirm account. Please try again.';
      });
  }
}
