import {head, tag} from '../src/xml-genlex'
import {attr} from '../src/attr'

describe('Xml genlex', ()=>{


    test('attributes', ()=>{
        const value = attr.val('a="b"')
        expect(value.token).toEqual('ATTR')
        expect(value.name).toBe('a')
        expect(value.value).toBe('b')

        let more = attr.val(' x= " y" ')
        expect(more.token).toEqual('ATTR')

        more = attr.val('version="1.0"')
        expect(more.token).toEqual('ATTR')

    })

    test('header', ()=>{
        const value = head.val('<?xml version="1.0" encoding="UTF-8" ?>')
        expect(value.token).toEqual('HEADER')

    })


    test('tag', ()=>{
        const value = tag.val('<someTag x="y" a="b">')
        expect(value.token).toEqual('TAG')
        expect(value.attributes).toHaveLength(2)



    })


})