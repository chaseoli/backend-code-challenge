import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(  ) {  }

  @HostBinding('attr.class') cls = 'flex-fill';

  ngOnInit() {  }

}
