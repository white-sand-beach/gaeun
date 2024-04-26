pipeline {
    agent any

    stages {
        stage("checkout_fe_seller") {
            steps {
                script {
                    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31D104.git', branch: "feSeller"
                }
            }
        }
        
        stage('fe_seller_build'){
            steps{
                script {
                    def feSellerRunning = sh(script: 'docker ps -a --filter "name=feSeller" --format "{{.Names}}"', returnStdout: true).trim()
                    sh 'echo ${feSellerRunning}'
                    if (feSellerRunning) {
                        // fe container is running, stop and remove it
                        sh 'docker stop feSeller'
                        sh 'docker rm feSeller'
                        sh 'docker rmi feSeller'
                    }
                }
                
                sh 'docker build -t feSeller ./frontend-seller'
                sh 'docker run -d --name feSeller -p 5174:5174 feSeller'   
            }
        }

        stage("checkout_fe_consumer") {
            steps {
                script {
                    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31D104.git', branch: "feConsumer"
                }
            }
        }
    
        
        stage('fe_consumer_build'){
            steps{
                script {
                    def feConsumerRunning = sh(script: 'docker ps -a --filter "name=feConsumer" --format "{{.Names}}"', returnStdout: true).trim()
                    sh 'echo ${feConsumerRunning}'
                    if (feConsumerRunning) {
                        // fe container is running, stop and remove it
                        sh 'docker stop feConsumer'
                        sh 'docker rm feConsumer'
                        sh 'docker rmi feConsumer'
                    }
                }
                
                sh 'docker build -t feConsumer ./frontend-consumer'
                sh 'docker run -d --name feConsumer -p 5173:5173 feConsumer'   
            }
        }

        stage("checkout_be") {
            steps {
                script {
                    git credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31D104.git', branch: "be"
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
                    def dockerCmd = "docker run -e DB_PASSWORD=${env.DB_PASSWORD} -e DB_URL=${env.DB_URL} -e DB_USERNAME=${env.DB_USERNAME} -e BASE_URL=${env.BASE_URL} -e SELLER_URL=${env.SELLER_URL} -e WHITE_LIST=${env.WHITE_LIST} -e SELLER_LIST=${env.SELLER_LIST} -e S3_BUCKET_NAME=${env.S3_BUCKET_NAME} -e S3_ACCESS_KEY=${env.S3_ACCESS_KEY} -e S3_SECRET_KEY=${env.S3_SECRET_KEY} -d --name be -p 8081:8081 be"
                    sh dockerCmd 
                }
            }
        }
    }

    post {
        success {
            mattermostSend color: '#32a852', message: "Deploy Success! (${env.JOB_NAME}) #(${env.BUILD_NUMBER}) (<${env.BUILD_URL}|Open>) \n See the (<${env.BUILD_URL}console|console>)"
        }
        failure {
            mattermostSend color: '#ff0800', message: "Deploy Fail! (${env.JOB_NAME}) #(${env.BUILD_NUMBER}) (<${env.BUILD_URL}|Open>) \n See the (<${env.BUILD_URL}console|console>)"
        }
    }
}

