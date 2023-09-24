export type MUSCLE_AREA_TYPE =
    | 'chest_base'
    | 'chest_up'
    | 'chest_down'
    | 'press_base'
    | 'press_down'
    | 'press_up'
    | 'press_side'
    | 'biceps'
    | 'triceps'
    | 'forearm'
    | 'shoulders_base'
    | 'shoulders_front'
    | 'shoulders_back'
    | 'back_base'
    | 'back_up'
    | 'back_down'
    | 'leg_base'
    | 'leg_front'
    | 'leg_back'
    | 'leg_calf'
    | 'leg_ass'

export type CHEST_AREA_TYPE = 'chest_base' | 'chest_up' | 'chest_down'
export type PRESS_AREA_TYPE =
    | 'press_base'
    | 'press_down'
    | 'press_up'
    | 'press_side'
export type HANDS_AREA_TYPE = 'biceps' | 'triceps' | 'forearm'
export type SHOULDERS_AREA_TYPE =
    | 'shoulders_base'
    | 'shoulders_front'
    | 'shoulders_back'
export type BACK_AREA_TYPE = 'back_base' | 'back_up' | 'back_down'
export type LEGS_AREA_TYPE =
    | 'leg_base'
    | 'leg_front'
    | 'leg_back'
    | 'leg_calf'
    | 'leg_ass'
export type INVENTORY_TYPE =
    | 'bar'
    | 'fitness_ball'
    | 'dumbbells'
    | 'ball'
    | 'roman_chair'
    | 'exercise_machine_for_lifting_legs'
export const muscleAreaTypes: Array<MUSCLE_AREA_TYPE> = [
    //chest
    'chest_base',
    'chest_up',
    'chest_down',
    //press
    'press_base',
    'press_down',
    'press_up',
    'press_side',
    //hands
    'biceps',
    'triceps',
    'forearm',
    //shoulders
    'shoulders_base',
    'shoulders_front',
    'shoulders_back',
    //back
    'back_base',
    'back_up',
    'back_down',
    //legs
    'leg_base',
    'leg_front',
    'leg_back',
    'leg_calf',
    'leg_ass',
]
export const chestAreaTypes: Array<CHEST_AREA_TYPE> = [
    'chest_base',
    'chest_up',
    'chest_down',
]

export const pressAreaTypes: Array<PRESS_AREA_TYPE> = [
    'press_base',
    'press_down',
    'press_up',
    'press_side',
]

export const handsAreaTypes: Array<HANDS_AREA_TYPE> = [
    'biceps',
    'triceps',
    'forearm',
]

export const shouldersAreaTypes: Array<SHOULDERS_AREA_TYPE> = [
    'shoulders_base',
    'shoulders_front',
    'shoulders_back',
]

export const backAreaTypes: Array<BACK_AREA_TYPE> = [
    'back_base',
    'back_up',
    'back_down',
]

export const legsAreaTypes: Array<LEGS_AREA_TYPE> = [
    'leg_base',
    'leg_front',
    'leg_back',
    'leg_calf',
    'leg_ass',
]
