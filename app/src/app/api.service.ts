import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { IItem } from './interfaces/item';
import { IRecent } from './interfaces/recent';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  loadItems() {
    return this.httpClient.get<IItem[]>(`http://127.0.0.1:3000/items/catalog`);
  }
  loadRecent() {
    return this.httpClient.get<IRecent[]>(`${apiUrl}/recent/catalog`);
  }
}
