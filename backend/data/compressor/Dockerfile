FROM ubuntu

RUN apt-get update && apt-get install cron curl -y -qq

RUN mkdir /script
RUN echo 'echo "Engaging compressor"' > /script/call.sh && chmod +x /script/call.sh
RUN echo 'curl http://backend:4200/compressor' > /script/compressor.sh && chmod +x /script/compressor.sh
RUN echo "*/1 * * * * root /script/compressor.sh > /proc/1/fd/1 2>/proc/1/fd/2" >> /etc/crontab

CMD ["cron", "-f"]