import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Kpi } from '../model/Kpi';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

    private apiUrl = environment.apiUrl + '/KpiService/formulaKpi';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    
      constructor(private http: HttpClient) {}
    
      getAllKpi(): Observable<Kpi[]> {
        return this.http.get<Kpi[]>(this.apiUrl, this.httpOptions);
      }
    
      addKpi(kpi: Kpi): Observable<Kpi> {
        return this.http.post<Kpi>(this.apiUrl, kpi);
      }
    
      updateKpi(kpi: Kpi): Observable<Kpi> {
        return this.http.put<Kpi>(this.apiUrl, kpi);
      }

      deleteKpi(kpi: Kpi): Observable<Kpi> {
        const url = `${this.apiUrl}/${kpi.name}`;
        return this.http.delete<Kpi>(url, this.httpOptions);
      }
}
