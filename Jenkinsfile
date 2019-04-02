#!/usr/bin/env groovy

pipeline {
    
    agent any

    stages {
        stage 'Init environment variables.' {
            steps {
                script {
                    def scmVars = checkout scm
                    env.MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT = scmVars.GIT_PREVIOUS_SUCCESSFUL_COMMIT
                    echo "Building... ${MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT}"
                }
            }
        }

        stage 'Service' {
            steps {
                script {
                    def tasks = [:]
                    tasks['report-service'] = {
                        load 'report-service/Jenkinsfile'
                    }
                    tasks['report-processing-service'] = {
                        load 'report-processing-service/Jenkinsfile'
                    }
                    parallel tasks  
                }
            }
        }
    }
}
