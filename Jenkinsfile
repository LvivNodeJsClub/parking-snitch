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

        /*
         * Build `report-service`
         */
        stage('Init environment variables for report-service') {
            when {
                expression {
                    return !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^report-service'")
                }
            }
            steps {
                echo 'Init environment variables for report-service'
            }
        }
        stage('Install and building report-service') {
            when {
                expression {
                    return !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^report-service'")
                }
            }
            steps {
                script {
                    dir ('report-service') {
                        sh 'npm ci'
                        sh 'npm build'
                    }
                }
            }
        }
        stage('Testing report-service') {
            when {
                expression {
                    return false && !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^report-service'")
                }
            }
            steps {
                script {
                    dir ('report-service') {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Build docker image for report-service') {
            when {
                expression {
                    return false && !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^report-service'")
                }
            }
            steps {
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
                    return false && !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^report-service'")
                }
            }
            steps {
                script {
                    dir ('report-service') {
                        sh 'docker push'
                    }
                }
            }
        }

        /*
         * Build `report-processing-service`
         */
        stage('Init environment variables for report-processing-service') {
            when {
                anyOf {
                    branch 'master'
                    buildingTag()
                    expression {
                        return !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^report-processing-service'")
                    }
                }
            }
            steps {
                echo 'Init environment variables for report-processing-service'
                script {
                    env.REPORTPROCESSINGSERVICE = 'true'
                }
            }
        }
        stage('Install report-processing-service') {
            when {
                environment name: 'REPORTPROCESSINGSERVICE', value: 'true'
            }
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
            when {
                environment name: 'REPORTPROCESSINGSERVICE', value: 'true'
            }
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
            when {
                environment name: 'REPORTPROCESSINGSERVICE', value: 'true'
            }
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
            when {
                environment name: 'REPORTPROCESSINGSERVICE', value: 'true'
            }
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
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: '/report-processing-service/test-report',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Report'
                    ]
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: '/report-processing-service/test-coverage',
                        reportFiles: 'index.html',
                        reportName: 'Report Processing Test Coverage Report'
                  ]
                }
            }
        }
        stage('Spec report-processing-service') {
            when {
                environment name: 'REPORTPROCESSINGSERVICE', value: 'true'
            }
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
                }
            }
        }
        stage('Build docker image for report-processing-service') {
            when {
                environment name: 'REPORTPROCESSINGSERVICE', value: 'true'
            }
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
                allOf {
                    environment name: 'REPORTPROCESSINGSERVICE', value: 'true'
                    environment name: 'REPORTPROCESSINGSERVICE', value: 'false'
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
         * Build `image-service`
         */
        stage('Init environment variables for image-service') {
            when {
                expression {
                    return !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^image-service'")
                }
            }
            steps {
                echo 'Init environment variables for image-service'
            }
        }
        stage('Install and building image-service') {
            when {
                expression {
                    return !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^image-service'")
                }
            }
            steps {
                script {
                    dir ('image-service') {
                        sh 'npm ci'
                        sh 'npm build'
                    }
                }
            }
        }
        stage('Testing image-service') {
            when {
                expression {
                    return false && !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^image-service'")
                }
            }
            steps {
                script {
                    dir ('image-service') {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Build docker image for image-service') {
            when {
                expression {
                    return false && !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^image-service'")
                }
            }
            steps {
                script {
                    dir ('image-service') {
                        sh 'docker build .'
                    }
                }
            }
        }
        stage('Publish artifacts for image-service') {
            when {
                expression {
                    return false && !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^image-service'")
                }
            }
            steps {
                script {
                    dir ('image-service') {
                        sh 'docker push'
                    }
                }
            }
        }

        /*
         * Build `inspector-service`
         */
        stage('Init environment variables for inspector-service') {
            when {
                expression {
                    return !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^inspector-service'")
                }
            }
            steps {
                echo 'Init environment variables for inspector-service'
            }
        }
        stage('Install and building inspector-service') {
            when {
                expression {
                    return !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^inspector-service'")
                }
            }
            steps {
                script {
                    dir ('inspector-service') {
                        sh 'npm ci'
                        sh 'npm build'
                    }
                }
            }
        }
        stage('Testing inspector-service') {
            when {
                expression {
                    return false && !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^inspector-service'")
                }
            }
            steps {
                script {
                    dir ('inspector-service') {
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Build docker image for inspector-service') {
            when {
                expression {
                    return false && !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^inspector-service'")
                }
            }
            steps {
                script {
                    dir ('inspector-service') {
                        sh 'docker build .'
                    }
                }
            }
        }
        stage('Publish artifacts for inspector-service') {
            when {
                expression {
                    return false && !sh(returnStatus: true, script: "git diff --name-only $MY_GIT_PREVIOUS_SUCCESSFUL_COMMIT|egrep -q '^inspector-service'")
                }
            }
            steps {
                script {
                    dir ('inspector-service') {
                        sh 'docker push'
                    }
                }
            }
        }
    }

    post {
        always {
            junit 'test-report/**/*.xml'
        }
        success {
            def message = "BUILD SUCCESS: Job ${env.JOB_NAME} [${env.BUILD_NUMBER}]\nCheck console output at: ${env.BUILD_URL}"
            echo "${message}"
        }
        failure {
            def message = "BUILD FAILURE: Job ${env.JOB_NAME} [${env.BUILD_NUMBER}]\nCheck console output at: ${env.BUILD_URL}"
            echo "${message}"
    }
  }
}
