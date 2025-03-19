import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { levelInterface } from '../../interface/level.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient);

  getNumberLevels = (): Observable<number> => {
    return this.http.get<number>('http://127.0.0.1:8000/challenges/');
  };

  /**
   *
   * @param id número do level
   * @returns dados referente aquele level
   */
  getLevel = (id: number = 1): Observable<levelInterface> => {
    return this.http.get<levelInterface>('http://127.0.0.1:8000/challenges/' + id + '/');
  };
  /**
   *
   * @param id número do level
   * @param data dados da resposta do usuário
   * @returns feedback da resposta
   */
  postAnswer = (id: number, data: any): Observable<any> => {
    return this.http.post<any>(
      'http://127.0.0.1:8000/challenges/' + id + '/',
      data
    );
  };
}
