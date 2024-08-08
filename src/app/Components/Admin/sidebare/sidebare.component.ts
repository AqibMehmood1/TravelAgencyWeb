import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocalMethodsService } from '../../../Services/local-methods.service';

@Component({
  selector: 'app-sidebare',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebare.component.html',
  styleUrl: './sidebare.component.css'
})
export class SidebareComponent {
  isToggled = false;
  activeMenu: string = '';
constructor(public localMethods:LocalMethodsService){}
  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
    this.localMethods.activeMenu=menu;

  }
}
