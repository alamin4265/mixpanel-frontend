import { Component, OnInit ,OnChanges, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit,AfterContentChecked,OnDestroy, SimpleChanges, afterNextRender, afterRender} from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  standalone: true,
  imports: [],
  templateUrl: './life-cycle.component.html',
  styleUrl: './life-cycle.component.css'
})
export default class LifeCycleComponent implements OnInit,OnChanges,DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit,AfterContentChecked, OnDestroy{
  firstName : string;
  //constructor is for  initializing 
  constructor(){
   console.log("constructor");
   this.firstName="";
   afterNextRender (()=>{
    console.log("afterNextRender");
    //write
  })
  afterRender(()=>{
    console.log("afterRender");
    //read
  })
  }
  
  //when the component get load this function automatically loads: pageload, apicall
  ngOnInit(): void {
    console.log("ngonInit");
  }
  //whenever a change is detected in comp tamplate
  ngDoCheck(): void {
    console.log("ngDoCheck");
  }
  //if some external image or view is integrated in a component
  ngAfterContentInit(): void {
    console.log("ngAfterContentInit");
  }
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked");
  }
 //own component html(template) && child component template: moreover when the full view initialization is completed
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
  }
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked");
  }
 
 //when going 1 page to another ->If need to do something before component destroy.
 //normaly used in API call unsubscribed
  ngOnDestroy(): void {
    // console.log("ngOnDestroy");
  }
  //used for reusable component: any component inputs have changed
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("ngOnChanges");
  }

  
}
