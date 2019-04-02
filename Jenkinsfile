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
                    sh 'printenv'
                }
            }
        }

        stage('Service') {
            steps {
            // withEnv (["BASE_WORKSPACE=${env.WORKSPACE}"]) {
                parallel(
                    'report-processing-service': {
                        def pipeline = load 'report-processing-service/Jenkinsfile'
                        pipeline.run()
                    },
                    'report-service': {
                        def pipeline = load 'report-service/Jenkinsfile'
                        pipeline.run()
                    },
                )
            }
        }
    }
}
