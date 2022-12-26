const express = require('express')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static('web'))
// 获取图片接口
app.get('/pic/list',function(req,res) {
  const filePath = path.join(__dirname,"web/data/data.json");
  fs.readFile(filePath,(err,content) => {
    if(err){
      res.join({success:false});
      return;
    }
    res.json({
      success:true,
      data:JSON.parse(content),
    })
  })
})

//上传图片接口
app.post('/pic/upload',function(req,res){
  //1.获取信息：name photographer desc
  //2.图片保存
  //3.更新数据
  const form = formidable({ 
    multiples: true,
    uploadDir: path.join(__dirname,"web/data/pic"),
    keepExtensions:true,
    filename:(name,ext)=>{
      return `${name}-${Date.now()}${ext}`
    },
  });

  form.parse(req,(err,fields,files) => {
    console.log("upload",fields,files);
    const filePath = path.join(__dirname,"web/data/data.json")
    if(err) {
      res.json({success:false})
      return;
    }
    
    fs.readFile(filePath,(err,content) => {
      if(err) {
        res.json({success:false})
        return;
      }
      const data =JSON.parse(content);
      const {name,photographer,desc,picPath} = fields;
      data.push(
        {
          name,
          photographer,
          desc,
          picPath:`data/pic/${files.file.newFilename}`
        }
      )
      fs.writeFile(filePath,JSON.stringify(data,null,2),(err,data)=>{
        if(err){
          res.json({success:false});
          return;
        }
        res.json({success:true})
      })
    });
  })

})


app.listen(3000,()=>{
  console.log('app is serving on port http://localhost:3000/ ...')
})