import {word} from './word'
import {X} from './x/flowTake'

import {XmlChars} from './word'
import {xmlNs} from './namespace'

const {idChars, valueChars} = XmlChars;

export const attr = X.take([[xmlNs, '?'],idChars, '=', '"', valueChars, '"'])
    .map(t => ({
        namespace:t.at(0).orElse(undefined),
        token: 'ATTR',
        name: t.at(1),
        value: t.at(4)
    }))
