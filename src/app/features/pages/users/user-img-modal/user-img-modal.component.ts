import { Component, Input, OnInit } from '@angular/core';
import { IUsersState } from '@app/features/models/users.model';
import { SetCurrentUserImage, ToggleUserImageModal } from '@app/store/actions/users.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-user-img-modal',
  templateUrl: './user-img-modal.component.html',
  styleUrls: ['./user-img-modal.component.scss'],
})
export class UserImgModalComponent implements OnInit {
  @Input() usersState: IUsersState;

  constructor(private store: Store) {}

  onToggleLastUploadedImageModal(): void {
    this.store.dispatch([new ToggleUserImageModal(false), new SetCurrentUserImage(null)]);
  }

  ngOnInit(): void {}
}
