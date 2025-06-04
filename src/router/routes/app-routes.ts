import {RouteConstantUtil} from "../../utils/constant/RouteConstantUtil.ts";
import type {BaseRouteProps} from "./base-routes.ts";
export const appRoute: BaseRouteProps[] = [

    {
        path: '/dashboard',
        name: RouteConstantUtil.dashboard.homePage,
        meta: {
          showHeader: true,
          showBackArrow: false,
          authRequired:RouteConstantUtil.dashboard.authRequired,
          layout:RouteConstantUtil.layout.dashboard
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/dashboard/Dashboard.view.vue"),
      },

      {
        path: "/business/cooperative",
        name: "COOPERATIVE",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "../../pages/dashboard/cooperative/Cooperative.view.vue"),
      },

      {
        path: "/business/logistics",
        name: "LOGISTICS",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "../../pages/dashboard/logistics/Logistics.view.vue"),
      },

      {
        path: "/business/escrow",
        name: "ESCROW",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "../../pages/dashboard/escrow/Escrow.view.vue"),
      },

      {
        path: "/business/vendor",
        name: "VENDOR",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "../../pages/dashboard/vendor/Vendor.view.vue"),
      },

      {
        path: "/business/cooperative/create",
        name: "CREATE COOPERATIVE",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "../../pages/dashboard/cooperative/CreateCooperative.form.vue"),
      },

      {
        path: "/business/escrow/create",
        name: "CREATE ESCROW APP",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "../../pages/dashboard/escrow/CreateEscrowBusiness.form.vue"),
      },

      {
        path: "/business/logistics/create",
        name: "CREATE LOGISTICS",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "../../pages/dashboard/logistics/CreateLogistics.form.vue"),
      },

      {
        path: "/business/vendor/create",
        name: "CREATE VENDOR",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "../../pages/dashboard/vendor/CreateVendor.form.vue"),
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

      {
        path: "/settings",
        name: "SETTINGS",
        meta: {
          showHeader: true,
          showBackArrow: true,
          authRequired:RouteConstantUtil.dashboard.authRequired
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../../pages/settings/Settings.vue"),
      },
    
]
