import {RouteConstantUtil} from "../../utils/constant/RouteConstantUtil.ts";
import type {BaseRouteProps} from "./base-routes.ts";
export const appRoute: BaseRouteProps[] = [

    {
        path: '/profile',
        name: RouteConstantUtil.dashboard.profile,
        meta: {
          showHeader: true,
          showBackArrow: true
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/profile/Profile.view.vue"),
      },
      {
        path: "/create-business",
        name: "BUSINESS",
        meta: {
          showHeader: true,
          showBackArrow: true
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/dashboard/Business.view.vue"),
      },
      {
        path: "/edit-profile",
        name: "EDIT PROFILE",
        meta: {
          showHeader: true,
          showBackArrow: true
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/profile/EditProfile.view.vue"),
      },
      {
        path: "/bank",
        name: "BANK",
        meta: {
          showHeader: true,
          showBackArrow: true
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/dashboard/Bank.view.vue"),
      },
      {
        path: "/subscription",
        name: "SUBSCRIPTION",
        meta: {
          showHeader: true,
          showBackArrow: true
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/profile/SubscriptionPrice.view.vue"),
      },
      {
        path: "/identity-verification",
        name: "VERIFICATION",
        meta: {
          showHeader: true,
          showBackArrow: true
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/profile/verification/Index.view.vue"),
      },
    
]
