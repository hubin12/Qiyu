import { ConstConfig } from '../config/ConstConfig';

const {ccclass, property} = cc._decorator;

@ccclass
export class HeroControl extends cc.Component {
    /**
     * 左移按钮
     */
    @property(cc.Node)
    private leftButton: cc.Node = null;
    /**
     * 右移按钮
     */
    @property(cc.Node)
    private rightButton: cc.Node = null;

    /**
     * 攻击按钮
     */
    @property(cc.Node)
    private attackButton: cc.Node = null;
    /**
     * 攻击按钮
     */
    @property(cc.Node)
    private jumpButton: cc.Node = null;

    /**
     * 横向速度
     */
    private speedX: number = 0;
    /**
     * 纵向速度
     */
    private speedY: number = 0;

    /**
     * 角色
     */
    @property(cc.Node)
    private hero: cc.Node = null;


    /**
     * 主摄像头
     */
    @property(cc.Camera)
    private camer: cc.Camera = null;


    /**
     * 摄像机左边界
     */
    private cameraLeftMaxX: number = 0;

    /**
     * 摄像机右边界
     */
    private cameraRightMaxX: number = 0;

    /**
     * 摄像机上边界
     */
    private cameraUpMaxY: number = 0;

    /**
     * 摄像机下边界
     */
    private cameraDownMaxY: number = 0;

    /**
     * 角色x坐标
     */
    private static heroX: number = 0;

    /**
     * 角色运动状态 true- 正在运动 false- 其他状态
     */
    private static runState: boolean = false;

    /**
     * 角色血量，默认为100
     */
    private  static heroBlood: number = ConstConfig.HERO_BLOOD;

     

    /**
     * 角色血条
     */
    @property(cc.Node)
    private bloodBar: cc.Node = null;

    /**
     * 攻击特效
     */
    @property(cc.Prefab)
    private attackEffectL: cc.Prefab = null;

    /**
     * 攻击特效
     */
    @property(cc.Prefab)
    private attackEffectR: cc.Prefab = null;


    protected onLoad(): void{
        //角色血量重载
        HeroControl.heroBlood = ConstConfig.HERO_BLOOD;
        //注册按钮事件
        this.rightButton.on(cc.Node.EventType.TOUCH_START,this.rigthButtonClick,this);
        this.rightButton.on(cc.Node.EventType.TOUCH_END,this.rightButtonClickCancel,this);
        this.rightButton.on(cc.Node.EventType.TOUCH_CANCEL,this.rightButtonClickCancel,this);

        this.leftButton.on(cc.Node.EventType.TOUCH_START,this.leftButtonClick,this);
        this.leftButton.on(cc.Node.EventType.TOUCH_END,this.leftButtonClickCancel,this);
        this.leftButton.on(cc.Node.EventType.TOUCH_CANCEL,this.leftButtonClickCancel,this);

        this.attackButton.on(cc.Node.EventType.TOUCH_START,this.attackButtonClick,this);
        this.attackButton.on(cc.Node.EventType.TOUCH_END,this.attackButtonClickCancel,this);
        this.attackButton.on(cc.Node.EventType.TOUCH_CANCEL,this.attackButtonClickCancel,this);

        this.jumpButton.on(cc.Node.EventType.TOUCH_START,this.jumpButtonClick,this);
        this.jumpButton.on(cc.Node.EventType.TOUCH_END,this.jumpButtonClickCancel,this);
        this.jumpButton.on(cc.Node.EventType.TOUCH_CANCEL,this.jumpButtonClickCancel,this);

        //注册键盘事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        //摄像机边界
        this.cameraLeftMaxX = ConstConfig.CAMERA_LEFT_MAXX;
        this.cameraRightMaxX = ConstConfig.CAMERA_RIGHT_MAXX;
        this.cameraUpMaxY = cc.winSize.height/2;
    }

