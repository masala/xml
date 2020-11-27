import {word} from './word'
import {attr} from './attr'
import { X} from './x/flowTake'


//<?xml version="1.0" encoding="UTF-8"?>

export const head  = X.take(['<', '?', 'xml', [attr, '*'], '?', '>'  ])
    .map(tuple => ({
        token: 'HEADER'
    }));

export const tag = X.take(['<', word, [attr, '*'], '>'])
    .map(t => t.array())
    .map(a => a.slice(1, a.length - 1))
    .map(([tag, ...attributes]) => ({
        token: 'TAG',
        tag,
        attributes
    }));





