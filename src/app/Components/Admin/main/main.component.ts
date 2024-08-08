import { Component } from '@angular/core';
import { SidebareComponent } from '../sidebare/sidebare.component';
import { CommonModule } from '@angular/common';
import { LocalMethodsService } from '../../../Services/local-methods.service';
import { DashbourdComponent } from '../dashbourd/dashbourd.component';
import { TeamComponent } from '../team/team.component';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidebareComponent,CommonModule,DashbourdComponent,TeamComponent,NavbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isToggled = false;
  activeMenu: string = 'dashbourd';
constructor(public localMethods:LocalMethodsService){}
  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
    this.localMethods.activeMenu=menu;

  }


}
