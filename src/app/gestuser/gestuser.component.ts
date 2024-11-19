import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UsersModel } from '../model/Users';

@Component({
  selector: 'app-gestuser',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './gestuser.component.html',
  styleUrl: './gestuser.component.scss'
})
export class GestuserComponent {

  userForm: FormGroup = new FormGroup({}); // FormGroup to manage the employee form controls
  userObj: UsersModel = new UsersModel(); // Object to hold the employee data
  userList: UsersModel[] = []; // Array to store the list of employees

  constructor() {
    this.createForm(); // Initialize the form when the component is created
    const oldData = localStorage.getItem("UserData"); // Fetching old data from localStorage
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.userList = parseData; // Populating the employee list with stored data
    }
  }

  // Method to reset the form and the employee object
  reset() {
    this.userObj = new UsersModel(); 
    this.createForm();
  }

  // Method to create and initialize the form with default values
  createForm() { 
    this.userForm = new FormGroup({
      userId: new FormControl(this.userObj.userId), 
      name: new FormControl(this.userObj.name, [Validators.required]), 
      city: new FormControl(this.userObj.city),
      state: new FormControl(this.userObj.state),
      emailId: new FormControl(this.userObj.emailId),
      contactNo: new FormControl(this.userObj.contactNo),
      address: new FormControl(this.userObj.address),
      password: new FormControl(this.userObj.password, [Validators.required, Validators.minLength(6)]),
    });  
  }
  
  // Method to save 
  onSave() {
    const oldData = localStorage.getItem("UserData");
    if (oldData != null) { 
      const parseData = JSON.parse(oldData);
      this.userForm.controls['userId'].setValue(parseData.length + 1); // Assigning a new ID
      this.userList.unshift(this.userForm.value); // Adding the new employee to the top of the list
    } else {
      this.userForm.controls['userId'].setValue(1); // Start with ID 1 if no data exists
      this.userList.unshift(this.userForm.value);
    }
    localStorage.setItem("UserData", JSON.stringify(this.userList)); // Save the updated list to localStorage
    this.reset(); // Reset the form after saving
  }

  // Method to edit 
  onEdit(item: UsersModel) {
    this.userObj = item; // Set the selected employee data in the form
    this.createForm(); // Recreate the form with the selected employee's data
  }

  // Method to update 
  onUpdate() {
    const record = this.userList.find(m => m.userId == this.userForm.controls['userId'].value);
    if (record != undefined) {
      // Update the record with the form values
      record.name = this.userForm.controls['name'].value;
      record.city = this.userForm.controls['city'].value;
      record.state = this.userForm.controls['state'].value;
      record.emailId = this.userForm.controls['emailId'].value;
      record.contactNo = this.userForm.controls['contactNo'].value;
      record.address = this.userForm.controls['address'].value;
      record.password = this.userForm.controls['password'].value;
    }
    localStorage.setItem("UserData", JSON.stringify(this.userList)); // Save the updated list to localStorage
    this.reset(); // Reset the form after updating
  }

  // Method to delete 
  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete this item?"); // Confirm before deletion
    if (isDelete) {
      const index = this.userList.findIndex(m => m.userId == id); // Find the employee by ID
      this.userList.splice(index, 1); // Remove the employee from the list
      localStorage.setItem("UserData", JSON.stringify(this.userList)); // Save the updated list to localStorage
    }
  }

}
