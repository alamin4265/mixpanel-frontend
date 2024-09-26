export class SignUpModel {
    name: string;
    email: string;
    password: string;
    constructor(){
      this.name = "";
      this.email= "";
      this.password= "";
    }
  }

  export class LoginModel {
    email: string;
    password: string;
    constructor(){
      this.email= "";
      this.password= "";
    }
  }

  export interface CartItem {
    // id: number;
    title: string;
    price: number;
    count: number;
    category?: string; 
    images?: string[]; 
  }

  export interface CartProduct{
    id: number;
    brand: string;
    title: string;
    category: string;
    price: number;
    stock: number;
    count: number;
  }
  export class Product {
    id: number;
    name: string;
    description:string;
    price: number;
    stock: number;

    constructor(){
     this.id=0;
     this.name="";
     this.description="";
     this.price=0;
     this.stock=0;
    }
  }
  