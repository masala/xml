import {flowTake} from './flowTake'
import {word} from './word'

export const attr = flowTake([word, '=', '"', word, '"'])
    .map(t => ({
        token: 'ATTR',
        name: t.at(0),
        value: t.at(3)
    }))
