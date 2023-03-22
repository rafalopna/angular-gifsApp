import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse, Pagination } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'VaFKePiLGhQoPzSWkTG9ZT9j7QmGG2sN';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _searchHistory: string[] = [];
  public results: Gif[] = [];

  get searhHistory() {
    return [...this._searchHistory];
  }

  constructor( private http: HttpClient ) {
    this._searchHistory = JSON.parse(localStorage.getItem('searchHistory')!) || [];
    this.results = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  searchGifs( query: string ) {
    query = query.trim().toLowerCase();

    if(!this._searchHistory.includes( query )) {
      this._searchHistory.unshift( query );
      this._searchHistory = this._searchHistory.splice(0,9);

      localStorage.setItem('searchHistory', JSON.stringify(this._searchHistory));
    }

    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','10')
          .set('q',query);

    this.http.get<SearchGIFResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( (resp ) => {
        this.results = resp.data;
        localStorage.setItem('resultados', JSON.stringify(resp.data));
      })
  }
}
