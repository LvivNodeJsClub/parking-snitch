#!/usr/bin/env groovy

pipeline {
    
    agent any

    stages {

        stage('Init environment variables.') {
            steps {
                echo 'Init environment variables for parking-snitch'
                script {
                    sh 'printenv'
                }
            }
        }

        /*
         * Build `report-processing-service`
         */
        stage('Init environment variables for report-processing-service') {
            steps {
                echo 'Init environment variables for report-processing-service'
            }
        }
        stage('Clean report-processing-service') {
            steps {
                echo 'Clean report-processing-service'
                script {
                    dir ('report-processing-service') {
                        sh 'npm run clean'
                    }
                }
            }
        }
        stage('Install report-processing-service') {
            steps {
                echo 'Install report-processing-service'
                script {
                    dir ('report-processing-service') {
                        sh 'npm ci'
                    }
                }
            }
        }
        stage('Lint report-processing-service') {
            steps {
                echo 'Lint report-processing-service'
                script {
                    dir ('report-processing-service') {
                        sh 'npm run lint'
                    }
                }
            }
        }
        stage('Building report-processing-service') {
            steps {
                echo 'Building report-processing-service'
                script {
                    dir ('report-processing-service') {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Testing report-processing-service') {
            steps {
                echo 'Testing report-processing-service'
                script {
                    dir ('report-processing-service') {
                        sh 'npm test'
                    }
                }
            }
            post {
                always {
                    echo 'Save report'
                    junit 'report-processing-service/test-report/**/*.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'report-processing-service/test-report',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Report'
                    ]
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'report-processing-service/test-coverage',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Coverage Report'
                  ]
                }
            }
        }
        stage('Spec report-processing-service') {
            steps {
                echo 'Spec report-processing-service'
                script {
                    dir ('report-processing-service') {
                        sh 'npm run spec'
                    }
                }
            }
            post {
                always {
                    echo 'Save report'
                    junit 'report-processing-service/spec-report/**/*.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'report-processing-service/spec-report',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Spec Report'
                    ]
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'report-processing-service/spec-coverage',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing spec Coverage Report'
                  ]
                }
            }
        }
        stage('Build docker image for report-processing-service') {
            steps {
                echo 'Build docker image for report-processing-service'
                script {
                    dir ('report-processing-service') {
                        sh 'docker build .'
                    }
                }
            }
        }
        stage('Publish artifacts for report-processing-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Publish artifacts for report-processing-service'
                script {
                    dir ('report-service') {
                        sh 'docker push'
                    }
                }
            }
        }

        /*
         * Build `report-service`
         */
        stage('Init environment variables for report-service') {
            steps {
                echo 'Init environment variables for report-service'
            }
        }
        stage('Clean report-service') {
            steps {
                echo 'Clean report-service'
                script {
                    dir ('report-service') {
                        sh 'npm run clean'
                    }
                }
            }
        }
        stage('Install report-service') {
            steps {
                echo 'Install report-service'
                script {
                    dir ('report-service') {
                        sh 'npm ci'
                    }
                }
            }
        }
        stage('Lint report-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Lint report-service'
                script {
                    dir ('report-service') {
                        sh 'npm run lint'
                    }
                }
            }
        }
        stage('Building report-service') {
            steps {
                echo 'Building report-service'
                script {
                    dir ('report-service') {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Testing report-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Testing report-service'
                script {
                    dir ('report-service') {
                        sh 'npm test'
                    }
                }
            }
            post {
                always {
                    echo 'Save report'
                    junit 'report-service/test-report/**/*.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'report-service/test-report',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Report'
                    ]
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'report-service/test-coverage',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Coverage Report'
                  ]
                }
            }
        }
        stage('Spec report-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Spec report-service'
                script {
                    dir ('report-service') {
                        sh 'npm run spec'
                    }
                }
            }
            post {
                always {
                    echo 'Save report'
                    junit 'report-service/spec-report/**/*.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'report-service/spec-report',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Spec Report'
                    ]
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'report-service/spec-coverage',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing spec Coverage Report'
                  ]
                }
            }
        }
        stage('Build docker image for report-service') {
            steps {
                echo 'Build docker image for report-service'
                script {
                    dir ('report-service') {
                        sh 'docker build .'
                    }
                }
            }
        }
        stage('Publish artifacts for report-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Publish artifacts for report-service'
                script {
                    dir ('report-service') {
                        sh 'docker push'
                    }
                }
            }
        }

        /*
         * Build `photo-service`
         */
        stage('Init environment variables for photo-service') {
            steps {
                echo 'Init environment variables for photo-service'
            }
        }
        stage('Clean photo-service') {
            steps {
                echo 'Clean photo-service'
                script {
                    dir ('photo-service') {
                        sh 'npm run clean'
                    }
                }
            }
        }
        stage('Install photo-service') {
            steps {
                echo 'Install photo-service'
                script {
                    dir ('photo-service') {
                        sh 'npm ci'
                    }
                }
            }
        }
        stage('Lint photo-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Lint photo-service'
                script {
                    dir ('photo-service') {
                        sh 'npm run lint'
                    }
                }
            }
        }
        stage('Building photo-service') {
            steps {
                echo 'Building photo-service'
                script {
                    dir ('photo-service') {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Testing photo-service') {
            steps {
                echo 'Testing photo-service'
                script {
                    dir ('photo-service') {
                        sh 'npm test'
                    }
                }
            }
            post {
                always {
                    echo 'Save report'
                    junit 'photo-service/test-report/**/*.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'photo-service/test-report',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Report'
                    ]
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'photo-service/test-coverage',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Coverage Report'
                  ]
                }
            }
        }
        stage('Spec photo-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Spec photo-service'
                script {
                    dir ('photo-service') {
                        sh 'npm run spec'
                    }
                }
            }
            post {
                always {
                    echo 'Save report'
                    junit 'photo-service/spec-report/**/*.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'photo-service/spec-report',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Spec Report'
                    ]
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'photo-service/spec-coverage',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing spec Coverage Report'
                  ]
                }
            }
        }
        stage('Build docker image for photo-service') {
            steps {
                echo 'Build docker image for photo-service'
                script {
                    dir ('photo-service') {
                        sh 'docker build .'
                    }
                }
            }
        }
        stage('Publish artifacts for photo-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Publish artifacts for photo-service'
                script {
                    dir ('photo-service') {
                        sh 'docker push'
                    }
                }
            }
        }

        /*
         * Build `notification-service`
         */
        stage('Init environment variables for notification-service') {
            steps {
                echo 'Init environment variables for notification-service'
            }
        }
        stage('Clean notification-service') {
            steps {
                echo 'Clean notification-service'
                script {
                    dir ('notification-service') {
                        sh 'npm run clean'
                    }
                }
            }
        }
        stage('Install notification-service') {
            steps {
                echo 'Install notification-service'
                script {
                    dir ('notification-service') {
                        sh 'npm ci'
                    }
                }
            }
        }
        stage('Lint notification-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Lint notification-service'
                script {
                    dir ('notification-service') {
                        sh 'npm run lint'
                    }
                }
            }
        }
        stage('Building notification-service') {
            steps {
                echo 'Building notification-service'
                script {
                    dir ('notification-service') {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Testing notification-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Testing notification-service'
                script {
                    dir ('notification-service') {
                        sh 'npm test'
                    }
                }
            }
            post {
                always {
                    echo 'Save report'
                    junit 'notification-service/test-report/**/*.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'notification-service/test-report',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Report'
                    ]
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'notification-service/test-coverage',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Coverage Report'
                  ]
                }
            }
        }
        stage('Spec notification-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Spec notification-service'
                script {
                    dir ('notification-service') {
                        sh 'npm run spec'
                    }
                }
            }
            post {
                always {
                    echo 'Save report'
                    junit 'notification-service/spec-report/**/*.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'notification-service/spec-report',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Spec Report'
                    ]
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'notification-service/spec-coverage',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing spec Coverage Report'
                  ]
                }
            }
        }
        stage('Build docker image for notification-service') {
            steps {
                echo 'Build docker image for notification-service'
                script {
                    dir ('notification-service') {
                        sh 'docker build .'
                    }
                }
            }
        }
        stage('Publish artifacts for notification-service') {
            when {
                expression {
                    return false
                }
            }
            steps {
                echo 'Publish artifacts for notification-service'
                script {
                    dir ('notification-service') {
                        sh 'docker push'
                    }
                }
            }
        }
    }
}
