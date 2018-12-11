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
}

