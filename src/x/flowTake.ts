import {C, F, IParser, Parser, Stream, TupleParser} from '@masala/parser'


type Modifier = '?' | '*' | '+'
type TakeItemArray = [IParser<any>, Modifier] | [string, Modifier]
type TakeItem = string | IParser<any> | TakeItemArray;

export const X = {
    take,
    inChars,
    tryAll
}


function inChars(strings: string[]) {
    return F.satisfy(function(value: string){
        for (let i = 0; i < strings.length; i++) {
            const s = strings[i];
            if (s.length === 3 && s[1] === '-') {
                if (s[0] <= value && value <= s[2]){
                    return true;
                }
            }else{
                if (s.includes(value)){
                    return true;
                }
            }
        }
        return false;
    })
}

function take(items: TakeItem[], debug = false): TupleParser<any> {

    if (items.length < 2) {
        throw "take array must have at least two items"
    }

    let parser: IParser<any> = F.nop();
    const separator = C.charIn(' \r\n\f\t').drop();

    items.forEach(item => {
        let next: IParser<any>;
        if (typeof item === 'string') {
            next = takeString(item);
        } else if (Array.isArray(item)) {
            if (typeof item[0] === 'string') {
                next = takeArrayString(item[0], item[1])
            } else {
                next = takeArrayParser(item[0], item[1])
            }
        } else {
            next = item;
        }
        if (debug) {
            next = next.debug(typeof item === 'string' ? item : 'p')
        }

        parser = parser
            .then(separator.optrep().drop())
            .then(next)
            .then(separator.optrep().drop());
    })
    return parser as TupleParser<any>;


}

function takeString(str: string) {
    return C.string(str)
}

function takeArrayParser(parser: IParser<any>, modifier: Modifier) {
    if (modifier === '?') {
        return parser.opt();
    }
    if (modifier === '*') {
        return parser.optrep();
    }
    // +
    return parser.rep();


}

function takeArrayString(str: string, modifier: Modifier) {
    if (modifier === '?') {
        return C.string(str).opt();
    }
    if (modifier === '*') {
        return C.string(str).optrep();
    }
    // +
    return C.string(str).rep();
}

function tryAll(array: IParser<any>[]) {
    if (array.length === 0) {
        return F.nop();
    }
    let parser = F.try(array[0]);
    for (let i = 1; i < array.length; i++) {
        parser = parser.or(F.try(array[i]));
    }

    return parser;
}