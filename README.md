# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)

## React Query

Only use if any of these client side features are needed:

1. Interactive Features:
   - Real-time comments
   - Like/bookmark functionality
   - User-generated content
2. Dynamic Content:
   - Client-side search
   - Filtering
   - Infinite scroll or pagination
3. User Features:
   - Authentication state
   - User preferences
   - Saved articles

## Types

Shared global types are defined in the `lib/types.ts` file. Component specific types are defined in their respective component files.

import { type ReactNode } from "react";
import type { Article, ArticlesResponse } from "@/lib/types";

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
