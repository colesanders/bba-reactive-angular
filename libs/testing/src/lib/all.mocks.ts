import { environment } from '@env/environment';
export class ServiceSpecUrl {
  model;

  constructor(model: string) {
    this.model = model;
  }

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
