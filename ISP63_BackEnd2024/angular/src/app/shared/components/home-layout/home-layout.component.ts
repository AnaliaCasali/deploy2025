import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { ChatbotComponent } from "../../../features/components/chatbot/chatbot.component";

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [FooterComponent, RouterOutlet, SidebarComponent, HomeHeaderComponent, ChatbotComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
