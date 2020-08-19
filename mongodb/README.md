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

#### $group

#### $sort

#### $skip

#### $limit

#### $unwind
