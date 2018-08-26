import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { element } from 'protractor';
import { O_NONBLOCK } from 'constants';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList : Employee[];
  constructor(private employeeService : EmployeeService) { }

  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item =>{
      this.employeeList= [];
      item.forEach(element=>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete (key : string){
    this.employeeService.deleteEmployee(key);
  }

}
