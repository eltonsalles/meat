import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private ns: NotificationService, private injector: Injector, private zone: NgZone) {
    super();
  }

  handleError(error: HttpErrorResponse | any) {
    if (error instanceof HttpErrorResponse) {
      const message = error.error.message

      this.zone.run(() => {
        switch (error.status) {
          case 401:
            this.injector.get(LoginService).handleLogin()
            break;

          case 403:
            this.ns.notify(message || 'Não autorizado.')
            break;

          case 404:
            this.ns.notify(message || 'Recurso não encontrado.')
            break;
        }
      })
    }

    super.handleError(error);
  }
}
