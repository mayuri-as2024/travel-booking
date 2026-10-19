
pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-u root:root'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Travel Booking source code checked out from GitHub'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
            }
        }

        stage('Build React Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Complete') {
            steps {
                echo 'Travel Booking application built successfully!'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Travel Booking application built successfully!'
        }

        failure {
            echo 'FAILED: Check the Jenkins console output for errors.'
        }

        always {
            echo 'Travel Booking pipeline execution finished.'
        }
    }
}
