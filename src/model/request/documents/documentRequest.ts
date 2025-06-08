export type CreateTinDocumentRequest = {
    title: string,
    file: File | null,
}

export type CreateCacDocumentRequest = {
    title: string,
    file: File | null,
}

export type CreateIdDocumentRequestType = {
    full_name: string,
    document_type: string,
    file: File | null,
}



export const TinDocumentRequest:CreateTinDocumentRequest = {
    title:"",
    file:null
}
export const CacDocumentRequest:CreateCacDocumentRequest = {
    title:"",
    file:null
}
export const IdDocumentRequest:CreateIdDocumentRequestType = {
    full_name:"",
    document_type:"",
    file:null
}