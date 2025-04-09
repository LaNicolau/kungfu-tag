import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { levelInterface } from '../../interface/level.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient);

  /**
   * @returns quantidade e níveis existentes
   */
  getNumberLevels = (): Observable<number> => {
    return this.http.get<number>(
      'https://plangelo.pythonanywhere.com/challenges/'
    );
  };
  /**
   *
   * @param id número do level
   * @returns dados referente aquele level
   */
  getLevel = (id: number = 1): Observable<levelInterface> => {
    return this.http.get<levelInterface>(
      'https://plangelo.pythonanywhere.com/challenges/' + id + '/'
    );
  };
  /**
   *
   * @param id número do level
   * @param data dados da resposta do usuário
   * @returns feedback da resposta
   */
  postAnswer = (id: number, data: any): Observable<any> => {
    return this.http.post<any>(
      'https://plangelo.pythonanywhere.com/challenges/' + id + '/',
      data
    );
  };
}
