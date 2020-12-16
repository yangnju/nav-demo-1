const $siteList = $('.siteList')   //为了在siteList中寻找last，生成一个$siteList变量
const $lastLi = $siteList.find('li.last') //为了把新增的li增加到last前一个，生成一个$lastLi变量
const x = localStorage.getItem('x')  //获取上次存的'x'
const xObject = JSON.parse(x)  //恢复成数组
const hashMap = xObject || [  //如果xObject不是空，就获取它的值，如果是空，就加载后面的内容
    { logo: 'A', url: 'https://baidu.com' },
    { logo: 'B', url: 'https://bilibili.con' }
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')  //此处不能直接return url，因为此时的url是不变的
        .replace('http://')
        .replace('www.', '')
        .replace(/\/.*/, '')  //删除点后面的所有内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()  //render前要先删除
    hashMap.forEach((node, index) => {  //创建的时候同时生成下标，有问题查forEach
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="closeWrapper">
                    <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {  //用JS实现跳转
            window.open(node.url)
        })
        $li.on('click', '.closeWrapper', (e) => {
            e.stopPropagation()  //阻止冒泡
            hashMap.splice(index, 1)  //删除第index个内容
            render()  //渲染最新的hashMap
        })
    })
}
render()

$('.addSite').on('click', () => {
    console.log('111')
    let url = window.prompt('请输入您想添加的网站地址')
    //将用户输入的内容保存至url变量
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }

    //根据url变量，修改hashMap变量
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),  //将精简过的用户输入的网址的首字母变为大写，存在logo中
        logoType: 'text',
        url: url
    })
    render()
})

//用户退出前要存储，查到用户关闭的事件，进行监听
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)  //将hashMap变成字符串
    localStorage.setItem('x', string)  //setItem只接受字符串
}

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})