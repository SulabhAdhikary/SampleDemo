import { Component, OnInit } from '@angular/core';
import { ApplicationServiceService } from '..//commonservices/application-service.service';
import {Student, Enrollment } from './../applicationDomainModel';
import { CommonServiceService } from '../commonservices/common-service.service';

@Component({
  selector: 'app-fetchdata',
  templateUrl: './fetchdata.component.html',
  styleUrls: ['./fetchdata.component.css']
})
export class FetchdataComponent implements OnInit {

  public allStudents: Student[];
  public allEnrollments: Enrollment[];

  constructor(private service: ApplicationServiceService, private commonService: CommonServiceService ) {
    commonService.RowSelectedInFetchDataEvent.subscribe(data => this.GetDetailData(data));
   }

  ngOnInit() {
    this.service.getAllStudents().subscribe(t => this.mapToStudentViewData(t));
  }

  GetDetailData(data: number) {
    console.log('called');
    this.service.getStudentsEnrollment(data).subscribe(t => this.mapToEnrollmentViewData(t));
  }

  mapToStudentViewData(dataFromAPi: Student[]) {
    this.allStudents = dataFromAPi;
  }

  mapToEnrollmentViewData(dataFromApi: Enrollment[]) {
    this.allEnrollments = dataFromApi;
  }
}
