import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const notify = (message:string) => toast(message, {
    "type": "default",
    "dangerouslyHTMLString": true
})
