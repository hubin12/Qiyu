import { ConstConfig } from "../config/ConstConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export class GameOver extends cc.Component {



    /**
     * 碰撞检测
     * @param other
     * @param self 
     */
    onCollisionEnter(other: any, self: any) {
        //如果角色触碰到了终点
        if(other.node.group == ConstConfig.HERO_GROUP_NAME){
            //切换场景
            cc.director.loadScene("over");
        }
    }

    


}