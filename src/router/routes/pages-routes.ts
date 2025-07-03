import {RouteConstantUtil} from "../../utils/constant/RouteConstantUtil.ts";
import type {BaseRouteProps} from "./base-routes.ts";
export const pagesRoute: BaseRouteProps[] = [
    {
        name: RouteConstantUtil.page.noPageFound,
        path: "/:catchAll(.*)",
        component:() => import(/* webpackChunkName: "about" */ "../../pages/NoPageFoundView.vue"),
        meta: {
            authRequired: false,
            layout:'app',
            sub_title:'No Page matched'
        }
    }

]