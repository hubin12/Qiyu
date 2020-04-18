const {ccclass, property} = cc._decorator;

@ccclass
export class EnablePhy extends cc.Component {
    /**
     * 引擎默认重力
     */
    @property(cc.Vec2)
    private gravity: cc.Vec2 = cc.v2(0,-320);
 
    /**
     * 是否开启debug模式
     */
    @property
    private isDebug: boolean  = false;


    protected onLoad(): void{
        //开启物理引擎
        cc.director.getPhysicsManager().enabled = true;
        //配置物理引擎重力
        cc.director.getPhysicsManager().gravity = this.gravity;
        //配置调试区域
        if(this.isDebug){
            var Bits: any = cc.PhysicsManager.DrawBits;
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_aabbBit |
            Bits.e_pairBit |
            Bits.e_centerOfMassBit |
            Bits.e_jointBit |
            Bits.e_shapeBit;
        }else{
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }

        //开启碰撞检测系统
        // 获取碰撞检测类
        let manager: cc.CollisionManager = cc.director.getCollisionManager();  
        //开启碰撞检测
        manager.enabled = true   
        //显示碰撞检测区域
        manager.enabledDebugDraw = false;
    }

}