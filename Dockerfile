# Build ./dist
FROM node:22-alpine AS development

ENV APP_HOME=/usr/src/app/
WORKDIR $APP_HOME

COPY package.json yarn.lock $APP_HOME
RUN yarn install --frozen-lockfile --production=false
ADD . $APP_HOME

RUN yarn build

# Production contain only dist and node_modules
FROM node:22-alpine AS production

ENV APP_HOME=/usr/src/app/
WORKDIR $APP_HOME

COPY package.json yarn.lock $APP_HOME
RUN yarn install --frozen-lockfile --production=true

COPY --from=development /usr/src/app/dist ./dist
COPY tsconfig.json tsconfig.build.json nest-cli.json $APP_HOME

RUN chown -R 1001:0 $APP_HOME && chmod -R ug+rwx $APP_HOME
USER 1001

EXPOSE 3000

CMD ["yarn", "start:prod"]