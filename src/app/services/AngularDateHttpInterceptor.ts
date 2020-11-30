import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AngularDateHttpInterceptor implements HttpInterceptor {
	// Migrated from AngularJS https://raw.githubusercontent.com/Ins87/angular-date-interceptor/master/src/angular-date-interceptor.js
	iso8601 = /^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe( tap((event: HttpEvent<any>) => {
			if (event instanceof HttpResponse) {
				const body = event.body;
				this.convertToDate(body);
			}
		}, (err: any) => {
			if (err instanceof HttpErrorResponse) {
				if (err.status === 401) {
				}
			}
		}));
	}

	convertToDate(body) {
		if (body === null || body === undefined) {
			return body;
		}

		if (typeof body !== 'object') {
			return body;
		}

		for (const key of Object.keys(body))
		{
			const value = body[key];

			if( this.isIso8601(value) )
			{
				let date = key.indexOf('tiempo') == 0
					? this.fromUTCStringToLocalDate( value )
					: value
				body[key] = date;//new Date(value);
			}
			else if (typeof value === 'object')
			{
				this.convertToDate(value);
			}
		}
	}

	fromLocalStringToLocalDate(strDate:string):Date
	{
		let components = strDate.split(/-|:|\s/g);
		let date = new Date(
			parseInt(components[0]),
			parseInt(components[1])-1,
			parseInt(components[2]),
			parseInt(components[3]),
			parseInt(components[4])
		);
		return date;
	}


	fromUTCStringToLocalDate(strDate:string):Date
	{

		let components = strDate.split(/-|:|\s/g);
		let utcTime = Date.UTC(
			parseInt(components[0]),
			parseInt(components[1])-1,
			parseInt(components[2]),
			parseInt(components[3]),
			parseInt(components[4])
		);

		let d = new Date();
		d.setTime( utcTime );
		return d;
	}


	isIso8601(value):boolean
	{
		if (value === null || value === undefined) {
			return false;
		}

		return this.iso8601.test(value);
	}
}
