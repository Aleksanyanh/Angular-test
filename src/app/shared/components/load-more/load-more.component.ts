import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeatureComponentEnum } from '@app/core/enums/component.enum';
import { IPagingModel } from '@app/core/models/page.model';
import { SubjectService } from '@app/features/services/subject.service';

import { ActionsExecuting } from '@ngxs-labs/actions-executing';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss'],
})
export class LoadMoreComponent implements OnInit {
  @Input() hasNext: boolean;
  @Input() paging: IPagingModel;
  @Input() componentEnum: FeatureComponentEnum;
  @Input() Loading$: Observable<ActionsExecuting>;
  @Output() changeLoadSize: EventEmitter<number> = new EventEmitter();

  constructor(private subjectService: SubjectService) {}

  onChangeLoadSize(ev: any) {
    this.changeLoadSize.emit(ev.value);
  }
  onLoadMore(): void {
    if (this.componentEnum === FeatureComponentEnum.users) {
      this.subjectService.loadPageSub.next(FeatureComponentEnum.users);
    }
  }
  ngOnInit(): void {}
}
