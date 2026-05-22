import "dotenv/config";
import { neon, neonConfig } from '@neondatabase/serverless';
import { PrismaNeonHttp } from '@prisma/adapter-neon';
import { PrismaClient } from '../generated/prisma/client.js';
import dns from 'dns';

// globally patch dns.lookup to FORCE IPv4 for ALL networking
const originalLookup = dns.lookup;
dns.lookup = function(hostname, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = { ...options, family: 4 };
  return originalLookup(hostname, options, callback);
};

const connectionString = process.env.DATABASE_URL ? process.env.DATABASE_URL.replace("&channel_binding=require", "") : "";
const sql = neon(connectionString);
const adapter = new PrismaNeonHttp(connectionString);
const prisma = new PrismaClient({ adapter });

export default prisma;
