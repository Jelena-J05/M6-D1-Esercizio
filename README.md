ESERCIZIO D3    
1. Importare la collezione

2. Trova tutte le risorse con il dato isActive corrispondente a true
{isActive:{$eq:true}}

3. Trova tutte le risorse con il dato age maggiore di 26
{age:{$gt:26}}

4. Trova tutte le risorse con il dato age maggiore di 26 e minore o uguale a 30
{ "age": { "$gt": 26, "$lte": 30 } }

5. Trova tutte le risorse con il  dato eyes che sia brown o blue
{$or: [ { eyeColor:"blue" }, {eyeColor:"brown" } ] }

6. Trova tutte le risorse che non presentano il dato eyes che uguale a green
{ "eyeColor": { "$ne": "green" } }

7. Trova tutte le risorse che non presentano il dato eyes uguale a green e neanche blue
{"eyeColor": { "$nin": ["green", "blue"] }}

8.  Trova tutte le risorse con il dato company uguale a "FITCORE" e ritorna solo l'email
solo company: {company:{$eq:"FITCORE"}}

Filter: { "company": "FITCORE"  }
Project: { "_id": 0, "email": 1 } 



