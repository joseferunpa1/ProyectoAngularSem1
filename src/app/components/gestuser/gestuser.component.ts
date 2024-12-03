import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UsersModel } from '../../model/Users';


@Component({
  selector: 'app-gestuser',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './gestuser.component.html',
  styleUrl: './gestuser.component.scss'
})
export class GestuserComponent {

  userForm: FormGroup = new FormGroup({}); // FormGroup to manage the employee form controlsy
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
  
      // Asigna el ID como último ID + 1
      const lastId = parseData.length > 0 ? parseData[0].userId : 1;
      this.userForm.controls['userId'].setValue(lastId + 1);
      this.userList.unshift(this.userForm.value);
    } else {
      // Si no hay datos previos, el ID inicial será 2
      this.userForm.controls['userId'].setValue(2);
      this.userList.unshift(this.userForm.value);
    }
  
    // Guardar datos actualizados en localStorage
    localStorage.setItem("UserData", JSON.stringify(this.userList));
    this.reset(); // Resetear formulario después de guardar
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

    this.userObj = new UsersModel(); // Set the selected employee data in the form
    this.createForm();
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
