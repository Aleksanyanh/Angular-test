import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_USER_AVATAR_PNG } from '@app/core/constants/image';

@Pipe({
  name: 'defaultImg',
})
export class DefaultImgPipe implements PipeTransform {
  transform(imageUrl: string, size?: number): string {
    return imageUrl || DEFAULT_USER_AVATAR_PNG;
  }
}
