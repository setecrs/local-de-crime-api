node {

    currentBuild.result = "SUCCESS"

    try {

        stage('Delete Repos PF Api'){
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/pf/api"'
         }

        stage('Clone Repos PF Api'){
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch homo http://projetos@www.tools.ages.pucrs.br/PoliciaFederal/api.git /opt/docker/pf/api"'
        }

        stage('Down Containers DB, Api'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/pf/api; ls -la; docker-compose down;"'
        }

        stage('Build and Up Docker Containers Api and DB'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/pf/api; docker-compose up --build -d"'
        }

        stage('Success'){
            mail body: 'project build successful in HML',
                     from: 'jenkins@ages.com',
                     replyTo: 'cassio.trindade@pucrs.br',
                     subject: 'Success CI API PF',
                     to: 'cassio.trindade@pucrs.br'
        }

    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'jenkins@ages.com',
            replyTo: 'cassio.trindade@pucrs.br',
            subject: 'Error API PF',
            to: 'cassio.trindade@pucrs.br'

        throw err
    }

}

