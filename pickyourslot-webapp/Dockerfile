FROM openjdk:11-jre-slim
WORKDIR usr/src
ADD ./target/pickyourslot-webapp-0.0.1-SNAPSHOT.jar /usr/src/pickyourslot-webapp-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "pickyourslot-webapp-0.0.1-SNAPSHOT.jar"]