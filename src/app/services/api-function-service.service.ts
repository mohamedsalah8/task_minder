import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiFunctionServiceService {
  constructor(private http: HttpClient) {}

  get(URL: string): Observable<any> {
    return this.http.get(URL);
  }
  getById(URL: string, id: any) {
    return this.http.get(URL + `/${id}`);
  }
  post(URL: string, obj: any) {
    return this.http.post(URL, obj);
  }
  put(URL: string, id: any, obj: any) {
    return this.http.put(URL + `/${id}`, obj);
  }
  delete(URL: string, id: any) {
    return this.http.delete(URL + `/${id}`);
  }
}
