
export interface Attribute {
    token: 'ATTR',
    name: string,
    value: string
}
export interface Tag {
    token: 'TAG',
    tag: string,
    text?: string
    attributes: Attribute[]
    children:Child[]
}

export type Child = string | Tag