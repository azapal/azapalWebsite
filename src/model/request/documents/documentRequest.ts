export type CreateTinDocumentRequest = {
    status: string,
    file: File | null,
}

export type CreateCacDocumentRequest = {
    status: string,
    file: File | null,
}

export type CreateIdDocumentRequestType = {
    full_name: string,
    document_type: string,
    file: File | null,
}



export const TinDocumentRequest:CreateTinDocumentRequest = {
    status:"",
    file:null
}
export const CacDocumentRequest:CreateCacDocumentRequest = {
    status:"",
    file:null
}
export const IdDocumentRequest:CreateIdDocumentRequestType = {
    full_name:"",
    document_type:"",
    file:null
}