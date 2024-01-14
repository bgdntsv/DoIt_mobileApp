export type MUSCLE_AREA_TYPE =
    | CHEST_AREA_TYPE
    | PRESS_AREA_TYPE
    | HANDS_AREA_TYPE
    | SHOULDERS_AREA_TYPE
    | BACK_AREA_TYPE
    | LEGS_AREA_TYPE

export type CHEST_AREA_TYPE = 'chest_base' | 'chest_up' | 'chest_down' | 'chest_side'
export type PRESS_AREA_TYPE = 'press_base' | 'press_down' | 'press_up' | 'press_side'
export type HANDS_AREA_TYPE = 'biceps' | 'triceps' | 'forearm'
export type SHOULDERS_AREA_TYPE = 'shoulders_base' | 'shoulders_front' | 'shoulders_back'
export type BACK_AREA_TYPE = 'back_base' | 'back_up' | 'back_down'
export type LEGS_AREA_TYPE = 'legs_base' | 'legs_front' | 'legs_back' | 'legs_calf' | 'legs_ass'

export type INVENTORY =
    | 'bar'
    | 'fitness_ball'
    | 'dumbbells'
    | 'ball'
    | 'roman_chair'
    | 'exercise_machine_for_lifting_legs'
    | 'barbell'
    | 'bench'
    | 'crossover'
