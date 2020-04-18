const {ccclass, property} = cc._decorator;

@ccclass
export class LoadAndExist extends cc.Component {

    
    /**
     * 退出按钮
     */
    @property(cc.Node)
    private exitButton: cc.Node = null;

    /**
     * 继续游戏
     */
    @property(cc.Node)
    private loadButton: cc.Node = null;


    protected onLoad(): void{
        //设置点击事件
        this.exitButton.on(cc.Node.EventType.TOUCH_START,this.exitGame,this);
        this.exitButton.on(cc.Node.EventType.TOUCH_END,this.exitGameCancel,this);
        this.exitButton.on(cc.Node.EventType.TOUCH_CANCEL,this.exitGameCancel,this);

        this.loadButton.on(cc.Node.EventType.TOUCH_START,this.loadGame,this);
        this.loadButton.on(cc.Node.EventType.TOUCH_END,this.loadGameCancel,this);
        this.loadButton.on(cc.Node.EventType.TOUCH_CANCEL,this.loadGameCancel,this);

    }

    /**
     * 退出游戏
     */
    private exitGame(): void{
        //按钮缩放
        this.exitButton.scaleX = 1.7;
        this.exitButton.scaleY = 1.7;
        //结束游戏
        cc.game.end();
    }


    /**
     * 按钮取消
     */
    private exitGameCancel(): void{
        //按钮缩放
        this.exitButton.scaleX = 1.5;
        this.exitButton.scaleY = 1.5;
    }


    /**
     * 重新游戏
     */
    private loadGame(): void{
        //按钮缩放
        this.loadButton.scaleX = 1.7;
        this.loadButton.scaleY = 1.7;
        //加载游戏
        cc.director.loadScene("game");
    }


    /**
     * 按钮取消
     */
    private loadGameCancel(): void{
        //按钮缩放
        this.loadButton.scaleX = 1.5;
        this.loadButton.scaleY = 1.5;
    }

}