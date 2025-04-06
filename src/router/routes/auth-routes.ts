import {RouteConstantUtil} from "../../utils/constant/RouteConstantUtil.ts";
import type {BaseRouteProps} from "./base-routes.ts";
export const authRoute: BaseRouteProps[] = [
    {
        name: RouteConstantUtil.auth.landingPage,
        path: '/',
        component: () => import("../../pages/LandingPage.vue"),
        meta: {authRequired:RouteConstantUtil.auth.authRequired, layout:'auth',sub_title:''}
    },
    {
        name: RouteConstantUtil.auth.register,
        path: '/create-account',
        component: () => import("../../pages/auth/SignUp.vue"),
        meta: {authRequired:RouteConstantUtil.auth.authRequired, layout:'auth',sub_title:''}
    },
]