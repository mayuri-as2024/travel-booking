
pipeline {
    agent any

    environment {
        DOCKERHUB_REPO = 'mayurias2024/travel-booking'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Travel Booking source code checked out.'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                      -t ${DOCKERHUB_REPO}:${BUILD_NUMBER} \
                      -t ${DOCKERHUB_REPO}:latest .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    sh '''
                        echo "$DOCKERHUB_TOKEN" | docker login \
                          -u "$DOCKERHUB_USER" --password-stdin

                        docker push ${DOCKERHUB_REPO}:${BUILD_NUMBER}
                        docker push ${DOCKERHUB_REPO}:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker rm -f travel-booking-web || true

                    docker run -d \
                      --restart unless-stopped \
                      --name travel-booking-web \
                      -p 8081:80 \
                      ${DOCKERHUB_REPO}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps --filter name=travel-booking-web'
                echo 'Travel Booking deployment completed!'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Image built, pushed to Docker Hub, and application deployed!'
        }

        failure {
            echo 'FAILED: Check Console Output for the error.'
        }
    }
}
