FROM node:16-alpine AS deps

WORKDIR /app

COPY package* .
RUN npm install


FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM node:16-alpine AS runner

WORKDIR /app

ARG PORT
ARG JWT_SECRET
ARG DATABASE_URL

ENV NODE_ENV development
# ENV PORT ${PORT}
# ENV JWT_SECRET ${JWT_SECRET}
# ENV DATABASE_URL ${DATABASE_URL}

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package* .
COPY --from=builder /app/dist ./dist

EXPOSE ${PORT}

CMD ["npm", "start"]
