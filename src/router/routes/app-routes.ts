import {RouteConstantUtil} from "../../utils/constant/RouteConstantUtil.ts";
import type {BaseRouteProps} from "./base-routes.ts";
export const appRoute: BaseRouteProps[] = [
  {
    name: RouteConstantUtil.app.landingPage,
    path: '/',
    component: () => import("../../pages/LandingPage.vue"),
    meta: {authRequired:RouteConstantUtil.app.authRequired,sub_title:'',layout:RouteConstantUtil.layout.app
    }
  },
]
