import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class FintualService {

  constructor(private httpClient: HttpClient) {}

  async getStocks(id, params?): Promise<any> {
    // Servicio para obtener acciones de un rango de fechas
    return this.httpClient.get(`https://fintual-projects.uc.r.appspot.com/stocks/${id}?dateStart=${params.dateStart}&dateEnd=${params.dateEnd}`).toPromise();
  }

  async getStock(id, params?): Promise<any> {
    // Servicio para obtener acciones de una fecha especifica
    return this.httpClient.get(`https://fintual-projects.uc.r.appspot.com/stock/${id}?date=${params.date}`).toPromise();
  }
}
