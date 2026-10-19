
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Travel Booking source code checked out from GitHub'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build React Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Complete') {
            steps {
                echo 'Travel Booking application built successfully!'
            }
        }
    }
}
