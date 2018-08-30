//模型的一些设置，圆球，平面等切换
function createWorldModel()
{
   var b = theApplet.createWorldModel();
}
function destroyWorldModel()
{
   theApplet.destroyWorldModel();
}
//改变模型模式（flat true 平面 false 圆球）
//平面模式的选择project
//gov.nasa.worldwind.globes.projectionMercator
//gov.nasa.worldwind.globes.projectionSinusoidal
//gov.nasa.worldwind.globes.projectionModifiedSinusoidal
//gov.nasa.worldwind.globes.projectionLatLon

function setFlatGlobe(flat,project)
{
   theApplet.getWorldModelOption().setFlatGlobe(flat,project);
}
