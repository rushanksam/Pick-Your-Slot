FROM openjdk:11-jre-slim
WORKDIR usr/src
ENV MONGO_URI=mongodb://localhost:27017/PickYourSlot
EXPOSE 8070
ADD ./target/tag-service-0.0.1-SNAPSHOT.jar /usr/src/tag-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "tag-service-0.0.1-SNAPSHOT.jar"]