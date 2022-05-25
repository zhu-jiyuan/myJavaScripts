
const $ = new initEnv();
const cookie = $.read("biliCookie");
dosign();



function dosign(){
    const url = "https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign";
    const headers = {
        "cookie":cookie,
        "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39"
    };

    const myRequest = {
        url:url,
        headers:headers
    }

    $.get(myRequest,(error,response)=>{
        if(error){
            console.log(error);
        }else{
            let body = JSON.parse(response.body);
            if(body.code===0){
                $.notify("bili签到~",body.data.text,body.data.specialText);
            }else{
                $.notify("bili签到~",body.message,"");
            }
        }
        $.done();
    })

}




function initEnv() {

	this.read = (key) => {
		return $prefs.valueForKey(key);
	}
	this.notify = (title, subtitle, message) => {
		$notify(title, subtitle, message);
	}

    this.getRandom = (min,max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    this.sleep = (milliseconds) => {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    //get请求
    this.get = (options, callback) => {
        options["method"] = "GET"
        $task.fetch(options).then(response => {
            callback(null, response)
        }, reason => callback(reason.error, null))
    }
    //post请求
	this.post = (options, callback) => {
        options["method"] = "POST"
        $task.fetch(options).then(response => {
            callback(null, response)
        }, reason => callback(reason.error, null))
	}
    //结束
	this.done = (resp={}) => {
		$done(resp);
	}
};