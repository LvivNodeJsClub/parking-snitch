#!/usr/bin/env groovy

def services = [:]

pipeline {
    
    agent any

    stages {

        stage('Parallel Stage') {
            parallel {
                stage('Branch A') {
                    steps {
                        echo "On Branch A"
                    }
                }
                stage('Branch B') {
                    steps {
                        echo "On Branch B"
                    }
                }
                stage('Branch C') {
                    stages {
                        stage('Nested 1') {
                            steps {
                                echo "In stage Nested 1 within Branch C"
                            }
                        }
                        stage('Nested 2') {
                            steps {
                                echo "In stage Nested 2 within Branch C"
                            }
                        }
                    }
                }
            }
        }
    
        stage('Init environment variables.') {
            steps {
                script {
                    def scmVars = checkout scm
                    services['Report Service'] = {
                        echo "This is branch c"
                    }
                    services['Report Processing Service'] = {
                        load 'report-processing-service/Jenkinsfile'
                    }
                    env.MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT = scmVars.GIT_PREVIOUS_SUCCESSFUL_COMMIT
                    echo "Building... ${MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT}"
                }
            }
        }

        stage('Build services.') {
            parallel services
        }
    }
}
