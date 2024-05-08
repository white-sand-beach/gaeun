pipeline {
    agent any

    stages {
        stage("CURRENT ID, GROUPS") {
            steps {
                script {
                    sh 'id'
                    sh 'groups'
                }
            }
        }

        stage("checkout_cicd") {
            steps {
                script {
                    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31D104.git', branch: "cicd"
                }
            }
        }
        
        stage('fe_seller_build'){
            steps{
                script {
                    def feSellerRunning = sh(script: 'docker ps -a --filter "name=fe-seller" --format "{{.Names}}"', returnStdout: true).trim()
                    sh 'echo ${feSellerRunning}'
                    if (feSellerRunning) {
                        // fe container is running, stop and remove it
                        sh 'docker stop fe-seller'
                        sh 'docker rm fe-seller'
                        sh 'docker rmi fe-seller'
                    }
                }
                
                sh 'docker build -t fe-seller ./frontend-seller'
                sh 'docker run -d --name fe-seller -p 5174:80 fe-seller'   
            }
        }

        stage("front_env download") {
            steps {
                withCredentials([file(credentialsId: 'front_env', variable: 'configFile')]) {
                    script {
                        sh 'cp -rf $configFile ./frontend-consumer/.env'
                    }
                }
            }
        }
    
        
        stage('fe_consumer_build'){
            steps{
                script {
                    def feConsumerRunning = sh(script: 'docker ps -a --filter "name=fe-consumer" --format "{{.Names}}"', returnStdout: true).trim()
                    sh 'echo ${feConsumerRunning}'
                    if (feConsumerRunning) {
                        // fe container is running, stop and remove it
                        sh 'docker stop fe-consumer'
                        sh 'docker rm fe-consumer'
                        sh 'docker rmi fe-consumer'
                    }
                }

                sh 'docker build -t fe-consumer ./frontend-consumer'
                sh 'docker run -d --name fe-consumer -p 5173:80 fe-consumer'   
            }
        }

        stage("secret.yml download") {
            steps {
                withCredentials([file(credentialsId: 'application-secret', variable: 'configFile')]) {
                    script {
                        sh 'cp -rf $configFile ./backend/src/main/resources/application-secret.yml'
                    }
                }
            }
        }

        stage('be_build'){
            steps{
                script {
                    def beRunning = sh(script: 'docker ps -a --filter "name=be" --format "{{.Names}}"', returnStdout: true).trim()
                    sh 'echo ${beRunning}'
                    if (beRunning) {
                        // be container is running, stop and remove it
                        sh 'docker stop be'
                        sh 'docker rm be'
                        sh 'docker rmi be'
                    }

                    sh 'docker build -t be ./backend'
                    def dockerCmd = "docker run -d --name be -p 8081:8081 be"

                    sh dockerCmd 
                }
            }
        }
    }

    

    // post {
    //     success {
    //         mattermostSend color: '#32a852', message: "Deploy Success! (${env.JOB_NAME}) #(${env.BUILD_NUMBER}) (<${env.BUILD_URL}|Open>) \n See the (<${env.BUILD_URL}console|console>)"
    //     }
    //     failure {
    //         mattermostSend color: '#ff0800', message: "Deploy Fail! (${env.JOB_NAME}) #(${env.BUILD_NUMBER}) (<${env.BUILD_URL}|Open>) \n See the (<${env.BUILD_URL}console|console>)"
    //     }
    // }
}

