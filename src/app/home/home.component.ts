import { Component, AfterViewInit,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectOption(targetId: string) {
    this.isMenuOpen = false;
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngAfterViewInit() {
    // Registrar todas las escalas, elementos y plugins que se necesiten
    Chart.register(...registerables);
    this.createCharts();
  }

  

  createCharts() {
    // Gráfico de Barras - Evaluación de Instituciones Educativas
    const ctx1 = <HTMLCanvasElement>document.getElementById('institucionesChart');
    if (!ctx1) {
      console.error('El canvas con id "institucionesChart" no se encontró.');
      return;
    }
    const institucionesContext = ctx1.getContext('2d');
    if (!institucionesContext) {
      console.error('No se pudo obtener el contexto 2D del canvas "institucionesChart".');
      return;
    }
    const institucionesChart = new Chart(institucionesContext, {
      type: 'bar',
      data: {
        labels: ['Instituciones Públicas', 'Instituciones Privadas', 'Instituciones Técnicas'],
        datasets: [{
          label: 'Número de Instituciones Evaluadas',
          data: [30, 15, 5], // Datos correspondientes
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Gráfico de Tarta - Capacitación en TICs
    const ctx2 = <HTMLCanvasElement>document.getElementById('capacitacionChart');
    if (!ctx2) {
      console.error('El canvas con id "capacitacionChart" no se encontró.');
      return;
    }
    const capacitacionContext = ctx2.getContext('2d');
    if (!capacitacionContext) {
      console.error('No se pudo obtener el contexto 2D del canvas "capacitacionChart".');
      return;
    }
    const capacitacionChart = new Chart(capacitacionContext, {
      type: 'pie',
      data: {
        labels: ['Capacitados', 'No Capacitados'],
        datasets: [{
          label: 'Porcentaje de Docentes Capacitados',
          data: [120, 80], // Datos correspondientes
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      }
    });

    // Gráfico de Líneas - Implementación de Estrategias de Apropiación Tecnológica
    const ctx3 = <HTMLCanvasElement>document.getElementById('estrategiasChart');
    if (!ctx3) {
      console.error('El canvas con id "estrategiasChart" no se encontró.');
      return;
    }
    const estrategiasContext = ctx3.getContext('2d');
    if (!estrategiasContext) {
      console.error('No se pudo obtener el contexto 2D del canvas "estrategiasChart".');
      return;
    }
    const estrategiasChart = new Chart(estrategiasContext, {
      type: 'line',
      data: {
        labels: ['2022-2', '2023-1', '2023-2', '2024-1'],
        datasets: [{
          label: 'Número de Estudiantes Beneficiados',
          data: [500, 800, 1200, 2000], // Datos correspondientes
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Gráfico de Barras - Cuestionarios y Encuestas
    const ctxBarrasCuestionarios = <HTMLCanvasElement>document.getElementById('graficoBarrasCuestionarios');
    if (!ctxBarrasCuestionarios) {
      console.error('El canvas con id "graficoBarrasCuestionarios" no se encontró.');
      return;
    }
    const graficoBarrasCuestionariosContext = ctxBarrasCuestionarios.getContext('2d');
    if (!graficoBarrasCuestionariosContext) {
      console.error('No se pudo obtener el contexto 2D del canvas "graficoBarrasCuestionarios".');
      return;
    }
    const graficoBarrasCuestionarios = new Chart(graficoBarrasCuestionariosContext, {
      type: 'bar',
      data: {
        labels: ['Estudiantes', 'Docentes'],
        datasets: [{
          label: 'Número de Cuestionarios y Encuestas',
          data: [120, 30], // Datos correspondientes
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)', // Azul para Estudiantes
            'rgba(75, 192, 192, 0.2)'  // Verde para Docentes
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)', // Azul para Estudiantes
            'rgba(75, 192, 192, 1)'  // Verde para Docentes
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Categorías'
            }
          }
        }
      }
    });

    // Gráfico de Tarta - Instituciones Evaluadas
    const ctxTartaInstituciones = <HTMLCanvasElement>document.getElementById('graficoTartaInstituciones');
    if (!ctxTartaInstituciones) {
      console.error('El canvas con id "graficoTartaInstituciones" no se encontró.');
      return;
    }
    const graficoTartaInstitucionesContext = ctxTartaInstituciones.getContext('2d');
    if (!graficoTartaInstitucionesContext) {
      console.error('No se pudo obtener el contexto 2D del canvas "graficoTartaInstituciones".');
      return;
    }
    const graficoTartaInstituciones = new Chart(graficoTartaInstitucionesContext, {
      type: 'pie',
      data: {
        labels: ['Escuelas Públicas', 'Escuelas Privadas', 'Escuelas Técnicas'],
        datasets: [{
          label: 'Distribución de Instituciones Evaluadas',
          data: [20, 15, 15], // Datos correspondientes
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // Rosa para Públicas
            'rgba(54, 162, 235, 0.2)', // Azul para Privadas
            'rgba(75, 192, 192, 0.2)'  // Verde para Técnicas
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)', // Rosa para Públicas
            'rgba(54, 162, 235, 1)', // Azul para Privadas
            'rgba(75, 192, 192, 1)'  // Verde para Técnicas
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return tooltipItem.label + ': ' + tooltipItem.raw;
              }
            }
          }
        }
      }
    });

    // Gráfico de Barras - Datos Recogidos por Ciclo
    const ctxBarrasCiclos = <HTMLCanvasElement>document.getElementById('graficoBarrasCiclos');
    if (!ctxBarrasCiclos) {
      console.error('El canvas con id "graficoBarrasCiclos" no se encontró.');
      return;
    }
    const graficoBarrasCiclosContext = ctxBarrasCiclos.getContext('2d');
    if (!graficoBarrasCiclosContext) {
      console.error('No se pudo obtener el contexto 2D del canvas "graficoBarrasCiclos".');
      return;
    }
    const graficoBarrasCiclos = new Chart(graficoBarrasCiclosContext, {
      type: 'bar',
      data: {
        labels: ['Ciclo 1', 'Ciclo 2', 'Ciclo 3'],
        datasets: [{
          label: 'Cantidad de Datos Recogidos',
          data: [50, 70, 80], // Datos correspondientes
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // Color para Ciclo 1
            'rgba(54, 162, 235, 0.2)', // Color para Ciclo 2
            'rgba(75, 192, 192, 0.2)'  // Color para Ciclo 3
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)', // Color para Ciclo 1
            'rgba(54, 162, 235, 1)', // Color para Ciclo 2
            'rgba(75, 192, 192, 1)'  // Color para Ciclo 3
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de Datos'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Ciclos de Datos'
            }
          }
        }
      }
    });
  }
}