    /**
     * 键盘按下事件
     * @param event 事件
     */
    private onKeyDown(event: cc.Event.EventKeyboard): void{

        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.leftButtonClick();
                break;
            case cc.macro.KEY.d:
                this.rigthButtonClick();
                break;
            case cc.macro.KEY.w:
                this.jumpButtonClick();
                break;
            case cc.macro.KEY.j:
                this.attackButtonClick();
                break;
        }
    }

    /**
     * 键盘抬起
     * @param enent 事件
     */
    private onKeyUp(event: cc.Event.EventKeyboard): void{
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.leftButtonClickCancel();
                break;
            case cc.macro.KEY.d:
                this.rightButtonClickCancel();
                break;
            case cc.macro.KEY.w:
                this.jumpButtonClickCancel();
                break;
            case cc.macro.KEY.j:
                this.attackButtonClickCancel();
                break;
        }
    }

    
    /**
     * 右按钮点击事件函数
     * @param targer 点击事件控制节点
     * @param data 数据
     */
    private rigthButtonClick(): void{
        //设置按钮缩放
        this.rightButton.scaleX = 1.2;
        this.rightButton.scaleY = 1.2;
        //判断角色朝向
        if(this.hero.scaleX == -ConstConfig.HERO_SCALEX){
            this.hero.scaleX = ConstConfig.HERO_SCALEX;
        }
        //播放运动动画
        let heroAnimation: cc.Animation = this.hero.getComponent(cc.Animation);
        heroAnimation.play(ConstConfig.ANIMATION_RUN);
        //设置速度为80
        this.speedX = ConstConfig.SPEED_RUN;
        HeroControl.runState = true;
        
    }
     /**
     * 右按钮取消事件
     */
    rightButtonClickCancel() {
        cc.log("右按钮取消");
        //设置按钮缩放
        this.rightButton.scaleX = ConstConfig.HERO_SCALE_NOMAL;
        this.rightButton.scaleY = ConstConfig.HERO_SCALE_NOMAL;
        //停止移动动画
        let heroAnimation: cc.Animation = this.hero.getComponent(cc.Animation);
        heroAnimation.stop(ConstConfig.ANIMATION_RUN);
        heroAnimation.play(ConstConfig.ANIMATION_STATIC);
        //设置速度为0
        this.speedX = ConstConfig.SPEED_STOP;
        HeroControl.runState = false;
    }

    /**
     * 左按钮点击事件函数
     * @param targer 点击事件控制节点
     * @param data 数据
     */
    private leftButtonClick(): void{
        //设置按钮缩放
        this.leftButton.scaleX = ConstConfig.HERO_SCALE;
        this.leftButton.scaleY = ConstConfig.HERO_SCALE;
        //判断角色朝向
        if(this.hero.scaleX == ConstConfig.HERO_SCALEX){
            this.hero.scaleX = -ConstConfig.HERO_SCALEX;
        }
        //播放运动动画
        let heroAnimation: cc.Animation = this.hero.getComponent(cc.Animation);
        heroAnimation.play(ConstConfig.ANIMATION_RUN);
        //设置速度为-80
        this.speedX = -ConstConfig.SPEED_RUN;
        HeroControl.runState = true;
    }

    
    /**
     * 左按钮取消事件函数
     * @param targer 点击事件控制节点
     * @param data 数据
     */
    private leftButtonClickCancel(): void{
        //设置按钮缩放
        this.leftButton.scaleX = ConstConfig.HERO_SCALE_NOMAL;
        this.leftButton.scaleY = ConstConfig.HERO_SCALE_NOMAL;
        //停止移动动画
        let heroAnimation: cc.Animation = this.hero.getComponent(cc.Animation);
        heroAnimation.stop(ConstConfig.ANIMATION_RUN);
        //播放站立动画
        heroAnimation.play(ConstConfig.ANIMATION_STATIC);
        //设置速度为0
        this.speedX = ConstConfig.SPEED_STOP;
        HeroControl.runState = false;
    }


    /**
     * 攻击按钮点击事件函数
     * @param targer 点击事件控制节点
     * @param data 数据
     */
    private attackButtonClick(): void{
        //设置按钮缩放
        this.attackButton.scaleX = ConstConfig.HERO_SCALE;
        this.attackButton.scaleY = ConstConfig.HERO_SCALE;
        //停止移动动画
        let heroAnimation: cc.Animation = this.hero.getComponent(cc.Animation);
        heroAnimation.stop(ConstConfig.ANIMATION_RUN);
        //播放攻击动画
        heroAnimation.play(ConstConfig.ANIMATION_ATTACK);
        //产生攻击特效
        if(this.hero.scaleX > 0){
            //产生向右的攻击特效
            let attackEffectR: cc.Node =  cc.instantiate(this.attackEffectR);
            attackEffectR.parent = this.hero.parent;
            attackEffectR.x = this.hero.x;
            attackEffectR.y = this.hero.y;
        }else{
            //产生向左的攻击特效
            let attackEffectL: cc.Node =  cc.instantiate(this.attackEffectL);
            attackEffectL.parent = this.hero.parent;
            attackEffectL.x = this.hero.x;
            attackEffectL.y = this.hero.y;
        }
    }

    /**
     * 攻击按钮取消事件函数
     * @param targer 点击事件控制节点
     * @param data 数据
     */
    private attackButtonClickCancel(): void{
        //设置按钮缩放
        this.attackButton.scaleX = ConstConfig.HERO_SCALE_NOMAL;
        this.attackButton.scaleY = ConstConfig.HERO_SCALE_NOMAL;
        //停止攻击动画
        let heroAnimation: cc.Animation = this.hero.getComponent(cc.Animation);
        heroAnimation.play(ConstConfig.ANIMATION_ATTACK);
        //播放站立动画
        heroAnimation.play(ConstConfig.ANIMATION_STATIC);
        if(HeroControl.runState){
            //播放运动动画
            let heroAnimation: cc.Animation = this.hero.getComponent(cc.Animation);
            heroAnimation.stop(ConstConfig.ANIMATION_STATIC);
            heroAnimation.play(ConstConfig.ANIMATION_RUN);
        }
    }


    /**
     * 跳跃按钮点击事件函数
     * @param targer 点击事件控制节点
     * @param data 数据
     */
    private jumpButtonClick(): void{
        //设置按钮缩放
        this.jumpButton.scaleX = ConstConfig.HERO_SCALE;
        this.jumpButton.scaleY = ConstConfig.HERO_SCALE;
        if(cc.director.getActionManager().getNumberOfRunningActionsInTarget(this.hero) == 0){
            //停止移动动画
            let heroAnimation: cc.Animation = this.hero.getComponent(cc.Animation);
            heroAnimation.stop(ConstConfig.ANIMATION_RUN);
            this.speedY = ConstConfig.SPEED_JUMP;
            // 跳跃上升
            let jumpUp = cc.jumpTo(1, HeroControl.heroX, this.hero.y ,this.speedY,1);
            // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
            let callback = cc.callFunc(this.jumpOver, this);
            //添加动作列表
            let seq = cc.sequence(jumpUp,callback);
            //播放动作
            this.hero.runAction(seq);
        }else{
            return;
        }
    }

    private jumpOver(): void{
        if(HeroControl.runState){
            //播放运动动画
            let heroAnimation: cc.Animation = this.hero.getComponent(cc.Animation);
            heroAnimation.play(ConstConfig.ANIMATION_RUN);
        }
    }


    /**
     * 跳跃按钮取消事件函数
     * @param targer 点击事件控制节点
     * @param data 数据
     */
    private jumpButtonClickCancel(): void{
        //设置按钮缩放正常
        this.jumpButton.scaleX = ConstConfig.HERO_SCALE_NOMAL;
        this.jumpButton.scaleY = ConstConfig.HERO_SCALE_NOMAL;
    }

    /**
     * 更新摄像机位置，超出摄像机最大距离则停止移动摄像机
     */
    private updateCameraPosition(dt: number) {
        let target = this.hero.position;
        if (target.x < this.cameraLeftMaxX) {
            target.x = this.cameraLeftMaxX;
        }
        if (target.x > this.cameraRightMaxX) {
            target.x = this.cameraRightMaxX;
        }
        this.camer.node.x = target.x;
        this.camer.node.y = 0;
        if (target.y > (this.cameraUpMaxY - 155)) {
            // target.y = this.cameraUpMaxY - 155;
            this.camer.node.y = target.y - 220;
        }
        
    }

    /**
     * 刷新函数
     * @param dt 
     */
    protected update(dt: number): void{
        //角色移动
        this.hero.x = this.hero.x + this.speedX * dt;
        this.updateCameraPosition(dt);
        HeroControl.heroX = this.hero.x;
    }


    /**
     * 碰撞检测
     * @param other 
     * @param self 
     */
    onCollisionEnter(other: any, self: any) {
        //碰撞到了怪物
        if(other.node.group == ConstConfig.MONSTER_GROUP_NAME){
            //判断人物朝向
            if(this.hero.scaleX > 0){
                //朝右反弹
                this.hero.x -= 2;
            }else{
                //朝左反弹
                this.hero.x += 2;
            }
            //播放闪烁动画
            let action: cc.ActionInterval  = cc.blink(1,5);
            let callFun:cc.ActionInstant = cc.callFunc(this.displayHero,this);
            let seq: cc.ActionInterval = cc.sequence(action,callFun);
            this.hero.runAction(seq);
            this.reduceBlood(other.node.name);
        }
    }

    /**
     * 显示人物
     */
    private displayHero() :void{
        this.hero.opacity = 255;
        this.hero.active = true;
    }


    /**
     * 触碰怪物降低角色血量
     * @param monsterName 怪物名称
     */
    private reduceBlood(monsterName: string): void{
        //判断怪物类型
        switch(monsterName){
            case ConstConfig.MONSTER1_NAME:
                //角色血量减少
                HeroControl.heroBlood = HeroControl.heroBlood - ConstConfig.MONSTER1_ATTACK;
                break;
            case ConstConfig.MONSTER2_NAME:
                //角色血量减少
                HeroControl.heroBlood = HeroControl.heroBlood - ConstConfig.MONSTER2_ATTACK;
                break;
            default:
                break;
        }
        //角色死了
        if(HeroControl.heroBlood <= 0){
            cc.director.loadScene("over");
        }
        //血条同步
        let bloodSprite: cc.Sprite = this.bloodBar.getComponent(cc.Sprite);
        bloodSprite.fillRange = HeroControl.heroBlood / 100;
    }

}