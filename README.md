# Xml

Ultra naive Xml parser with Masala. No CDATA, no xmlns.

The objective is to bring a parser simple enough so that you can customize it with your needs.

# Exemples

Given 

```javascript
const response = finalTag().parse(Streams.ofString(
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


