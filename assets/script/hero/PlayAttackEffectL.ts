import { ConstConfig } from '../config/ConstConfig';
const {ccclass, property} = cc._decorator;

@ccclass
export class PlayAttackEffectR extends cc.Component {

    /**
     * 技能运行速度
     */
    private speed: number = ConstConfig.ATTACKEFFECT_SPEED;



    protected onLoad():void{
        cc.log("释放技能")
    }


    protected update(dt: number): void{
        this.node.x -= this.speed * dt; 
    }

    onCollisionEnter(other: any, self: any) {
        this.node.destroy();
        cc.log("清除技能")
    }


}