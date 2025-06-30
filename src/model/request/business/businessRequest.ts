export type CreateBusinessRequestType = {
    name:string,
    phone_number: string,
    description: string,
    address: string,
    product_category:string,
    website: string
    email:string,
    location: string,
    category:string,
    business_logo:string,
}

export type DispatchSubscribeType = {
    business_id_no:number,
    business_dispatch_id_no:number,
}


export type DispatchUnSubscribeType = {
    business_id_no:number,
    business_dispatch_id_no:number,
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
    location:"",
    category:"",
    business_logo:""
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

export const DispatchSubscribe:DispatchSubscribeType = {
    business_id_no:0,
    business_dispatch_id_no:0,
}


export const DispatchUnSubscribe:DispatchUnSubscribeType = {
    business_id_no:0,
    business_dispatch_id_no:0,
}
