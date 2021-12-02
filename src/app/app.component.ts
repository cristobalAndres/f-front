import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { format, subMonths } from 'date-fns';
import { FintualService } from "../services/fintual.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  form: FormGroup;
  lastMonth = format(subMonths(new Date(), 1), 'yyyy-MM-dd');
  now = format(new Date(), 'yyyy-MM-dd');
  // Codigos de acciones
  codes = [{
    id: 1,
    code: 'AAPL',
    name: 'APPLE'
  }, {
    id: 2,
    code: 'GOOGL',
    name: 'GOOGLE',
  }, {
    id: 3,
    code: 'LTMAQ',
    name: 'LATAM',
  }, {
    id: 4,
    code: 'MELI',
    name: 'MERCADOLIBRE',
  }];
  dataStock = null;
  stock = null;
  dateAlert = false;
  errorMsg = false;
  errorMsg2 = false;

  constructor(
    private formBuilder: FormBuilder,
    private fintualService: FintualService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // Se inicializan las fechas
    this.form.get('dateStart').setValue(this.lastMonth);
    this.form.get('dateEnd').setValue(this.now);
    this.form.get('date').setValue(this.now);
  }

  initForm() {
    this.form = this.formBuilder.group({
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      date: [null, [Validators.required]],
      stockId: [null, [Validators.required]],
    });
  }

  // Obtener información de acciones de un rango de fechas
  getStocks() {
    this.errorMsg = false;
    // Validación de rango de fechas
    if (new Date(this.form.get('dateStart').value).getTime() < new Date(this.form.get('dateEnd').value).getTime()) {
      this.dateAlert = false;
      // Obtención datos del formulario
      const stockId = this.form.get('stockId').value;
      const params = {
        dateStart: this.form.get('dateStart').value,
        dateEnd: this.form.get('dateEnd').value,
      };
      // Consulta de servicio
      this.fintualService.getStocks(stockId, params)
      .then(data => {
        console.log(data);
        this.dataStock = data;
      })
      .catch(err => {
        console.log('ERR -->>>', err);
        this.errorMsg = true;
      })
    } else {
      this.dateAlert = true;
    }
    
  }

  // Obtener información de una fecha especifica
  getStock() {
    this.errorMsg2 = false;
    const stockId = this.form.get('stockId').value;
    const params = {
      date: this.form.get('date').value,
    };

    this.fintualService.getStock(stockId, params)
    .then(data => {
      console.log(data);
      this.stock = data;
    })
    .catch(err => {
      console.log('ERR -->>>', err);
      this.errorMsg2 = true;
    })
  }
}


