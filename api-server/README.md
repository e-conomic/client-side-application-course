#####This is the supporting rest-api node application for this course.
This is not part of the curriculum and the student is not required to implement this or a simmilar application during the course or the final project.

### Run locally (outside a docker container)
1. `npm install`
* `npm start`
* you should see `Running on http://localhost:8080`

### Run locally on a docker container
1. [Install docker](https://docs.docker.com/engine/installation/)
* Build an image: `docker build -t rest-api`
* Start a container: `docker run -p 8888:8080 -d rest-api`
* Grab the ip address of the VM: `docker-machine ip default`
* navigate to `IP_ADDRESS:8888` where `IP_ADDRESS` is what you got running the command above

### Access the hosted rest-api container [here](http://client-side-course.eu-central-1.elasticbeanstalk.com/)
