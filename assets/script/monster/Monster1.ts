import { ConstConfig } from '../config/ConstConfig';
const {ccclass, property} = cc._decorator;

@ccclass
export class Monster1 extends cc.Component {

    /**
     * 怪物1（蛤蟆怪）
     */
    @property(cc.Node)
    private monster1: cc.Node = null;

    /**
     * monster1血量，默认为20
     */
    private static monster1Blood: number = ConstConfig.MONSTER1_BLOOD;

    /**
     * 怪物跳跃次数
     */
    private static runTag: number = 0;


    protected onLoad(): void{
        let monsterAnimation1: cc.Animation = this.monster1.getComponent(cc.Animation);
        cc.log(this.monster1.position);
        //每隔5秒跳跃
        this.schedule(this.monster1Run, 5);

    }

    protected start(): void{

    }

    protected update(): void{

    }

    /**
     * 蛤蟆怪1自动跳跃函数
     */
    private monster1Run(): void{
        let monsterAnimation1: cc.Animation = this.monster1.getComponent(cc.Animation);
        if(Monster1.runTag != 0){
            Monster1.runTag = 0;
            //获取monster1动画
            this.monster1.scaleX = -1.5;
            monsterAnimation1.play("monster1Run");
            //数据暂时写死
            //x: 952.9921310122072     y: -102.21121065669007
            let moveBegin: cc.ActionInterval = cc.moveTo(0.3, 953 - 200, -102);
            let moveOn: cc.ActionInterval = cc.moveTo(0.3, 953 - 100, -102 + 80);
            let moveEnd: cc.ActionInterval = cc.moveTo(0.3, 953, -102);
            let seq: cc.ActionInterval = cc.sequence(moveBegin,moveOn,moveEnd);
            this.monster1.runAction(seq);
        }else{
            this.monster1.scaleX = 1.5;
            //获取monster1动画
            monsterAnimation1.play("monster1Run");
            //x: 952.9921310122072     y: -102.21121065669007
            let moveBegin: cc.ActionInterval = cc.moveTo(0.3, 953, -102);
            let moveOn: cc.ActionInterval = cc.moveTo(0.3,953 - 100, -102 + 80);
            let moveEnd: cc.ActionInterval = cc.moveTo(0.3, 953 - 200, -102)
            let seq: cc.ActionInterval = cc.sequence(moveBegin,moveOn,moveEnd);
            this.monster1.runAction(seq);
            Monster1.runTag ++;
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
            this.monster1.runAction(seq);
            //血量减少
            Monster1.monster1Blood -= ConstConfig.HERO_ATTACK;
            //判断血量
            if(Monster1.monster1Blood <= 0){
                this.monster1.destroy();
            }
        }
    }


     /**
     * 显示人物
     */
    private displayHero() :void{
        this.monster1.opacity = 255;
        this.monster1.active = true;
    }
}