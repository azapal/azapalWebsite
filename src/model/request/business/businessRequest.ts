export type CreateBusinessRequestType = {
    name:string,
    phone_number: string,
    description: string,
    address: string,
    category:string,
    website: string
}

export type CreateCooperativeType = {
    corporative_name :string
    description  :string
    saving_plan_interest :string
    interest_timeline :string
    user_id :string
}

export type CooperativeVerificationType = {
    cooperative :string
    verification_document_link :string
    verification_id :string
}

export const CooperativeVerification:CooperativeVerificationType = {
    cooperative :"",
    verification_document_link :"",
    verification_id :""
}

export const CreateCooperative:CreateCooperativeType = {
    corporative_name :"",
    description  :"",
    saving_plan_interest :"",
    interest_timeline :"",
    user_id :""
}


export const CreateBusinessRequest: CreateBusinessRequestType = {
    name: "",
    phone_number: "",
    description: "",
    address: "",
    category:"",
    website: "",
}