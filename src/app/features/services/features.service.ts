import { Injectable } from '@angular/core';
import { SAVE_LOTTIE } from '@app/core/constants/image';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService {
  public copyId = null;
  public saveLottie = null;
  copyUserId(id: number): void {
    this.copyId = id;
    this.saveLottie = SAVE_LOTTIE;
    setTimeout(() => {
      this.saveLottie = null;
    }, 1500);
  }
}
