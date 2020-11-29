import {word, XmlChars} from './word'
import {attr} from './attr'
import { X} from './x/flowTake'
import {F, C, Tuple, Option, SingleParser, TupleParser, IParser} from '@masala/parser'
import {Child, Tag} from '../xml'
import {xmlNs} from './namespace'


//<?xml version="1.0" encoding="UTF-8"?>

export const head  = X.take(['<', '?', 'xml', [attr, '*'], '?', '>'  ])
    .map(tuple => ({
        token: 'HEADER'
    }));

export const openTag = X.take(['<', [xmlNs,'?'], XmlChars.idChars, [attr, '*'], '>'])
    .map(t => t.array())
    .map(a => a.slice(1, a.length - 1))
    .map(([optNs,tag, ...attributes]) => ({
        namespace:optNs.orElse(undefined),
        token: 'OPEN_TAG',
        tag,
        attributes
    }));

export function closeTag (name:string, namespace?:string){
    return X.take(['</',[xmlNs,'?'], C.string(name),'>'])
        .map(t => ({token: 'CLOSE_TAG',tag:name, namespace}));

}

export function anyCloseTag (){
    return X.take(['</', XmlChars.idChars,'>'])
        .map(t => ({token: 'CLOSE_TAG',tag:t.at(1)}));
}

export const text = C.notChar("<").rep().map(t=>t.join('').trim());

export function tag():SingleParser<Tag>{
    return openTag.then (F.lazy(children).opt()).flatMap(function( t: Tuple<any>){
        const openTag = t.at(0);
        const optText = t.at(1) as Option<Child[]>;

        const children = optText.map(t =>t).orElse([]);

        const tagName= openTag.tag;
        const token = 'TAG' as const;
        return closeTag(tagName).returns({token,tag:tagName, namespace:openTag.namespace, attributes:openTag.attributes, children});
    });
}

export function manyTags(){
    return tag().rep().map(t => t.array());
}

export function children():SingleParser<Child[]>{
    return F.try(tag()).or(text).rep().map(t=>t.array())
}

const a = F.try(head.then(tag()))
export const xmlParser = a.or(tag()) as IParser<any>;

//export const xmlParser = F.try(head.then(tag())).or(tag());














