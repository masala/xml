import {XmlChars} from './word'
import {F, C} from '@masala/parser'


export const xmlNs = F.try(XmlChars.idChars.then(C.char(':'))).map(t => t.at(0));