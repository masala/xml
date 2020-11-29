import {word, XmlChars} from './word'
import {attr} from './attr'
import { X} from './x/flowTake'
import {F, C, Tuple, Option, SingleParser} from '@masala/parser'
import {Child, Tag} from '../xml'


//<?xml version="1.0" encoding="UTF-8"?>

export const head  = X.take(['<', '?', 'xml', [attr, '*'], '?', '>'  ])
    .map(tuple => ({
        token: 'HEADER'
    }));

export const openTag = X.take(['<', XmlChars.idChars, [attr, '*'], '>'])
    .map(t => t.array())
    .map(a => a.slice(1, a.length - 1))
    .map(([tag, ...attributes]) => ({
        token: 'OPEN_TAG',
        tag,
        attributes
    }));

export function closeTag (name:string){
    return X.take(['</', C.string(name),'>'])
        .map(t => ({token: 'CLOSE_TAG',tag:name}));

}

export function anyCloseTag (){
    return X.take(['</', XmlChars.idChars,'>'])
        .map(t => ({token: 'CLOSE_TAG',tag:t.at(1)}));
}

export const text = F.not(anyCloseTag()).rep().map(t=>t.join(''));

export function finalTag():SingleParser<Tag>{
    return openTag.then (F.lazy(children).opt()).flatMap(function( t: Tuple<any>){
        const openTag = t.at(0);
        const optText = t.at(1) as Option<Child[]>;

        const children = optText.map(t =>t).orElse([]);

        const tagName= openTag.tag;
        const token = 'TAG' as const;
        return closeTag(tagName).returns({token,tag:tagName, attributes:openTag.attributes, children});
    });
}

export function manyTags(){
    return finalTag().rep().map(t => t.array());
}

export function children():SingleParser<Child[]>{
    return F.try(manyTags()).or(text.map(t => [t]))
}

/*
E -> T E'
E' -> + TE'  |  eps
T -> F T'
T' -> * FT'  |  eps
F -> U | ( E )


 E -> F then E.opt()    //  list of tags


 ManyTag -> Tag then Tag.optrep()
 Tag -> open children close
 Children -> Text |   Many Tag


 */














