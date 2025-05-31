export type CreateBusinessRequestType = {
    name:string,
    phone_number: string,
    description: string,
    address: string,
    product_category:string,
    website: string
    email:string,
    location: string
}

export type CreateCooperativeType = {
    corporative_name :string
    description  :string
    address :string
    user_id :string
}

export type CreateUserInterestType = {
    corporative_name :string
    description  :string
    address :string
    user_id :string
}


export type CreateCooperativePackageType = {
    package_name:string
    package_description:string
    corporative_id :string
    saving_plan_interest  :string
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
    address :"",
    user_id :""
}


export const CreateBusinessRequest: CreateBusinessRequestType = {
    name: "",
    phone_number: "",
    description: "",
    email:"",
    address: "",
    product_category:"",
    website: "",
    location:""
}

export const CreateUserInterest:CreateUserInterestType = {
    corporative_name :"",
    description  :"",
    address :"",
    user_id :""
}


export const CreateCooperativePackage:CreateCooperativePackageType = {
    package_name:"",
    package_description:"",
    corporative_id :"",
    saving_plan_interest  :"",
    interest_timeline :"",
    user_id :""
}
