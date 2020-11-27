import {X} from '../src/x/flowTake'
import {N,Streams} from '@masala/parser'

describe('X.take', () => {

    test('take string', () => {
        const p = X.take(['T', 'B', '12']).map(t => t.join(""));
        const resp = p.parse(Streams.ofString('TB12x'));
        expect(resp.value).toBe('TB12');
        expect(resp.offset).toBe(4);
    })

    test('take with parser', () => {
        const p = X.take(['T', 'B', N.digits()]).map(t => t.join(""));
        const resp = p.parse(Streams.ofString('TB1224x'));
        expect(resp.value).toBe('TB1224');
        expect(resp.offset).toBe(6);
    })

    test('take with separator', () => {
        const p = X.take(['T', 'B', N.digits()]).map(t => t.join(""));
        const resp = p.parse(Streams.ofString('T B 12 x'));
        expect(resp.value).toBe('TB12');
        expect(resp.offset).toBe(7);
    })
})