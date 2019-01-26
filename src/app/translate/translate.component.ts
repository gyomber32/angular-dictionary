import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  private isConnected: boolean = true;

  constructor(private connectionService: ConnectionService) {

  }

  public chechkNetStatus(): void {
    console.log('1');
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.isConnected;
      }
      else {
        this.isConnected = false;
      }
    })
  }

  ngOnInit() {
    this.chechkNetStatus();
  }

}
