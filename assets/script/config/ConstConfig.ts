const {ccclass, property} = cc._decorator;

@ccclass
export class ConstConfig extends cc.Component {
    /**
     * 运动停止速度
     */
    public static readonly  SPEED_STOP: number = 0;

    /**
     * 运动速度
     */
    public static readonly  SPEED_RUN: number = 500;

    /**
     * 跳跃速度
     */
    public static readonly  SPEED_JUMP: number = 300;

    /**
     * 技能运行速度
     */
    public static readonly ATTACKEFFECT_SPEED: number = 800;

    /**
     * 角色血量
     */
    public static readonly  HERO_BLOOD: number = 100;

    /**
     * 角色攻击力
     */
    public static readonly  HERO_ATTACK: number = 10;


    /**
     * 跑动动画名称
     */
    public static readonly  ANIMATION_RUN: string = "heroRun";
    /**
     * 静止动画名称
     */
    public static readonly  ANIMATION_STATIC: string = "heroStatic";
    /**
     * 攻击动画名称
     */
    public static readonly  ANIMATION_ATTACK: string = "heroAttack";
    /**
     * 角色反向角度
     */
    public static readonly  HERO_SCALEX: number = 2.5;

    /**
     * 按钮缩放
     */
    public static readonly  HERO_SCALE: number = 1.2;

    /**
     * 按钮正常
     */
    public static readonly  HERO_SCALE_NOMAL: number = 1;

    /**
     * 摄像机左边最大边界
     */
    public static readonly  CAMERA_LEFT_MAXX: number = 30;

    /**
     * 摄像机右边最大边界
     */
    public static readonly  CAMERA_RIGHT_MAXX: number = 8800;

    /**
     * 主角分组 
     */
    public static readonly HERO_GROUP_NAME: string = "hero";

    /**
     * 怪物分组 
     */
    public static readonly MONSTER_GROUP_NAME: string = "monster";

    /**
     * 攻击分组 
     */
    public static readonly ATTACK_GROUP_NAME: string = "attack_effect";

    /**
     * monster1名称
     */
    public static readonly MONSTER1_NAME: string = "monster1";


    /**
     * monster1运动距离
     */
    public static readonly MONSTER1RUN_LENGTH: number = 100;

    /**
     * monster1攻击力
     */
    public static readonly MONSTER1_ATTACK: number = 10;

    /**
     * monster1血量
     */
    public static readonly MONSTER1_BLOOD: number = 20;


    /**
     * monster2名称
     */
    public static readonly MONSTER2_NAME: string = "monster2";

     /**
     * monster2血量
     */
    public static readonly MONSTER2_BLOOD: number = 40;

    /**
     * monster2攻击力
     */
    public static readonly MONSTER2_ATTACK: number = 20;


}