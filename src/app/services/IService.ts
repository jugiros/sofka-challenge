import {Observable} from "rxjs";

export interface IService<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
  create(item: T): Observable<T>;
  update(id: number, item: T): Observable<T>;
  delete(id: number): Observable<void>;
}
