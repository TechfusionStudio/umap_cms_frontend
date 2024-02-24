import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginFrameComponent } from './auth/login-frame/login-frame.component';
import { SignupFrameComponent } from './auth/signup-frame/signup-frame.component';
import { SignupConfirmFrameComponent } from './auth/signup-confirm-frame/signup-confirm-frame.component';

import { QuestionsComponent } from './menu/questions/questions.component';

@NgModule({
  declarations: [
    LoginFrameComponent,
    SignupFrameComponent,
    SignupConfirmFrameComponent,
    QuestionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    LoginFrameComponent,
    SignupFrameComponent,
    SignupConfirmFrameComponent,
    QuestionsComponent,
  ]
})
export class ComponentsModule { }
