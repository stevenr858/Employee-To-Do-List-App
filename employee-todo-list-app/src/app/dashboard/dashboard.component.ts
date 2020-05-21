import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { EmployeeModel } from '../models/employee.model';
import { TodoModel } from '../models/todo.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    allEmployees: Array<EmployeeModel> = [];
    allTodos: Array<TodoModel> = [];
    selectedEmployee: EmployeeModel;

    constructor(
        private dataService: DataService,
        private router: Router) { }

    ngOnInit(): void {
        console.log('dashboard initialized...');
        this.dataService.getAllEmployees().subscribe(employees => {
            console.log(employees);
            this.allEmployees = employees;
            if (this.allEmployees && this.allEmployees.length > 0) {
                this.selectedEmployee = this.allEmployees[0];
                this.onEmployeeSelected(this.selectedEmployee);
            }
        });
    }

    onEmployeeSelected(employee: EmployeeModel) {
        console.log(employee);
        this.allTodos = [];
        this.dataService.getEmployeeTodos(employee).subscribe(todos => {
            console.log(todos);
            this.allTodos = todos;
        });
    }
    onTodoSelected(todo: TodoModel) {
        console.log(todo);
        this.router.navigate(['dashboard/todo-details/', todo.employeeId, todo.id]);
    }

}
