// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { closeDB } from '../mongodb';
// // import { closeDB } from './mongoConnect';

// export default async function globalTeardown() {

//   console.log('******Jest Closed');
//   await closeDB();
//   const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
//   await instance.stop();

//   //     }
// }