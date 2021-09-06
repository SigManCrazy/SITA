#!/bin/bash

# exit on error
set -e

# c'è bisogno di due comandi "docker-compose" separati per evitare di confondere il "build: {context: ...}" che è un percorso relativo. Se usassi un solo comando con la flag "-f ..." ripetuta, tutti i percorsi diventerebbero relativi al primo file. Inoltre, la flag "--env-file ..." può essere fornita una volta sola per comando.

# builda le immagini dei microservizi Java utilizzando GoogleContainerTools/Jib
mvn   -f back-end/pom.xml   install   jib:dockerBuild   -DskipTests

# builda e fa partire i servizi del backend
docker-compose   --file ./back-end/docker-compose.yml   --env-file ./back-end/.env   up   --build   --force-recreate   --detach

