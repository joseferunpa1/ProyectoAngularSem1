export class UsersModel {
    userId: number;
    name: string;
    city: string;
    state: string;
    emailId: string;
    contactNo: string;
    address: string;
    password: string;
    
    
    constructor () {
      this.userId = 1;
      this.name = '';
      this.city = '';
      this.state = '';
      this.emailId = '';
      this.contactNo = '';
      this.address = '';
      this.password = '';
      }
  }