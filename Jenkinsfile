#!/usr/bin/env groovy

def services = [:]
// services['report-service'] = {
//     load 'report-service/Jenkinsfile'
// }
services['report-processing-service'] = {
    load 'report-processing-service/Jenkinsfile'
}

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
            parallel services
        }
    }
}
