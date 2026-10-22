
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { ServiceVenta, Factura } from '../../servicios/venta.serv/serviceventa';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas implements AfterViewInit {

  @ViewChild('contenedor', { static: true })
  contenedor!: ElementRef<HTMLDivElement>;

  @ViewChild('graficoLineas', { static: true })
  graficoLineas!: ElementRef<SVGSVGElement>;

  @ViewChild('graficoBarras', { static: true })
  graficoBarras!: ElementRef<SVGSVGElement>;

  facturas: Factura[] = [];
  datos: number[][] = [];

  errorCarga = '';

  sucursales: string[] = [
    'Mes',
    'Rafaela',
    'Santo Tome',
    'La Capital',
    'Recreo',
    'Rosario'
  ];

  meses: string[] = [
    '', 'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
  ];

  private colores = [
    'blue', 'red', 'green', 'orange', 'purple'
  ];

  constructor(private serviceVenta: ServiceVenta) {}

  ngAfterViewInit(): void {
    this.serviceVenta.getFacturas().subscribe({
      next: (facturas) => {
        console.log('Facturas recibidas:', facturas.length);

        this.facturas = facturas;
        this.procesarDatos();
        this.dibujarTabla();
        this.graficarLineas();
        this.graficarBarrasApiladas();
      },
      error: (error) => {
        console.error('Error al cargar las facturas:', error);
        this.errorCarga = 'No se pudieron cargar las ventas.';
      }
    });
  }

  // Agrupa los importes por mes y sucursal.
  procesarDatos(): void {
    this.datos = Array.from(
      { length: 13 },
      (_, mes) => mes === 0
        ? [0, 0, 0, 0, 0, 0]
        : [0, 0, 0, 0, 0, 0]
    );

    const indiceSucursal: Record<string, number> = {
      'rafaela': 1,
      'santo tome': 2,
      'la capital': 3,
      'recreo': 4,
      'rosario': 5
    };

    for (const factura of this.facturas) {
      const partesFecha = factura.FechaFactura.split('-');
      const mes = Number(partesFecha[1]);

      const sucursal = String(factura.sucursal)
        .trim()
        .toLowerCase();

      const columna = indiceSucursal[sucursal];
      const importe = Number(factura.Importe);

      if (
        mes >= 1 &&
        mes <= 12 &&
        columna !== undefined &&
        Number.isFinite(importe)
      ) {
        this.datos[mes][columna] += importe;
      }
    }
  }

  dibujarTabla(): void {
    let tabla = '<table border="1">';
    tabla += '<caption>Facturación mensual por sucursal</caption>';
    tabla += '<thead><tr>';

    for (const sucursal of this.sucursales) {
      tabla += `<th>${sucursal}</th>`;
    }

    tabla += '</tr></thead><tbody>';

    for (let mes = 1; mes <= 12; mes++) {
      tabla += '<tr>';
      tabla += `<td>${this.meses[mes]}</td>`;

      for (let columna = 1; columna <= 5; columna++) {
        const importe = this.datos[mes][columna];

        tabla += `<td>${importe.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          maximumFractionDigits: 2
        })}</td>`;
      }

      tabla += '</tr>';
    }

    tabla += '</tbody></table>';

    this.contenedor.nativeElement.innerHTML = tabla;
  }

  graficarLinea(sucursal: number, color: string): void {
    const svg = this.graficoLineas.nativeElement;

    const ancho = 600;
    const alto = 260;
    const valores = this.datos
      .slice(1)
      .map(fila => fila[sucursal]);

    const maxValor = Math.max(...valores, 1);

    const puntos = valores.map((valor, indice) => {
      const x = (indice / 11) * ancho;
      const y = alto - (valor / maxValor) * alto;

      return `${x},${y}`;
    }).join(' ');

    const polyline = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polyline'
    );

    polyline.setAttribute('points', puntos);
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', color);
    polyline.setAttribute('stroke-width', '2');

    svg.appendChild(polyline);
  }

  graficarLineas(): void {
    const svg = this.graficoLineas.nativeElement;
    svg.innerHTML = '';

    for (let sucursal = 1; sucursal <= 5; sucursal++) {
      this.graficarLinea(
        sucursal,
        this.colores[sucursal - 1]
      );
    }
  }

  graficarBarrasApiladas(): void {
    const svg = this.graficoBarras.nativeElement;
    svg.innerHTML = '';

    const ancho = 600;
    const alto = 300;
    const alturaUtil = alto - 40;

    const totales = this.datos.slice(1).map(fila =>
      fila.slice(1).reduce((suma, valor) => suma + valor, 0)
    );

    const maxTotal = Math.max(...totales, 1);
    const grupoAncho = ancho / 12;

    for (let mes = 1; mes <= 12; mes++) {
      let acumulado = 0;

      for (let sucursal = 1; sucursal <= 5; sucursal++) {
        const valor = this.datos[mes][sucursal];
        const barAlto = (valor / maxTotal) * alturaUtil;

        const rect = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        );

        rect.setAttribute(
          'x',
          ((mes - 1) * grupoAncho).toString()
        );

        rect.setAttribute(
          'y',
          (alto - 20 - acumulado - barAlto).toString()
        );

        rect.setAttribute('width', (grupoAncho - 2).toString());
        rect.setAttribute('height', barAlto.toString());
        rect.setAttribute('fill', this.colores[sucursal - 1]);

        svg.appendChild(rect);

        acumulado += barAlto;
      }

      const texto = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );

      texto.setAttribute(
        'x',
        ((mes - 1) * grupoAncho + grupoAncho / 2 - 10).toString()
      );

      texto.setAttribute('y', (alto - 5).toString());
      texto.setAttribute('font-size', '10');
      texto.textContent = this.meses[mes];

      svg.appendChild(texto);
    }
  }
}
