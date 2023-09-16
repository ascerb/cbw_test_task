
# CBW Test Task

 4-hour test:
```bash
1. Create 2 services
	- n8n
	- frontend app - next js app.

2. With n8n , create a flow that would receive data form front end app, send it to chatGPT / NLPCloud api with a promt to rewrite it

3. Display it back in the UI.

4. Create a github action to deploy these two services. (criteria: dockerized, uploaded to github registry).

5. Be prepared to showcase and defend your solution.
```

# General Implementation Description

There are created two docker containers.
### n8n
Contains n8n workflow rules and secrets. User data is populated from password archived volume from this repo as free self-hosted n8n installation requires mandatory owner web-registation. 
n8n without owner registration on each new instance can not activate any workflow via cli. 
Cli workflow activation is not working at all actually.

Here are some examples below, not used on project.

Export n8n data to docker host (typed from docker host):
```bash
### n8n EXPORT
docker exec -u node -it cbw_n8n n8n export:workflow --backup --output=backup_n8n/w
docker exec -u node -it cbw_n8n n8n export:credentials --decrypted --backup --output=backup_n8n/c
docker cp cbw_n8n:/home/node/backup_n8n .
docker exec -u node -it cbw_n8n rm -rf /home/node/backup_n8n
```
Import n8n data on a new container:
```bash
### n8n IMPORT
docker cp backup_n8n cbw_n8n:/home/node
docker exec -u node -it cbw_n8n n8n import:workflow --separate --input=/home/node/backup_n8n/w
docker exec -u node -it cbw_n8n n8n import:credentials --separate --input=/home/node/backup_n8n/c
docker exec -u node -it cbw_n8n rm -rf /home/node/backup_n8n

### ---> THIS IS NOT WORKING. Workflows could not be activated from cli
docker exec -u node -it cbw_n8n n8n update:workflow --all --active=true
```

Project has one n8n workflow and two password credentials:
* basic auth to internal api
* NLPCloud api key

As n8n credentials are stored at sqlite db inside volume, I did not bother to pass them through the all docker-compose secrets forkflow. Maybe should(?)


### app
NextJS app. Takes input string, passes to NLPCloud rewrite (paraphraze) API (initially to internal API endpoint with auth, then to n8n pipe) and returns result.


# Run on local
Type into terminal:

```bash
git clone git@github.com:ascerb/cbw_test_task.git
cd cbw_test_task
docker compose -f docker-compose.yml build --build-arg FILE_PWD="cbw"
docker compose -f docker-compose.yml up
```

Open [http://localhost:3000](http://localhost:3000) 



# Deploy via GitHub Actions

On each release docker containers are generated via docker compose and both packages uploaded to GitHub Registry, deployed and started on remote server.

To upload packages via GitHub actions to your server please type on target machine:
```
ssh-keygen -t rsa -b 4096 -f ./cbw_id_rsa -q -N ""
cat ./cbw_id_rsa.pub >> ~/.ssh/authorized_keys
cat ./cbw_id_rsa

### Copy private key to clipboard
```

Please setup GitHub project secrets:
```
SSH_PRIVATE_KEY
SSH_USER
SSH_HOST
SSH_PORT
FILE_PWD="cbw"
```

Run Action from repo.

Open [http://localhost:3000](http://localhost:3000) remote host alternative.





