import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'VaFKePiLGhQoPzSWkTG9ZT9j7QmGG2sN';
  private _searchHistory: string[] = [];
  public results: Gif[] = [];

  get searhHistory() {
    return [...this._searchHistory];
  }

  constructor( private http: HttpClient ) {}

  searchGifs( query: string ) {
    query = query.trim().toLowerCase();

    if(!this._searchHistory.includes( query )) {
      this._searchHistory.unshift( query );
      this._searchHistory = this._searchHistory.splice(0,9);
    }

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe( (resp ) => {
        console.log(resp.data);
        this.results = resp.data;
      })
  }
}
