import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update",
and "delete" any "Todo" records.
=========================================================================*/

const schema = a.schema({
  Customer: a
    .model({
      customerId: a.id().required(),
      name: a.string(),
      email: a.string(),
      phoneNumber: a.string(),
      address: a.string(),
      notes: a.hasMany('Note', 'customerId'),
      claims: a.hasMany('Claim', 'customerId'),
      appeals: a.hasMany('Appeal', 'customerId'),
    })
    .identifier(['customerId'])
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.owner().to(['create', 'update', 'delete', 'read']),
    ]),
  Note: a
    .model({
      noteId: a.id().required(),
      content: a.string(),
      customerId: a.id().required(),
      customer: a.belongsTo('Customer', 'customerId'),
    })
    .identifier(['noteId'])
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.owner().to(['create', 'update', 'delete', 'read']),
    ]),
  Claim: a
    .model({
      claimId: a.id().required(),
      description: a.string(),
      status: a.enum(['OPEN', 'CLOSED']),
      customerId: a.id().required(),
      customer: a.belongsTo('Customer', 'customerId'),
      appeals: a.hasMany('Appeal', 'claimId'),
    })
    .identifier(['claimId'])
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.owner().to(['create', 'update', 'delete', 'read']),
    ]),
  Appeal: a
    .model({
      appealId: a.id().required(),
      reason: a.string(),
      outcome: a.enum(['PENDING', 'APPROVED', 'DENIED']),
      claimId: a.id().required(),
      claim: a.belongsTo('Claim', 'claimId'),
      customerId: a.id().required(),
      customer: a.belongsTo('Customer', 'customerId'),
    })
    .identifier(['appealId'])
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.owner().to(['create', 'update', 'delete', 'read']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

// const schema = a.schema({
//   Customer: a.model({
//     name: a.string().required(),
//     email: a.string().required(),
//     address: a.string().required(),
//     phone: a.string(),
//     notes: a.hasMany('Note', 'customerId'),
//   }),

//   Note: a.model({
//     customerId: a.id(),
//     title: a.string().required(),
//     content: a.string().required(),
//     customer: a.belongsTo('Customer', 'customerId'),
//   }),
// });

// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: 'iam',
//   },
// });

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
