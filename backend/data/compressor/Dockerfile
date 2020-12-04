FROM ubuntu:latest

RUN apt-get update && apt-get -y install cron curl

COPY cron /etc/cron.d/instashare

RUN chmod 0644 /etc/cron.d/instashare

RUN crontab /etc/cron.d/instashare

CMD ["crond", "-f"]