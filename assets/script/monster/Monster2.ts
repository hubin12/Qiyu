import { ConstConfig } from '../config/ConstConfig';
const {ccclass, property} = cc._decorator;

@ccclass
export class Monster2 extends cc.Component {

    /**
     * 怪物2（葫芦怪）
     */
    @property(cc.Node)
    private monster2: cc.Node = null;

    /**
     * monster2血量，默认为20
     */
    private static monster2Blood: number = ConstConfig.MONSTER2_BLOOD;

    /**
     * 速度
     */
    private speed: number = 30;



    protected onLoad(): void{
        //播放动画
        let monsterAnimation2: cc.Animation = this.monster2.getComponent(cc.Animation);
        monsterAnimation2.play("monster2Run");
        //每隔4秒走一次
        this.schedule(this.monster2Run, 6);
    }

    protected start(): void{

    }

    protected update(dt: number): void{
    }

    /**
     * 葫芦怪1自动行走函数
     */
    private monster2Run(): void{
        if(this.monster2.scaleX < 0){
            let moveBegin: cc.ActionInterval = cc.moveTo(2, 2351, 130);
            let moveEnd: cc.ActionInterval = cc.moveTo(2, 2578, 130);
            let callback: cc.ActionInstant = cc.callFunc(this.changeDirection,this);
            let seq: cc.ActionInterval = cc.sequence(moveBegin,moveEnd,callback);
            this.monster2.runAction(seq);
        }else{
            let moveBegin: cc.ActionInterval = cc.moveTo(2, 2578, 130);
            let moveEnd: cc.ActionInterval = cc.moveTo(2, 2351, 130);
            let callback: cc.ActionInstant = cc.callFunc(this.changeDirection,this);
            let seq: cc.ActionInterval = cc.sequence(moveBegin,moveEnd,callback);
            this.monster2.runAction(seq);
        }
    }


    /**
     * 改变怪物方向
     */
    private changeDirection():void{
        if(this.monster2.scaleX > 0){
            this.monster2.scaleX = -1.5;
        }else{
            this.monster2.scaleX = 1.5;
        }
    }

    /**
     * 碰撞检测
     * @param other
     * @param self 
     */
    onCollisionEnter(other: any, self: any) {
        //如果碰撞到了攻击特效
        if(other.node.group == ConstConfig.ATTACK_GROUP_NAME){
            //播放闪烁动画
            let action: cc.ActionInterval  = cc.blink(1,5);
            let callFun:cc.ActionInstant = cc.callFunc(this.displayHero,this);
            let seq: cc.ActionInterval = cc.sequence(action,callFun);
            this.monster2.runAction(seq);
            //血量减少
            Monster2.monster2Blood -= ConstConfig.HERO_ATTACK;
            //判断血量
            if(Monster2.monster2Blood <= 0){
                this.monster2.destroy();
            }
        }
    }

     /**
     * 显示人物
     */
    private displayHero() :void{
        this.monster2.opacity = 255;
        this.monster2.active = true;
    }
}