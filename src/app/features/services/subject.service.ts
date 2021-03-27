import { Injectable } from '@angular/core';

import { FeatureComponentEnum } from '@app/core/enums/component.enum';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  public loadPageSub: Subject<FeatureComponentEnum> = new Subject();
  public scrollPageSub: Subject<boolean> = new Subject();
}
