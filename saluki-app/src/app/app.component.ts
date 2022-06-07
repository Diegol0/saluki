import { Component } from '@angular/core';
import { SalukiService } from './services/saluki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Saluki';
  constructor(public salukiService: SalukiService) {}
}
