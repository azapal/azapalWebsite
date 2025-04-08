import {RouteConstantUtil} from "../../utils/constant/RouteConstantUtil.ts";
import type {BaseRouteProps} from "./base-routes.ts";
export const appRoute: BaseRouteProps[] = [

    {
        path: '/dashboard',
        name: RouteConstantUtil.dashboard.homePage,
        meta: {
          showHeader: true,
          showBackArrow: false,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/dashboard/Dashboard.view.vue"),
      },
      {
        path: "/create-business",
        name: "BUSINESS",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/dashboard/Business.view.vue"),
      },
      {
        path: "/edit-profile",
        name: "EDIT PROFILE",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/profile/EditProfile.view.vue"),
      },
      {
        path: "/business/users",
        name: RouteConstantUtil.dashboard.usersManagement,
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../components/UserManagement.vue"),
      },
      {
        path: "/success",
        name: RouteConstantUtil.payment.success,
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../components/SuccessModal.vue"),
      },
      {
        path: "/bank",
        name: "BANK",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/dashboard/Bank.view.vue"),
      },
      {
        path: "/subscription",
        name: "SUBSCRIPTION",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/profile/SubscriptionPrice.view.vue"),
      },
      {
        path: "/identity-verification",
        name: "VERIFICATION",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/profile/verification/Index.view.vue"),
      },
    
]
