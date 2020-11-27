import {C, F} from '@masala/parser'
import {X} from './flowTake'

// change by Id
export const word = C.letters()

export const notId = F.not(C.char('"')).rep();


const idChar = X.inChars(['a-z','A-Z'])

export const Chars = {

}