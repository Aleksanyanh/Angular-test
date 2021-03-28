import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService {
  constructor(private _snackBar: MatSnackBar) {}

  onCopyUserId(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
