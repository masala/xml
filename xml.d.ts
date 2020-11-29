
export interface Attribute {
    token: 'ATTR',
    name: string,
    value: string,
    namespace?:string
}
export interface Tag {
    token: 'TAG',
    tag: string,
    text?: string
    attributes: Attribute[]
    children:Child[],
    namespace?:string
}

export type Child = string | Tag