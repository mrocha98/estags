# MongoDB

## Agregação

A API de agregação (aggregation) do MongoDb tem como finalidade processar grupos de valores de diversos documentos agrupados, performando uma variedade de operações nos dados agrupados para returnar um único resultado.

Segundo a documentação, é possível trabalhar com agregações de três formas diferentes:

- [aggregation pipeline](https://docs.mongodb.com/manual/aggregation/#aggregation-framework)
- [map-reduce function](https://docs.mongodb.com/manual/aggregation/#aggregation-map-reduce)
- [single purpose aggregation methods](https://docs.mongodb.com/manual/aggregation/#single-purpose-agg-operations)

Nesse estudo, estou focando exclusivamente na primeira forma (pipeline), seguindo o curso [M121: The MongoDB Aggregation Framework](https://university.mongodb.com/mercury/M121/2020_ondemand/overview) da Mongo University. Paralelamente, estou criando um CRUD com NestJS, onde aplicarei exemplos práticos.

### Pipeline

Nós podemos imaginar a pipeline como uma esteira industrial. Existem uma ou mais etapas (stages) e cada produto passando pela esteira é uma collection. Após as collections terem passado por todos stages, teremos o produto finalizado (output).

![ilustração exemplificando o conceito de pipeline](https://www.freecodecamp.org/news/content/images/2020/04/pipeline.png)

Exemplo de pipeline:

```js
db.solarSystem.aggregate([{
  "$match": {
    "atmosphericComposition": { "$in": [/O2/] },
    "meanTemperature": { $gte: -40, "$lte": 40 }
  }
}, {
  "$project": {
    "_id": 0,
    "name": 1,
    "hasMoons": { "$gt": ["$numberOfMoons", 0] }
  }
}], { "allowDiskUse": true});
```

Neste exemplo, temos dois stages, $match e $project.

#### $match

![ilustração comparando o funcionamento do $match com um brinquedo de encaixar formatos geométricos](../.github/images/match-example.png)

Consiste em filtrar as collections conforme as condições fornecidas.

- Deve ser um dos primeiros stages
- Pode conter um $text operator, contanto que que seja o primeiro stage
- Não pode utilizar $where
- Usa da mesma syntax do find

#### $project

Transforma a coleção conforme os campos informados. Exceto o _id, todo campo é removido, a não ser que seja settado como 1.

Ex:

```js
// Considere uma collection com os campos:
// _id, username, email, password

[
  {
    $project: {
      "_id": 0,
      "username": 1
    }
  }
]

// Isso removeria todos os campos, exceto username
```

Também é possível gerar campos novos:

```js
[
  {
    $project: {
      "_id": 0,
      "nickname": { "$username" }
    }
  }
]
```

Pode ser usado na pipeline quantas vezes for necessário.

##### Accumulators

É possível trabalhar com acumuladores no $project. Eles operam sobre um array no documento atual.

A grande vantagem de utilizá-los é simplificar códigos que normalmente seriam feitos com __reduce__ e __map__.

Exs:

```js
// using $reduce to get the highest temperature
db.icecream_data.aggregate([
  {
    "$project": {
      "_id": 0,
      "max_high": {
        "$reduce": {
          "input": "$trends",
          "initialValue": -Infinity,
          "in": {
            "$cond": [
              { "$gt": ["$$this.avg_high_tmp", "$$value"] },
              "$$this.avg_high_tmp",
              "$$value"
            ]
          }
        }
      }
    }
  }
])

// same but more simply!
db.icecream_data.aggregate([
  { "$project": { "_id": 0, "max_high": { "$max": "$trends.avg_high_tmp" } } }
])
```

#### $addFields

Similar ao $project, porém é exclusivo para adicionar campos novos. Também pode ser usado para sobrescrever um campo já existente.

Confira exemplos aqui: <https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/>

#### $group

Agrupa os documentos de acordo com a condição especificada no "_id".

Pode utilizar todas expressões acumuladoras.

Pode ser usado múltiplas vezes em qualquer etapa da pipeline.

Pode ser necessário limpar os dados antes com um $match.

Exs:

```js
// grouping by year and getting a count per year using the { $sum: 1 } pattern
db.movies.aggregate([
  {
    "$group": {
      "_id": "$year",
      "numFilmsThisYear": { "$sum": 1 }
    }
  }
])

// filtering results to only get documents with a numeric metacritic value
db.movies.aggregate([
  {
    "$match": { "metacritic": { "$gte": 0 } }
  },
  {
    "$group": {
      "_id": null,
      "averageMetacritic": { "$avg": "$metacritic" }
    }
  }
])
```

#### $sort

#### $skip

#### $limit

#### $unwind

## Rascunho

TODO: Colocar link de documentação em cada tópico correspondente

```js
// Lab 1 & 2
[
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      "genres": {
        $nin: ["Crime", "Horror"]
      },
      "rated": { $in: ["PG", "G"] },
      "languages": { $all: ["English", "Japanese"] }
    }
  },
  {
    $project: {
      "_id": 0,
      "title": 1,
      "rated": 1
    }
  }
]
```

```js
// Lab 1 computing fields
[
  {
    $project: {
      "_id": 0,
      "title": { $split: ["$title", " "] }
    }
  },
  { $match: { "title": { $size: 1 } } }
]
```
