import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const STARTING_POSITION_URL = "http://localhost:5000/api/balance";

@Injectable({
  providedIn: 'root'
})
export class StartingPositionService {

  constructor(private http:HttpClient) { }

  getStartingBalance():Observable<any>{
    const URL = STARTING_POSITION_URL + '/get/starting';
    return this.http.get<any>(URL);
  }
}
