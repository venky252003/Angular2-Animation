import { Component, ChangeDetectorRef, trigger, animate, style, state, transition, keyframes } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
    <button (click)="toogleState()" [@remove] = 'btnstate'>Add Item</button>
    <ul>
      <li *ngFor="let item of Items" [@mytrigger]='state' (@mytrigger.start)="animStart($event)" (@mytrigger.done)="animDone($event)"> {{item}} 
          <button (click)="remove()">Remove</button>
      </li>
    </ul>

    {{status}}
  `,
  styles : [
    ` ul { list-style-type: none; margin: 30px 30px 0 0; padding: 0;}
      li{
        padding:15px;
        width: 50%;
        background: #f1f1f1;
        margin-bottom: 2px;
        font-weight: bold;
      }
    `],
  animations: [
    trigger('mytrigger', [
        state('small', style ({
            transfrom: 'scale(1)'
          })),
          state('large', style({
             transform: 'scale(1.4)'
          })),
          state('fadeIn', style({
              opacity: '1'
          })),
          transition('void => *', [
            animate(500, keyframes([
              style({opacity: 0, transform: 'translateY(-10px)', offset: 0 }),
              style({opacity: 1, transform: 'translateY(5px) scale(1.2)', offset: .3 }),
              style({opacity: 1, transform: 'translateY(0) scale(1.2)', offset: 1 }),
            ])            
          )
         /*style ({opacity: '0', transfrom: 'translateY(20px)' }), animate('1000ms 100ms ease-in')])*/
      ])
  ]), 
  trigger('remove', [
      state('out', style({
          transform: 'scale(0)',
          opacity: 0
      })),
      transition('* => out', [
        animate('500ms 0s ease-out', keyframes([
           style({opacity: 1, transform: 'translateX(-8px)', offset: 0}),
           style({opacity: 1, transform: 'translateX(0)', offset: 0.3}),
           style({opacity: 0, transform: 'translateX(50px)', offset: 1}),
        ]))
      ])
  ])  
  ]
})
export class AppComponent  { 
  name = 'Angular'; 
  state: string = 'fadeIn';
  Items: string[] = ['Apple', 'Grapes', 'Banana'];
  status: string = "waiting";
  btnstate: string = "in";
  constructor(private cdref: ChangeDetectorRef){
    /* this.Items.push('Apple');
     this.Items.push('Grapes');
     this.Items.push('Banana');*/
  }

  toogleState(){
      //this.state = (this.state == 'small' ? 'large': 'small');
      this.Items.push('New Items');
      this.state = 'fadeIn';
      this.btnstate = "out";
  }

  remove(){
    this.Items.pop();
  }

  animStart(event: any){
     this.status = "start " + event.totalTime ;
  }

  animDone(event: any){
     this.status = "Time taken to complete " + event.totalTime ;
     this.cdref.detectChanges();     
  }
}
