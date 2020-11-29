import {tag, head, openTag, xmlParser} from '../src/xml-genlex'
import {attr} from '../src/attr'
import {Streams} from '@masala/parser'
import {Tag} from '../xml'

describe('Xml genlex', ()=>{


    test('attributes', ()=>{
        const response = attr.parse(Streams.ofString('a="b"'))
        const value = response.value;
        expect(value.token).toEqual('ATTR')
        expect(value.name).toBe('a')
        expect(value.value).toBe('b')

        let more = attr.val(' x= " y" ')
        expect(more.token).toEqual('ATTR')

        more = attr.val('version="1.0"')
        expect(more.token).toEqual('ATTR')

    })

    test('attributes with emoji value', ()=>{
        const value = attr.val('a="\U+1F436"')
        expect(value.token).toEqual('ATTR')
    });

    test('attributes with namespace', ()=>{
        const value = attr.val('finland:a="\U+1F436"')
        expect(value.namespace).toEqual('finland')
    });

    test('header', ()=>{
        const value = head.val('<?xml version="1.0" encoding="UTF-8" ?>')
        expect(value.token).toEqual('HEADER')

    })


    test('simple open tag', ()=>{
        const value = openTag.val('<someTag x="y" a="b">')
        expect(value.token).toEqual('OPEN_TAG')
        expect(value.attributes).toHaveLength(2)
    })

    test('openTag with namespace', ()=>{
        const value = openTag.val('<x:someTag x="y" a="b">')

        expect(value.token).toEqual('OPEN_TAG')
        expect(value.namespace).toBe('x')
        expect(value.attributes).toHaveLength(2)
    })

    test('finalTag', ()=>{
        const response = tag().parse(Streams.ofString(
            '<someTag x="y" a="b">Masala</someTag>'));
        expect(response.value.token).toEqual('TAG')
        expect(response.value.children).toHaveLength(1);
        expect(response.value.attributes).toHaveLength(2);
    })

    test('Tag with children', ()=>{
        const response = tag().parse(Streams.ofString(
            '<someTag x="y" ><a>Masala</a></someTag>'));
        expect(response.value.token).toEqual('TAG')
        expect(response.value.children).toHaveLength(1);
        const child = response.value.children[0] as Tag
        expect(child.tag).toBe("a");
    })

    test('Tag with two children', ()=>{
        const response = tag().parse(Streams.ofString(
            '<someTag x="y" ><a>Masala</a><b>Text</b>Lonely Text</someTag>'));
        expect(response.value.token).toEqual('TAG')
        expect(response.value.children).toHaveLength(3);
        const child = response.value.children[0] as Tag
        expect(child.tag).toBe("a");
        const secondChild = response.value.children[1] as Tag
        expect(secondChild.tag).toBe("b");
        expect(secondChild.children[0]).toBe('Text')
        const thirdChild = response.value.children[2] as string
        expect(thirdChild).toBe('Lonely Text')
    })

    test('More complex xml', ()=>{
        const xml = `<xml>
    Text
    <r:simple f:a="1.0">Some value</r:simple>
    <a></a>
    Text
    </xml>`
        const value = tag().val(xml);
        expect(value).toBeDefined();
    })


})

