
export const RouteConstantUtil = {
    layout:{
        auth:"auth",
        dashboard:"dashboard",
        settings:"settings"
    },
    auth: {
        login: "Login",
        initiateForgotPassword: "InitiateForgotPassword",
        register: "Create Account",
        landingPage: "LandingPage",
        authRequired: false
    },
    page: {
        noPageFound: "NoPageFoundView",
        authRequired: false
    },
    dashboard: {
        homePage: "Dashboard",
        profile: "Profile",
        usersManagement:"User Management",
        authRequired: true,
    },
    payment: {
        success: "Success",
        error: "error",
        authRequired: true,
    },
}