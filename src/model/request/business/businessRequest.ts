export type CreateBusinessRequestType = {
    name:string,
    phone_number: string,
    description: string,
    address: string,
    website: string
}


export const CreateBusinessRequest: CreateBusinessRequestType = {
    name: "",
    phone_number: "",
    description: "",
    address: "",
    website: ""
}