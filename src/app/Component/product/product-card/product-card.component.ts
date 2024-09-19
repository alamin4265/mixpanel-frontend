import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../Services/cart.service';
import { MixpanelService } from '../../../Shared/Services/mixpanel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent{
  @Input() product: any;
  @Output() cardClick = new EventEmitter<number>();
  count: number = 1;
  constructor(private cartService: CartService, private mixpanelService: MixpanelService,  private router: Router) {}

  addToCart(event: Event) {   
    event.stopPropagation();
    this.cartService.addToCart(this.product, this.count);
    this.count = 1;
  }
  onCardClick() {
    this.cardClick.emit(this.product.id);
  }

}
