/**
 * Guest-only middleware for Nuxt 3.
 *
 * @description Prevents authenticated users from accessing guest-only pages such as login or register.
 * If a user has a valid token, they will be redirected to the homepage.
 *
 * @middleware guest
 * @param {RouteLocationNormalized} to - The target route object being navigated to
 * @param {RouteLocationNormalized} from - The current route object being navigated away from
 * @returns {Promise<void>|void} - A navigation redirect if the user is authenticated
 */
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')

    if (token.value) {
        return navigateTo('/')
    }
})
