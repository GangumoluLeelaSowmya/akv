import { HttpInterceptorFn } from '@angular/common/http';

export const secretInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem('token');
  const newReq =req.clone({
    setHeaders:{
      Authorization:'${token}'
    }
  })
  return next(req);
};
