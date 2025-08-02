import { CommonModule } from '@angular/common';
import { Component, ElementRef,  OnInit,  ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ChatbotService } from '../../../services/chatbot.service';

type TypeChat= 'IA'|'USER';

type Chats={
  type: TypeChat,
  message:string}

type Datos={
  question:string,
  answer:string
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  chats: Chats[] = [];
  datos: Datos[] = [];
  answer: string = '';

  @ViewChild('txtInput', { static: true }) private txtInput!: ElementRef;
  @ViewChild('chatContainer', { static: false }) private chatContainer!: ElementRef;

  chatVisible: boolean = false;

  constructor(private _chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.cargarDatos();

  }
  cargarDatos(): void {
    this._chatbotService.getDatos().subscribe({
      next: (data) => {
        this.datos = data;
      },
      error: (error) => {
        console.error('Error al cargar la info', error);
      },
    });
  }

  getBestMatchAnswer(question: string): string {
    const lowerCaseQuestion = question.toLowerCase();

    // Busca la mejor coincidencia parcial
    const matches = this.datos.filter(f => f.question.toLowerCase().includes(lowerCaseQuestion));

    if (matches.length > 0) {
      return matches[0].answer; // Devuelve la respuesta de la primera coincidencia
    } else {
      return "Lo siento, no tengo la respuesta a esa pregunta."; // Mensaje predeterminado
    }
  }



  toggleChat() {
    this.chatVisible = !this.chatVisible;
  }

  private setChat(type: TypeChat, message: string) {
    console.log("en sendmessage:" + message + type);
    this.chats.push({
      type,
      message
    });
  }

  public sendMessage(text: string) {
    if (text.length > 3) {
      this.setChat('USER', text);
      const query = text;
      this.answer = this.getBestMatchAnswer(text);
      this.setChat('IA', this.answer);
      // limpia el cuadro de texto
      const inputElement = document.getElementById('txtInput') as HTMLInputElement;
        if (inputElement) {
          inputElement.value = ''; // Limpia el valor del input
        } else {
          console.warn('El campo de texto con id "txtInput" no se encontró.');
        }
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.chatContainer && this.chatContainer.nativeElement) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } else {
       // console.error('chatContainer no está definido');
    }
  }
}

