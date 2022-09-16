FROM openjdk:11-jre-slim
WORKDIR usr/src
ENV MONGO_URI=mongodb://localhost:27017/PickYourSlot
EXPOSE 8097
ADD ./target/interviewer-service-0.0.1-SNAPSHOT.jar /usr/src/interviewer-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "interviewer-service-0.0.1-SNAPSHOT.jar"]