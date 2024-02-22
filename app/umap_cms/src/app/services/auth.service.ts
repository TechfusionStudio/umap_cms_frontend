import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(
    private router: Router,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.clientId,
    });
  }

  signUp = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, [], [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  confirmSignUp = (email: string, code: string) => {
    const userData = {
      Username: email,
      Pool: this.userPool
    };
  
    const cognitoUser = new CognitoUser(userData);
  
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result); // 確認が成功した場合
        }
      });
    });
  }

  // TODO: Add Refresh Token Process
  signIn(email: string, password: string) {
    const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password
    });

    const userData = {
        Username: email,
        Pool: this.userPool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
                // トークンをローカルストレージに保存
                localStorage.setItem('idToken', session.getIdToken().getJwtToken());
                localStorage.setItem('accessToken', session.getAccessToken().getJwtToken());
                localStorage.setItem('email', email);
                resolve(session);
            },
            onFailure: (err) => {
                reject(err);
            }
        });
    });
  }

  refreshToken = () => {
    // ユーザー情報の設定
    const userData = {
      Username: localStorage.getItem('email') || '',
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    // リフレッシュトークンを使用してセッションを更新
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err) {
          console.error(err);
          this.router.navigate(['/login']);
          return;
      }

      const refreshToken = session.getRefreshToken();
      cognitoUser.refreshSession(refreshToken, (refreshError, refreshSession) => {
          if (refreshError) {
              console.error(refreshError);
          } else {
              // 新しいアクセストークンとIDトークンがrefreshSessionから取得できる
              console.log('新しいアクセストークン:', refreshSession.getAccessToken().getJwtToken());
          }
      });
    });
  }

}
