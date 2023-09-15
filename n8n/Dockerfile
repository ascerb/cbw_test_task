FROM docker.n8n.io/n8nio/n8n

LABEL "name"="cbw_n8n"

WORKDIR .

ARG FILE_PWD

### Install some normal zip instead of castrirovannii

USER root

RUN \
	apk add --update zip





### Copy some n8n data which can not be passed without web user reg
### As THIS PROJECT IS A DEMO, DATA iS NOT PERSISTENT

USER node

COPY n8n_data_pwd.zip /home/node/.n8n

# From passwords protected file ZIP can extract just one file. 
# So, files are archived twice

RUN cd /home/node/.n8n && unzip -P ${FILE_PWD} '*.zip'
RUN cd /home/node/.n8n && unzip n8n_data_nopwd.zip
RUN cd /home/node/.n8n && rm *.zip








