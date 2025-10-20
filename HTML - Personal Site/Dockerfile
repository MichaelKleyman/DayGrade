FROM oven/bun:1 AS base

WORKDIR /app

# Copying the following local files into the newly created app directory made above
COPY server.ts .
COPY index.html .
COPY images ./images
COPY package.json .

RUN bun install

EXPOSE 3000

CMD ["bun", "server.ts"]