import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../environments/environment';
import { IService } from "./IService";

export abstract class BaseService<T> implements IService<T> {
  protected baseUrlApi: string;
  protected endpoints: any;

  constructor(protected http: HttpClient, protected endpointKey: string) {
    this.baseUrlApi = environment.baseUrlApi;
    this.endpoints = environment.endpoints;
  }

  private getEndpointUrl(endpoint: string, id?: number): string {
    let url = `${this.baseUrlApi}${endpoint}`;
    if (id !== undefined) {
      url = url.replace('{id}', id.toString());
    }
    return url;
  }

  getAll(): Observable<T[]> {
    const url = this.getEndpointUrl(this.endpoints[this.endpointKey]);
    return this.http.get<T[]>(url);
  }

  getById(id: number): Observable<T> {
    const url = this.getEndpointUrl(this.endpoints[this.endpointKey], id);
    return this.http.get<T>(url);
  }

  create(item: T): Observable<T> {
    const url = this.getEndpointUrl(this.endpoints[this.endpointKey]);
    return this.http.post<T>(url, item);
  }

  update(id: number, item: T): Observable<T> {
    const url = this.getEndpointUrl(this.endpoints[this.endpointKey], id);
    return this.http.put<T>(url, item);
  }

  delete(id: number): Observable<void> {
    const url = this.getEndpointUrl(this.endpoints[this.endpointKey], id);
    return this.http.delete<void>(url);
  }
}
