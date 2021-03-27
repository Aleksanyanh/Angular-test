import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-wrapper',
  templateUrl: './filter-wrapper.component.html',
  styleUrls: ['./filter-wrapper.component.scss'],
})
export class FilterWrapperComponent implements OnInit {
  isOpenFilter = false;

  onOpenFilter(): void {
    this.isOpenFilter = !this.isOpenFilter;
  }

  onCloseFilter(): void {
    this.isOpenFilter = false;
  }

  ngOnInit(): void {}
}
