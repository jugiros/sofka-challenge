import {IService} from "./IService";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export abstract class BaseService<T> implements IService<T> {
  constructor(protected http: HttpClient, protected url: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}`);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.url, item);
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
