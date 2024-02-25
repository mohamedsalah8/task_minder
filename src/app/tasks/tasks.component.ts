import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFunctionServiceService } from '../services/api-function-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  todos!: any;
  inProgress!: any;
  done!: any;
  isLogged!: any;
  userImg!: string;
  userId!: any;
  constructor(private api: ApiFunctionServiceService, private router: Router) {
    this.isLogged = localStorage.getItem('isLogged');
    if (!this.isLogged) {
      this.router.navigateByUrl('/login');
    }
    this.api.get('http://localhost:3000/todo').subscribe((data) => {
      this.todos = data;
    });
    this.api.get('http://localhost:3000/inProgress').subscribe((data) => {
      this.inProgress = data;
    });
    this.api.get('http://localhost:3000/done').subscribe((data) => {
      this.done = data;
    });
    this.userId = localStorage.getItem('user_id');
    this.api
      .getById('http://localhost:3000/users', this.userId)
      .subscribe((data: any) => {
        this.userImg = data.img;
      });
  }

  addTask = new FormGroup({
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });
  get description() {
    return this.addTask.get('description');
  }
  get type() {
    return this.addTask.get('type');
  }
  submit() {
    if (this.type?.value == 'todo') {
      this.api
        .post('http://localhost:3000/todo', {
          user_img: this.userImg,
          description: this.description?.value,
          type: this.type?.value,
        })
        .subscribe((data) => {
          console.log('added Successfully');
          window.location.reload();
        });
    } else if (this.type?.value == 'inProgress') {
      this.api
        .post('http://localhost:3000/inProgress', {
          user_img: this.userImg,
          description: this.description?.value,
          type: this.type?.value,
        })
        .subscribe((data) => {
          console.log('added Successfully');
          window.location.reload();
        });
    } else if (this.type?.value == 'done') {
      this.api
        .post('http://localhost:3000/done', {
          user_img: this.userImg,
          description: this.description?.value,
          type: this.type?.value,
        })
        .subscribe((data) => {
          console.log('added Successfully');
          window.location.reload();
        });
    }
  }
  remove(id: any, type: string) {
    if (type == 'todo') {
      this.api.delete('http://localhost:3000/todo', id).subscribe((data) => {
        console.log('added Successfully');
        window.location.reload();
      });
    } else if (type == 'inProgress') {
      this.api
        .delete('http://localhost:3000/inProgress', id)
        .subscribe((data) => {
          console.log('added Successfully');
          window.location.reload();
        });
    } else if (type == 'done') {
      this.api.delete('http://localhost:3000/done', id).subscribe((data) => {
        console.log('added Successfully');
        window.location.reload();
      });
    }
  }
}
