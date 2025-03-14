pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Run tests') {
            steps {
                bat 'npx jest --ci --reporters=default --reporters=jest-junit'
            }
        }
    }

    post {
        always {
            junit 'jest-junit.xml'
        }
    }
}
