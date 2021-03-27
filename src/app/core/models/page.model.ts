export interface IPagingModel {
  skip?: number;
  pageSize?: number;
  selectedOption: number;
  options: number[];
}

export class PagingViewModel {
  skip = 0;
  pageSize = 30;
  selectedOption = 30;
  options = [30, 50, 100];
  constructor(data?: IPagingModel) {
    if (data) {
      this.pageSize = data.selectedOption;
      this.selectedOption = data.selectedOption;
      this.options = data.options;
    }
  }
}

export interface IScrollOptionsModel {
  behavior?: string;
  inline?: string;
  block: string;
}
export class ScrollOptionsViewModel {
  behavior = 'smooth';
  block = 'end';
  inline = 'end';

  constructor(data?: IScrollOptionsModel) {
    if (data) {
      this.inline = data.block;
      this.block = data.block;
    }
  }
}
