FROM quay.io/quarkus/centos-quarkus-maven:20.0.0-java8 as quarkus-dev
COPY --chown=1001:1001 quarkus-backend /quarkus-backend
WORKDIR /quarkus-backend
RUN env && \
    mvn package && \
    mvn dependency:go-offline -Dnative

FROM quay.io/eclipse/che-nodejs8-centos:nightly as node-frontend-dev
COPY --chown=10001:10001 node-frontend /projects/postit-app/node-frontend
WORKDIR /projects/postit-app/node-frontend
RUN env && \
    npm install && \
    tar zcvf node_modules.tar.gz node_modules

FROM registry.access.redhat.com/ubi8/ubi
COPY --from=quarkus-dev /home/quarkus/.m2/repository /work/m2repo
COPY --from=node-frontend-dev /projects/postit-app/node-frontend/node_modules.tar.gz /work/node_modules.tar.gz
COPY dockerfiles/data-copy.sh /data-copy.sh
RUN  chmod 775 /data-copy.sh
CMD ["/data-copy.sh"]

