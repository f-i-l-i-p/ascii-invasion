import { PixelData } from "./textureMaker";

export const ufoData: PixelData = {
    chars: [
        "    __:__    ",
        " __/o_o_o\\__ ",
        "(_~_~_~_~_~_)",
    ],
    colors: [
        "    ccrcc    ",
        " cccCcCcCccc ",
        "ccYcYcYcYcYcc",
    ]
}

export const bulletData: PixelData = {
    chars: [
        "|",
    ],
    colors: [
        "r",
    ]
}

export const playerData: PixelData = {
    chars: [
        "   /^\\   ",
        "  /'o'\\  ",
        " /' _ '\\ ",
        " [.|_|.] ",
        "/[_____]\\",
        "[/     \\]",
    ],
    colors: [
        "   rrr   ",
        "  rGrGr  ",
        " rG r Gr",
        " rGrrrGr ",
        "grrrrrrrg",
        "GG     GG",
    ]
}

const rockColors = [
    "GGGGGGGGG",
    "GGGGGGGGG",
    "GGGGGGGGG",
    "GGGGGGGGG",
    "GGGGGGGGG",
];

export const rockData1: PixelData = {
    chars: [
        "   ____  ",
        " _/  _ \\ ",
        "/  /    |",
        "| _  /  /",
        "\\_____-/ ",
    ],
    colors: rockColors,
}

export const rockData2: PixelData = {
    chars: [
        "   ____  ",
        " _/. _ \\ ",
        "/  /. \\ |",
        "|._ -/  /",
        "\\__-__-/ ",
    ],
    colors: rockColors,
}
export const rockData3: PixelData = {
    chars: [
        "   ____  ",
        " _/- _ \\ ",
        "/ ./- \\ |",
        "|-_.-/ ./",
        "\\__-__-/ ",
    ],
    colors: rockColors,
}
export const rockData4: PixelData = {
    chars: [
        "   ____  ",
        " _/- _.\\ ",
        "/ -/- \\.|",
        "|-_\\-/ -/",
        "\\._-__-/ ",
    ],
    colors: rockColors,
}
export const rockData5: PixelData = {
    chars: [
        "   ____  ",
        " _/-._-\\ ",
        "/ -/- \\-|",
        "|-_\\-/.-/",
        "\\-_-__-/ ",
    ],
    colors: rockColors,
}

export const healthPickupData: PixelData = {
    chars: [
        "+--+",
        "|+A|",
        "+--+",
    ], colors: [
        "YYYY",
        "YrrY",
        "YYYY",
    ],
}
export const ammoPickupData: PixelData = {
    chars: [
        "+--+",
        "|+||",
        "+--+",
    ], colors: [
        "YYYY",
        "YyyY",
        "YYYY",
    ],
}
export const doubleFirePickupData: PixelData = {
    chars: [
        "+--+",
        "||||",
        "+--+",
    ], colors: [
        "YYYY",
        "YggY",
        "YYYY",
    ],
}