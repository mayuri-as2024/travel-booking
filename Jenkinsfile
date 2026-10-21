
pipeline {
    agent any

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
                      -t travel-booking:${BUILD_NUMBER} \
                      -t travel-booking:latest .
                '''
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
                      travel-booking:${BUILD_NUMBER}
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
            echo 'SUCCESS: Docker image built and application deployed!'
        }

        failure {
            echo 'FAILED: Check Console Output for the error.'
        }
    }
}
