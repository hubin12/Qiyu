const {ccclass, property} = cc._decorator;

@ccclass
export class OnLoadScence extends cc.Component {

    /**
     * 开始游戏按钮
     */
    @property(cc.Node)
    private startButton: cc.Node = null;

    /**
     * 进度条填充
     */
    @property(cc.Sprite)
    private processUi: cc.Sprite = null;


    @property(cc.Node)
    private processBar: cc.Node = null;


    
    protected onLoad():void{
        //设置点击事件
        this.startButton.on(cc.Node.EventType.TOUCH_START,this.changeScence,this);
        this.startButton.on(cc.Node.EventType.TOUCH_END,this.changeScenceOver,this);
        this.startButton.on(cc.Node.EventType.TOUCH_CANCEL,this.changeScenceOver,this);
    }

    /**
     * 切换场景
     */
    private changeScence(): void{
        //进度条显示
        this.processBar.opacity = 255;
        let i: number = 0;
        //加载进度条
        this.schedule(function(){
            this.processUi.fillRange = i/100;
            i+=10;
        },0.05,10);
        //跳转场景
        this.scheduleOnce(function(){
            //进度条加载完成,跳转场景
            cc.director.loadScene("game");
        },0.5);
        
    }


    /**
     * 按钮取消
     */
    private changeScenceOver(): void{
        //button变大
    }
}