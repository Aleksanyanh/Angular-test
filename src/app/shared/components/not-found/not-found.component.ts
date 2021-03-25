import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NOT_FOUND_PNG } from '@app/core/constants/image';
import { FEATURES } from '@app/core/constants/path';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  NOT_FOUND_PNG = NOT_FOUND_PNG;
  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate([`/${FEATURES}`]);
  }

  ngOnInit(): void {}
}
