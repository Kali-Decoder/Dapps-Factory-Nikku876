const TaskMaster= artifacts.require('TaskMaster');
module.exports=function (deployer){
    deployer.deploy(TaskMaster);
}