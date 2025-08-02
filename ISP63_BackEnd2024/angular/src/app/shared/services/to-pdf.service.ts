import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ToPdfService {

  constructor() { }


  public GenerarPdf(canvasElemento: string, contenedor: string): void {
    const canvasElement = document.getElementById(canvasElemento) as HTMLCanvasElement;
    const divContenedor = document.getElementById(contenedor) as HTMLElement;

    if (canvasElement && divContenedor) {
      // Ajusta el tamaño del lienzo al tamaño del div
      divContenedor.classList.add('no-shadow');
      canvasElement.width = divContenedor.offsetWidth;
      canvasElement.height = divContenedor.offsetHeight;



      // Captura el contenido del div en el canvas
      html2canvas(divContenedor, {

        scale: 1,
        backgroundColor: '#FFFFFF', // Forzar un fondo blanco en el canvas
        canvas: canvasElement,

      }).then((canvas) => {
        // Define el tamaño de la página A4 en mm
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();

        // Calcular la altura en la escala adecuada para pdf
        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width;

        // Escalar la imagen para ajustarse al ancho de la página PDF
        const imgHeight = (pageWidth / canvasWidth) * canvasHeight;

        let position = 0; // Posición inicial en la página

        // Si la imagen es más grande que una página
        while (position < imgHeight) {
          const pageCanvasHeight = Math.min(imgHeight - position, pageHeight); // Ajustar la altura si estamos en la última página

          // Agrega la imagen a la página, ajustando la posición
          pdf.addImage(
            canvas.toDataURL('image/jpeg'),
            'JPEG',
            0,
            position * -1, // Mover la imagen hacia arriba para cortar la parte correcta
            pageWidth,
            imgHeight
          );

          // Avanza en la posición
          position += pageHeight;

          // Añade una nueva página si no estamos en la última parte
          if (position < imgHeight) {
            pdf.addPage();
          }
        }

        // Guardar el archivo PDF generado
        pdf.save('IES63document.pdf');
      });
    }
  }
}
