const cdk = require('aws-cdk-lib');
const { CodePipeline, CodePipelineSource, ShellStep } = require('aws-cdk-lib/pipelines');
const { MyPipelineAppStage } = require('./my-pipeline-app-stage');

 class MyPipelineStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('masroor07/Pointers-CICD', 'main'),
        installCommands: ['npm i -g npm@latest'],
        commands: ['npm -v', 'npm install', 'npm run build', 'npx cdk synth']
      })
    });

    pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "768392373232", region: "us-east-1" }
    }));
    
    const { ManualApprovalStep } = require('aws-cdk-lib/pipelines');

    pipeline.addStage(new MyPipelineAppStage(this, 'prod', {
      env: { account: '768392373232', region: 'us-east-1' }
    }));

testingStage.addPost(new ManualApprovalStep('approval'));
  }
}

module.exports = { MyPipelineStack }