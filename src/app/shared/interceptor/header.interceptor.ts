import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (typeof localStorage === 'undefined') {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (!token || token.trim() === '') {
    return next(req);
  }

  const updatedReq = req.clone({
    headers: req.headers.set('token', token)
  });

  return next(updatedReq);
};
