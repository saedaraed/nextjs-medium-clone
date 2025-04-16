// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const user = request.cookies.get('user');  // قراءة الكوكيز
// console.log('user' , user)
//   const protectedRoutes = ['/new-story', '/dashboard', '/account'];  // تحديد المسارات المحمية

//   // التحقق من حالة المستخدم
//   if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL('/login', request.url)); // إعادة التوجيه إلى صفحة تسجيل الدخول
//   }

//   // السماح للمستخدمين المسجلين بتجاوز صفحات تسجيل الدخول
//   if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
//     return NextResponse.redirect(new URL('/', request.url)); // إعادة التوجيه إلى الصفحة الرئيسية
//   }

//   return NextResponse.next();  // السماح بالمتابعة
// }

// // تحديد المسارات التي ينطبق عليها الـ middleware
// export const config = {
//   matcher: ['/new-story', '/login', '/register'],
// };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('user'); 
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/new-story', 
  
  ], };
