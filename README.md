## Getting Started

We need to run the following install due to react-chat-element@12.0.8,react-metamask-avatar for now. (might use another library later):

npm install --legacy-peer-deps

```bash
npm run dev
# or
npm run build
npm run start
```

## Prisma Setup

### Setup Policy for your database

_RLS is enabled by default, so a policy needs to be set to allow read permissions_

- Authentication -> Policies -> New Policy on the respective table

### Obtain Postgres URI from SupaBase

- Settings -> Database -> Connection String(URI) -> Copy string and replace '[YOUR-PASSWORD]' with your supabase password.
- Add the Connection string updated with your password to .env as 'DATABASE_URL'

```bash
npm install @prisma/client
## Initialize prisma folder structure
npx prisma init
## If you have tables in your database.
npx prisma db pull
## You have tables. But you want to update them by Prisma file.
npx prisma db push
## Investigate the delta using different flags to see difference between local and production
npx prisma migration diff
## Deploy migration to production
npx prisma migrate deploy
## Instantiate Prisma Client / Re-establish link
npx prisma generate
```

Refer to [Prisma Docs](https://www.prisma.io/docs/concepts/components/prisma-client/crud) for usage operations.
_Note: While implementing data fetching import the data model directly from **"@prisma/client"** instead of using interface._

**_Example usage:_**

```ts
import { raffles } from "@prisma/client";
//Prisma object is imported globally to use one client instead of instantiating every time
import { prisma } from "@/lib/prisma";

const supaData: raffles | null = await prisma.raffles.findUnique({
  where: { id: 1 },
});
```

### How to sync Prisma Migration in development

[Source Article](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/team-development)

1. Pull latest files from git for ./prisma/migrations folder and database

```
git pull 
npx prisma db pull
```

2. Run the migrate dev command to apply new migrations

```
// (name of the migration e.g. collection-banner-field, tag-model, etc)
npx prisma migrate dev --name collection-banner-field
```

3. Generate the new prisma code

```
npx prisma generate
```

4. Commit the changes to git
