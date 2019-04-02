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
            script {
                def services = [:]
                services['report-service'] = {
                    echo "This is branch a"
                }
                services['report-processing-service'] = {
                    echo "This is branch b"
                }
                parallel services
            }
        }
    }
}
