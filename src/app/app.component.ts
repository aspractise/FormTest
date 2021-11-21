import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FormTest';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  userForm: FormGroup;

  displayUser = false;

  ngOnInit() {

  }

  getUserById() {
    let user_id = document.getElementById('user_id');
    if (user_id && user_id['value']) {
      this.getUserDetails(user_id['value'])
    }
  }

  getUserDetails(id) {
    try {
      this.getUserDetailsApi(id).subscribe(data => {
        console.log("userdata -->", data);
        this.setFormForUser(data);
      }, error => {
        console.log("error failed to getUserDetails ", error);
      })

    } catch (Ex) {
      console.log("error getUserDetails ", Ex);
    }
  }


  setFormForUser(user_data) {
    let company = "";

    if (user_data && user_data.company) {
      if (user_data.company.bs) {
        company = user_data.company.bs;
      }

      if (user_data.company.catchPhrase) {
        company = " " + user_data.company.catchPhrase + ' ';
      }

      if (user_data.company.name) {
        company = " " + user_data.company.name;
      }

    }

    this.userForm = this.formBuilder.group({
      user_name: [user_data.username || ''],
      name: [user_data.name || ''],
      email: [user_data.email || ''],
      web_site: [user_data.website || ''],
      phone: [user_data.phone || ''],
      company: [company || '']
    })

    this.displayUser = true;
  }


  getUserDetailsApi(id) {
    try {
      return this.http.get('https://jsonplaceholder.typicode.com/users/' + id)
    } catch (ex) {
      console.log("error getUserDetailsApi ", ex);
    }
  }

}
