import {C, F, IParser, Parser, Stream, TupleParser} from '@masala/parser'


type Modifier = '?' | '*' | '+'
type TakeItemArray = [IParser<any>, Modifier] | [string, Modifier]
type TakeItem = string | IParser<any> | TakeItemArray;

export const X = {
    take: flowTake,
    inCharRange,
    inCharRanges,
    inChars
}

function inCharRange(start: string, end: string) {
    return F.satisfy((value: string) => start <= value && value <= end);
}

export type CharRange = [string, string];

function inCharRanges(ranges: CharRange[]) {
    return ranges.some(range =>
        F.satisfy((value: string) => range[0] <= value && value <= range[1])
    );
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

export function flowTake(items: TakeItem[], debug = false): TupleParser<any> {

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
