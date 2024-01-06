import { EXERCISE } from '../redux/slices/exerciseSlice'

export const baseExercises: Array<EXERCISE> = [
    ///////////Press//////////////////////
    {
        name: 'Планка',
        description:
            'Ляжте на підлогу животом вниз, підтримуючись на передпліччях і носках. Тримайте ваше тіло в прямому положенні як дошка, без опускання або підняття тазу.',
        muscleArea: ['press_base'],
        gym: true,
        outdoors: true,
        home: true,
        id: 'e15d95a6-bf9a-4d4e-b8e9-fd948597f3f6',
    },
    {
        name: 'Підйом ніг лежачи',
        description:
            'Ляжте на підлогу на спину, руки вздовж тіла. Піднімайте обидві ноги догори до того моменту, поки вони не будуть дивитися прямо вгору. Потім повільно опускайте їх назад.',
        muscleArea: ['press_down'],
        gym: true,
        outdoors: true,
        home: true,
        id: 'fe928e48-5b1d-4c7a-85a9-2a3e8c5f8e9d',
    },
    {
        name: 'Бічна планка',
        description:
            'Ляжте на бік, підтримуючись на одному передпліччі. Друга рука на талії. Тримайте ваше тіло в прямому положенні, піднімаючи таз вгору.',
        muscleArea: ['press_side'],
        gym: true,
        outdoors: true,
        home: true,
        id: 'a23d1f7c-5c28-4e66-a5dd-5bb8b3c4a0e3',
    },
    {
        name: 'Підйом тулуба',
        description:
            'Ляжте на спину, ноги зігнуті в колінах. Піднімайте верхню частину тіла до колін, намагаючись дістати до них ліктями.',
        muscleArea: ['press_up'],
        gym: true,
        outdoors: true,
        home: true,
        id: '4e10a243-1bda-4b1b-9854-6c4c8e82710f',
    },
    {
        name: 'Обертання тулуба',
        description:
            'Сидіть на підлозі, руки за головою, ноги підняті над підлогою. Обертайте тулуб відносно ніг, намагаючись дістати правим ліктем до лівого коліна і навпаки.',
        muscleArea: ['press_base'],
        gym: true,
        outdoors: true,
        home: true,
        id: '6d30c843-3eda-4b7b-bc65-8a1da1e54e30',
    },
    {
        name: 'Гірка',
        description:
            'Ляжте на спину, ноги прямі. Піднімайте ноги і верхню частину тіла одночасно, намагаючись торкнутися пальців ніг.',
        muscleArea: ['press_up', 'press_down'],
        gym: true,
        outdoors: true,
        home: true,
        id: '7e40d943-4eda-5c7b-ac75-9b2da2f54f40',
    },
    {
        name: 'Планка з підняттям ноги',
        description: 'Прийміть позицію планки. Піднімайте одну ногу догори, тримаючи її прямо. Змінюйте ноги.',
        muscleArea: ['press_base', 'leg_back'],
        gym: true,
        outdoors: true,
        home: true,
        id: '8f50e053-5eda-6c7b-bd85-0c3ea3g54g50',
    },
    {
        name: 'Обертання в планці',
        description:
            'Прийміть позицію планки на руках. Поверніть тулуб, піднімаючи одну руку догори. Поверніться в початкове положення і змініть руку.',
        muscleArea: ['press_base', 'press_side'],
        gym: true,
        outdoors: true,
        home: true,
        id: '9g60f163-6eda-7d7b-be95-1d4fb4h65h60',
    },
    {
        name: 'Підйом ніг висячи на турніку',
        description:
            'Повисніть на турніку, ноги зігнуті в колінах. Піднімайте коліна до грудей і повільно опускайте їх назад.',
        muscleArea: ['press_up'],
        gym: true,
        outdoors: true,
        home: false,
        inventory: ['bar'],
        id: '0h70g273-7eda-8e8b-bf05-2e5ic5j76j70',
    },
    {
        name: 'Планка з притягуванням коліна до грудей',
        description:
            'Прийміть позицію планки на руках. Притягніть одне коліно до грудей, потім поверніть ногу назад і змініть ногу.',
        muscleArea: ['press_base', 'leg_front'],
        gym: true,
        outdoors: true,
        home: true,
        id: '1i80h383-8edb-9f9b-ag15-3f6jd6k87k80',
    },
    {
        name: 'Підйоми ніг висячи на турніку',
        description:
            'Повисніть на турніку, ноги прямі. Піднімайте ноги до горизонтального положення і повільно опускайте їх назад.',
        muscleArea: ['press_down'],
        gym: true,
        outdoors: true,
        home: false,
        inventory: ['bar'],
        id: '2j90i493-9edc-0g0b-bh25-4g7ke7l98l90',
    },
    {
        name: 'Скрутка сидячи',
        description:
            'Сидіть на підлозі, ноги підняті від підлоги, руки разом перед собою. Обертайте тулуб в одну і іншу сторони, намагаючись торкнутися підлоги обома руками.',
        muscleArea: ['press_side'],
        gym: true,
        outdoors: true,
        home: true,
        id: '3k01j503-0edd-1h1b-ci35-5h8lf8m09m01',
    },
    {
        name: "Скрутка на м'ячі для фітнесу",
        description:
            "Сідайте на фітнес-м'яч, спина пряма. Повільно наклоняйтесь назад, а потім повертайтесь до початкового положення, намагаючись напружити прес.",
        muscleArea: ['press_base'],
        gym: true,
        outdoors: false,
        home: true,
        inventory: ['fitness_ball'],
        id: '4n12k613-1ede-2i2b-dj45-6j9ng9o01n12',
    },
    {
        name: 'Обертання з гантелями',
        description:
            'Сидіть на підлозі, тримаючи гантелю обома руками перед собою. Обертайте тулуб вліво і вправо, намагаючись прикласти гантелю до підлоги з кожного боку.',
        muscleArea: ['press_side'],
        gym: true,
        outdoors: false,
        home: true,
        inventory: ['dumbbells'],
        id: '5o23l723-2edf-3j3b-ek55-7k0oh0p12o23',
    },
    {
        name: '"Гірка" з м\'ячем',
        description:
            "Ляжте на спину, ноги прямі, м'яч між ногами. Піднімайте ноги і верхню частину тіла одночасно, намагаючись взяти м'яч руками, потім повертайте м'яч ногами назад.",
        muscleArea: ['press_up', 'press_down'],
        gym: true,
        outdoors: false,
        home: true,
        inventory: ['ball'],
        id: '7q45n943-4edh-5l5b-gm75-9m2rj2r34q45',
    },
    {
        name: 'Діагональна скрутка',
        description:
            'Ляжте на спину, руки за головою. Піднімайте верхню частину тіла і одночасно намагайтеся дістати правим ліктем до лівого коліна, підіймаючи його до ліктя і навпаки.',
        muscleArea: ['press_up', 'press_side'],
        gym: true,
        outdoors: true,
        home: true,
        id: '8r56o053-5edi-6m6b-hn85-0n3sk3s45r56',
    },
    {
        name: 'Скрутка на римському стільці',
        description:
            'Прийміть позицію на римському стільці з руками за головою. Виконуйте скручування, піднімаючи верхню частину тіла вгору.',
        media: ['https://youtu.be/0KWBrB-EPa0'],
        muscleArea: ['press_up'],
        gym: true,
        outdoors: false,
        home: false,
        inventory: ['roman_chair'],
        id: '9s67p163-6edj-7n7b-io95-1o4tl4t56s67',
    },
    {
        name: 'Підтягування ніг на тренажері',
        description:
            'Сідайте на тренажер для підтягування ніг, руки на бокових ручках. Підтягуйте ноги до грудей і повільно опускайте їх назад.',
        muscleArea: ['press_down'],
        gym: true,
        outdoors: false,
        home: false,
        inventory: ['exercise_machine_for_lifting_legs'],
        id: '0t78q273-7edk-8o8b-jp05-2p5um5u67t78',
    },

    ///////////Chest//////////////////////

    {
        name: 'Жим гантелей на лавці',
        description: 'Ляжте на лавку з гантелями у кожній руці. Відтискайте гантелі вгору, втягуючи груди.',
        muscleArea: ['chest_base'],
        media: ['https://youtu.be/KjYak5vZO9s?si=XhD8RGdo9ma49H7m'],
        gym: true,
        outdoors: false,
        home: false,
        inventory: ['dumbbells', 'bench'],
        id: '4a20c1db-ef95-4f32-8a92-9e77b5aaf120',
    },

    {
        name: 'Жим гантелей лежачи на лавці під кутом',
        description: 'Ляжте на лавку, тримаючи гантелі. Відтискайте гантелі вгору, втягуючи груди.',
        muscleArea: ['chest_up'],
        media: ['https://youtu.be/07Bcqtib4FM?si=_O5ma99VjzTS2u7o'],
        gym: true,
        outdoors: false,
        home: false,
        inventory: ['dumbbells', 'bench'],
        id: '3c89d4e9-0b79-40e3-953c-c7d24d25c175',
    },

    {
        name: 'Віджимання від підлоги',
        description:
            'Станьте у позу віджимання на підлозі, руки розташовані на ширині плечей. Піднімайте тіло вгору, втягуючи груди.',
        muscleArea: ['chest_base'],
        media: ['https://youtu.be/lVNzuIArliA?si=48HHaqsGdhFiYN2R'],
        gym: true,
        outdoors: true,
        home: true,
        id: '2e75c2ca-7d81-4fb7-8a11-3e65b4a1f940',
    },

    {
        name: 'Кросовер на тренажері',
        description:
            'Використовуйте тренажер кросовера для зведення рук перед грудьми. Контролюйте рух, зосереджуючи увагу на грудях.',
        muscleArea: ['chest_base'],
        media: ['https://youtu.be/FVWJglwid4I?si=2DmLUZRChGSb2OGf'],
        gym: true,
        outdoors: false,
        home: false,
        inventory: ['crossover'],
        id: '1b65e3df-5e0e-4cc7-9332-7f5c81dbf3e0',
    },

    {
        name: 'Розведення гантелей на лавці',
        description:
            'Ляжте на лавку з гантелями у руках. Розведіть руки в сторони, роблячи розведення гантелей, потім зводьте руки одину до одної, намагаючись не токатися гантелями при зведені.',
        muscleArea: ['chest_side'],
        media: ['https://youtu.be/UKwkChzThig?si=JC1hz08Q2pfjWJz6'],
        gym: true,
        outdoors: false,
        home: false,
        inventory: ['dumbbells', 'bench'],
        id: '4f30a2cb-2e8d-48d1-af13-61e1cfa81aa0',
    },

    ///////////Shoulders//////////////////////

    {
        name: 'Армстронг',
        description: "Повисніть на турніку. Піднімайте масу тіла за рахунок м'язів плечей, не згинаючи руки.",
        muscleArea: ['shoulders_base'],
        gym: true,
        outdoors: true,
        home: true,
        inventory: ['bar'],
        id: '1a23b2cb-4c56-7d89-1b23-9a45c6a78b90',
    },
    {
        name: 'Підйом гантелей стоячи',
        description:
            'Стійте прямо з гантелями у руках. Піднімайте руки перед собою, зосереджуючи напруження на плечах.',
        muscleArea: ['shoulders_front'],
        media: ['https://youtu.be/sOcYlBI85hc?si=8pD2LzxxjFw2YdIH'],
        gym: true,
        outdoors: false,
        home: true,
        inventory: ['dumbbells'],
        id: '2c34d5e6-8f67-9a87-2c34-1b45d6e78c91',
    },
    {
        name: 'Жим гантелей від плечей',
        description:
            'Стійте прямо(можна виконувати сидячи) з піднятими гантелями у руках над плечима. Відтискайте гантелі від плечей, випрямляючи руки',
        muscleArea: ['shoulders_base'],
        media: ['https://youtu.be/0JfYxMRsUCQ?si=ZEfXuhIfU-bwStKh'],
        gym: true,
        outdoors: true,
        home: true,
        inventory: ['dumbbells'],
        id: '3d45e6f7-9g89-0b76-3d45-2c56f7d89e92',
    },
    {
        name: 'Махи гантелями в сторони',
        description:
            'Стійте(можна виконувати сидячи), трохи нахиливши корпус вперед, з гантелями у руках, руки опущені вниз. Піднімайте гантелі в сторони, роблячи махи, зосереджуючи напруження на плечах.',
        muscleArea: ['shoulders_base'],
        media: ['https://youtu.be/3gJXpfwg_go?si=lPDkCUiWtfz_wISC'],
        gym: true,
        outdoors: false,
        home: true,
        inventory: ['dumbbells'],
        id: '5j23k4l5-2g67-3j89-5k23-4l5g6h78j23l',
    },
]
