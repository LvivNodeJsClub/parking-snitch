#!/usr/bin/env groovy

pipeline {
    
    agent any

    stages {
        stage('Init environment variables.') {
            steps {
                script {
                    def scmVars = checkout scm
                    env.MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT = scmVars.GIT_PREVIOUS_SUCCESSFUL_COMMIT
                    echo "Building... ${MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT}"
                }
            }
        }

        stage('Build services.') {
            steps{
                script {
                    def services = [:]
                    services['report-service'] = {
                        echo "This is branch c"
                    }
                    services['report_processing_service'] = {
                        echo "This is branch d"
                    }
                    parallel services

                }
            }
        }
    }
}
