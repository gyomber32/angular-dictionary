import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    public login(email: string, password: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {
            email: email,
            password: password
        };
        return this.http.post('http://localhost:3000/auth/login', body, { headers });
    }

    public logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        this.router.navigate(['/login']);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    public autoLogin(): void {
        const token = localStorage.getItem('token');
        const tokenExpiry = +localStorage.getItem('tokenExpiry');

        if (!token || !tokenExpiry || new Date().getTime() > tokenExpiry) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/']);
            const expirationDuration = tokenExpiry - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    public autoLogout(expirationDuration: number): void {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        const tokenExpiry = +localStorage.getItem('tokenExpiry');

        if (!token || !tokenExpiry || new Date().getTime() > tokenExpiry) {
            return false;
        } else {
            return true;
        }
    }

}
