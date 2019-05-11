const path = require('path')
const fs = require('fs');
module.exports = {
  webpack :function(config,env){
    // ...添加你的webpack配置
    fs.openSync('./.config.log','w',)
    const alias={
        components: path.resolve(__dirname, 'src/components/'),
        util: path.resolve(__dirname, 'src/util/'),
        pages: path.resolve(__dirname, 'src/pages/'),
        public: path.resolve(__dirname, 'public')
    }
    
    config.resolve.alias = alias;
    return config;
 }
    
}