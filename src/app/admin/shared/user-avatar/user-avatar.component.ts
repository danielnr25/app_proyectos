import {
  Component, Input, NgModule
} from '@angular/core';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  standalone:true
})

export class UserAvatarComponent {
  @Input() dataLetters?: string | null;
}
