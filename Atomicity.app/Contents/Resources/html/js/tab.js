// 抽象 class 类 Tab
var that;
class Tab {
    constructor(id) {
        // 获取元素    this 实例对象
        that = this;
        this.main = document.querySelector(id); // 最大的id盒子
        this.lis = this.main.querySelectorAll('li'); // 所有的小li
        this.sections = this.main.querySelectorAll('section'); // 所有的section
        this.init();
    }
    // 把事件专门放到方法里面  初始化 所有的事件
    init() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
        }
    }
    //  1.切换功能  toggleTab()
    toggleTab() {
        that.clearClass();
        // 里面的this 指向 当前的小li 
        // 让当前小li 添加 liactive  
        this.className = 'liactive';
        // 让 对应索引号的 section 添加 conactive
        that.sections[this.index].className = 'conactive';
    }
    // 移除类名
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2. 增加功能  addTab()
    // 3. 修改功能  editTab()
}

new Tab('#tab');