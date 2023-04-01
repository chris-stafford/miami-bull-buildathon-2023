import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AlertMessageService {

  constructor(private toastr: ToastrService) { }
  
    showSuccessMessage(message: string, title?: string, timeoutInSeconds = 5) {
      title = title ? title : 'Success';
      this.toastr.success(message, title,
      {
        timeOut: timeoutInSeconds * 1000,
        enableHtml: true,
        positionClass: "toast-top-full-width",
        closeButton: true
      });
    }
    
    showWarningMessage(message: string, title?: string, timeoutInSeconds = 5) {
      title = title ? title : 'Warning';
      this.toastr.warning(message, title,
      {
        timeOut: timeoutInSeconds * 1000,
        positionClass: "toast-top-full-width",
        extendedTimeOut: timeoutInSeconds * 1000,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: false
      });
    }

    showErrorMessage(message: string, title?: string, timeoutInSeconds = 10) {
      title = title ? title : 'Error';
      this.toastr.error(message, title,
      {
        timeOut: timeoutInSeconds * 1000,
        positionClass: "toast-top-full-width",
        extendedTimeOut: timeoutInSeconds * 1000,
        closeButton: true,
        enableHtml: true,
        tapToDismiss: false
      });
    }

}