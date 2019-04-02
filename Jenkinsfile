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
            steps {
                script {
                    def services = [:]
                    services['Report Service'] = {
                        echo "This is branch c"
                    }
                    services['Report Processing Service'] = {
                        load 'report-processing-service/Jenkinsfile'
                    }
                    parallel(
                         stage('Report Service') {
                            echo "This is branch c"
                         }
                         stage('Report Processing Service') {
                            stages {
    stage('Init environment variables for report-processing-service') {
        steps {
            echo 'Init environment variables for report-processing-service'
            script {
                env.REPORTPROCESSINGSERVICE = 'true'
            }
        }
    }
}
                         }
                        )

                }
            }
        }
    }
}
