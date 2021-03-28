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
import { FilterWrapperComponent } from '@app/shared/components/filter-wrapper/filter-wrapper.component';
import { LoadMoreComponent } from '@app/shared/components/load-more/load-more.component';
import { SafePipe } from '@app/shared/pipes/safe.pipe';
import { DefaultImgPipe } from '@app/shared/pipes/default-img.pipe';

export function playerFactory() {
  return player;
}

const components = [FilterWrapperComponent, LoadMoreComponent, DefaultImgPipe, SafePipe];

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
  declarations: components,
  imports: [...modules, LottieModule.forRoot({ player: playerFactory })],
  exports: [...components, ...modules, LottieModule],
  providers: [],
})
export class SharedModule {}
