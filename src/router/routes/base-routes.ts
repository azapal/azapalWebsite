import {pagesRoute} from "./pages-routes.ts";
import { appRoute } from "./app-routes.ts";

export interface BaseRouteProps {
    name: string,
    path: string,
    component: object,
    meta: Meta,

}

type Meta = {
    authRequired?: boolean,
    layout?: string,
    sub_title?:string,
    showHeader?: boolean,
    showBackArrow?: boolean,
    hash?: string
}

// Variable initialRoute implicitly has type any[] in some locations where its type cannot be determined.
const initialRoute:any = []
export const baseRoute = initialRoute.concat(pagesRoute,appRoute)
