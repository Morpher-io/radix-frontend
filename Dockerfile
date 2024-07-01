


FROM public.ecr.aws/docker/library/node:22-alpine as builder

ARG API_ENDPOINT=api
ARG NPM_BUILD_ENV=production


WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install


RUN sed -ri -e "s!VITE_API_ENDPOINT=.*!VITE_API_ENDPOINT=https://${API_ENDPOINT}!g" /usr/src/app/.env.${NPM_BUILD_ENV}


RUN npx vite build --mode ${NPM_BUILD_ENV}

FROM public.ecr.aws/nginx/nginx:stable-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
