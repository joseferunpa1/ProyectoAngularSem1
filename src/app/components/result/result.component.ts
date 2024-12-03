import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ActionsService } from '../../services/actions.service'; 
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import {Chart, registerables} from 'chart.js';


Chart.register(...registerables);
@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit, AfterViewInit {

  @ViewChildren('myChart') ctx!: QueryList<ElementRef>;


  public preguntas: any;
  public respuestas: any = Array(0);
  private ID: string;
  public contador: any[] = [];
  public totalRespuesta: any;
  // Array para almacenar las instancias de Chart
charts: Chart[] = [];


  myChart: any;

  constructor(private action: ActionsService, private ruta: ActivatedRoute) {
    this.ID = ruta.snapshot.params['ID'];
    this.preguntas = action.getEncuestas(this.ID)[0];
    this.respuestas = action.getRespuestas(this.ID);
  }

  tipoRes(tipo: string): Array<string>{
    if (tipo === '0'){  return ['No', 'Si']; }
    if (tipo === '1'){ return ['1', '2', '3', '4', '5']; }
    if (tipo === '2'){ return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; }
    return [];
  }

  resultados(tipo: string, numPre: number): number[] {
    let res: number[] = [];
  
    // Inicializar el arreglo según el tipo de pregunta
    if (tipo === '0') res = [0, 0]; // Sí/No
    if (tipo === '1') res = [0, 0, 0, 0, 0]; // 1 a 5
    if (tipo === '2') res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 1 a 10
  
    // Procesar las respuestas
    this.respuestas.forEach((element: any) => {
      const respuesta = element.respuestas[numPre];
  
      if (tipo === '3') {
        // Ignorar preguntas abiertas
        console.log(`Pregunta ${numPre} es abierta, no se genera gráfica.`);
        return;
      }
  
      // Validar que la respuesta sea numérica
      if (typeof respuesta === 'number' && respuesta >= 0 && respuesta < res.length) {
        res[respuesta]++;
      } else {
        console.warn(`Respuesta inválida para pregunta ${numPre}:`, respuesta);
      }
    });
  
    console.log(`Resultados para pregunta ${numPre}:`, res);
    return res;
  }
  
  ngAfterViewInit() {
    this.ctx.forEach((e: any, i: any) => {
      const tipoPregunta = this.preguntas.preguntas[i].tipo;
  
      // Ignorar preguntas abiertas
      if (tipoPregunta === '3') {
        console.log(`Pregunta ${i} es abierta, no se genera gráfica.`);
        return;
      }
  
      // Destruir gráfica previa si existe
      if (this.charts[i]) {
        this.charts[i].destroy();
      }
  
      // Crear nueva gráfica
      this.charts[i] = new Chart(e.nativeElement.getContext('2d'), {
        type: 'bar',
        data: {
          labels: this.tipoRes(tipoPregunta),
          datasets: [{
            label: this.preguntas.preguntas[i].pregunta,
            data: this.resultados(tipoPregunta, i),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    });
  }
  
  ngOnDestroy() {
    this.charts.forEach(chart => chart?.destroy());
  }
  

  getOpenAnswers(numPre: number): string[] {
    return this.respuestas
      .map((element: any) => element.respuestas[numPre]) // Obtén respuestas por pregunta
      .filter((respuesta: any) => typeof respuesta === 'object' && respuesta.respuesta) // Filtra abiertas
      .map((respuesta: any) => respuesta.respuesta); // Extrae el texto de la respuesta
  }
  

  ngOnInit(): void {
  }

}

