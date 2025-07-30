/**
 * Authenticated-only middleware for Nuxt 3.
 *
 * @description Prevents non-authenticated users from accessing protected routes.
 * If no valid token is found in localStorage on the client, the user is redirected to the login page.
 *
 * @middleware auth
 * @returns {Promise<void>|void} Redirects to /auth/login if not authenticated
 */
export default defineNuxtRouteMiddleware(() => {
    if (process.client) {
        const token = localStorage.getItem('token')

        if (!token) {
            return navigateTo('/auth/login')
        }
    }
})
