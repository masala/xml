import {C, F} from '@masala/parser'
import {X} from './x/flowTake'

// change by Id
export const word = C.letters()

export const notId = F.not(C.char('"')).rep();


const idChar = X.inChars(['a-z','A-Z', '0-9', '-_[]()*+']);
const idChars = idChar.rep().map(t=>t.join(''))

const valueChar = C.notChar('"');
const valueChars = valueChar.rep().map(t=>t.join(''))





// important about chars in Javascript: https://stackoverflow.com/questions/22312364/printing-emojis-with-javascript-and-html
export const XmlChars = {
    idChars,
    valueChars
}