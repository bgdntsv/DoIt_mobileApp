import {EXERCISE_TYPE} from '../redux/slices/exerciseSlice'

export const baseExercises: Array<EXERCISE_TYPE> = [
    //Press
    {
        'name': 'Планка',
        'description': 'Ляжте на підлогу животом вниз, підтримуючись на передпліччях і носках. Тримайте ваше тіло в прямому положенні як дошка, без опускання або підняття тазу.',
        'muscleArea': ['press_base'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': 'e15d95a6-bf9a-4d4e-b8e9-fd948597f3f6'
    },
    {
        'name': 'Підйом ніг лежачи',
        'description': 'Ляжте на підлогу на спину, руки вздовж тіла. Піднімайте обидві ноги догори до того моменту, поки вони не будуть дивитися прямо вгору. Потім повільно опускайте їх назад.',
        'muscleArea': ['press_down'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': 'fe928e48-5b1d-4c7a-85a9-2a3e8c5f8e9d'
    },
    {
        'name': 'Бічна планка',
        'description': 'Ляжте на бік, підтримуючись на одному передпліччі. Друга рука на талії. Тримайте ваше тіло в прямому положенні, піднімаючи таз вгору.',
        'muscleArea': ['press_side'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': 'a23d1f7c-5c28-4e66-a5dd-5bb8b3c4a0e3'
    },
    {
        'name': 'Підйом тулуба',
        'description': 'Ляжте на спину, ноги зігнуті в колінах. Піднімайте верхню частину тіла до колін, намагаючись дістати до них ліктями.',
        'muscleArea': ['press_up'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': '4e10a243-1bda-4b1b-9854-6c4c8e82710f'
    },
    {
        'name': 'Обертання тулуба',
        'description': 'Сидіть на підлозі, руки за головою, ноги підняті над підлогою. Обертайте тулуб відносно ніг, намагаючись дістати правим ліктем до лівого коліна і навпаки.',
        'muscleArea': ['press_base'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': '6d30c843-3eda-4b7b-bc65-8a1da1e54e30'
    },
    {
        'name': 'Гірка',
        'description': 'Ляжте на спину, ноги прямі. Піднімайте ноги і верхню частину тіла одночасно, намагаючись торкнутися пальців ніг.',
        'muscleArea': ['press_up', 'press_down'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': '7e40d943-4eda-5c7b-ac75-9b2da2f54f40'
    },
    {
        'name': 'Планка з підняттям ноги',
        'description': 'Прийміть позицію планки. Піднімайте одну ногу догори, тримаючи її прямо. Змінюйте ноги.',
        'muscleArea': ['press_base', 'leg_back'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': '8f50e053-5eda-6c7b-bd85-0c3ea3g54g50'
    },
    {
        'name': 'Обертання в планці',
        'description': 'Прийміть позицію планки на руках. Поверніть тулуб, піднімаючи одну руку догори. Поверніться в початкове положення і змініть руку.',
        'muscleArea': ['press_base', 'press_side'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': '9g60f163-6eda-7d7b-be95-1d4fb4h65h60'
    },
    {
        'name': 'Підйом ніг висячи на турніку',
        'description': 'Повисніть на турніку, ноги зігнуті в колінах. Піднімайте коліна до грудей і повільно опускайте їх назад.',
        'muscleArea': ['press_up'],
        'gym': true,
        'outdoors': true,
        'home': false,
        'inventory': ['bar'],
        'id': '0h70g273-7eda-8e8b-bf05-2e5ic5j76j70'
    },
    {
        'name': 'Планка з притягуванням коліна до грудей',
        'description': 'Прийміть позицію планки на руках. Притягніть одне коліно до грудей, потім поверніть ногу назад і змініть ногу.',
        'muscleArea': ['press_base', 'leg_front'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': '1i80h383-8edb-9f9b-ag15-3f6jd6k87k80'
    },
    {
        'name': 'Підйоми ніг висячи на турніку',
        'description': 'Повисніть на турніку, ноги прямі. Піднімайте ноги до горизонтального положення і повільно опускайте їх назад.',
        'muscleArea': ['press_down'],
        'gym': true,
        'outdoors': true,
        'home': false,
        'inventory': ['bar'],
        'id': '2j90i493-9edc-0g0b-bh25-4g7ke7l98l90'
    },
    {
        'name': 'Скрутка сидячи',
        'description': 'Сидіть на підлозі, ноги підняті від підлоги, руки разом перед собою. Обертайте тулуб в одну і іншу сторони, намагаючись торкнутися підлоги обома руками.',
        'muscleArea': ['press_side'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': '3k01j503-0edd-1h1b-ci35-5h8lf8m09m01'
    },
    {
        'name': 'Скрутка на м\'ячі для фітнесу',
        'description': 'Сідайте на фітнес-м\'яч, спина пряма. Повільно наклоняйтесь назад, а потім повертайтесь до початкового положення, намагаючись напружити прес.',
        'muscleArea': ['press_base'],
        'gym': true,
        'outdoors': false,
        'home': true,
        'inventory': ['fitness_ball'],
        'id': '4n12k613-1ede-2i2b-dj45-6j9ng9o01n12'
    },
    {
        'name': 'Обертання з гантелями',
        'description': 'Сидіть на підлозі, тримаючи гантелю обома руками перед собою. Обертайте тулуб вліво і вправо, намагаючись прикласти гантелю до підлоги з кожного боку.',
        'muscleArea': ['press_side'],
        'gym': true,
        'outdoors': false,
        'home': true,
        'inventory': ['dumbbells'],
        'id': '5o23l723-2edf-3j3b-ek55-7k0oh0p12o23'
    },
    {
        'name': '"Гірка" з м\'ячем',
        'description': 'Ляжте на спину, ноги прямі, м\'яч між ногами. Піднімайте ноги і верхню частину тіла одночасно, намагаючись взяти м\'яч руками, потім повертайте м\'яч ногами назад.',
        'muscleArea': ['press_up', 'press_down'],
        'gym': true,
        'outdoors': false,
        'home': true,
        'inventory': ['ball'],
        'id': '7q45n943-4edh-5l5b-gm75-9m2rj2r34q45'
    },
    {
        'name': 'Діагональна скрутка',
        'description': 'Ляжте на спину, руки за головою. Піднімайте верхню частину тіла і одночасно намагайтеся дістати правим ліктем до лівого коліна, підіймаючи його до ліктя і навпаки.',
        'muscleArea': ['press_up', 'press_side'],
        'gym': true,
        'outdoors': true,
        'home': true,
        'id': '8r56o053-5edi-6m6b-hn85-0n3sk3s45r56'
    },
    {
        'name': 'Скрутка на римському стільці',
        'description': 'Прийміть позицію на римському стільці з руками за головою. Виконуйте скручування, піднімаючи верхню частину тіла вгору.',
        'muscleArea': ['press_up'],
        'gym': true,
        'outdoors': false,
        'home': false,
        'inventory': ['roman_chair'],
        'id': '9s67p163-6edj-7n7b-io95-1o4tl4t56s67'
    },
    {
        "name": "Підтягування ніг на тренажері",
        "description": "Сідайте на тренажер для підтягування ніг, руки на бокових ручках. Підтягуйте ноги до грудей і повільно опускайте їх назад.",
        "muscleArea": ["press_down"],
        "gym": true,
        "outdoors": false,
        "home": false,
        "inventory": ["exercise_machine_for_lifting_legs"],
        "id": "0t78q273-7edk-8o8b-jp05-2p5um5u67t78"
    }
]
