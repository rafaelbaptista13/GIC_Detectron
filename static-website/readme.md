## Detectron static website

The static website for Detectron application built from CompreFace software.

### How to deploy in Kubernetes

* Build docker image and send it to the registry
    ```
    docker build . -t registry.deti:5000/detectron-static-web   
    ```
    ```
    docker push registry.deti:5000/detectron-static-web
    ```
* Run it in the Kubernetes Cluster
    ```
    cd kubernetes/
    kubectl apply -f webpage.yaml 
    ```