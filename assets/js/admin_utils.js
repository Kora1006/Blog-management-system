// 运行在浏览器端的处理工具

const utils = {
    getData: (urlInfo) => {
        // 声明一个空对象存储结果
        let urlObj = {}
        console.log(urlInfo) //?id=8&name=junjun
        urlInfo = urlInfo.substring(1) //id=8&name=junjun
        let urlArr = urlInfo.split('&')  //["id=8","name=junjun"]
        urlArr.forEach(value => {
            let urlData = value.split('=')   //["id","8"] ["name","junjun"]
            urlObj[urlData[0]] = urlData[1]
        });
        return urlObj
    },
    alertResult: (res,selector) => {
        if (res.code == 200) {
            selector.show().addClass('alert-success').removeClass('alert-danger').fadeIn(200).delay(2000).fadeOut(200)
        } else {
            selector.show().addClass('alert-danger').removeClass('alert-success').fadeIn(200).delay(2000).fadeOut(200)
        }
    }
}