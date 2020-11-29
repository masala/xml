import {word} from './word'
import {attr} from './attr'
import { X} from './x/flowTake'
import {C} from '@masala/parser'


//<?xml version="1.0" encoding="UTF-8"?>

export const head  = X.take(['<', '?', 'xml', [attr, '*'], '?', '>'  ])
    .map(tuple => ({
        token: 'HEADER'
    }));

export const openTag = X.take(['<', word, [attr, '*'], '>'])
    .map(t => t.array())
    .map(a => a.slice(1, a.length - 1))
    .map(([tag, ...attributes]) => ({
        token: 'OPEN_TAG',
        tag,
        attributes
    }));

export function closeTag (name:string){
    X.take(['</', C.string(name),'>'])
        .map(t => ({token: 'CLOSE_TAG',tag:t.at(1)}));

}