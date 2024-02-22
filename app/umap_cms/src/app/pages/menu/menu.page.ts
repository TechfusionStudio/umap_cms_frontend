import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  ) {}

  ngOnInit() {
    this.authService.refreshToken();
    this.menu = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
