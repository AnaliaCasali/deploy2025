import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

interface Datos {
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private jsonUrl = 'assets/data/chatbot.json';
  private datos: Datos[] = [];

  constructor(private http: HttpClient) {
    this.getDatos();
    this.datos.forEach((e)=> console.log(e));
   }


  // Método para obtener datos del JSON
  getDatos(): Observable<Datos[]> {
    return this.http.get<Datos[]>(this.jsonUrl).pipe(
      catchError(error => {
        console.error('Error al cargar el archivo JSON', error);
        return throwError(() => new Error('No se pudo cargar el archivo JSON'));
      })
    );
  }

  // Método para buscar la mejor coincidencia
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
}
