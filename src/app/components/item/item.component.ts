import { Component, OnInit } from '@angular/core';

import { ItemService } from '../../providers/item/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public items: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getAll().subscribe((response: Item[]) => this.items = response);
  }

}
