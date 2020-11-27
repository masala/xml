import {C, GenLex} from '@masala/parser'
import {flowTake} from './flowTake'
import {word} from './word'
import {attr} from './attr'


//<?xml version="1.0" encoding="UTF-8"?>

export const head  = flowTake(['<', '?', 'xml', [attr.debug('ATTR'), '*'], '?', '>'  ], true)
    .map(tuple => ({
        token: 'HEADER'
    }));

export const tag = flowTake(['<', word, [attr, '*'], '>'])
    .map(t => t.array())
    .map(a => a.slice(1, a.length - 1))
    .map(([tag, ...attributes]) => ({
        token: 'TAG',
        tag,
        attributes
    }));





