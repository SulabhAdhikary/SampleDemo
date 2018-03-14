import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonServiceService } from '../commonservices/common-service.service';

@Component({
  selector: 'app-centre-content',
  templateUrl: './centre-content.component.html',
  styleUrls: ['./centre-content.component.css']
})
export class CentreContentComponent implements OnInit, OnDestroy {

  constructor(private commonService: CommonServiceService) {
  }


  ngOnInit() {
    this.commonService.HomeComponentLoadedEvent(true);
  }

  ngOnDestroy() {
    this.commonService.HomeComponentLoadedEvent(false);
  }

}
