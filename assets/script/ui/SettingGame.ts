const {ccclass, property} = cc._decorator;

@ccclass
export class SettingGame extends cc.Component {

     /**
     * 设置按钮
     */
    @property(cc.Node)
    private settingButton: cc.Node = null;


    protected onLoad(): void{
        //设置点击事件
        this.settingButton.on(cc.Node.EventType.TOUCH_START,this.settingPress,this);
        this.settingButton.on(cc.Node.EventType.TOUCH_END,this.settingPressCancel,this);
        this.settingButton.on(cc.Node.EventType.TOUCH_CANCEL,this.settingPressCancel,this);
    }

    /**
     * 设置
     */
    private settingPress(): void{
        //按钮缩放
        this.settingButton.scaleX = 1.2;
        this.settingButton.scaleY = 1.2;
    }


    /**
     * 按钮取消
     */
    private settingPressCancel(): void{
        //按钮缩放
        this.settingButton.scaleX = 1;
        this.settingButton.scaleY = 1;
    }


}