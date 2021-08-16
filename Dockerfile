FROM ubuntu:latest AS ZOLA
COPY . /site
WORKDIR /site
ADD https://github.com/getzola/zola/releases/download/v0.14.0/zola-v0.14.0-x86_64-unknown-linux-gnu.tar.gz /tmp
RUN tar -C /usr/bin -xvzf /tmp/zola-v0.14.0-x86_64-unknown-linux-gnu.tar.gz && zola build
FROM arm64v8/nginx
COPY --from=ZOLA /site/public/ /usr/share/nginx/html/
EXPOSE 80
