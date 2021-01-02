import {IParser, SingleParser} from '@masala/parser'

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

export interface XmlParser extends IParser<Tag>{

}
export type TagParser  = SingleParser<Tag>;

export type Child = string | Tag