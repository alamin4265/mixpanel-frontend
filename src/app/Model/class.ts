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
    images?:string;
    count: number;
  }
  export class Product {
    id: number;
    brand: string;
    title:string;
    category: string;
    description:string;
    price: string;
    images: string;
    stock: string;

    constructor(){
     this.id=0;
     this.brand="";
     this.title="";
     this.category="";
     this.description="";
     this.price="";
     this.images="";
     this.stock="";
    }
  }
  