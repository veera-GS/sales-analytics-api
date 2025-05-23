import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  var MONGO_FULLURL: string;
}

export default async function globalSetup() {
  // Config to decided if an mongodb-memory-server instance should be used
  // it's needed in global space, because we don't want to create a new instance every test-suite
  console.log('***GlobalSetup');

  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;
  console.log('uri', uri);
  console.log('uri', uri.slice(0, uri.lastIndexOf('/')));

  process.env['MONGO_FULLURL'] = uri; //.slice(0, uri.lastIndexOf('/'));
  global.MONGO_FULLURL = uri;
}