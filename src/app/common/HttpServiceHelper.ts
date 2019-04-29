import { Observable } from 'rxjs/Rx'
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpServiceHelper {

    constructor(private http: HttpClient) {
    }

    public getPicture(url: string): Observable<Blob>{
        return this.http.get(url, {responseType: 'blob'});
    }

    public httpGetRequest(url: string) {
        return this.http.get(url)
            .map(response => {
                return response;
            })
            .catch(response => (Observable.throw(response)
            ))
    }

}