FROM oven/bun:1.4.2 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . ./
RUN bun run build

RUN bun build src/db/migrate.ts --target=bun --outfile migrate.js

FROM oven/bun:1.4.2-slim

WORKDIR /app
COPY --from=build /app/.output .output
COPY --from=build /app/migrate.js migrate.js
COPY --from=build /app/drizzle drizzle

RUN mkdir /data && chown bun:bun /data
ENV NODE_ENV=production DATABASE_PATH=/data/dict.db PORT=3000

USER bun
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD ["bun", "-e", "const r = await fetch(`http://localhost:${process.env.PORT}/`); process.exit(r.ok ? 0 : 1)"]

LABEL org.opencontainers.image.source="https://github.com/Tasztalos69/dict"

CMD ["sh", "-c", "bun migrate.js && exec bun .output/server/index.mjs"]
