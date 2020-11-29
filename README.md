# Xml

Ultra naive Xml parser with Masala. No CDATA.

The objective is to bring a parser simple enough so that you can customize it with your needs.

# Exemples


## Simple one 

Given 

```javascript
const response = tag().parse(Streams.ofString(
            '<someTag x="y" ><a>Masala</a><b>Text</b>Lonely Text</someTag>'));

```

`response.value` will give:

```json
{
  "token": "TAG",
  "tag": "someTag",
  "attributes": [
    {
      "token": "ATTR",
      "name": "x",
      "value": "y"
    }
  ],
  "children": [
    {
      "token": "TAG",
      "tag": "a",
      "attributes": [],
      "children": [
        "Masala"
      ]
    },
    {
      "token": "TAG",
      "tag": "b",
      "attributes": [],
      "children": [
        "Text"
      ]
    },
    "Lonely Text"
  ]
}

```

### More complex

Given:

```xml
<xml>
    Text
    <r:simple f:a="1.0">Some value</r:simple>
    <a></a>
    Text
</xml>
```

`value = xmlParser.val(xml)` gives:

```json
{
  "token": "TAG",
  "tag": "xml",
  "attributes": [],
  "children": [
    "Text",
    {
      "token": "TAG",
      "tag": "simple",
      "namespace": "r",
      "attributes": [
        {
          "namespace": "f",
          "token": "ATTR",
          "name": "a",
          "value": "1.0"
        }
      ],
      "children": [
        "Some value"
      ]
    },
    {
      "token": "TAG",
      "tag": "a",
      "attributes": [],
      "children": []
    },
    "Text"
  ]
}
```
