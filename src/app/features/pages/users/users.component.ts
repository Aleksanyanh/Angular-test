import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('pageView') pageView: ElementRef<HTMLDivElement>;
  // scrollButtonState = false;
  // scrollOptions: any = new ScrollOptionsViewModel();

  constructor() {
    // this.subjectService.scrollPageSub.pipe(untilDestroyed(this)).subscribe((bool: boolean) => {
    //   this.scrollOptions = new ScrollOptionsViewModel();
    //   this.scrollButtonState = bool;
    // });
  }

  // onScrollDown() {
  //   this.pageView.nativeElement.scrollIntoView(this.scrollOptions);
  //   this.scrollOptions =
  //     this.scrollOptions.block === 'end'
  //       ? new ScrollOptionsViewModel({ block: 'start' })
  //       : new ScrollOptionsViewModel({ block: 'end' });
  // }

  ngOnInit(): void {}
}
