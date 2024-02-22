import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/menu/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/menu/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/menu/favorites', icon: 'heart' },
    { title: 'Archived', url: '/menu/archived', icon: 'archive' },
    { title: 'Trash', url: '/menu/trash', icon: 'trash' },
    { title: 'Spam', url: '/menu/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public showMenu = true; // メニュー表示制御用のプロパティを追加
  
  constructor(private router: Router) {
    // ルート変更イベントを購読して、URLに応じてメニュー表示を制御
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !event.url.includes('/login') && !event.url.includes('/signup');
      }
    });
  }
}
