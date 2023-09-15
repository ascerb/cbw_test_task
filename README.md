
### CBW Test Task

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



### Run on local
Type into terminal:

```bash
git clone git@github.com:ascerb/cbw_test_task.git
cd cbw_test_task
docker compose -f docker-compose.yml build --build-arg FILE_PWD="cbw"
docker compose -f docker-compose.yml up
```

Open [http://localhost:3000](http://localhost:3000) 

### 



