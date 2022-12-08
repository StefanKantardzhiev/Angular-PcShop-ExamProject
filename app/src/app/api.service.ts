import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';



const apiUrl  = environment.apiUrl


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  loadItems() {
    return this.httpClient.get(apiUrl+'/items/catalog')
  }
}
