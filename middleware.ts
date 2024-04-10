// middleware.ts custom middleware that enforces Clerk Authentication
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Note: this line we've defined our auth pages as public routes to opt-out of authentication
  publicRoutes: ['/sign-in', '/sign-up'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
