import {X} from '../src/x/flowTake'
import {Streams} from '@masala/parser'

describe('X.inChars', ()=>{


    test('one range', ()=>{
        const p = X.inChars(['a-z']).rep().map(t => t.join(''));
        const resp = p.parse(Streams.ofString('ab2'));
        expect(resp.value).toBe('ab');
        expect(resp.offset ).toBe(2);
    })

    test('two ranges', ()=>{
        const p = X.inChars(['a-z', '4-8']).rep().map(t => t.join(''));
        const resp = p.parse(Streams.ofString('ab49'));
        expect(resp.value).toBe('ab4');
        expect(resp.offset ).toBe(3);
    })

    test('split chars', ()=>{
        const p = X.inChars(['aAbB']).rep().map(t => t.join(''));
        const resp = p.parse(Streams.ofString('ab49'));
        expect(resp.value).toBe('ab');
        expect(resp.offset ).toBe(2);
    })


    test('mix range and chars', ()=>{
        const p = X.inChars(['a-z', 'A-F', '012345']).rep().map(t => t.join(''));
        const resp = p.parse(Streams.ofString('aF49'));
        expect(resp.value).toBe('aF4');
        expect(resp.offset ).toBe(3);
    })

})