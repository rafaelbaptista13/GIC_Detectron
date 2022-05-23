Create docker image for Front End:

cd /ui
docker build -f docker-prod/Dockerfile . --tag registry.deti:5000/detectron-fe


Create docker images for Api servers and Admin server (UA VPN must not be connected):

cd /java
docker build -f ../dev/Dockerfile .
	Tag the image with size 274MB as registry.deti:5000/detectron-admin
		docker tag <Image-Id> registry.deti:5000/detectron-admin
	Tag the image with size 357MB as registry.deti:5000/detectron-api
		docker tag <Image-Id> registry.deti:5000/detectron-api


Create docker image for embedding servers:

cd /embedding-calculator
docker build . --tag registry.deti:5000/detectron-core



Push the images into the registry
docker push registry.deti:5000/detectron-fe
docker push registry.deti:5000/detectron-admin
docker push registry.deti:5000/detectron-api
docker push registry.deti:5000/detectron-core

