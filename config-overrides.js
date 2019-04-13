const path = require('path')
console.log(1234)
module.exports = {
  webpack :function(config,env){
    // ...添加你的webpack配置
    console.log(config)
    const alias={
        components: path.resolve(__dirname, 'src/components/'),
        util: path.resolve(__dirname, 'src/util/')
    }
    config.resolve.alias = alias;
    return config;
 }
    
}