import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menu!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.checkSession();
    this.menu = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  logout() {
    // localStorageに保存された認証情報をクリア
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
  
    // ログアウト後の処理をここに記述
    // 例: ログインページへのリダイレクト
    this.router.navigate(['/login']);
  }
}
