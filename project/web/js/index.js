// 首页JavaScript文件
function $(selector) {
  return document.querySelector(selector);
}

function appendPic(item) {
const {
  name,picPath,desc,photographer
} = item || {}

// 补充 html 的生成逻辑
const html = `
<li class="gallery-item">
    <img src=${picPath} alt={name} />
    <p class="name">${name}</p>
    <p class="photographer"}>by ${photographer}</p>
     <p class="desc">${desc}</p>
             
</li>`;

$('#pics').innerHTML += html;
}

async function fetchPics() {
// 后续 pics 的内容通过请求后端获取
// const pics = [
//   {
//     name: '波浪',
//     photographer: '蚂蚁1',
//     desc: '木落雁嗷嗷，洞庭波浪高',
//     picPath: 'data/pic/pic-3.png',
//   },
//   {
//     name: '落日',
//     photographer: '蚂蚁2',
//     desc: '长河落日圆',
//     picPath: 'data/pic/pic-1.png',
//   },
//   {
//     name: '礁石',
//     photographer: '蚂蚁3',
//     desc: '东临碣石，以观沧海',
//     picPath: 'data/pic/pic-2.png',
//   },
// ];

// 修改为循环，可以使用 for，也可以使用 forEach
// appendPic(pics[0]);
// appendPic(pics[1]);
// appendPic(pics[2]);
  try{const res = await fetch('/pic/list',{
    method: "GET"
  }) 
  const pics = await res.json();
  pics.data.forEach(appendPic)}
  catch(e){
    console.error("查询图片发生错误",e)
    alert("查询图片发生错误")
  }
}

fetchPics();