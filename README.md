## Getting Started

We need to run the following install due to react-chat-element@12.0.8 for now. (might use another library later)
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
```

Refer to [Prisma Docs](https://www.prisma.io/docs/concepts/components/prisma-client/crud) for usage operations.
_Note: While implementing data fetching import the data model directly from **"@prisma/client"** instead of using interface._

**_Example usage:_**

```ts
import { PrismaClient, Prisma, raffles } from "@prisma/client";

const supaData: raffles | null = await prisma.raffles.findUnique({
  where: { id: 1 },
});
```
