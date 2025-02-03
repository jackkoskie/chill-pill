import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

let dbConfig;

function getFirstSqliteFile(directory: string): string | undefined {
	const files = fs.readdirSync(directory);
	for (const file of files) {
		if (file.endsWith('.sqlite')) {
			return path.join(directory, file);
		}
	}
	return undefined;
}

const sqliteFilePath = getFirstSqliteFile('./.wrangler/state/v3/d1/miniflare-D1DatabaseObject');

if (process.env.ENVIRONMENT !== 'production') {
	console.log('local');
	dbConfig = {
		schema: './src/lib/db/schema/index.ts',
		out: './drizzle',
		dialect: 'sqlite',
		dbCredentials: {
			url: sqliteFilePath
		}
	};
} else {
	console.log('production');
	dbConfig = {
		schema: './src/lib/db/schema/index.ts',
		out: './drizzle',
		dialect: 'sqlite',
		driver: 'd1-http',
		dbCredentials: {
			accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
			databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
			token: process.env.CLOUDFLARE_D1_TOKEN!
		}
	};
}

export default defineConfig(dbConfig);
