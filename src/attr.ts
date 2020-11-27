import {word} from './word'
import {X} from './x/flowTake'

import {XmlChars} from './word'

const {idChars, valueChars} = XmlChars;

export const attr = X.take([idChars, '=', '"', valueChars, '"'])
    .map(t => ({
        token: 'ATTR',
        name: t.at(0),
        value: t.at(3)
    }))
