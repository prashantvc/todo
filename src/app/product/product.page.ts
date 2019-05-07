import { Component, OnInit } from '@angular/core';
import { CosmosClient } from '@azure/cosmos';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  client = new CosmosClient({
    endpoint: "https://ionic-db.documents.azure.com:443/",
    auth: { masterKey: "OSAGFCsIzhdufU0b1vEwBSNuyFXWwRgaM7EUBddoNQnL6Nio1AG54nmcvaa4iOBYEnXgtbfMYxLa3ygP7uWLCQ==" }
  });

  databaseDefinition = { id: "sample database" };

  constructor() { }

  ngOnInit() {
    this.client.databases.create(this.databaseDefinition);
    console.log("created db");
  }
}
 