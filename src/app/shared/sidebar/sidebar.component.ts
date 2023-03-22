import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  get history() {
    return this.gifsService.searhHistory;
  }

  constructor( private gifsService: GifsService ) {}


  searchGif( term: string ) {
    this.gifsService.searchGifs( term );
  }

}
