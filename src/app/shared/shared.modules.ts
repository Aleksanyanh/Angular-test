import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LottieModule } from 'ngx-lottie';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '@app/shared/angular-material.module';
import { NgZorroModule } from '@app/shared/ng-zorro-module';

import player from 'lottie-web';

export function playerFactory() {
  return player;
}

const modules = [
  HttpClientModule,
  RouterModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  TranslateModule,
  AngularMaterialModule,
  NgZorroModule,
];

@NgModule({
  declarations: [],
  imports: [...modules, LottieModule.forRoot({ player: playerFactory })],
  exports: [...modules, LottieModule],
  providers: [],
})
export class SharedModule {}
