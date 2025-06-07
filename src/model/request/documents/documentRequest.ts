export type CreateTinDocumentRequest = {
    title: string,
    file: File | null,
}

export type CreateCacDocumentRequest = {
    title: string,
    file: File | null,
}

export type CreateIdDocumentRequest = {
    title: string,
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
export const IdDocumentRequest:CreateIdDocumentRequest = {
    title:"",
    file:null
}