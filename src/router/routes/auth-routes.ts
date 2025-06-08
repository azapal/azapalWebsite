import {RouteConstantUtil} from "../../utils/constant/RouteConstantUtil.ts";
import type {BaseRouteProps} from "./base-routes.ts";
export const authRoute: BaseRouteProps[] = [
    {
        name: RouteConstantUtil.auth.landingPage,
        path: '/',
        component: () => import("../../pages/LandingPage.vue"),
        meta: {authRequired:RouteConstantUtil.auth.authRequired,sub_title:'',layout:RouteConstantUtil.layout.auth
        }
    },
    {
        name: RouteConstantUtil.auth.register,
        path: '/create-account',
        component: () => import("../../pages/auth/SignUp.vue"),
        meta: {authRequired:RouteConstantUtil.auth.authRequired,sub_title:'',
            layout:RouteConstantUtil.layout.auth
        }
    },
    {
        name: RouteConstantUtil.auth.login,
        path: '/login',
        component: () => import("../../pages/auth/Login.vue"),
        meta: {authRequired:RouteConstantUtil.auth.authRequired, sub_title:'',
            layout:RouteConstantUtil.layout.auth
        }
    },
    {
        name: RouteConstantUtil.auth.initiateForgotPassword,
        path: '/reset-password',
        component: () => import("../../pages/auth/ResetPassword.vue"),
        meta: {authRequired:RouteConstantUtil.auth.authRequired, sub_title:'',
            layout:RouteConstantUtil.layout.auth
        }
    },
    {
        name: RouteConstantUtil.auth.initiateChangePassword,
        path: '/change-password',
        component: () => import("../../pages/auth/ChangePassword.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, sub_title:'',
            layout:RouteConstantUtil.layout.auth
        }
    },
]