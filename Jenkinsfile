#!/usr/bin/env groovy

pipeline {
    
    agent any

    stages {
         stage('Init environment variables.') {
            steps {
                script {
                    echo 'Init environment variables for parking-snitch'
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
    }
}
