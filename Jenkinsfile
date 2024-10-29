pipeline {
    agent any
  
    environment {
        REPO_URL = 'github.com/dasilvadev/medical-reports-frontend.git'
        DOCKER_IMAGE = 'kevendasilva/medical-reports-frontend'
        BUILD_TAG = "${env.BUILD_NUMBER}"
    }
  
  stages {
    stage('Atualizar ou Clonar Repositório') {
        steps {
            script {
                withCredentials([usernamePassword(credentialsId: 'dasilvadev-github', 
                                                usernameVariable: 'GIT_USER', 
                                                passwordVariable: 'GIT_TOKEN')]) {
                    // Verifica se o diretório já existe
                    sh """
                    if [ -d "medical-reports-frontend" ]; then
                    cd medical-reports-frontend && git pull
                    else
                    git clone https://${GIT_USER}:${GIT_TOKEN}@${REPO_URL}
                    fi
                    """
                }
            }
        }
    }
    stage('Build da imagem Docker') {
        steps {
            script {
                sh """
                docker build -f medical-reports-frontend/Dockerfile -t ${DOCKER_IMAGE}:${BUILD_TAG} medical-reports-frontend
                docker tag ${DOCKER_IMAGE}:${BUILD_TAG} ${DOCKER_IMAGE}:latest
                """
            }
        }
    }
    stage('Login to Docker Hub') {
        steps {
            script {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }
    }
    stage('Push Docker Image') {
        steps {
            script {
                sh 'docker push $DOCKER_IMAGE'
            }
        }
    }
  }
  
    post {
        always {
            echo 'Pipeline finalizado!'
        }
    }
}